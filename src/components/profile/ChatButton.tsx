import { ChatBubble } from "@mui/icons-material";

import "./../../styles/components/profile/ChatButton.scss";

export default function ChatButton(props: { user: any }) {
    const user = props.user;

    return (
        <div className="chat-button">
            <ChatBubble className="chat-button-icon" />
            Contacter
        </div>
    );
}
