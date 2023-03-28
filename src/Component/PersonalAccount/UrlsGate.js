import {useEffect, useState} from "react";
import { URLS } from "./UrlsMaps";
import api from "../../Services/api";

export default function UrlsGate() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        getCurrentRole().then((Role) => {
            setUrls(URLS[Role])
        });
    }, [])

    const getCurrentRole = async () => {
        const {data: Role} = await api.account.getRole()
        return Role.results
    }

    return urls;
}