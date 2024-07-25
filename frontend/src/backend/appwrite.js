import { Client, Databases } from "appwrite";
import conf from "./conf.js";
import { ID } from "appwrite";

const client = new Client();
client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const databases = new Databases(client);
export { ID, databases };
