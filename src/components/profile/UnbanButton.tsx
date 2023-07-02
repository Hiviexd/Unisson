import { useSnackbar } from "notistack";
import { Balance } from "@mui/icons-material";

import "./../../styles/components/profile/BanButton.scss";

export default function UnbanButton({ user, login }: any) {
    const { enqueueSnackbar } = useSnackbar();

    function banUser() {
        fetch(`/api/admin/unban/${user._id}`, {
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
        <div className="ban-button unban" onClick={banUser}>
            <Balance className="ban-icon" />
            Débloquer
        </div>
    );
}
