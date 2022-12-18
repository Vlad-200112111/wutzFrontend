import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../Services/api";
import DialogWindow from "../../UI/DialogWindow/DialogWindow";
import {Box, FormControlLabel, Grid, Stack, Switch, Typography} from "@mui/material";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import CustomInput from "../../UI/CustomInput/CustomInput";
import TinyMce from "../TinyMCE/TinyMCE";
import CustomButton from "../../UI/CustomButton/CustomButton";
import ReactToPrint from "react-to-print";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";

function Pages({isAuthorized}) {
    const params = useParams();
    const idPage = params.id;

    const navigate = useNavigate();

    const [page, setPage] = useState('')
    const [html, setHtml] = useState('');
    const [checked, setChecked] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [chosenCategory, setChosenCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [namePage, setNamePage] = useState('')
    const [captionPage, setCaptionPage] = useState('')
    const [openDialogForConfirm, setOpenDialogForConfirm] = useState(false);

    const getCategoriesForPage = async () => {
        const {data: Categories} = await api.pages.getCategoryForPage()
        return Categories.results
    }

    const getPage = async () => {
        const {data: Page} = await api.pages.getPage(idPage)
        return Page
    }

    useEffect(() => {
        getPage().then((Page) => {
            setNamePage(Page.name)
            setCaptionPage(Page.caption)
            setPage(Page)
            setHtml(Page.html)
            setChecked(Page.is_download)
        })
        getCategoriesForPage().then((Categories) => {
            setCategories(Categories)
        });
    }, [idPage])

    const openDialogForEditing = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const editPage = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        formData.append("html", html)
        formData.append("category", chosenCategory)
        formData.append("is_download", checked)
        await api.pages.updatePage(idPage, formData)
        getPage().then((Page) => setPage(Page))
        setOpenDialog(false)
    }

    const deleteItem = async () => {
        await api.pages.deletePage(idPage)
        navigate(`/pages`);
    }

    return (
        <>
            <DialogWindow
                open={openDialogForConfirm}
                maxWidth={'xs'}
                handleClose={() => {
                    setOpenDialogForConfirm(false)
                }}
                dialogTitle="Подтверждение удаления"
                content={
                    <Box sx={{p: 1, width: '100%'}}>
                        <Typography variant="body1" align={"justify"} gutterBottom>
                            Действительно ли Вы собираетесь удалить? Для подтверждения удаления
                            нажмите на
                            кнопку "Удалить".
                        </Typography>
                        <Stack sx={{mt: 3, float: "right"}} direction="row" spacing={2}>
                            <CustomButton onClick={deleteItem} title={"Удалить"}/>
                            <CustomButton
                                onClick={() => {
                                    setOpenDialogForConfirm(false)
                                }}
                                title={"Отмена"}/>
                        </Stack>
                    </Box>
                }
            />
            <DialogWindow
                fullScreen={true}
                open={openDialog}
                handleClose={handleCloseDialog}
                fullWidth={true}
                dialogTitle="Редактирование страницы"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <CustomAlert
                            severity="info"
                            title='Успешно!'
                            content='Информация!'
                            activeAlert={true}
                        />
                        <form encType="multipart/form-data" onSubmit={editPage}>
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
                                            label="Название страницы"
                                            type="text"
                                            helperText="Введите название страницы"
                                            name="name"
                                            value={namePage}
                                            onChange={(event) => setNamePage(event.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{m: 2}}>
                                        <CustomInput
                                            fullWidth='100%'
                                            multiline
                                            required
                                            label="Описание страницы"
                                            type="text"
                                            helperText="Введите описание страницы"
                                            name="caption"
                                            value={captionPage}
                                            onChange={(event) => setCaptionPage(event.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{m: 2}}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={3}
                                        >
                                            <Grid item xs={10} xl={10} md={10}>
                                                <CustomAutocomplete
                                                    key={'autocomplete'}
                                                    required={true}
                                                    getOptionLabel={(option) => option.name}
                                                    onChange={(e, value) => setChosenCategory(value.id)}
                                                    label='Категория страницы'
                                                    helperText='Выберите категорию, к которой будет относиться страница'
                                                    options={categories}
                                                    groupBy={(option) => option.name[0].toUpperCase()}
                                                />
                                            </Grid>
                                            <Grid item xs={2} xl={2} md={2}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={checked}
                                                            onChange={() => setChecked(!checked)}
                                                            defaultChecked
                                                        />}
                                                    label="Разрешить в PDF"/>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} xl={9} md={12}>
                                    <Box sx={{m: 2}}>
                                        <TinyMce
                                            html={html}
                                            setHtml={setHtml}
                                            showButtonForForm={true}
                                            titleButton={"Сохранить"}/>
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
                            {page.name}
                        </Typography>
                        <div id="htmlForPDF">
                            <div dangerouslySetInnerHTML={{__html: page.html}}/>
                        </div>
                    </Grid>
                    {
                        isAuthorized &&
                        (
                            <Grid item xs={12} sx={{width: "100%"}}>
                                <Box sx={{float: "right", display: 'flex !important'}}>
                                    <Box sx={{m: 1}}>
                                        <CustomButton
                                            onClick={openDialogForEditing}
                                            title={"Редактировать"}
                                        />
                                    </Box>
                                    <Box sx={{m: 1}}>
                                        <CustomButton
                                            onClick={() => setOpenDialogForConfirm(true)}
                                            title={"Удалить"}
                                        />
                                    </Box>
                                    <Box sx={{m: 1}}>
                                        {
                                            checked && (
                                                <ReactToPrint
                                                    trigger={() =>
                                                        <Box sx={{
                                                            background: '#395fb6',
                                                            width: '100%',
                                                            borderRadius: '0 !important',
                                                            cursor: 'pointer',
                                                            color: '#fff',
                                                            border: '2px solid #fff',
                                                            padding: 1,
                                                            textAlign: 'center',
                                                        }}
                                                             variant="contained">
                                                            Отобразить в PDF
                                                        </Box>
                                                    }
                                                    content={() => document.getElementById('htmlForPDF')}
                                                />
                                            )
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </>
    );
}

export default Pages;