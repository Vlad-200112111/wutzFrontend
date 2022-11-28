import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormControl, InputBase, InputLabel } from '@mui/material';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#038400',
    },

    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            transition: "all 0.3s ease",
            border: "1px dashed #A7A7A7"
        },
        '&:hover fieldset': {
            border: "1px solid #000"
        },
        '&.Mui-focused fieldset': {
            border: "1px solid #038400"
        },
    },
});



function CustomInput ({form, fullWidth, ...restProps}) {

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