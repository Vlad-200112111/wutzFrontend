import React from 'react';
import Heading from "../../../../UI/Heading/Heading";
import {Box, Typography} from "@mui/material";

function Contacts(props) {
    return (
        <>
            <Heading title={"Контакты"}/>
            <Box sx={{p:2}}>
                <Typography variant="body1" gutterBottom>
                Адрес: г. Чита, ул. Бабушкина, 143

                e-mail: voenkaf-zabgu@yandex.ru

                Режим работы: с 8-30 до 17-00, перерыв на обед с 12-30 до 13-00

                Адрес приема документов:ул. Бабушкина, 143, аудитория 11, с 10-00 до 17-00

                Начальник - полковник Младенов Василий Иванович,тел.: 21-87-12

                Начальник общего отдела - Баширова Евгения Анатольевна,тел.: 21-88-93
                </Typography>
            </Box>
        </>
    );
}

export default Contacts;