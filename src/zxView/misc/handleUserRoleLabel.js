let config = require('zx-const')[process.env.NODE_ENV];

export default function handleUserRoleLabel(userRole) {
    if (!userRole) {
        return null;
    }
    let userRoleLabel;
    if (userRole === config.USER_ROLE_AREA_ADMINISTRATOR) {
        userRoleLabel = config.USER_ROLE_AREA_ADMINISTRATOR_LABEL;
    }
    else if (userRole === config.USER_ROLE_TENANT_ADMINISTRATOR) {
        userRoleLabel = config.USER_ROLE_TENANT_ADMINISTRATOR_LABEL;
    }
    else if (userRole === config.USER_ROLE_PROJECT_ADMINISTRATOR) {
        userRoleLabel = config.USER_ROLE_PROJECT_ADMINISTRATOR_LABEL;
    }
    else if (userRole === config.USER_ROLE_TEACHER) {
        userRoleLabel = config.USER_ROLE_TEACHER_LABEL;
    }
    else if (userRole === config.USER_ROLE_PUPIL) {
        userRoleLabel = config.USER_ROLE_PUPIL_LABEL;
    }
    else {
        userRoleLabel = null;
    }

    return userRoleLabel;
}