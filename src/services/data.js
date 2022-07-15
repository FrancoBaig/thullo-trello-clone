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

export const createBoard = async (data, token) => {
    try {
        const config = {
            headers: { Authorization: token },
        };
        const response = await axios.post(`${baseURL}/`, data, config);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const createColumn = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/column`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
