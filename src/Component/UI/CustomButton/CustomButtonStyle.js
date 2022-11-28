import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesButton = makeStyles((theme) => ({
            Button:{
                background: "linear-gradient(94.15deg, rgba(3, 132, 0, 0.7) 0%, rgba(4, 203, 0, 0.7) 100%)",
                border: "1px solid #A7A7A7",
                borderRadius: "7px !important",
                color: "#fff !important",
                "&:hover":{
                    background: "linear-gradient(94.15deg, rgba(3, 132, 0, 0.5) 0%, rgba(4, 203, 0, 0.5) 100%)"
                }
            },
            SecondaryButton:{
                background:"transparent",
                color: "#CB0000 !important"
            }
        }
    )
);

export default useStylesButton;