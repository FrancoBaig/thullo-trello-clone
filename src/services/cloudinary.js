import axios from "axios";

const baseURL = "http://localhost:3001/api/photo";

export const sendPhoto = async (data) => {
    try {
        const result = await axios.post(baseURL, data);
        return result.data;
    } catch (err) {
        console.log(err);
    }
};
