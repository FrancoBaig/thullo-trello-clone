import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { loginService, signupService } from "../../services/register";
import { sendPhoto } from "../../services/cloudinary";

const initialState = {
    user: {
        name: "",
        email: "",
        token: "",
        img_id: "",
    },
    data: {
        "board-1": {
            id: "board-1",
            title: "Devchallenges Board",
            isPrivate: true,
            labels: [],
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
                    labels: [],
                },
                "task-2": {
                    id: "task-2",
                    url_cover: "",
                    content: "Watch my favorite show",
                    description: "",
                    labels: [],
                },
                "task-3": {
                    id: "task-3",
                    content: "Charge my phone",
                    url_cover: "",
                    description: "",
                    labels: [],
                },
                "task-4": {
                    id: "task-4",
                    content: "Cook dinner",
                    url_cover: "",
                    description: "",
                    labels: [],
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
            members: ["email1@gmail.com"],
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
        members: [],
        admins: [],
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { name, email, token, img_id } = action.payload;

            return {
                ...state,
                user: {
                    name,
                    email,
                    token,
                    img_id,
                },
            };
        },
        setNewPhoto(state, action) {
            return {
                ...state,
                user: {
                    ...state.user,
                    img_id: action.payload,
                },
            };
        },
        addTask(state, action) {
            const { newCardInput, column } = action.payload;

            const idTask = `task-${new Date().getTime()}`;

            const newCard = {
                id: idTask,
                content: newCardInput,
                description: "",
                url_cover: "",
                labels: [],
            };

            // 1. Add task id to column ✅
            const newColumn = {
                ...column,
                taskIds: [...column.taskIds, newCard.id],
            };

            // 2. Add new column to actual board ✅

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
        updateTaskCover(state, action) {
            const newTask = action.payload;

            const newBoard = {
                ...state.actualBoard,
                tasks: {
                    ...state.actualBoard.tasks,
                    [newTask.id]: newTask,
                },
            };

            console.log("new board->", newBoard);

            return {
                ...state,
                data: {
                    ...state.data,
                    [newBoard.id]: newBoard,
                },
                actualBoard: newBoard,
            };
        },
        addColumn(state, action) {
            const name = action.payload;

            const idCol = `col-${new Date().getTime()}`;

            const newBoard = {
                ...state.actualBoard,
                columns: {
                    ...state.actualBoard.columns,
                    [idCol]: { id: idCol, title: name, taskIds: [] },
                },
                columnOrder: [...state.actualBoard.columnOrder, idCol],
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [newBoard.id]: newBoard,
                },
                actualBoard: newBoard,
            };
        },
        deleteColumn(state, action) {
            const column = action.payload;

            // Get columns without column -> newList
            const { [column.id]: remove, ...newList } =
                state.actualBoard.columns;

            // Get columnOrder without column.id -> result
            const array = state.actualBoard.columnOrder;
            const index = array.indexOf(column.id);
            const result = array.slice(0, index).concat(array.slice(index + 1));

            // New board
            const newBoard = {
                ...state.actualBoard,
                columnOrder: [...result],
                columns: { ...newList },
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [newBoard.id]: newBoard,
                },
                actualBoard: newBoard,
            };
        },
        addLabel(state, action) {
            const { task, input, selected } = action.payload;

            const newLabel = {
                text: input,
                color: selected,
            };

            const newTask = {
                ...task,
                labels: [...task.labels, newLabel],
            };

            const newBoard = {
                ...state.actualBoard,
                labels: [...state.actualBoard.labels, newLabel],
                tasks: {
                    ...state.actualBoard.tasks,
                    [newTask.id]: newTask,
                },
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [newBoard.id]: newBoard,
                },
                actualBoard: newBoard,
            };
        },
        createBoard(state, action) {
            const boardData = action.payload;

            const idBoard = `board-${new Date().getTime()}`;

            const newBoard = {
                id: idBoard,
                title: boardData.title,
                image_url: boardData.image_url,
                description: "",
                admins: [state.user.email],
                columnOrder: [],
                colmns: {},
                isPrivate: boardData.isPrivate,
                members: [state.user.email],
                tasks: {},
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [idBoard]: newBoard,
                },
            };
        },
        togglePrivacity(state, action) {
            const newBoard = {
                ...state.actualBoard,
                isPrivate: !state.actualBoard.isPrivate,
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [newBoard.id]: newBoard,
                },
                actualBoard: newBoard,
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

export const loginUser = (data) => {
    return async (dispatch) => {
        const response = await loginService(data);
        dispatch(setUser(response));
    };
};

export const signUpUser = (data) => {
    return async (dispatch) => {
        await signupService(data);
    };
};

export const changePhoto = (data) => {
    return async (dispatch) => {
        const response = await sendPhoto(data);
        const id = response.public_id;
        dispatch(setNewPhoto(id));
    };
};

export const {
    setUser,
    setNewPhoto,
    addTask,
    updateTaskCover,
    addColumn,
    deleteColumn,
    addLabel,
    createBoard,
    togglePrivacity,
    changeActualBoard,
    updateActualBoard,
} = userSlice.actions;
export default userSlice.reducer;
