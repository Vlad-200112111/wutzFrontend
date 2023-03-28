import News from "./Employee/News/News";
import Pages from "./Employee/Pages/Pages";
import React from "react";
import Students from "./Employee/Students/Students";
import Sliders from "./Employee/Sliders/Sliders";

export const ROLES = {
    Admin: "ADMIN",
    Student: "STUDENT",
    Teacher: "TEACHER",
    Employee: "EMPLOYEE",
};

export const URLS = {
    [ROLES.Student]: [],
    [ROLES.Admin]: [
        {label: 'Студенты', content: <Students/>},
        {label: 'Новости', content: <News/>},
        {label: 'Создание страниц', content: <Pages/>},
        {label: 'Слайдер', content: <Sliders/>},
    ],
    [ROLES.Teacher]: [],
    [ROLES.Employee]: [
        {label: 'Студенты', content: <Students/>},
        {label: 'Новости', content: <News/>},
        {label: 'Создание страниц', content: <Pages/>},
        {label: 'Слайдер', content: <Sliders/>},
    ],
};