import React from "react";

import "../Slider.scss";
import {Typography} from "@mui/material";

export default function SlideContent({title, caption}) {
    return (
        <>
            <div className="slide-title">
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {caption}
                </Typography>
            </div>
        </>
    )
}