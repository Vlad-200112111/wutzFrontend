import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import "./Cart.css"

function Cart({url, title, description, key}) {
    return (
        <Box key={key} className="cart">
            <Typography sx={{ml:2}} variant="h5" gutterBottom>
                {title}
            </Typography>
            <Box className="cart-item">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={5}>
                        <img className="cart-image" src={url}/>
                        {/*<div className="cart-image" style={{backgroundImage: `url(${url})`}}/>*/}
                    </Grid>
                    <Grid item xs={7}>
                        <div style={{marginBottom: 25}}>
                            <Typography className="cart-description" variant="body1" gutterBottom>
                                {description}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Cart;