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
    const [role, setRole] = useState(false);

    useEffect(() => {
        getCurrentRole().then((Role) => {
            setRole(Role)
        });
    }, [])

    const getCurrentRole = async () => {
        const {data: Role} = await api.account.getRole()
        return Role.results
    }
    console.log(role)
    const permissions = PERMISSIONS["STUDENT"];

    const permissionGranted = hasPermission({ permissions, scopes });
    console.log(permissionGranted)
    if (!permissionGranted) return <RenderError />;

    return <>{children}</>;
}