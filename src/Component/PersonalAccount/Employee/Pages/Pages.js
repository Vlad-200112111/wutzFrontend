import React, {useState} from 'react';
import OpenIconSpeedDial from "../../../UI/OpenIconSpeedDial/OpenIconSpeedDial";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CustomDialogWindow from "../../../UI/CustomDialogWindow/CustomDialogWindow";
import AddCategoryPage from "./CategoryPage/AddCategoryPage";

function Pages({}) {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [hiddenSpeedDial, setHiddenSpeedDial] = useState(false);
    const [titleDialog, setTitleDialog] = useState("");
    const [openDialogWindow, setOpenDialogWindow] = useState(false);
    const [fullScreenDialogWindow, setFullScreenDialogWindow] = useState(false);
    const [contentDialogWindow, setContentDialogWindow] = useState("");

    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
    };

    const handleCloseSpeedDial = () => {
        setOpenSpeedDial(false);
    };

    const handleOpenDialogWindow = () => {
        setOpenDialogWindow(true);
    }

    const actionsSpeedDial = [
        {
            name: "Добавить категорию страниц",
            icon: <AddCircleOutlineIcon/>,
            onClick: handleOpenDialogWindow
        },
        {
            name: "Добавить страницу",
            icon: <AddToPhotosIcon/>,
            onClick: handleOpenDialogWindow
        },
    ]

    return (
        <div>
            <CustomDialogWindow
                fullScreen={fullScreenDialogWindow}
                dialogTitle={titleDialog}
                open={openDialogWindow}
                handleClose={()=>{setOpenDialogWindow(false)}}
                content={contentDialogWindow}
            />
            <OpenIconSpeedDial
                open={openSpeedDial}
                hidden={hiddenSpeedDial}
                handleClose={handleCloseSpeedDial}
                handleOpen={handleOpenSpeedDial}
                actions={actionsSpeedDial}/>
        </div>
    );
}

export default Pages;