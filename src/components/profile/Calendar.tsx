import { useState, useContext } from "react";
import MultipleDatesPicker from "@ambiot/material-ui-multiple-dates-picker";
import { Typography, IconButton } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../providers/AuthContext";

//import "./../../styles/components/profile/Calendar.scss";

export default function Calendar(props: { availability: any }) {
    const availability = props.availability.map((d: any) => new Date(d));
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<Date[]>(availability);

    function handleUpdateAvailability(dates: Date[]) {
        console.log(dates);
        fetch(`/api/users/availability`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                availability: dates,
            }),
        })
            .then((r) => r.json())
            .then((d) => {
                if (d.status != 200) {
                    enqueueSnackbar(d.message, {
                        variant: "error",
                    });
                    return;
                }

                enqueueSnackbar("Availability updated!", {
                    variant: "success",
                });
                setSelectedDates(dates);
                handleClose();
            });
    }

    function handleOpen() {
        setOpen(true);
        console.log(availability);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div className="profile-date-button">
            <IconButton onClick={handleOpen}>
                <CalendarMonth />
            </IconButton>
            <MultipleDatesPicker
                open={open}
                onSubmit={(dates) => {
                    handleUpdateAvailability(dates);
                }}
                onCancel={handleClose}
                readOnly={false}
                selectedDates={selectedDates}
            />
        </div>
    );
}
