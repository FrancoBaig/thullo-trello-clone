import React from "react";

// components
import TogglePrivate from "../TogglePrivate";
import CustomAddButton from "../CustomAddButton";
import ProfilePhoto from "../../ProfilePhoto";

// Redux
import { useSelector } from "react-redux";

// MUI
import Stack from "@mui/material/Stack";

function AddMember() {
    const members = useSelector((state) => state.user.actualBoard.members);
    return (
        <Stack direction="row" spacing={2}>
            <TogglePrivate />

            <Stack direction="row" spacing={1}>
                {members.map((member, index) => (
                    <ProfilePhoto upploadedImage={member.imgUrl} key={index} />
                ))}
            </Stack>

            <CustomAddButton size={"large"} />
        </Stack>
    );
}

export default AddMember;
