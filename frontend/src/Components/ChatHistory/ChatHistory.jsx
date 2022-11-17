import React from "react";
import Message from "../Message/Message";

export default function ChatHistory({ chat }) {
    const messages = chat.map(msg => <Message key={msg.timeStamp} message={msg.data} />)
    return (
        <div className="pt-5 pb-5 bg-info bg-gradient chatContain" styles="--bs-bg-opacity: .5;">
            <div className="d-flex flex-column align-items-center justify-content-center">
                {messages}
            </div>
        </div>

    )
}