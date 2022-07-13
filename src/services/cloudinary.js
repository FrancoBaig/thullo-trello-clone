import axios from "axios";

const baseURL = "http://localhost:3001/api/photo";

export const sendPhoto = async (image) => {
    try {
        const result = await axios.post(baseURL, { image: image });
        return result.data;
    } catch (err) {
        console.log(err);
    }
};
