import React from "react";
import {Routes, Route} from "react-router-dom";
import GuestRoute from "../Components/GuestRoute/GuestRoute";
import MainPage from "../../Component/General/MainPage/MainPage";
import MainMenu from "../../Component/General/MainMenu/MainMenu";


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