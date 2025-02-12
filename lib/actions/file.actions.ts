'use server'

import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config";
import { InputFile } from "node-appwrite/file";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { fetchCurrentUser } from "./user.actions";

const handleError = (error: unknown, message: string) => {
    console.log(error, message)
    throw error;
}

const createQueries = (currentUser: Models.Document) => {

    const queries = [
        Query.or([
            Query.equal('owner', [currentUser.$id]),
            Query.contains('users', [currentUser.email]),

        ])
    ]

    return queries;

}

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
    const { storage, databases } = await createAdminClient();

    try {

        if (accountId.length > 255) {
            console.error("Error: accountId exceeds 255 characters");
        }


        const inputFile = InputFile.fromBuffer(file, file.name);

        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile)

        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId: String(accountId.accountId),
            users: [],
            bucketFileId: bucketFile.$id
        }

        const newFile = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            ID.unique(),
            fileDocument
        ).catch(async (err: unknown) => {
            await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id)
            handleError(err, "Failed to create file document")
        })

        revalidatePath(path)

        return parseStringify(newFile)

    } catch (error) {
        handleError(error, "Failed to upload file")
    }
}

export const getFiles = async () => {
    const { databases } = await createAdminClient();

    try {

        const currentUser = await fetchCurrentUser();


        if (!currentUser) {
            throw new Error("User not found");
        }

        const queries = createQueries(currentUser);


        const files = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            queries
        )


        return parseStringify(files)

    } catch (error) {
        handleError(error, "We failed to get the files");
    }
}

export const renameFile = async ({ fileId, name, extension, path }: RenameFileProps) => {
    const { databases } = await createAdminClient();

    try {

        const newName = `${name}.${extension}`;
        const updatedFile = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            fileId,
            {
                name: newName
            }
        )

        revalidatePath(path)

        return parseStringify(updatedFile)

    } catch (error) {
        handleError(error, "We have failed to rename the file");
    }
}