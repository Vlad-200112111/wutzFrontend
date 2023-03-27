export const ROLES = {
    Admin: "ADMIN",
    Student: "STUDENT",
    Teacher: "TEACHER",
    Employee: "EMPLOYEE",
};

export const SCOPES = {
    canCreate: "can-create",
    canEdit: "can-edit",
    canDelete: "can-delete",
    canView: "can-view"
};

export const PERMISSIONS = {
    [ROLES.Admin]: [SCOPES.canView],
    [ROLES.Student]: [SCOPES.canView, SCOPES.canEdit],
    [ROLES.Admin]: [
        SCOPES.canView,
        SCOPES.canEdit,
        SCOPES.canCreate,
        SCOPES.canDelete
    ]
};