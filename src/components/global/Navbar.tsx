import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import user from "../../utils/user";
import { useContext } from "react";
import { Avatar, IconButton, Badge, Menu, MenuItem, Divider, Alert } from "@mui/material";
import {
    AccountCircle,
    Logout as LogoutIcon,
    Home,
    FormatListBulleted,
    ContentPasteGo,
    Report,
    Edit,
    PeopleAlt,
    Groups,
    ContentPasteSearch,
} from "@mui/icons-material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import "./../../styles/components/global/Navbar.scss";
import { generateComponentKey } from "../../utils/generateComponentKey";
import { NotificationsContext } from "../../providers/NotificationsContext";
import unissonLogo from "../../assets/unisson.svg";

export default function Navbar() {
    const { login, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const notifications = useContext(NotificationsContext);
    const [isHome, setIsHome] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    function goTo(path: string) {
        navigate(path);
    }

    const handleProfileClick = () => {
        handleMenuClose();
        goTo(`/profile/${login._id}`);
    };

    const handleSettingsClick = () => {
        handleMenuClose();
        goTo(`/settings`);
    };

    const handleContractsClick = () => {
        handleMenuClose();
        goTo(`/contracts`);
    };

    const handleYourCollabsClick = () => {
        handleMenuClose();
        goTo(`/yourCollabs`);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
        goTo("/");
    };

    /* Admin*/

    const handleRequestsClick = () => {
        handleMenuClose();
        goTo(`/requests`);
    };

    const handleReportsClick = () => {
        handleMenuClose();
        goTo(`/reports`);
    };

    const handleUsersListClick = () => {
        handleMenuClose();
        goTo(`/admin/users`);
    };

    function handleNotificationToggle() {
        notifications.setOpen(!notifications.open);
    }

    useEffect(() => {
        setIsHome(window.location.pathname === "/");
    }, [window.location.pathname]);

    /*useEffect(() => {
        console.log(login.permissions);
        console.log(user.isProvider(login));
    }, [login]);*/

    const renderMenu = (
        <Menu
            // anchorEl={<Avatar></Avatar>}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    bgcolor: "#FAF7F4",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                },
            }}
            className="navbar-menu"
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <div className="welcome-text">Bonjour, {login.username}!</div>
            <Divider sx={{ margin: "5px" }} />
            <MenuItem onClick={handleProfileClick}>
                <AccountCircle className="icon-menu" /> Votre Profil
            </MenuItem>
            <MenuItem onClick={handleContractsClick}>
                <ContentPasteSearch className="icon-menu" /> Votre Contrats
            </MenuItem>
            {/*<MenuItem onClick={handleSettingsClick}>
                <Edit className="icon-menu" /> Modifier Profil
            </MenuItem>*/}
            {user.isProvider(login) && (
                <MenuItem onClick={handleYourCollabsClick}>
                    <Groups className="icon-menu" /> Votre Collaborations
                </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
                <LogoutIcon className="icon-menu" color="inherit" /> Se Déconnecter
            </MenuItem>

            {user.isAdmin(login) && (
                <div>
                    <Divider sx={{ margin: "5px" }} />
                    <div className="welcome-text">Pages Admin</div>
                    <Divider sx={{ margin: "5px" }} />
                    <MenuItem onClick={handleRequestsClick}>
                        <ContentPasteGo className="icon-menu" /> Demandes
                    </MenuItem>
                    <MenuItem onClick={handleReportsClick}>
                        <Report className="icon-menu" /> Signalements
                    </MenuItem>
                    <MenuItem onClick={handleUsersListClick}>
                        <PeopleAlt className="icon-menu" /> Utilisateurs
                    </MenuItem>
                </div>
            )}
        </Menu>
    );

    return (
        <>
            <div
                className="navbar"
                key={generateComponentKey(20)}
                style={{ backgroundColor: isHome ? "transparent" : "#44576D" }}>
                <div className="navbar-left">
                    <img src={unissonLogo} className="logo" alt="logo" />
                    {!isHome && (
                        <>
                            <Link to="/" className="button">
                                <Home className="icon-navbar" />
                                Acceuil
                            </Link>
                            <Link to="/listing" className="button">
                                <FormatListBulleted className="icon-navbar" />
                                Services
                            </Link>
                        </>
                    )}
                </div>
                {!login.authenticated ? (
                    <div className="navbar-right">
                        <Link to="/signup" className="button signup">
                            S'INSCRIRE
                        </Link>
                        <Link to="/login" className="button login">
                            SE CONNECTER
                        </Link>
                    </div>
                ) : (
                    <></>
                )}
                {login.authenticated ? (
                    <div className="navbar-right">
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            onClick={handleNotificationToggle}>
                            {notifications?.notifications?.length == 0 ? (
                                <NotificationsIcon />
                            ) : (
                                <Badge
                                    badgeContent={notifications?.notifications?.length}
                                    color="error">
                                    <NotificationsIcon />
                                </Badge>
                            )}
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit">
                            <Avatar src={`/api/assets/avatar/${login._id}`} />
                        </IconButton>
                        {renderMenu}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {login.authenticated && user.isBanned(login) && (
                <Alert variant="filled" severity="error">
                    Vous avez été banni car vous avez enfreint les règles d'utilisation du site.
                </Alert>
            )}
        </>
    );
}
