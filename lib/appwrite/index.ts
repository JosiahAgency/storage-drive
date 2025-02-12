'use server';

import { Account, Avatars, Client, Databases, Storage } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers";

export const createSessionClient = async () => {
    try {

        const allCookies = await cookies();

        const client = new Client()
            .setEndpoint(appwriteConfig.endpointUrl)
            .setProject(appwriteConfig.projectId);

        const session = allCookies.get('appwrite-sessions');


        if (!session || !session.value) {
            console.error("Session cookie is missing or has no value");
            throw new Error("There is no session");
        }

        client.setSession(session.value)


        return {
            get account() {
                return new Account(client);
            },
            get databases() {
                return new Databases(client);
            }
        }

    } catch (error) {
        console.error('Error creating session client:', error)
        throw error;
    }

}

export const createAdminClient = async () => {
    try {

        const client = new Client()
            .setEndpoint(appwriteConfig.endpointUrl)
            .setProject(appwriteConfig.projectId)
            .setKey(appwriteConfig.secretKey);

        return {
            get account() {
                return new Account(client);
            },
            get databases() {
                return new Databases(client);
            },
            get storage() {
                return new Storage(client);
            },
            get avatars() {
                return new Avatars(client);
            }
        }

    } catch (error) {
        console.error('Error creating admin client:', error)
        throw error;
    }
}