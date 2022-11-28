import React from 'react';
import Typography from "@mui/material/Typography";

function Heading({title}) {
    return (
        <>
            <Typography sx={{m: 0}} variant="h6" gutterBottom>
                {title}
            </Typography>
            <hr style={{margin: 0, borderWidth: 1, color: "#606060"}}/>
        </>
    );
}

export default Heading;