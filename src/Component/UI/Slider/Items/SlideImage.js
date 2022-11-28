import React from "react";

import "../Slider.scss";
import SlideContent from "./SlideContent";

export default function SlideImage({src, title, caption}) {
    return (
        <div>
            <img src={src} className="slide-image"/>
            <div style={{
                background: 'rgba(0,0,0,0.7)',
                position: "absolute",
                height: 600,
                width: "100%",
                zIndex: 2
            }}/>
            <SlideContent title={title} caption={caption}/>
        </div>
    )
}