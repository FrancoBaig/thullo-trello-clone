import { useState, useEffect } from "react";
import axios from "axios";

export const loginService = async (dataUser) => {
    try {
        const response = await axios.post(
            "http://localhost:3001/api/register/login",
            dataUser
        );
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};
