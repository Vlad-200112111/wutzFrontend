import {Navigate, useLocation} from "react-router-dom";
import api from "../../../Services/api";
import {useState} from "react";

function PrivateRoute({children, ...rest}) {
    const location = useLocation();
    const url = new URLSearchParams(location.search.slice(1));
    const [redirect, setRedirect] = useState(false)
    const token = localStorage.getItem('access-token')

    setInterval(async () => {
        await api.account.checkAuthorization(token).then(resp => {
                if (resp.status === 200) {
                    setRedirect(false)
                } else {
                    localStorage.remove("access-token")
                    localStorage.remove("refresh-token")
                    setRedirect(true)
                }
            }
        ).catch(resp => {
                localStorage.remove("access-token")
                localStorage.remove("refresh-token")
                setRedirect(true)
            }
        )
    }, 10000);

    return redirect ? <Navigate to={url.get("redirect") || "/"}/> : children;
}

export default PrivateRoute;