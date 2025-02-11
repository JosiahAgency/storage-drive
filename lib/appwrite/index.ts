'use server';

import { Account, Avatars, Client, Databases, Storage } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers";

export const createSessionClient = async () => {
    try {
        console.log('Creating a new session client...')

        const client = new Client()
            .setEndpoint(appwriteConfig.endpointUrl)
            .setProject(appwriteConfig.projectId);

        const session = (await cookies()).get('appwrite-session')

        console.log(`Here is the session Details: ${session}`)

        if (!session || !session.value) {
            throw new Error("There is no session")
        }

        client.setSession(session.value)

        console.log(`Here is the session value: ${session.value}`)

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
        console.log('Creating a new session client...')

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