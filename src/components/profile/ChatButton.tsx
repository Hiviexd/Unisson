import { ChatBubble } from "@mui/icons-material";

import "./../../styles/components/profile/ChatButton.scss";

export default function ChatButton(props: { user: any }) {
    const user = props.user;

    const handleClick = () => {
        console.log("Chat with " + user.username);
    };

    return (
        <div className="chat-button" onClick={handleClick}>
            <ChatBubble className="chat-button-icon" />
            Chat
        </div>
    );
}
