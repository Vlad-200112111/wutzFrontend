import { Navigate, useLocation } from "react-router-dom";

function GuestRoute({ children, ...rest }) {
    const location = useLocation();
    const url = new URLSearchParams(location.search.slice(1));
    // const Token = localStorage.getItem('Token')

    return children
    // return true === '' ? <Navigate to={url.get("redirect") || "/"} /> : children;
}

export default GuestRoute;