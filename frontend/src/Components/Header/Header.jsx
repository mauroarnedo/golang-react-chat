import React from "react";

export default function Header({ChangeUsername}) {
    return(
        <div className="d-flex align-items-center justify-content-evenly text-bg-dark p-3 ps-0">
            <div className="pe-5">
                <h1>Golang - React Chat App</h1>
            </div>
            <ChangeUsername />
        </div>
    )
}