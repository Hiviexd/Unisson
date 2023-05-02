import { useRef, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

export default function Upload() {
    const formData = useRef(new FormData());
    const { login } = useContext(AuthContext);

    function sendPost() {
        fetch("/api/posts/new", {
            method: "POST",
            headers: {
                authorization: login.accountToken,
            },
            body: formData.current,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    }

    function handleFileInput(ev: any) {
        const files = ev.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.current.append("files", files[i]);
            }
        }
    }
    return (
        <div className="upload">
            <input
                type="text"
                name="title"
                placeholder="Title"
                onInput={(ev: any) => {
                    formData.current.set("title", ev.target.value);
                }}
            />
            <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onInput={(ev: any) => {
                    handleFileInput(ev);
                }}
            />
            <button onClick={sendPost}>Submit</button>
        </div>
    );
}
