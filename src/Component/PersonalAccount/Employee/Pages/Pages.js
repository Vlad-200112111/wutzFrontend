import React, {useEffect, useState} from 'react';
import OpenIconSpeedDial from "../../../UI/OpenIconSpeedDial/OpenIconSpeedDial";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CustomDialogWindow from "../../../UI/CustomDialogWindow/CustomDialogWindow";
import AddCategoryPage from "./CategoryPage/AddCategoryPage";
import AddPage from "./Page/AddPage";
import api from "../../../../Services/api";
import {Grid} from "@mui/material";
import CustomCard from "../../../UI/CustomCard/CustomCard";

function Pages({}) {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [hiddenSpeedDial, setHiddenSpeedDial] = useState(false);
    const [titleDialog, setTitleDialog] = useState("");
    const [openDialogWindow, setOpenDialogWindow] = useState(false);
    const [fullScreenDialogWindow, setFullScreenDialogWindow] = useState(false);
    const [contentDialogWindow, setContentDialogWindow] = useState();
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getPages().then((Pages) => {
            setPages(Pages)
        });
    }, [])

    const getPages = async () => {
        const {data: Pages} = await api.pages.getPages()
        return Pages.results
    }


    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
    };

    const handleCloseSpeedDial = () => {
        setOpenSpeedDial(false);
    };

    const handleOpenDialogWindowForAddCategoryPage = () => {
        setContentDialogWindow(<AddCategoryPage
            setOpenDialogWindow={setOpenDialogWindow}
            setOpenSpeedDial={setOpenSpeedDial}/>);

        setFullScreenDialogWindow(false);
        setTitleDialog("Добавить категорию страниц");
        setOpenDialogWindow(true);
    }

    const handleOpenDialogWindowForAddPage = () => {
        setContentDialogWindow(<AddPage
            setOpenDialogWindow={setOpenDialogWindow}
            setOpenSpeedDial={setOpenSpeedDial}/>);

        setFullScreenDialogWindow(true);
        setTitleDialog("Добавить страницу");
        setOpenDialogWindow(true);
    }

    const actionsSpeedDial = [
        {
            name: "Добавить категорию страниц",
            icon: <AddCircleOutlineIcon/>,
            onClick: handleOpenDialogWindowForAddCategoryPage
        },
        {
            name: "Добавить страницу",
            icon: <AddToPhotosIcon/>,
            onClick: handleOpenDialogWindowForAddPage
        },
    ]

    return (
        <div>
            <CustomDialogWindow
                fullScreen={fullScreenDialogWindow}
                dialogTitle={titleDialog}
                open={openDialogWindow}
                handleClose={() => {
                    setOpenDialogWindow(false)
                }}
                content={contentDialogWindow}
            />
            <OpenIconSpeedDial
                open={openSpeedDial}
                hidden={hiddenSpeedDial}
                handleClose={handleCloseSpeedDial}
                handleOpen={handleOpenSpeedDial}
                actions={actionsSpeedDial}/>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={3}>

                {
                    pages?.map((page, index) =>
                        <Grid item xs={12} xl={3} md={6}>
                            <CustomCard
                                key={index}
                                title={page.name}
                                content={page.caption}
                                buttons={""}
                            />
                        </Grid>
                    )
                }

            </Grid>
        </div>
    );
}

export default Pages;