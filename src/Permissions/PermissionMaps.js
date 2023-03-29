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
    [ROLES.Student]: [SCOPES.canView],
    [ROLES.Teacher]: [
        SCOPES.canView,
        SCOPES.canCreate,
        SCOPES.canDelete
    ],
    [ROLES.Employee]: [
        SCOPES.canView,
        SCOPES.canEdit,
        SCOPES.canCreate,
        SCOPES.canDelete
    ],
    [ROLES.Admin]: [
        SCOPES.canView,
        SCOPES.canEdit,
        SCOPES.canCreate,
        SCOPES.canDelete
    ]
};