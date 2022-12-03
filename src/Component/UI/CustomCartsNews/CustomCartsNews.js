import React, {useState} from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import "./CustomCartsNews.css"
import CustomIconButton from "../CustomIconButton/CustomIconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogWindow from "../DialogWindow/DialogWindow";
import CustomButton from "../CustomButton/CustomButton";
import api from "../../../Services/api";

function CustomCartsNews({id, url, title, description, key, isAuthorized, setNews}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false)
    };

    const deleteItem = async () => {
        await api.news.deleteNews(id)
        setOpenDialog(false)
        const {data: News} = await api.news.getNewsByLimit(5)
        setNews(News.results)
    }

    return (
        <>
            <DialogWindow
                open={openDialog}
                maxWidth={'xs'}
                handleClose={handleCloseDialog}
                dialogTitle="Подтверждение удаления"
                content={
                    <Box sx={{p: 1, width: '100%'}}>
                        <Typography variant="body1" align={"justify"} gutterBottom>
                            Действительно ли Вы собираетесь удалить новость? Для подтверждения удаления нажмите на
                            кнопку "Удалить".
                        </Typography>
                        <Stack sx={{mt:3, float: "right"}} direction="row" spacing={2}>
                            <CustomButton onClick={deleteItem} title={"Удалить"}/>
                            <CustomButton onClick={() => setOpenDialog(false)} title={"Отмена"}/>
                        </Stack>
                    </Box>
                }
            />
            <Box key={key} className="cart">
                <Typography sx={{ml: 2}} variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Box className="cart-item">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Grid item xs={4}>
                            <img className="cart-image" src={url}/>
                            {/*<div className="cart-image" style={{backgroundImage: `url(${url})`}}/>*/}
                        </Grid>
                        <Grid item xs={isAuthorized ? 7.5 : 8}>
                            <div style={{marginBottom: 25}}>
                                <Typography className="cart-description" variant="body1" gutterBottom>
                                    {description}
                                </Typography>
                            </div>
                        </Grid>
                        {
                            isAuthorized && (
                                <Grid item xs={0.5}>
                                    <Stack spacing={2}>
                                        <CustomIconButton
                                            icon={<EditIcon/>}
                                            caption="Нажмите для того, чтобы редактировать!"
                                            functionIconButton={() => console.log('d')}/>
                                        <CustomIconButton
                                            icon={<DeleteIcon/>}
                                            caption="Нажмите для того, чтобы удалить!"
                                            functionIconButton={() => setOpenDialog(true)}/>
                                    </Stack>
                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default CustomCartsNews;