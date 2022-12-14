import React, {useEffect, useState} from 'react';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import Box from "@mui/material/Box";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import {Grid, Typography, Stack, ListItem, ListItemText, FormControlLabel, Switch} from "@mui/material";
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
import {useNavigate} from "react-router-dom";

function PagesAdmin({isAuthorized}) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogForConfirm, setOpenDialogForConfirm] = useState(false);
    const [openDialogCategory, setOpenDialogCategory] = useState(false);
    const [html, setHtml] = useState(``);
    const [categoriesRef, setCategoriesRef] = useState()
    const [checked, setChecked] = React.useState(false);
    const [chosenCategory, setChosenCategory] = useState("")
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState([]);
    const [idCategory, setIdCategory] = useState('')
    const [nameCategory, setNameCategory] = useState('')
    const [captionCategory, setCaptionCategory] = useState('')
    const [idPage, setIdPage] = useState('')
    const [namePage, setNamePage] = useState('')
    const [captionPage, setCaptionPage] = useState('')
    const [categoryPage, setCategoryPage] = useState('')
    const [htmlPage, setHtmlPage] = useState('')
    const [isEditCategory, setIsEditCategory] = useState(false);
    const [isEditPage, setIsEditPage] = useState(false);
    const [confirmDeletePage, setConfirmDeletePage] = useState(false);

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

    const deleteItem = async () => {
        if (confirmDeletePage) {
            await api.pages.deletePage(idPage)
            const {data: Pages} = await api.pages.getPages()
            setPages(Pages.results)
        } else {
            await api.pages.deleteCategoryForPage(idCategory)
            const {data: Categories} = await api.pages.getCategoryForPage()
            setCategories(Categories.results)
        }
        setConfirmDeletePage(false)
        setOpenDialogForConfirm(false)
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

    async function functionPage(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        formData.append("html", html)
        formData.append("category", chosenCategory)
        formData.append("is_download", checked)
        if (isEditPage) {
            await api.pages.updatePage(idPage, formData)
            setNamePage('')
            setIdPage('')
            setCaptionPage('')
            setHtmlPage('')
            setChecked(false)
            setCategoryPage('')
            setIsEditPage(false)
        } else {
            await api.pages.addPage(formData)
        }
        const {data: Pages} = await api.pages.getPages()
        setPages(Pages.results)
        setOpenDialog(false)
    }

    return (
        <>
            <DialogWindow
                open={openDialogForConfirm}
                maxWidth={'xs'}
                handleClose={() => {
                    setOpenDialogForConfirm(false)
                    setIdCategory('')
                    setIdPage('')
                    setConfirmDeletePage(false)
                }}
                dialogTitle="?????????????????????????? ????????????????"
                content={
                    <Box sx={{p: 1, width: '100%'}}>
                        <Typography variant="body1" align={"justify"} gutterBottom>
                            ?????????????????????????? ???? ???? ?????????????????????? ??????????????? ?????? ?????????????????????????? ????????????????
                            ?????????????? ????
                            ???????????? "??????????????".
                        </Typography>
                        <Stack sx={{mt: 3, float: "right"}} direction="row" spacing={2}>
                            <CustomButton onClick={deleteItem} title={"??????????????"}/>
                            <CustomButton
                                onClick={() => {
                                    setOpenDialogForConfirm(false)
                                    setConfirmDeletePage(false)
                                }}
                                title={"????????????"}/>
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
                dialogTitle="???????????????????? ??????????????????"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <CustomAlert
                            severity="info"
                            title='??????????????!'
                            content='????????????????????!'
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
                                        label="???????????????? ??????????????????"
                                        type="text"
                                        helperText="?????????????? ???????????????? ??????????????????"
                                        name="name"
                                        value={nameCategory}
                                        onChange={(event) => setNameCategory(event.target.value)}
                                    />
                                </Grid>
                                <Grid item sx={{width: '100%'}}>
                                    <CustomInput
                                        fullWidth='100%'
                                        required
                                        label="???????????????? ??????????????????"
                                        type="text"
                                        multiline
                                        helperText="?????????????? ???????????????? ??????????????????"
                                        name="caption"
                                        value={captionCategory}
                                        onChange={(event) => setCaptionCategory(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{width: "100%"}}>
                                    <Box sx={{float: "right"}}>
                                        <CustomButton type={'submit'}
                                                      title={isEditCategory ? "??????????????????" : "????????????????"}/>
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
                handleClose={() => {
                    setNamePage('')
                    setIdPage('')
                    setCaptionPage('')
                    setHtmlPage('')
                    setCategoryPage('')
                    setIsEditPage(false)
                    setChecked(false)
                    setOpenDialog(false)
                }}
                dialogTitle="???????????????? ????????????????"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <CustomAlert
                            severity="info"
                            title='??????????????!'
                            content='????????????????????!'
                            activeAlert={true}
                        />
                        <form encType="multipart/form-data" onSubmit={functionPage}>
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
                                            label="???????????????? ????????????????"
                                            type="text"
                                            helperText="?????????????? ???????????????? ????????????????"
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
                                            label="???????????????? ????????????????"
                                            type="text"
                                            helperText="?????????????? ???????????????? ????????????????"
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
                                                    label='?????????????????? ????????????????'
                                                    helperText='???????????????? ??????????????????, ?? ?????????????? ?????????? ???????????????????? ????????????????'
                                                    setRef={setCategoriesRef}
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
                                                    label="?????????????????? ?? PDF"/>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} xl={9} md={12}>
                                    <Box sx={{m: 2}}>
                                        <TinyMce
                                            html={htmlPage}
                                            setHtml={setHtml}
                                            showButtonForForm={true}
                                            titleButton={isEditPage ? "??????????????????" : "????????????????"}/>
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
                    spacing={5}
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack>
                            <Typography variant="h5" gutterBottom>
                                ?????????????????? ??????????????
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
                                                        caption="?????????????? ?????? ????????, ?????????? ??????????????????????????!"
                                                        functionIconButton={() => {
                                                            setIsEditCategory(true)
                                                            setOpenDialogCategory(true)
                                                            setIdCategory(category.id)
                                                            setNameCategory(category.name)
                                                            setCaptionCategory(category.caption)
                                                        }}/>
                                                    <CustomIconButton
                                                        icon={<DeleteIcon/>}
                                                        caption="?????????????? ?????? ????????, ?????????? ??????????????!"
                                                        functionIconButton={() => {
                                                            setOpenDialogForConfirm(true)
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
                                        title={"???????????????? ??????????????????"}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Stack>
                            <Typography variant="h5" gutterBottom>
                                ????????????????
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
                                                        caption="?????????????? ?????? ????????, ?????????? ??????????????????????????!"
                                                        functionIconButton={() => {
                                                            setIsEditPage(true)
                                                            setOpenDialog(true)
                                                            setIdPage(page.id)
                                                            setNamePage(page.name)
                                                            setCaptionPage(page.caption)
                                                            setCategoryPage(page.category)
                                                            setHtmlPage(page.html)
                                                            setChecked(page.is_download)
                                                        }}/>
                                                    <CustomIconButton
                                                        icon={<DeleteIcon/>}
                                                        caption="?????????????? ?????? ????????, ?????????? ??????????????!"
                                                        functionIconButton={() => {
                                                            setOpenDialogForConfirm(true)
                                                            setConfirmDeletePage(true)
                                                            setIdPage(page.id)
                                                        }}/>
                                                    <CustomIconButton
                                                        icon={<ViewTimelineIcon/>}
                                                        caption="?????????????? ?????? ????????, ?????????? ????????????????????!"
                                                        functionIconButton={() => {
                                                            navigate(`/pages/${page.id}`);
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
                                        title={"???????????????? ????????????????"}
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