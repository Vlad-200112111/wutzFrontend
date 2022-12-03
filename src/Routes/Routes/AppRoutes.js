import React from "react";
import {Routes, Route} from "react-router-dom";
import GuestRoute from "../Components/GuestRoute/GuestRoute";
import MainPage from "../../Component/General/MainPage/MainPage";
import MainMenu from "../../Component/General/MainMenu/MainMenu";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import NewsAdmin from "../../Component/Admin/NewsAdmin/NewsAdmin";


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
                path="/news/"
                element={
                    <PrivateRoute>
                        <MainMenu content={<NewsAdmin/>}/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;