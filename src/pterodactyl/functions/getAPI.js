import axios from "axios";

class API {
  async get(url) {
    if (!url) {
      console.error("URL is not defined");
      return [undefined, new Error("URL is not defined")];
    }
    let response = undefined;
    let error = undefined;
    console.log("Running getAPI");
    try {
      console.log(url);
      response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX`,
        },
      });
      
    } catch (err) {
      error = err;
      console.log(error);
    }
    return [response, error];
  }
}
const apiCall = new API();
export default apiCall;
