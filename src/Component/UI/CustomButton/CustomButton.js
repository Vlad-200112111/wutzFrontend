import {Button} from '@mui/material';
import React from 'react';
import useStylesButton from './CustomButtonStyle';

function CustomButton({children, className, secondaryColor, ...restProps}) {
    const classesButton = useStylesButton()
    return (
        <Button
            className={[className, secondaryColor ? classesButton.SecondaryButton : classesButton.Button].join(' ')} {...restProps}>
            {children}
        </Button>
    );

}

export default CustomButton