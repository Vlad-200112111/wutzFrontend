import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import CustomVerticalTabs from "../UI/CustomVerticalTabs/CustomVerticalTabs";
import News from "./Employee/News/News";
import Pages from "./Employee/Pages/Pages";
import UrlsGate from "./UrlsGate";

function PersonalAccount({}) {
    const navigate = useNavigate();

    return (
        <div>
            <CustomVerticalTabs listTabs={UrlsGate()}/>
        </div>
    );
}

export default PersonalAccount;