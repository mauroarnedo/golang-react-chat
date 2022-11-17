import React from "react";

export default function Message({ message }) {
    const temp = JSON.parse(message)
    return (
        <div className="w-50 form-floating mb-3">
            <input className="form-control" id="floatingInput" value={temp.body} readOnly />
            <label htmlFor="floatingInput"><strong>{temp.name}</strong></label>
        </div>
    )
}