import axios from "axios";

class API {
  async patch(url, bodyData) {
    if (!url) {
      console.error("URL is not defined");
      return [undefined, new Error("URL is not defined")];
    }
    let response = undefined;
    let error = undefined;
    console.log("Running patch API call");
    try {
      console.log(url);
      console.log(bodyData)
      response = await axios.patch(url,  bodyData, {

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX`,
          },
      });
      console.log("Response is  ", response);
    } catch (err) {
      error = err;
      console.log(error);
    }
    return [response, error];
  }
}
const patchAPI = new API();
export default patchAPI;
