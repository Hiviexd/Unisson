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

    const { setUsers, setTotalPages } = props;

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
            `/api/users/listing/get?search=${search}&location=${location}&service=${service}&rating=${rating}`
        )
            .then((r) => r.json())
            .then((d) => {
                setUsers(d.data.users);
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
                        className={`listing-type ` + (listingType === "services" ? "active" : "")}>
                        Services
                    </div>
                    <div
                        id="collabs"
                        className={`listing-type ` + (listingType === "collabs" ? "active" : "")}>
                        Collaborations
                    </div>
                </div>
                <TextField label="Rechercher.." variant="outlined" onChange={handleSearchChange} />
                <div className="filters">
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

                    <InputLabel className="filter">Note</InputLabel>
                    <Rating
                        name="rating-input"
                        value={rating}
                        size="small"
                        precision={0.5}
                        onChange={handleRatingChange}
                    />
                </div>
            </div>
            <Button className="filter-button" variant="contained" onClick={refreshListing}>
                Filtrer
            </Button>
        </div>
    );
}
