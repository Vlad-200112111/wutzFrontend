import React, {useEffect, useState} from 'react';
import OpenIconSpeedDial from "../../UI/OpenIconSpeedDial/OpenIconSpeedDial";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Box from "@mui/material/Box";
import DialogWindow from "../../UI/DialogWindow/DialogWindow";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import {Grid} from "@mui/material";
import CustomInput from "../../UI/CustomInput/CustomInput";
import TinyMce from "../../General/TinyMCE/TinyMCE";
import CustomInputFile from "../../UI/CustomInputFile/CustomInputFile";
import api from "../../../Services/api";
import News from "../../General/MainPage/Items/News/News";


function NewsAdmin({isAuthorized}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [html, setHtml] = useState(``);
    const [news, setNews] = useState([])

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getNews = async (limit) => {
        const {data: News} = await api.news.getNewsByLimit(limit)
        return News.results
    }

    async function addNews(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        formData.append("html", html)
        console.log(formData.get("html"));
        await api.news.addNews(formData)
        // setOpenDialog(false)
    }

    useEffect(() => {
        getNews(5).then((News) => setNews(News));
    }, [])

    console.log(news)

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
                        <form encType="multipart/form-data" onSubmit={addNews}>
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
                                            name="caption"
                                        />
                                    </Box>
                                    <Box sx={{m: 2}}>
                                        <CustomInputFile name="url_image"/>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} xl={9} md={12}>
                                    <Box sx={{m: 2}}>
                                        <TinyMce setHtml={setHtml} showButtonForForm={true} titleButton="Добавить"/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                }
            />
            <OpenIconSpeedDial
                functionOpenIconSpeedDial={handleOpenDialog}
                speedDialIcon={<PlaylistAddIcon/>}/>
            <Box sx={{m: 4}}>
                <News setNews={setNews} data={news} isAuthorized={isAuthorized}/>
            </Box>
        </>
    );
}

export default NewsAdmin;