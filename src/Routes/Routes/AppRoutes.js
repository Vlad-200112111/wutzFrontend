import React from "react";
import {Routes, Route} from "react-router-dom";
import GuestRoute from "../Components/GuestRoute/GuestRoute";
import MainPage from "../../Component/General/MainPage/MainPage";
import MainMenu from "../../Component/General/MainMenu/MainMenu";
import Profile from "../../Component/General/Profile/Profile";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";


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
            <Route
                path="/profile/"
                element={
                    <PrivateRoute>
                        <MainMenu content={<Profile/>}/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;