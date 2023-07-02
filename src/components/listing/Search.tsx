import {
    TextField,
    Button,
    Select,
    MenuItem,
    Rating,
    InputLabel,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Radio,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";
import constants from "../../utils/constants";

import "../../styles/components/listing/Search.scss";

export default function Search(props: any) {
    const [listingType, setListingType] = useState("services");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [service, setService] = useState("");
    const [rating, setRating] = useState(0);

    const { setUsers, setTotalPages, type, setType } = props;

    const handleListingChange = (event: any) => {
        setListingType(event.target.id);
    };

    const handleSearchChange = (event: any) => {
        setSearch(event.target.value);
    };

    const handleLocationChange = (event: any) => {
        setLocation(event.target.value);
    };

    const handleServiceChange = (event: any) => {
        setService(event.target.value);
    };

    const handleRatingChange = (event: any) => {
        setRating(event.target.value);
    };

    const refreshListing = () => {
        fetch(
            `/api/${
                listingType === "services" ? "users/listing/get" : "collabs/listing"
            }?search=${search}&location=${location}&service=${service}&rating=${rating}`
        )
            .then((r) => r.json())
            .then((d) => {
                setType(listingType);
                setUsers(d.data.users || d.data.collabs);
                setTotalPages(d.data.totalPages);
            });
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
                    Rechercher et filtrer
                </Typography>
            </div>
            <div className="listing-search-input">
                <div className="listing-types">
                    <div
                        id="services"
                        className={`listing-type ` + (listingType === "services" ? "active" : "")}
                        onClick={handleListingChange}>
                        Services
                    </div>
                    <div
                        id="collabs"
                        className={`listing-type ` + (listingType === "collabs" ? "active" : "")}
                        onClick={handleListingChange}>
                        Collaborations
                    </div>
                </div>
                <TextField label="Rechercher.." variant="outlined" onChange={handleSearchChange} />
                <div className="filters">
                    {type === "services" && (
                        <FormControl className="filter" variant="outlined">
                            <InputLabel id="state-select-label">Ville</InputLabel>
                            <Select
                                labelId="state-select-label"
                                id="location"
                                name="location"
                                onChange={handleLocationChange}
                                defaultValue={location}
                                label="Ville">
                                {constants.states.map((state: any) => (
                                    <MenuItem value={state} key={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                        className="filter"
                        sx={{ marginTop: "10px" }}>
                        Service
                    </Typography>
                    <FormControl className="filter" variant="outlined">
                        <RadioGroup
                            aria-label="service"
                            name="service"
                            value={service}
                            onChange={handleServiceChange}>
                            {constants.serviceTypes.map((service: any) => (
                                <FormControlLabel
                                    value={service.value}
                                    control={<Radio />}
                                    label={service.name}
                                    key={service.value}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    {type === "services" && (
                        <>
                            <InputLabel className="filter">Note</InputLabel>
                            <Rating
                                name="rating-input"
                                value={rating}
                                precision={0.5}
                                onChange={handleRatingChange}
                            />
                        </>
                    )}
                </div>
            </div>
            <Button className="filter-button" variant="contained" onClick={refreshListing}>
                Filtrer
            </Button>
        </div>
    );
}
