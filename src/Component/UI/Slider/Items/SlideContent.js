import React from "react";

import "../Slider.scss";

export default function SlideContent({title, caption}) {
    return (
        <>
            <div className="slide-title">
                <h3>{title}</h3>
                <p>{caption}</p>
            </div>
        </>
    )
}