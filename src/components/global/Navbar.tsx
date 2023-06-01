import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import { useContext } from "react";
import {
    Avatar,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";
import {
    AccountCircle,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Search as SearchIcon,
} from "@mui/icons-material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import "./../../styles/components/global/Navbar.scss";
//import { LogoImage } from "../../styles/components/images/Logo";
import { generateComponentKey } from "../../utils/generateComponentKey";
import Alert from "@mui/material/Alert";
import { ProfileNonceContext } from "../../providers/ProfileNonceContext";

export default function Navbar() {
    const { login, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    //const [isBanned, setIsBanned] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const nonce = useContext(ProfileNonceContext);

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
        goTo(`/users/${login._id}`);
    };

    const handleSettingsClick = () => {
        handleMenuClose();
        goTo(`/settings`);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
        goTo("/");
    };

    /*useEffect(() => {
		if (window.location.pathname === "/") {
			setIsHome("transparent");
		} else {
			setIsHome("#CB857C");
		}
	}, [window.location.pathname]);*/

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
            <div className="welcome-text">Welcome back, {login.username}!</div>
            <Divider sx={{ margin: "5px" }} />
            <MenuItem onClick={handleProfileClick}>
                <AccountCircle className="icon-menu" /> Profile
            </MenuItem>
            <MenuItem onClick={handleSettingsClick}>
                <SettingsIcon className="icon-menu" /> Account settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <LogoutIcon className="icon-menu" color="inherit" /> Log out
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
                        Home
                    </Link>
                    <Link to="/listing" className="button">
                        Listing
                    </Link>
                    <Link to="/about" className="button">
                        About
                    </Link>
                    <IconButton
                        size="large"
                        aria-label="search"
                        color="inherit">
                        <SearchIcon /*onClick={handleSearchToggle}*/ />
                    </IconButton>
                </div>
                {!login.authenticated ? (
                    <div className="navbar-right">
                        <Link
                            reloadDocument
                            to="/signup"
                            className="button signup">
                            SIGN UP
                        </Link>
                        <Link
                            reloadDocument
                            to="/login"
                            className="button login">
                            LOGIN
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
                            //onClick={handleNotificationToggle}
                        >
                            {/*notifications.notifications.length == 0 ? (
								<NotificationsIcon />
							) : (
								<Badge
									badgeContent={notifications.notifications.length}
									color="error">
									<NotificationsIcon />
								</Badge>
                            )*/}
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit">
                            <Avatar
                                src={`/api/assets/avatar/${login._id}?nonce=${nonce.string}`}
                            />
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
