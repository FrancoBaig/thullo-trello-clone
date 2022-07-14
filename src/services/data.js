import axios from "axios";

const baseURL = "http://localhost:3001/api/board";

export const getUserBoards = async (token) => {
    try {
        const config = {
            headers: { Authorization: token },
        };
        const response = await axios.get(`${baseURL}/`, config);
        console.log("respuesta", response.data);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};
