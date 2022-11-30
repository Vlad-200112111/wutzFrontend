import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormControl, InputBase, InputLabel } from '@mui/material';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'rgba(57, 95, 182, 1)',
    },

    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 0,
            transition: "all 0.3s ease",
        },
        '&:hover fieldset': {
            border: "1px solid #000"
        },
        '&.Mui-focused fieldset': {
            border: "1px solid rgba(57, 95, 182, 1)"
        },
    },
});



function CustomInput ({form, fullWidth = true, ...restProps}) {

    return (
        <>
            {form &&
                <form style={{width: fullWidth && "100%"}}>
                    <CssTextField fullWidth={fullWidth} {...restProps}  />
                </form>}
            {!form &&
                <CssTextField fullWidth={fullWidth} {...restProps}  />}
        </>

    )
}
export default CustomInput