import { ILoginUser } from "../providers/AuthContext";

function isAdmin(user: ILoginUser) {
    return user.permissions.includes("admin");
}

function isProvider(user: ILoginUser) {
    return user.permissions.includes("provider");
}

export default {
    isAdmin,
    isProvider,
};
