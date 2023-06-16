import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../providers/AuthContext";
import { useSnackbar } from "notistack";
import Avatar from "react-avatar-edit";
import user from "../utils/user";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

import {
    Typography,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";

import constants from "../utils/constants";

import "./../styles/pages/Settings.scss";

export default function Settings() {
    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const [currentUser, setCurrentUser] = useState(null);
    const [image, setImage] = useState(null);

    const formData = useRef(new FormData());

    function onTextInputChange(e: any) {
        formData.current.set(e.target.id, e.target.value);
    }

    function onSelectChange(e: any) {
        formData.current.set(e.target.name, e.target.value);
    }

    function updateUser() {
        fetch(`/api/users/update`, {
            method: "POST",
            headers: {
                authorization: login.accountToken,
            },
            body: formData.current,
        })
            .then((res) => res.json())
            .then((d) => {
                if (d.status != 200)
                    return enqueueSnackbar(d.message, {
                        variant: "error",
                    });

                enqueueSnackbar("Paramètres mis à jour!", {
                    variant: "success",
                });

                setCurrentUser(d.data);
            });
    }

    function ImageUpload() {
        const [preview, setPreview] = useState(null);
        function onClose() {
            setPreview(null);
        }

        function onCrop(pv: any) {
            setPreview(pv);
        }

        function selectImage() {
            formData.current.set("image", preview);
            setImage(preview);
            enqueueSnackbar("Photo de profil mise à jour", { variant: "success" });
        }

        function onBeforeFileLoad(elem: any) {
            if (elem.target.files[0].size > 716800) {
                alert("Fichier trop volumineux!");
                elem.target.value = "";
            }
        }

        return (
            <div className="settings-avatar pfp-margin">
                <Avatar
                    width={320}
                    height={270}
                    imageWidth={255}
                    onCrop={onCrop}
                    onClose={onClose}
                    onBeforeFileLoad={onBeforeFileLoad}
                    exportMimeType="image/jpeg"
                />
                <Button
                    disabled={!preview}
                    className="upload-button"
                    variant="contained"
                    component="label"
                    onClick={selectImage}>
                    Confirmer
                </Button>
            </div>
        );
    }

    useEffect(() => {
        fetch(`/api/users/${login?._id}`)
            .then((res) => res.json())
            .then((d) => {
                setCurrentUser(d.data);
                setImage(`/api/assets/avatar/${d.data._id}`);
            });
    }, []);

    if (currentUser === null)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <LoadingPage />
            </>
        );

    if (currentUser === undefined)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <ErrorPage text="Erreur..." />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="settings-layout">
                <div className="settings">
                    <div className="settings-header">
                        <SettingsIcon className="settings-header-icon" />
                        <Typography
                            variant="h4"
                            color={"textPrimary"}
                            component="div"
                            className="settings-header-title">
                            Modifier votre profil
                        </Typography>
                    </div>
                    <div className="settings-body">
                        <div className="settings-body-section">
                            <Typography
                                gutterBottom
                                variant="h6"
                                color={"textPrimary"}
                                component="div"
                                className="settings-body-section-title">
                                Photo de profil
                            </Typography>
                            <div className="settings-body-section-row">
                                <div className="settings-avatar pfp-margin">
                                    <img src={image} alt="avatar" className="avatar" />
                                </div>
                                <ImageUpload />
                            </div>
                        </div>
                        <div className="settings-body-section">
                            <Typography
                                gutterBottom
                                variant="h6"
                                color={"textPrimary"}
                                component="div"
                                className="settings-body-section-title">
                                Informations personnelles
                            </Typography>
                            <div className="settings-body-section-row">
                                <TextField
                                    className="full-width"
                                    required
                                    id="username"
                                    label="Nom d'utilisateur"
                                    variant="outlined"
                                    onChange={onTextInputChange}
                                    defaultValue={currentUser?.username}
                                />
                            </div>
                            <div className="settings-body-section-row">
                                <TextField
                                    className="full-width"
                                    required
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    onChange={onTextInputChange}
                                    defaultValue={currentUser?.email}
                                />
                                <TextField
                                    className="full-width"
                                    required
                                    id="phone"
                                    label="Téléphone"
                                    variant="outlined"
                                    onChange={onTextInputChange}
                                    defaultValue={currentUser?.phone}
                                />
                            </div>
                            <div className="settings-body-section-row">
                                <TextField
                                    className="full-width"
                                    id="newPassword"
                                    label="Nouvelle mot de passe"
                                    variant="outlined"
                                    onChange={onTextInputChange}
                                />
                            </div>
                            <div className="settings-body-section-row">
                                <TextField
                                    className="full-width"
                                    id="password"
                                    label="Mot de passe"
                                    variant="outlined"
                                    onChange={onTextInputChange}
                                />
                                <TextField
                                    className="full-width"
                                    required
                                    id="outlined-basic"
                                    label="Confirmer mot de passe"
                                    variant="outlined"
                                />
                            </div>
                            <div className="settings-body-section-row">
                                <Button
                                    className="full-width"
                                    color="error"
                                    variant="outlined"
                                    component="label">
                                    Supprimer votre compte
                                </Button>
                            </div>
                        </div>
                        {user.isProvider(login) && (
                            <>
                                <div className="settings-body-section">
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        color={"textPrimary"}
                                        component="div"
                                        className="settings-body-section-title">
                                        Informations professionnelles
                                    </Typography>
                                    <div className="settings-body-section-row">
                                        <TextField
                                            className="full-width"
                                            required
                                            multiline
                                            id="bio"
                                            label="Bio"
                                            variant="outlined"
                                            onChange={onTextInputChange}
                                            defaultValue={currentUser?.bio}
                                        />
                                    </div>
                                    <div className="settings-body-section-row">
                                        <TextField
                                            className="full-width"
                                            required
                                            multiline
                                            id="description"
                                            label="Description"
                                            variant="outlined"
                                            onChange={onTextInputChange}
                                            defaultValue={currentUser?.description}
                                        />
                                    </div>
                                </div>
                                <div className="settings-body-section">
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        color={"textPrimary"}
                                        component="div"
                                        className="settings-body-section-title">
                                        Informations publiques
                                    </Typography>
                                    <div className="settings-body-section-row">
                                        <FormControl className="full-width" variant="outlined">
                                            <InputLabel id="service-select-label">
                                                Service
                                            </InputLabel>
                                            <Select
                                                labelId="service-select-label"
                                                id="serviceType"
                                                name="serviceType"
                                                onChange={onSelectChange}
                                                defaultValue={currentUser?.serviceType}
                                                label="Service">
                                                {constants.serviceTypes.map((service: any) => (
                                                    <MenuItem
                                                        value={service.value}
                                                        key={service.value}>
                                                        {service.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl className="full-width" variant="outlined">
                                            <InputLabel id="state-select-label">Ville</InputLabel>
                                            <Select
                                                labelId="state-select-label"
                                                id="location"
                                                name="location"
                                                onChange={onSelectChange}
                                                defaultValue={currentUser?.location}
                                                label="Ville">
                                                {constants.states.map((state: any) => (
                                                    <MenuItem value={state} key={state}>
                                                        {state}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="settings-body-section-row">
                                        <TextField
                                            className="full-width"
                                            id="facebook"
                                            label="Facebook"
                                            variant="outlined"
                                            onChange={onTextInputChange}
                                            defaultValue={currentUser?.socials?.facebook}
                                        />
                                        <TextField
                                            className="full-width"
                                            id="instagram"
                                            label="Instagram"
                                            variant="outlined"
                                            onChange={onTextInputChange}
                                            defaultValue={currentUser?.socials?.instagram}
                                        />
                                    </div>
                                    <div className="settings-body-section-row">
                                        <TextField
                                            className="full-width"
                                            id="youtube"
                                            label="YouTube"
                                            variant="outlined"
                                            onChange={onTextInputChange}
                                            defaultValue={currentUser?.socials?.youtube}
                                        />
                                        <TextField
                                            className="full-width"
                                            id="twitter"
                                            label="Twitter"
                                            variant="outlined"
                                            onChange={onTextInputChange}
                                            defaultValue={currentUser?.socials?.twitter}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <Button
                        className="update-button"
                        variant="contained"
                        component="label"
                        onClick={updateUser}>
                        Mettre à jour
                    </Button>
                </div>
            </div>
        </>
    );
}
