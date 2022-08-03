import { createSlice } from "@reduxjs/toolkit";
import { loginService, signupService } from "../../services/register";
import { sendPhoto } from "../../services/cloudinary";
import {
    getUserBoards,
    getBoardColumns,
    createBoard,
    createTaskService,
    insertLabelService,
    updateDescription,
    updateTaskPositionService,
    updateTaskColumnService,
    updateTaskContentService,
    updateTaskDescriptionService,
    updateTaskCoverService,
    updateColumnNameService,
    assignBoardToUserService,
    updateBoardPrivacityService,
    createColumn,
    deleteColumnService,
    deleteUserHasBoardService,
    getAllUsers,
} from "../../services/data";
import {
    setLoadingLogin,
    setLoadingBoard,
    setLoginError,
    setSignupSuccess,
} from "./helperSlice";

const initialState = {
    user: {
        name: "",
        email: "",
        token: "",
        img_id: "",
    },
    data: {},
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
        setUserToBoard(state, action) {
            const data = action.payload;

            delete data[0].boardId;

            return {
                ...state,
                actualBoard: {
                    ...state.actualBoard,
                    members: [...data],
                },
            };
        },
        removeMember(state, action) {
            const data = action.payload;

            const filtered = state.actualBoard.members.filter(
                (el) => el.userId !== data
            );

            return {
                ...state,
                actualBoard: {
                    ...state.actualBoard,
                    members: filtered,
                },
            };
        },
        addTask(state, action) {
            const { content, taskId, position, idColumn } = action.payload;

            const newCard = {
                id: taskId,
                content: content,
                description: "",
                url_cover: null,
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
        setUpdatedTask(state, action) {
            const newTask = action.payload;

            const newTasks = {
                ...state.actualBoard.tasks,
                [newTask.id]: newTask,
            };

            const newBoard = {
                ...state.actualBoard,
                tasks: newTasks,
            };

            return {
                ...state,
                actualBoard: newBoard,
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
                        description: t.description,
                        labels: t.labels || [],
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
            const data = action.payload;

            // Get columns without column -> newList
            const { [data.id]: remove, ...newList } = state.actualBoard.columns;

            // Get columnOrder without column.id -> result
            const array = state.actualBoard.columnOrder;
            const id = data.id.toString();
            const index = array.indexOf(id);
            const result = array.slice(0, index).concat(array.slice(index + 1));

            // New board
            const newBoard = {
                ...state.actualBoard,
                columnOrder: result,
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
            const { task, text, color } = action.payload;

            const newLabel = {
                text: text,
                color: color,
            };

            const newTask = {
                ...task,
                labels: [...task.labels, newLabel],
            };

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
                        isPrivate: board.isPrivate,
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
                admins: [state.user],
                columnOrder: [],
                columns: {},
                isPrivate: boardData.isPrivate,
                members: [],
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
        dispatch(setLoadingLogin(true));

        const response = await loginService(data);

        if (response.data.status === "error") {
            const message = response.data.error;
            dispatch(setLoginError(message));
        } else {
            const userData = response.data.data;
            dispatch(setUser(userData));
            const token = userData.token;
            dispatch(initialBoards(token));
        }

        dispatch(setLoadingLogin(false));
    };
};

export const signUpUser = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingLogin(true));
        const response = await signupService(data);

        if (response.data.status === "error") {
            const message = response.data.error;
            dispatch(setLoginError(message));
        } else {
            dispatch(setSignupSuccess(true));
        }

        dispatch(setLoadingLogin(false));
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
        dispatch(setLoadingBoard(true));

        const response = await getBoardColumns(boardId);
        const data = {
            boardId: boardId,
            columns: response,
        };
        dispatch(setColumns(data));
        dispatch(getAllUsersFromBoard(boardId));

        dispatch(setLoadingBoard(false));
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

export const updateTask = (newTask, columnId, mode) => {
    let data = {
        idTask: newTask.id,
        idColumn: columnId,
    };

    return async (dispatch) => {
        switch (mode.toLowerCase()) {
            case "content":
                try {
                    data = {
                        ...data,
                        newContent: newTask.content,
                    };
                    await updateTaskContentService(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "description":
                try {
                    data = {
                        ...data,
                        newDescription: newTask.description,
                    };
                    await updateTaskDescriptionService(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "cover":
                try {
                    data = {
                        ...data,
                        newCoverUrl: newTask.url_cover,
                    };
                    await updateTaskCoverService(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            default:
                return;
        }

        dispatch(setUpdatedTask(newTask));
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

export const deleteColumnAndTask = (data) => {
    return async (dispatch) => {
        try {
            await deleteColumnService(data);
            dispatch(deleteColumn(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateBoardPrivacity = (data) => {
    return async (dispatch) => {
        try {
            await updateBoardPrivacityService(data);
            dispatch(togglePrivacity());
        } catch (err) {
            console.log(err);
        }
    };
};

export const assignBoardToUser = (data) => {
    return async (dispatch) => {
        try {
            await assignBoardToUserService(data.user);

            const users = await getAllUsers(data.boardId);

            dispatch(setUserToBoard(users));
        } catch (err) {
            console.log(err);
        }
    };
};

export const getAllUsersFromBoard = (boardId) => {
    return async (dispatch) => {
        try {
            const users = await getAllUsers(boardId);
            dispatch(setUserToBoard(users));
        } catch (err) {
            console.log(err);
        }
    };
};

export const deleteUserHasBoard = (data) => {
    return async (dispatch) => {
        try {
            await deleteUserHasBoardService(data);
            dispatch(removeMember(data.userId));
        } catch (err) {
            console.log(err);
        }
    };
};

export const insertLabel = (data) => {
    return async (dispatch) => {
        try {
            await insertLabelService(data);
            dispatch(addLabel(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const {
    setUser,
    setNewPhoto,
    addTask,
    setUpdatedTask,
    updateTaskCover,
    addColumn,
    setColumns,
    setNewColName,
    setUserToBoard,
    deleteColumn,
    addLabel,
    setBoards,
    setNewBoard,
    togglePrivacity,
    changeActualBoard,
    updateActualBoard,
    setNewDescription,
    removeMember,
} = userSlice.actions;
export default userSlice.reducer;
