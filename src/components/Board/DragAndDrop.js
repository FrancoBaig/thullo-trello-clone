import React from "react";

// DND
import { DragDropContext } from "react-beautiful-dnd";

// MUI
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Components
import AddColumn from "./AddColumn";
import Column from "./Column";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
    updateActualBoard,
    updateTaskPositions,
    updateTwoColumnsPosition,
} from "../../features/User/userSlice";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = [...sourceCol.taskIds];
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
        ...sourceCol,
        taskIds: newTaskIds,
    };

    return newColumn;
};

function DragAndDrop() {
    const dispatch = useDispatch();
    const actualBoard = useSelector((state) => state.user.actualBoard);
    const loading = useSelector((state) => state.helper.loading.board);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        // if user tries to drop in an unknown position
        if (!destination) return;

        // if user drags and drops back in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // if user drops within the same column but in a different position
        const sourceCol = actualBoard.columns[source.droppableId];
        const destinationCol = actualBoard.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(
                sourceCol,
                source.index,
                destination.index
            );

            const data = [
                { idColumn: newColumn.id },
                newColumn.taskIds.map((el) => {
                    return {
                        taskId: el,
                        position: newColumn.taskIds.indexOf(el) + 1,
                    };
                }),
            ];

            dispatch(updateTaskPositions(data));

            const newState = {
                ...actualBoard,
                columns: {
                    ...actualBoard.columns,
                    [newColumn.id]: newColumn,
                },
            };

            dispatch(updateActualBoard(newState));
            return;
        }

        // if user moves from one column to another
        const startTaskIds = [...sourceCol.taskIds];
        const [removed] = startTaskIds.splice(source.index, 1);
        const newStartCol = {
            ...sourceCol,
            taskIds: startTaskIds,
        };

        const endTaskIds = [...destinationCol.taskIds];

        endTaskIds.splice(destination.index, 0, removed);

        const newEndCol = {
            ...destinationCol,
            taskIds: endTaskIds,
        };

        // change idtask
        const taskColumnData = {
            idColumn: newEndCol.id,
            idTask: removed,
        };

        // new first column
        const firstColumn = [
            { idColumn: newStartCol.id },
            newStartCol.taskIds.map((el) => {
                return {
                    taskId: el,
                    position: newStartCol.taskIds.indexOf(el) + 1,
                };
            }),
        ];

        // new end column
        const secondColumn = [
            { idColumn: newEndCol.id },
            newEndCol.taskIds.map((el) => {
                return {
                    taskId: el,
                    position: newEndCol.taskIds.indexOf(el) + 1,
                };
            }),
        ];

        const data = {
            taskColumnData: taskColumnData,
            firstColumn: firstColumn,
            secondColumn: secondColumn,
        };

        const newState = {
            ...actualBoard,
            columns: {
                ...actualBoard.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        };

        dispatch(updateTwoColumnsPosition(data));

        dispatch(updateActualBoard(newState));
    };

    return (
        <>
            {loading ? (
                <Box>
                    <Skeleton
                        variant="rectangular"
                        height={"70vh"}
                        sx={{ mt: "2rem" }}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        backgroundColor: "#f8f9fd",
                        borderRadius: "24px",
                        mt: "2rem",
                        padding: "1.5rem 2.5rem",
                        minHeight: "70vh",
                    }}
                >
                    <Stack direction="row" spacing={3}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {actualBoard.columnOrder.map((columnId) => {
                                const id = parseInt(columnId);
                                const column = actualBoard.columns[id];
                                const tasks = column.taskIds.map(
                                    (taskId) => actualBoard.tasks[taskId]
                                );

                                return (
                                    <Column
                                        key={column.id}
                                        column={column}
                                        tasks={tasks}
                                        state={actualBoard}
                                    />
                                );
                            })}
                        </DragDropContext>
                        <AddColumn />
                    </Stack>
                </Box>
            )}
        </>
    );
}

export default DragAndDrop;
