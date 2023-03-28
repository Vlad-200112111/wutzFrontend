import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import CustomVerticalTabs from "../../UI/CustomVerticalTabs/CustomVerticalTabs";
import News from "../Employee/News/News";
import Pages from "../Employee/Pages/Pages";

function PersonalAccount({}) {
    const navigate = useNavigate();


    const listTabs =
        [
            {
                label: 'Новости',
                content: <News/>
            },
            {
                label: 'Создание страниц',
                content: <Pages/>
            }
        ]


    return (
        <div>
            <CustomVerticalTabs listTabs={listTabs}/>
        </div>
    );
}

export default PersonalAccount;