import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const initialData = {
    tasks: {
        "task-1": { id: "task-1", content: "take out the garbage" },
        "task-2": { id: "task-2", content: "Watch my favorite show" },
        "task-3": { id: "task-3", content: "Charge my phone" },
        "task-4": { id: "task-4", content: "Cook dinner" },
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To do",
            taskIds: ["task-1", "task-2", "task-3", "task-4"],
        },
        "column-2": {
            id: "column-2",
            title: "Doing",
            taskIds: [],
        },
        "column-3": {
            id: "column-3",
            title: "Done",
            taskIds: [],
        },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
};

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
    const [state, setState] = useState(initialData);

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
        const sourceCol = state.columns[source.droppableId];
        const destinationCol = state.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(
                sourceCol,
                source.index,
                destination.index
            );

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
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

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        };

        setState(newState);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f8f9fd",
                borderRadius: "24px",
                mt: "2rem",
                padding: "1.5rem 2.5rem",
            }}
        >
            <Stack direction="row" spacing={3}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.columnOrder.map((columnId) => {
                        const column = state.columns[columnId];
                        const tasks = column.taskIds.map(
                            (taskId) => state.tasks[taskId]
                        );

                        return (
                            <Column
                                key={column.id}
                                column={column}
                                tasks={tasks}
                                state={state}
                                setState={setState}
                            />
                        );
                    })}
                </DragDropContext>
            </Stack>
        </Box>
    );
}

export default DragAndDrop;
