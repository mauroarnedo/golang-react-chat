import React from "react";

export default function ChatInput({ send }) {
    return (
        <div className="w-100 position-absolute bottom-0 bg-dark d-flex align-items-center justify-content-center chatInput">
            <div className="w-50 form-floating">
                <input type="text" className="form-control" id="floatingInputValue" onKeyDown={send} placeholder="Hit enter to send" />
                <label htmlFor="floatingInputValue">Hit enter to send</label>
            </div>
        </div>
    )
}