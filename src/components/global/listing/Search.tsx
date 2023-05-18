import {
    TextField,
    Button,
    Select,
    MenuItem,
    Rating,
    InputLabel,
    Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";

import "../../../styles/components/listing/Search.scss";

export default function Search() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [service, setService] = useState("");

    const states = [
        "Ariana",
        "Béja",
        "Ben Arous",
        "Bizerte",
        "Gabès",
        "Gafsa",
        "Jendouba",
        "Kairouan",
        "Kasserine",
        "Kébili",
        "Kef",
        "Mahdia",
        "Manouba",
        "Médenine",
        "Monastir",
        "Nabeul",
        "Sfax",
        "Sidi Bouzid",
        "Siliana",
        "Sousse",
        "Tataouine",
        "Tozeur",
        "Tunis",
        "Zaghouan",
    ];

    const serviceTypes = ["Photographe", "Espace de fête", "Band", "Traiteur"];

    const handleLocationChange = (event: any) => {
        setLocation(event.target.value);
    };

    const handleServiceChange = (event: any) => {
        setService(event.target.value);
    };

    return (
        <div className="listing-search">
            <div className="listing-search-title">
                <SearchIcon className="icon-color" />
                <Typography
                    className="listing-search-title-text"
                    gutterBottom
                    variant="h6"
                    component="div">
                    Search & Filter
                </Typography>
            </div>
            <div className="listing-search-input">
                <TextField label="Search.." variant="outlined" />
                <div className="filters">
                    <Select
                        className="filter"
                        value={location}
                        label="Location"
                        onChange={handleLocationChange}>
                        {states.map((state) => (
                            <MenuItem value={state} key={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        className="filter"
                        value={service}
                        label="Service"
                        onChange={handleServiceChange}>
                        {serviceTypes.map((serviceType) => (
                            <MenuItem value={serviceType} key={serviceType}>
                                {serviceType}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel className="filter">Rating</InputLabel>
                    <Rating
                        name="rating-input"
                        value={0}
                        size="small"
                        precision={0.5}
                    />
                </div>
            </div>
            <Button className="filter-button" variant="contained">
                Filter
            </Button>
        </div>
    );
}
