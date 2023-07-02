import { ILoginUser } from "../providers/AuthContext";

function isAdmin(user: ILoginUser | any) {
    return user.permissions.includes("admin");
}

function isProvider(user: ILoginUser | any) {
    return user.permissions.includes("provider");
}

function isBanned(user: ILoginUser | any) {
    return !user.permissions.includes("user");
}

export default {
    isAdmin,
    isProvider,
    isBanned,
};
