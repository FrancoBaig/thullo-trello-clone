import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "Franco",
        email: "email1@gmail.com",
        token: "Boea 123",
        img_url: "https://www.blexar.com/avatar.png",
    },
    data: [
        {
            id: "board-1",
            title: "Devchallenges Board",
            isPrivate: true,
            image_url:
                "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
            tasks: {
                1: {
                    id: "1",
                    content: " take out the garbage",
                    description:
                        "Udeas are created and share here through a card. Here you can describe what you'd like to accomplish.",
                },
                2: {
                    id: "2",
                    content: "Watch my favorite show",
                    description: "",
                },
                3: { id: "3", content: "Charge my phone", description: "" },
                4: { id: "4", content: "Cook dinner", description: "" },
            },
            columns: {
                "col-1": {
                    id: "col-1",
                    title: "To do",
                    taskIds: ["1", "2", "3"],
                },
                "col-2": { id: "col-2", title: "Doing", taskIds: ["4"] },
                "col-3": { id: "col-3", title: "Done", taskIds: [] },
            },
            columnOrder: ["col-1", "col-2", "col-3"],
            members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
            admins: ["email1@gmail.com"],
        },
        {
            id: "board-2",
            title: "Devchallenges Board 2",
            isPrivate: false,
            image_url:
                "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
            tasks: {
                1: {
                    id: "1",
                    content: " take out the garbage",
                    description: "",
                },
                2: {
                    id: "2",
                    content: "Watch my favorite show",
                    description: "",
                },
                3: { id: "3", content: "Charge my phone", description: "" },
                4: {
                    id: "4",
                    content: "Terminar proyecto de Thullo",
                    description: "",
                },
            },
            columns: {
                "col-1": {
                    id: "col-1",
                    title: "To do",
                    taskIds: ["1", "2", "3"],
                },
                "col-2": { id: "col-2", title: "Doing", taskIds: ["4"] },
                "col-3": { id: "col-3", title: "Done", taskIds: [] },
            },
            columnOrder: ["col-1", "col-2", "col-3"],
            members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
            admins: ["email1@gmail.com"],
        },
        {
            id: "board-3",
            title: "Devchallenges Board 3",
            isPrivate: true,
            image_url:
                "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
            tasks: {
                1: {
                    id: "1",
                    content: " take out the garbage",
                    description: "",
                },
                2: {
                    id: "2",
                    content: "Watch my favorite show",
                    description: "",
                },
                3: { id: "3", content: "Charge my phone", description: "" },
                4: { id: "4", content: "Cook dinner", description: "" },
            },
            columns: {
                "col-1": {
                    id: "col-1",
                    title: "To do",
                    taskIds: ["1", "2", "3"],
                },
                "col-2": { id: "col-2", title: "Doing", taskIds: ["4"] },
                "col-3": { id: "col-3", title: "Done", taskIds: [] },
            },
            columnOrder: ["col-1", "col-2", "col-3"],
            members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
            admins: ["email1@gmail.com"],
        },
        {
            id: "board-4",
            title: "Devchallenges Board 3",
            isPrivate: true,
            image_url:
                "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
            tasks: {
                1: {
                    id: "1",
                    content: " take out the garbage",
                    description: "",
                },
                2: {
                    id: "2",
                    content: "Watch my favorite show",
                    description: "",
                },
                3: { id: "3", content: "Charge my phone", description: "" },
                4: { id: "4", content: "Cook dinner", description: "" },
            },
            columns: {
                "col-1": {
                    id: "col-1",
                    title: "To do",
                    taskIds: ["1", "2", "3"],
                },
                "col-2": { id: "col-2", title: "Doing", taskIds: ["4"] },
                "col-3": { id: "col-3", title: "Done", taskIds: [] },
            },
            columnOrder: ["col-1", "col-2", "col-3"],
            members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
            admins: ["email1@gmail.com"],
        },
    ],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
