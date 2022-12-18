import React, {createContext, useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import GuestRoute from "../Components/GuestRoute/GuestRoute";
import MainPage from "../../Component/General/MainPage/MainPage";
import MainMenu from "../../Component/General/MainMenu/MainMenu";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import NewsAdmin from "../../Component/Admin/NewsAdmin/NewsAdmin";
import api from "../../Services/api";
import AboutPage from "../../Component/General/About/AboutPage";
import SliderAdmin from "../../Component/Admin/SliderAdmin/SliderAdmin";
import PagesAdmin from "../../Component/Admin/PagesAdmin/PagesAdmin";
import Pages from "../../Component/General/Pages/Pages";
import MaterialPage from "../../Component/General/Material/MaterialPage";


function AppRoutes() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const token = localStorage.getItem('access-token')

    const checkIsAuthorized = async () => {
        return await api.account.checkAuthorization(token).then(resp => {
                return resp.status === 200;
            }
        ).catch(resp => {
                return false;
            }
        );
    }


    useEffect(() => {
        checkIsAuthorized().then((IsAuthorized) => setIsAuthorized(IsAuthorized));
    }, [])


    return (
        <Routes>
            <Route
                path="/"
                element={
                    <GuestRoute>
                        <MainMenu isAuthorized={isAuthorized} content={<MainPage isAuthorized={isAuthorized}/>}/>
                    </GuestRoute>
                }
            />
            <Route
                path="/news/"
                element={
                    <PrivateRoute>
                        <MainMenu isAuthorized={isAuthorized} content={<NewsAdmin isAuthorized={isAuthorized}/>}/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/about/"
                element={
                    <PrivateRoute>
                        <MainMenu isAuthorized={isAuthorized} content={<AboutPage isAuthorized={isAuthorized}/>}/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/sliders/"
                element={
                    <PrivateRoute>
                        <MainMenu isAuthorized={isAuthorized} content={<SliderAdmin isAuthorized={isAuthorized}/>}/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/pages/"
                element={
                    <PrivateRoute>
                        <MainMenu isAuthorized={isAuthorized} content={<PagesAdmin isAuthorized={isAuthorized}/>}/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/pages/:id"
                element={
                    <GuestRoute>
                        <MainMenu isAuthorized={isAuthorized} content={<Pages isAuthorized={isAuthorized}/>}/>
                    </GuestRoute>
                }
            />
            <Route
                path="/materials/"
                element={
                    <GuestRoute>
                        <MainMenu isAuthorized={isAuthorized} content={<MaterialPage isAuthorized={isAuthorized}/>}/>
                    </GuestRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;