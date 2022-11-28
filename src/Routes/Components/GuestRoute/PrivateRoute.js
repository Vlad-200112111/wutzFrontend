import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    const location = useLocation();
    const url = new URLSearchParams(location.search.slice(1));
    // const Token = localStorage.getItem('Token')


    // return true === '' ? <Navigate to={url.get("redirect") || "/"} /> : children;
}

export default PrivateRoute;