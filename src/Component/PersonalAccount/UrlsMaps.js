import News from "./Employee/News/News";
import Pages from "./Employee/Pages/Pages";
import React from "react";

export const ROLES = {
    Admin: "ADMIN",
    Student: "STUDENT",
    Teacher: "TEACHER",
    Employee: "EMPLOYEE",
};

export const URLS = {
    [ROLES.Student]: [],
    [ROLES.Admin]: [
        {label: 'Новости', content: <News/>},
        {label: 'Создание страниц', content: <Pages/>}
    ],
    [ROLES.Teacher]: [],
    [ROLES.Employee]: [
        {label: 'Новости', content: <News/>},
        {label: 'Создание страниц', content: <Pages/>}
    ],
};