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
            description:
                "Ideas are created and share here through a card. Here you can describe what you'd like to accomplish. For example you can follow three simple questions to create the card relatedto your idea: * Why ? (Why do you wish to do it ?) * What ?(What it is it, what are the goals, who is concerned) * How? (How do you think you can do it ? What are the requiredsteps ?) After creation, you can move your card to the todolist.",
            image_url:
                "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
            tasks: [
                {
                    id: "1",
                    content: " take out the garbage",
                    description:
                        "Udeas are created and share here through a card. Here you can describe what you'd like to accomplish.",
                },
                {
                    id: "2",
                    content: "Watch my favorite show",
                    description: "",
                },
                { id: "3", content: "Charge my phone", description: "" },
                { id: "4", content: "Cook dinner", description: "" },
            ],
            columns: [
                {
                    id: "col-1",
                    title: "To do",
                    taskIds: ["1", "2", "3"],
                },
                { id: "col-2", title: "Doing", taskIds: ["4"] },
                { id: "col-3", title: "Done", taskIds: [] },
            ],
            columnOrder: ["col-1", "col-2", "col-3"],
            members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
            admins: ["email1@gmail.com"],
        },
        {
            id: "board-2",
            title: "Devchallenges Board",
            isPrivate: true,
            description: "",
            image_url:
                "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
            tasks: [
                {
                    id: "1",
                    content: " take out the garbage",
                    description:
                        "Udeas are created and share here through a card. Here you can describe what you'd like to accomplish.",
                },
                {
                    id: "2",
                    content: "Watch my favorite show",
                    description: "",
                },
                { id: "3", content: "Charge my phone", description: "" },
                { id: "4", content: "Cook dinner", description: "" },
            ],
            columns: [
                {
                    id: "col-1",
                    title: "To do",
                    taskIds: ["1", "2", "3"],
                },
                { id: "col-2", title: "Doing", taskIds: ["4"] },
                { id: "col-3", title: "Done", taskIds: [] },
            ],
            columnOrder: ["col-1", "col-2", "col-3"],
            members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
            admins: ["email1@gmail.com"],
        },
    ],
    actualBoard: {
        id: "board-1",
        title: "Devchallenges Board",
        isPrivate: true,
        description:
            "Ideas are created and share here through a card. Here you can describe what you'd like to accomplish. For example you can follow three simple questions to create the card relatedto your idea: * Why ? (Why do you wish to do it ?) * What ?(What it is it, what are the goals, who is concerned) * How? (How do you think you can do it ? What are the requiredsteps ?) After creation, you can move your card to the todolist.",
        image_url:
            "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
        tasks: [
            {
                id: "1",
                content: " take out the garbage",
                description:
                    "Udeas are created and share here through a card. Here you can describe what you'd like to accomplish.",
            },
            {
                id: "2",
                content: "Watch my favorite show",
                description: "",
            },
            { id: "3", content: "Charge my phone", description: "" },
            { id: "4", content: "Cook dinner", description: "" },
        ],
        columns: [
            {
                id: "col-1",
                title: "To do",
                taskIds: ["1", "2", "3"],
            },
            { id: "col-2", title: "Doing", taskIds: ["4"] },
            { id: "col-3", title: "Done", taskIds: [] },
        ],
        columnOrder: ["col-1", "col-2", "col-3"],
        members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
        admins: ["email1@gmail.com"],
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addTask(state, action) {
            const { newCard, column } = action.payload;
            console.log(newCard);

            /*
            const newColumn = {
                ...column,
                taskIds: [...column.taskIds, newCard.id],
            };
            
            newColumn.tasks.push(newCard);
            
            state.user.data.map((col) =>
            col.id === column.id ? newColumn : col
            );
            */
        },
        changeActualBoard(state, action) {
            const board = action.payload;

            console.log("filtered", board);

            return {
                ...state,
                actualBoard: board,
            };
        },
    },
});

export const { addTask, changeActualBoard } = userSlice.actions;
export default userSlice.reducer;
