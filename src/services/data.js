import axios from "axios";

const baseURL = "http://localhost:3001/api/board";

export const getUserBoards = async (token) => {
    try {
        const config = {
            headers: { Authorization: token },
        };
        const response = await axios.get(`${baseURL}/`, config);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const getBoardColumns = async (boardId) => {
    try {
        const response = await axios.get(`${baseURL}/${boardId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
