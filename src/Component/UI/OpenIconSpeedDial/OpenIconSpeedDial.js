import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {Backdrop} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function OpenIconSpeedDial({actions, open, hidden, handleClose, handleOpen}) {
    const classes = useStyles();

    return (
        <div>
            <Backdrop open={open}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {
                    actions?.map((action) => (
                            <SpeedDialAction
                                sx={{m:2}}
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                tooltipOpen
                                onClick={action.onClick}
                            />
                        )
                    )
                }
            </SpeedDial>
        </div>
    );
}

export default OpenIconSpeedDial;