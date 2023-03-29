import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import {FormControlLabel, Grid, Switch} from "@mui/material";
import CustomInput from "../../../../UI/CustomInput/CustomInput";
import api from "../../../../../Services/api";
import CustomAutocomplete from "../../../../UI/CustomAutocomplete/CustomAutocomplete";
import TinyMce from "../../../../UI/TinyMCE/TinyMCE";

function AddPage({setOpenDialogWindow, setOpenSpeedDial}) {
    const [categories, setCategories] = useState([])
    const [chosenCategory, setChosenCategory] = useState()
    const [categoriesRef, setCategoriesRef] = useState()
    const [checked, setChecked] = useState(false);
    const [html, setHtml] = useState(``);

    useEffect(() => {
        getCategoriesForPage().then((Categories) => {
            setCategories(Categories)
        });
    }, [])

    const getCategoriesForPage = async () => {
        const {data: Categories} = await api.pages.getCategoryForPage()
        return Categories.results
    }

    async function createPage(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        formData.append("html", html)
        formData.append("category", chosenCategory)
        formData.append("is_download", checked)
        await api.pages.addPage(formData)
        setOpenDialogWindow(false);
        setOpenSpeedDial(false);
    }

    return (
        <Box sx={{p: 5, width: '100%'}}>
            <form encType="multipart/form-data" onSubmit={createPage}>
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
                                        label="Разрешить в PDF"/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} xl={9} md={12}>
                        <Box sx={{m: 2}}>
                            <TinyMce
                                setHtml={setHtml}
                                showButtonForForm={true}
                                titleButton={"Добавить"}/>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default AddPage;
