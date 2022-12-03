import React, {useEffect, useState} from 'react';
import OpenIconSpeedDial from "../../UI/OpenIconSpeedDial/OpenIconSpeedDial";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Box from "@mui/material/Box";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import {Grid, Typography, Stack, ListItem, ListItemText} from "@mui/material";
import CustomInput from "../../UI/CustomInput/CustomInput";
import TinyMce from "../../General/TinyMCE/TinyMCE";
import DialogWindow from "../../UI/DialogWindow/DialogWindow";
import api from "../../../Services/api";
import CustomButton from "../../UI/CustomButton/CustomButton";
import List from "@mui/material/List";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";

function PagesAdmin({isAuthorized}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogForConfirmCategory, setOpenDialogForConfirmCategory] = useState(false);
    const [openDialogCategory, setOpenDialogCategory] = useState(false);
    const [html, setHtml] = useState(``);
    const [categoriesRef, setCategoriesRef] = useState()
    const [chosenCategory, setChosenCategory] = useState("")
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState([]);
    const [idCategory, setIdCategory] = useState('')
    const [nameCategory, setNameCategory] = useState('')
    const [captionCategory, setCaptionCategory] = useState('')
    const [isEditCategory, setIsEditCategory] = useState(false);

    useEffect(() => {
        getCategoriesForPage().then((Categories) => {
            setCategories(Categories)
        });
        getPages().then((Pages) => {
            setPages(Pages)
        });
    }, [])

    const getCategoriesForPage = async () => {
        const {data: Categories} = await api.pages.getCategoryForPage()
        return Categories.results
    }

    const getPages = async () => {
        const {data: Pages} = await api.pages.getPages()
        return Pages.results
    }

    const deleteCategory = async () => {
        await api.pages.deleteCategoryForPage(idCategory)
        setOpenDialogForConfirmCategory(false)
        const {data: Categories} = await api.pages.getCategoryForPage()
        setCategories(Categories.results)
    }

    const functionCategoryForPage = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        if (isEditCategory) {
            await api.pages.updateCategoryForPage(idCategory, formData)
            setNameCategory('')
            setIdCategory('')
            setCaptionCategory('')
            setIsEditCategory(false)
        } else {
            await api.pages.addCategoryForPage(formData)
        }
        const {data: Categories} = await api.pages.getCategoryForPage()
        setCategories(Categories.results)
        setOpenDialogCategory(false)
    }

    async function addPage(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        formData.append("html", html)
        formData.append("category", chosenCategory)
        await api.pages.addPage(formData)
        const {data: Pages} = await api.pages.getPages()
        setPages(Pages.results)
        setOpenDialog(false)
    }


    return (
        <>
            <DialogWindow
                open={openDialogForConfirmCategory}
                maxWidth={'xs'}
                handleClose={() => {
                    setOpenDialogForConfirmCategory(false)
                    setIdCategory('')
                }}
                dialogTitle="Подтверждение удаления"
                content={
                    <Box sx={{p: 1, width: '100%'}}>
                        <Typography variant="body1" align={"justify"} gutterBottom>
                            Действительно ли Вы собираетесь удалить категорию страницы? Для подтверждения удаления
                            нажмите на
                            кнопку "Удалить".
                        </Typography>
                        <Stack sx={{mt: 3, float: "right"}} direction="row" spacing={2}>
                            <CustomButton onClick={deleteCategory} title={"Удалить"}/>
                            <CustomButton onClick={() => setOpenDialogForConfirmCategory(false)} title={"Отмена"}/>
                        </Stack>
                    </Box>
                }
            />
            <DialogWindow
                open={openDialogCategory}
                handleClose={() => {
                    setOpenDialogCategory(false)
                    setNameCategory('')
                    setIdCategory('')
                    setCaptionCategory('')
                    setIsEditCategory(false)
                }}
                fullWidth={true}
                maxWidth={'xs'}
                dialogTitle="Добавление категории"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <CustomAlert
                            severity="info"
                            title='Успешно!'
                            content='Информация!'
                            activeAlert={true}
                        />
                        <form onSubmit={functionCategoryForPage}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item sx={{width: '100%'}}>
                                    <CustomInput
                                        fullWidth='100%'
                                        required
                                        label="Название категории"
                                        type="text"
                                        helperText="Введите название категории"
                                        name="name"
                                        value={nameCategory}
                                        onChange={(event) => setNameCategory(event.target.value)}
                                    />
                                </Grid>
                                <Grid item sx={{width: '100%'}}>
                                    <CustomInput
                                        fullWidth='100%'
                                        required
                                        label="Описание категории"
                                        type="text"
                                        multiline
                                        helperText="Введите описание категории"
                                        name="caption"
                                        value={captionCategory}
                                        onChange={(event) => setCaptionCategory(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{width: "100%"}}>
                                    <Box sx={{float: "right"}}>
                                        <CustomButton type={'submit'}
                                                      title={isEditCategory ? "Сохранить" : "Добавить"}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                }
            />
            <DialogWindow
                fullScreen={true}
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                dialogTitle="Создание страницы"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <CustomAlert
                            severity="info"
                            title='Успешно!'
                            content='Информация!'
                            activeAlert={true}
                        />
                        <form encType="multipart/form-data" onSubmit={addPage}>
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
                                        />
                                    </Box>
                                    <Box sx={{m: 2}}>
                                        <CustomAutocomplete
                                            key={'autocomplete languages'}
                                            required={true}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(e, value) => setChosenCategory(value.id)}
                                            label='Категория страницы'
                                            helperText='Выберите категорию, к которой будет относиться страница'
                                            setRef={setCategoriesRef}
                                            options={categories}

                                            groupBy={(option)=>option.name[0].toUpperCase()}
                                        />
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

            <Box sx={{m: 4}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack>
                            <Typography variant="h5" gutterBottom>
                                Категории страниц
                            </Typography>
                            <List>
                                {
                                    categories?.map((category, index) =>
                                        <>
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={category.name}
                                                    secondary={category.caption}
                                                />
                                                <Stack spacing={1}>
                                                    <CustomIconButton
                                                        icon={<EditIcon/>}
                                                        caption="Нажмите для того, чтобы редактировать!"
                                                        functionIconButton={() => {
                                                            setIsEditCategory(true)
                                                            setOpenDialogCategory(true)
                                                            setIdCategory(category.id)
                                                            setNameCategory(category.name)
                                                            setCaptionCategory(category.caption)
                                                        }}/>
                                                    <CustomIconButton
                                                        icon={<DeleteIcon/>}
                                                        caption="Нажмите для того, чтобы удалить!"
                                                        functionIconButton={() => {
                                                            setOpenDialogForConfirmCategory(true)
                                                            setIdCategory(category.id)
                                                        }}/>
                                                </Stack>
                                            </ListItem>
                                            <hr/>
                                        </>
                                    )
                                }
                            </List>
                            <Box>
                                <Box sx={{float: "right"}}>
                                    <CustomButton
                                        onClick={() => setOpenDialogCategory(true)}
                                        title={"Добавить категорию"}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Stack>
                            <Typography variant="h5" gutterBottom>
                                Страницы
                            </Typography>
                            <List>
                                {
                                    pages?.map((page, index) =>
                                        <>
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={page.name}
                                                    secondary={page.caption}
                                                />
                                                <Stack spacing={1}>
                                                    <CustomIconButton
                                                        icon={<EditIcon/>}
                                                        caption="Нажмите для того, чтобы редактировать!"
                                                        functionIconButton={() => {
                                                            setIsEditCategory(true)
                                                            setOpenDialogCategory(true)
                                                            setIdCategory(page.id)
                                                            setNameCategory(page.name)
                                                            setCaptionCategory(page.caption)
                                                        }}/>
                                                    <CustomIconButton
                                                        icon={<DeleteIcon/>}
                                                        caption="Нажмите для того, чтобы удалить!"
                                                        functionIconButton={() => {
                                                            setOpenDialogForConfirmCategory(true)
                                                            setIdCategory(page.id)
                                                        }}/>
                                                </Stack>
                                            </ListItem>
                                            <hr/>
                                        </>
                                    )
                                }
                            </List>
                            <Box>
                                <Box sx={{float: "right"}}>
                                    <CustomButton
                                        onClick={() => setOpenDialog(true)}
                                        title={"Добавить страницу"}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default PagesAdmin