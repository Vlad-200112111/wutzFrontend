import {Button} from '@mui/material';
import React from 'react';
import "./Button.css"

function CustomButton({title, type, ...restProps}) {
    return (
        <Button
            variant="contained"
            type={type}
            className={"button"}
            {...restProps}>
            {title}
        </Button>
    );

}

export default CustomButton