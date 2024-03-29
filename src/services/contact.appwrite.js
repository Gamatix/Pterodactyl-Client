import { Client, Databases } from "appwrite"

export class Contact{
    client = new Client()
    databases
    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL)) // Your API Endpoint
            .setProject(String(VITE_APPWRITE_COLLECTION_CONTACT_ID)) // Your project ID

        this.databases = new Databases(this.client)
    }
    async createContact(email, message){
       try {
        return this.databases.createDocument(String(VITE_APPWRITE_COLLECTION_CONTACT_ID), {
            email,
            message
        })
       } catch (error) {
              console.error("Error creating contact: ", error)
              throw error
       }
    }

    async getContact(){
        try {
            return this.databases.listDocuments(String(VITE_APPWRITE_COLLECTION_CONTACT_ID))
        } catch (error) {
            console.error("Error getting contact: ", error)
            throw error
        }
    }

    async deleteContact(id){
        try {
            return this.databases.deleteDocument(String(VITE_APPWRITE_COLLECTION_CONTACT_ID), id)
        } catch (error) {
            console.error("Error deleting contact: ", error)
            throw error
        }
    }

    async updateContact(id, email, message){
        try {
            return this.databases.updateDocument(String(VITE_APPWRITE_COLLECTION_CONTACT_ID), id, {
                email,
                message
            })
        } catch (error) {
            console.error("Error updating contact: ", error)
            throw error
        }
    }

}