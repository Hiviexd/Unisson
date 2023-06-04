import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import user from "../../utils/user";
import { useContext } from "react";
import {
    Avatar,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Divider,
    Icon,
} from "@mui/material";
import {
    AccountCircle,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Home,
    FormatListBulleted,
    AdminPanelSettings,
    ContentPasteGo,
} from "@mui/icons-material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import "./../../styles/components/global/Navbar.scss";
//import { LogoImage } from "../../styles/components/images/Logo";
import { generateComponentKey } from "../../utils/generateComponentKey";
import Alert from "@mui/material/Alert";
import { ProfileNonceContext } from "../../providers/ProfileNonceContext";
import { NotificationsContext } from "../../providers/NotificationsContext";

export default function Navbar() {
    const { login, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    //const [isBanned, setIsBanned] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const nonce = useContext(ProfileNonceContext);
    const notifications = useContext(NotificationsContext);
    const [isAdmin, setIsAdmin] = useState(false);

    // make background color transparet if route is "/"
    //const [isHome, setIsHome] = useState("#CB857C");

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

    const handleAdminClick = () => {
        handleMenuClose();
        goTo(`/admin`);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
        goTo("/");
    };

    function handleNotificationToggle() {
        notifications.setOpen(!notifications.open);
    }

    /*useEffect(() => {
		if (window.location.pathname === "/") {
			setIsHome("transparent");
		} else {
			setIsHome("#CB857C");
		}
	}, [window.location.pathname]);*/

    useEffect(() => {
        console.log(login.permissions);
        console.log(user.isProvider(login));
    }, [login]);

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
            <MenuItem onClick={handleSettingsClick}>
                <SettingsIcon className="icon-menu" /> Paramètres
            </MenuItem>
            {user.isAdmin(login) && (
                <MenuItem onClick={handleAdminClick}>
                    <AdminPanelSettings className="icon-menu" /> Page Admin
                </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
                <LogoutIcon className="icon-menu" color="inherit" /> Se
                Déconnecter
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <div
                className="navbar"
                key={generateComponentKey(20)}
                /*style={{ backgroundColor: isHome }}*/
            >
                <div className="navbar-left">
                    <Link to="/" className="logo-container">
                        <p>logo</p>
                    </Link>
                    <Link to="/" className="button">
                        <Home className="icon-navbar" />
                        Acceuil
                    </Link>
                    <Link to="/listing" className="button">
                        <FormatListBulleted className="icon-navbar" />
                        Services
                    </Link>
                    {!user.isProvider(login) ? (
                        <Link to="/about" className="button">
                            <ContentPasteGo className="icon-navbar" />
                            Partagez Vos Services
                        </Link>
                    ) : null}
                </div>
                {!login.authenticated ? (
                    <div className="navbar-right">
                        <Link
                            reloadDocument
                            to="/signup"
                            className="button signup">
                            S'INSCRIRE
                        </Link>
                        <Link
                            reloadDocument
                            to="/login"
                            className="button login">
                            CONNECTER
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
                                    badgeContent={
                                        notifications?.notifications?.length
                                    }
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
            {/*isBanned && (
				<Alert variant="filled" severity="error">
					You are currently banned for violating the rules. Contact an Admin if
					you think this is a mistake.
				</Alert>
            )*/}
        </>
    );
}
