import React, {createContext, useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import GuestRoute from "../Components/GuestRoute/GuestRoute";
import MainPage from "../../Component/General/MainPage/MainPage";
import MainMenu from "../../Component/General/MainMenu/MainMenu";
import api from "../../Services/api";


function AppRoutes() {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <GuestRoute>
                        <MainMenu content={<MainPage/>}/>
                    </GuestRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;