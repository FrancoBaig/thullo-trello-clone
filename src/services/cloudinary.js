import axios from "axios";

const baseURL = "https://thullo-git.herokuapp.com/api/photo";

export const sendPhoto = async (data) => {
    try {
        const result = await axios.post(baseURL, data);
        return result.data;
    } catch (err) {
        console.log(err);
    }
};
