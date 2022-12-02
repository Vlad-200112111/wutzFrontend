import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

function OpenIconSpeedDial({actions, is_show, speedDialIcon, functionOpenIconSpeedDial}) {
    return (
        <Box sx={{height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
            <SpeedDial
                onClick={functionOpenIconSpeedDial}
                sx={{position: 'absolute', bottom: 16, right: 16}}
                icon={<SpeedDialIcon openIcon={speedDialIcon}/>}
                ariaLabel={'SpeedDial'}>
                {
                    is_show && (
                        actions.map(
                            (action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            )
                        )
                    )
                }
            </SpeedDial>
        </Box>
    );
}

export default OpenIconSpeedDial;