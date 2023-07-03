import { useState, useContext } from "react";
import MultipleDatesPicker from "@ambiot/material-ui-multiple-dates-picker";
import { IconButton, Button } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../providers/AuthContext";

//import "./../../styles/components/profile/Calendar.scss";

export default function Calendar(props: { user: any }) {
    const userId = props.user._id;
    const availability = props.user.availability.map((d: any) => new Date(d));
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<Date[]>(availability);

    function handleUpdateAvailability(dates: Date[]) {
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

                enqueueSnackbar("Calendrier mis à jour", {
                    variant: "success",
                });
                setSelectedDates(dates);
                handleClose();
            });
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div className="profile-date-button">
            {/*<IconButton onClick={handleOpen}>
                <CalendarMonth />
    </IconButton>*/}
            <Button startIcon={<CalendarMonth />} onClick={handleOpen}>
                Calendrier
            </Button>
            <MultipleDatesPicker
                open={open}
                onSubmit={(dates) => {
                    handleUpdateAvailability(dates);
                }}
                onCancel={handleClose}
                readOnly={userId !== login._id}
                selectedDates={selectedDates}
            />
        </div>
    );
}
