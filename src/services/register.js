import axios from "axios";

const baseURL = "https://thullo-git.herokuapp.com/api/register";

export const loginService = async (dataUser) => {
    try {
        const response = await axios.post(`${baseURL}/login`, dataUser);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const signupService = async (dataUser) => {
    try {
        const response = await axios.post(`${baseURL}/signup`, dataUser);
        return response;
    } catch (err) {
        console.log(err);
    }
};
