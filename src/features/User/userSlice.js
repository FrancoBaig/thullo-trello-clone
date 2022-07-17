import { createSlice } from "@reduxjs/toolkit";
import { loginService, signupService } from "../../services/register";
import { sendPhoto } from "../../services/cloudinary";
import {
    getUserBoards,
    getBoardColumns,
    createBoard,
    createTaskService,
    updateDescription,
    updateTaskPositionService,
    updateTaskColumnService,
    updateColumnNameService,
    updateTaskContentService,
    createColumn,
} from "../../services/data";

const initialState = {
    user: {
        name: "",
        email: "",
        token: "",
        img_id: "",
    },
    data: {
        3: {
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
            const { name, email, token, image_id } = action.payload;

            return {
                ...state,
                user: {
                    name,
                    email,
                    token,
                    img_id: image_id,
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
            const { content, taskId, position, idColumn } = action.payload;

            const newCard = {
                id: taskId,
                content: content,
                description: "",
                url_cover: "",
                position: position,
                labels: [],
            };

            // 1. Add task id to column ✅
            const newColumn = {
                ...state.actualBoard.columns[idColumn],
                taskIds: [
                    ...state.actualBoard.columns[idColumn].taskIds,
                    newCard.id,
                ],
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
            const dataColumn = action.payload;

            const newBoard = {
                ...state.actualBoard,
                columns: {
                    ...state.actualBoard.columns,
                    [dataColumn.colId]: {
                        id: dataColumn.colId,
                        title: dataColumn.title,
                        taskIds: [],
                    },
                },
                columnOrder: [
                    ...state.actualBoard.columnOrder,
                    dataColumn.colId.toString(),
                ],
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
        setColumns(state, action) {
            /*
             *  too slow, refactoring needed
             */

            const { boardId, columns } = action.payload;

            let columnsResult = {};

            for (let el of columns) {
                columnsResult = {
                    ...columnsResult,
                    [el.idColumn]: {
                        id: el.idColumn,
                        title: el.title,
                        taskIds: [],
                    },
                };
            }

            for (let task of columns) {
                if (!task.idTask) continue;
                columnsResult[task.idColumn].taskIds.push(task.idTask);
            }

            let newTasks = {};

            for (let t of columns) {
                if (!t.idTask) continue;
                newTasks = {
                    ...newTasks,
                    [t.idTask]: {
                        id: t.idTask,
                        url_cover: t.coverUrl,
                        content: t.content,
                        description: "", // falta
                        labels: [], // falta
                    },
                };
            }

            const newBoard = {
                ...state.data[boardId],
                columnOrder: Object.keys(columnsResult),
                columns: columnsResult,
                tasks: newTasks,
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [boardId]: newBoard,
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
        setNewColName(state, action) {
            const data = action.payload;

            const newBoard = {
                ...state.actualBoard,
                columns: {
                    ...state.actualBoard.columns,
                    [data.idCol]: {
                        ...state.actualBoard.columns[data.idCol],
                        title: data.title,
                    },
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
        setBoards(state, action) {
            const raw = action.payload;

            let result = {};
            for (let board of raw) {
                result = {
                    ...result,
                    [board.boardId]: {
                        id: board.boardId,
                        columnOrder: [],
                        admins: [],
                        columns: {},
                        description: board.description,
                        image_url: board.image_url,
                        isProvate: board.isPrivate,
                        labels: [],
                        members: [],
                        tasks: [],
                        title: board.title,
                    },
                };
            }

            return {
                ...state,
                data: result,
            };
        },
        setNewBoard(state, action) {
            const boardData = action.payload;

            const newBoard = {
                id: boardData.boardId,
                title: boardData.title,
                image_url: boardData.image_url,
                description: "",
                admins: [state.user.email],
                columnOrder: [],
                columns: {},
                isPrivate: boardData.isPrivate,
                members: [state.user.email],
                tasks: {},
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    [newBoard.id]: newBoard,
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
        setNewDescription(state, action) {
            const data = action.payload;

            const newBoard = {
                ...state.actualBoard,
                description: data.description,
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
    },
});

export const loginUser = (data) => {
    return async (dispatch) => {
        const response = await loginService(data);
        dispatch(setUser(response));
        const token = response.token;
        dispatch(initialBoards(token));
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

export const initialBoards = (data) => {
    return async (dispatch) => {
        const response = await getUserBoards(data);
        dispatch(setBoards(response));
    };
};

export const getColumns = (boardId) => {
    return async (dispatch) => {
        const response = await getBoardColumns(boardId);
        const data = {
            boardId: boardId,
            columns: response,
        };
        dispatch(setColumns(data));
    };
};

export const createNewBoard = (data) => {
    return async (dispatch) => {
        const response = await createBoard(data.data, data.token);
        const boardData = { ...data.data, boardId: response.boardId };
        dispatch(setNewBoard(boardData));
    };
};

export const createNewColumn = (data) => {
    return async (dispatch) => {
        try {
            const response = await createColumn(data);
            const dataColumn = {
                ...data,
                colId: response.insertId,
            };

            dispatch(addColumn(dataColumn));
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateBoardDescription = (data) => {
    return async (dispatch) => {
        try {
            await updateDescription(data);
            dispatch(setNewDescription(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateColumnName = (data) => {
    return async (dispatch) => {
        try {
            await updateColumnNameService(data);
            dispatch(setNewColName(data));
        } catch (err) {
            console.log(err);
        }
    };
};

// ...
export const updateTaskContent = (data) => {
    return async (dispatch) => {
        try {
            await updateTaskContentService(data);
            dispatch(setNewColName(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateTaskPositions = (data) => {
    return async (dispatch) => {
        try {
            await updateTaskPositionService(data);
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateTwoColumnsPosition = (data) => {
    return async (dispatch) => {
        try {
            // update task column
            await updateTaskColumnService(data.taskColumnData);
            dispatch(updateTaskPositions(data.firstColumn));
            dispatch(updateTaskPositions(data.secondColumn));
        } catch (err) {
            console.log(err);
        }
    };
};

export const createTask = (data) => {
    return async (dispatch) => {
        try {
            const response = await createTaskService(data);
            const payload = {
                ...data,
                taskId: response.insertId,
            };
            dispatch(addTask(payload));
        } catch (err) {
            console.log(err);
        }
    };
};

export const {
    setUser,
    setNewPhoto,
    addTask,
    updateTaskCover,
    addColumn,
    setColumns,
    setNewColName,
    deleteColumn,
    addLabel,
    setBoards,
    setNewBoard,
    togglePrivacity,
    changeActualBoard,
    updateActualBoard,
    setNewDescription,
} = userSlice.actions;
export default userSlice.reducer;
