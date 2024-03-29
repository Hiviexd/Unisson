import { useSnackbar } from "notistack";
import { Gavel } from "@mui/icons-material";

import "./../../styles/components/profile/BanButton.scss";

export default function BanButton({ user, login }: any) {
    const { enqueueSnackbar } = useSnackbar();

    function banUser() {
        fetch(`/api/admin/ban/${user._id}`, {
            method: "POST",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.status !== 200) {
                    enqueueSnackbar(r.message, {
                        variant: "error",
                    });
                    return;
                }
                window.location.reload();
            });
    }

    return (
        <div className="ban-button ban" onClick={banUser}>
            <Gavel className="ban-icon" />
            Bloquer
        </div>
    );
}
