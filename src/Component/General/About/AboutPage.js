import React, {useEffect, useState} from 'react';
import {Grid, Box, Typography} from "@mui/material";
import CustomButton from "../../UI/CustomButton/CustomButton";
import DialogWindow from "../../UI/DialogWindow/DialogWindow";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import CustomInput from "../../UI/CustomInput/CustomInput";
import TinyMce from "../TinyMCE/TinyMCE";
import api from "../../../Services/api";

function AboutPage({isAuthorized}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [html, setHtml] = useState('');
    const [mainInfo, setMainInfo] = useState('')

    useEffect(() => {
        getMainInfo().then((MainInfo) => setMainInfo(MainInfo))
    }, [])

    const getMainInfo = async () => {
        const {data: MainInfo} = await api.mainInfo.getMainInfo()
        return MainInfo
    }

    const openDialogForEditing = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const editMainInfo = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        formData.append('html', html);
        const {data: answer} = await api.mainInfo.updateMainInfo(formData)
        setMainInfo(answer);
        setOpenDialog(false);
    }

    return (
        <>
            <DialogWindow
                fullScreen={true}
                open={openDialog}
                handleClose={handleCloseDialog}
                fullWidth={true}
                dialogTitle="Редактирование страницы о ВУЦ"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <CustomAlert
                            severity="info"
                            title='Успешно!'
                            content='Информация!'
                            activeAlert={true}
                        />
                        <form encType="multipart/form-data" onSubmit={editMainInfo}>
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
                                            value={mainInfo.name}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} xl={9} md={12}>
                                    <Box sx={{m: 2}}>
                                        <TinyMce
                                            html={mainInfo.html}
                                            setHtml={setHtml}
                                            showButtonForForm={true}
                                            titleButton="Сохранить изменения"/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                }
            />
            <Box sx={{p: 4}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            {mainInfo.name}
                        </Typography>
                        <div dangerouslySetInnerHTML={{__html: mainInfo.html}}/>
                    </Grid>
                    {
                        isAuthorized &&
                        (
                            <Grid item xs={12} sx={{width: "100%"}}>
                                <Box sx={{float: "right"}}>
                                    <CustomButton
                                        onClick={openDialogForEditing}
                                        title={"Редактировать"}
                                    />
                                </Box>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </>

    );
}

export default AboutPage;