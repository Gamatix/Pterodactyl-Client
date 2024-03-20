import { Client, Account, ID } from "appwrite";

export class userService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else return userAccount;
    } catch (error) {
      console.log("Error while creating a user account", error.message);
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error while logging in", error.message);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error while logging out", error.message);
      throw error;
    }
  }
}

const userAccountService = new userService();
export default userAccountService;
