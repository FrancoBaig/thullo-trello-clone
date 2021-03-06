import axios from "axios";

const baseURL = "https://thullo-git.herokuapp.com/api/board";

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

export const createTaskService = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/task`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateDescription = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/description`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateTaskPositionService = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/task/position`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateTaskColumnService = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/task/column`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateTaskContentService = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/task/content`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateTaskDescriptionService = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/task/description`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateTaskCoverService = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/task/cover`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateColumnNameService = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/column`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteColumnService = async (data) => {
    try {
        const response = await axios.delete(`${baseURL}/column/${data.id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteUserHasBoardService = async (data) => {
    try {
        const response = await axios.delete(
            `${baseURL}/${data.boardId}/${data.userId}`
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateBoardPrivacityService = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/privacity`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const searchUsersByEmailService = async (input) => {
    try {
        const response = await axios.get(`${baseURL}/users/${input}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const assignBoardToUserService = async (data) => {
    try {
        await axios.post(`${baseURL}/assign`, data);
    } catch (err) {
        console.log(err);
    }
};

export const getAllUsers = async (boardId) => {
    try {
        const response = await axios.get(`${baseURL}/all/users/${boardId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const insertLabelService = async (data) => {
    try {
        await axios.post(`${baseURL}/label`, data);
    } catch (err) {
        console.log(err);
    }
};
