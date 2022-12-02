import React, {useState} from 'react';
import OpenIconSpeedDial from "../../UI/OpenIconSpeedDial/OpenIconSpeedDial";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Box from "@mui/material/Box";
import DialogWindow from "../../UI/DialogWindow/DialogWindow";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import {Grid} from "@mui/material";
import CustomInput from "../../UI/CustomInput/CustomInput";
import TinyMce from "../../General/TinyMCE/TinyMCE";


function News() {
    const [openDialog, setOpenDialog] = useState(false);
    const [html, setHtml] = useState(``);

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <>
            <DialogWindow
                fullScreen={true}
                open={openDialog}
                handleClose={handleCloseDialog}
                dialogTitle="Создание новости"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <CustomAlert
                            severity="info"
                            title='Успешно!'
                            content='Информация!'
                            activeAlert={true}
                        />
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <Grid item xs={12} xl={3} md={12}>
                                <Box sx={{m: 2}}>
                                    <CustomInput
                                        fullWidth='100%'
                                        required
                                        label="Название новости"
                                        type="text"
                                        helperText="Введите название новости"
                                        name="name"
                                    />
                                </Box>
                                <Box sx={{m: 2}}>
                                    <CustomInput
                                        fullWidth='100%'
                                        multiline
                                        required
                                        label="Краткое описание новости"
                                        type="text"
                                        helperText="Введите краткое описание новости"
                                        name="name"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} xl={9} md={12}>
                                <Box sx={{m: 2}}>
                                    <TinyMce setHtml={setHtml}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                }
            />
            <OpenIconSpeedDial
                functionOpenIconSpeedDial={handleOpenDialog}
                speedDialIcon={<PlaylistAddIcon/>}/>
        </>
    );
}

export default News;