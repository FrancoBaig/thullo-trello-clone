import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "Franco",
        email: "email1@gmail.com",
        token: "Boea 123",
        img_url: "https://www.blexar.com/avatar.png",
    },
    data: {
        "board-1": {
            id: "board-1",
            title: "Devchallenges Board",
            isPrivate: true,
            description:
                "Ideas are created and share here through a card. Here you can describe what you'd like to accomplish. For example you can follow three simple questions to create the card relatedto your idea: * Why ? (Why do you wish to do it ?) * What ?(What it is it, what are the goals, who is concerned) * How? (How do you think you can do it ? What are the requiredsteps ?) After creation, you can move your card to the todolist.",
            image_url:
                "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
            tasks: {
                "task-1": {
                    id: "task-1",
                    content: " take out the garbage",
                    url_cover:
                        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
                    description:
                        "Udeas are created and share here through a card. Here you can describe what you'd like to accomplish.",
                },
                "task-2": {
                    id: "task-2",
                    url_cover: "",
                    content: "Watch my favorite show",
                    description: "",
                },
                "task-3": {
                    id: "task-3",
                    content: "Charge my phone",
                    url_cover: "",
                    description: "",
                },
                "task-4": {
                    id: "task-4",
                    content: "Cook dinner",
                    url_cover: "",
                    description: "",
                },
            },
            columns: {
                "col-1": {
                    id: "col-1",
                    title: "To do",
                    taskIds: ["task-1", "task-2", "task-3"],
                },
                "col-2": { id: "col-2", title: "Doing", taskIds: ["task-4"] },
                "col-3": { id: "col-3", title: "Done", taskIds: [] },
            },
            columnOrder: ["col-1", "col-2", "col-3"],
            members: ["email1@gmail.com"], // Acá debería almacenar foto, y todo de cada user, para mostrarla
            admins: ["email1@gmail.com"],
        },
    },
    actualBoard: {
        id: "",
        title: "",
        isPrivate: true,
        description: "",
        image_url: "",
        tasks: [],
        columns: [],
        columnOrder: [],
        members: [], // Acá debería almacenar foto, y todo de cada user, para mostrarla
        admins: [],
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addTask(state, action) {
            const { newCard, column } = action.payload;

            // 1. Add task id to column ✅
            const newColumn = {
                ...column,
                taskIds: [...column.taskIds, newCard.id],
            };

            // 2. Agregar la nueva columna a Actual Board ✅

            const newActualBoard = {
                ...state.actualBoard,
                columns: {
                    ...state.actualBoard.columns,
                    [newColumn.id]: newColumn,
                },
            };

            // 3. Add task to tasks

            const final = {
                ...newActualBoard,
                tasks: {
                    ...state.actualBoard.tasks,
                    [newCard.id]: newCard,
                },
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [state.actualBoard.id]: final,
                },
                actualBoard: final,
            };
        },
        changeActualBoard(state, action) {
            const board = action.payload;

            return {
                ...state,
                actualBoard: board,
            };
        },
        updateActualBoard(state, action) {
            const newBoard = action.payload;

            return {
                ...state,
                data: {
                    ...state.data,
                    [newBoard.id]: newBoard,
                },
                actualBoard: newBoard,
            };
        },
    },
});

export const { addTask, changeActualBoard, updateActualBoard } =
    userSlice.actions;
export default userSlice.reducer;
