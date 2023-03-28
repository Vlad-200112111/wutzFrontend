import {useEffect, useState} from "react";
import { PERMISSIONS } from "./PermissionMaps";
import api from "../Services/api";

const hasPermission = ({ permissions, scopes }) => {
    const scopesMap = {};
    scopes.forEach((scope) => {
        scopesMap[scope] = true;
    });

    return permissions.some((permission) => scopesMap[permission]);
};

export default function PermissionsGate({
                                            children,
                                            RenderError = () => <></>,
                                            scopes = [],
                                            errorProps
                                        }) {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        getCurrentRole().then((Role) => {
            setPermissions(PERMISSIONS[Role])
        });
    }, [])

    const getCurrentRole = async () => {
        const {data: Role} = await api.account.getRole()
        return Role.results
    }

    const permissionGranted = hasPermission({ permissions, scopes });

    if (!permissionGranted) return <RenderError />;

    return <>{children}</>;
}