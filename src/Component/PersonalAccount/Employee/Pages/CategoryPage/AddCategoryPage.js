import React from 'react';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import CustomInput from "../../../../UI/CustomInput/CustomInput";
import CustomButton from "../../../../UI/CustomButton/CustomButton";
import api from "../../../../../Services/api";

function AddCategoryPage({setOpenDialogWindow, setOpenSpeedDial}) {

    async function createCategoryPage(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        await api.pages.createCategoryForPage(formData);
        setOpenDialogWindow(false);
        setOpenSpeedDial(false);
    }

    return (
        <Box sx={{p: 5, width: '100%'}}>
            <form onSubmit={createCategoryPage}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sx={{width: "100%"}}>
                        <Box sx={{float: "right"}}>
                            <CustomButton type={'submit'} title={"Добавить"}/>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default AddCategoryPage;
