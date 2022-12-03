import React, {useEffect, useState} from 'react';
import Slider from "../../UI/Slider/Slider";
import {Box, Grid} from "@mui/material";
import News from "./Items/News/News";
import Contacts from "./Items/Contacts/Contacts";

function MainPage({}) {
    const [news, setNews] = useState([])

    useEffect(() => {
        setNews([])
    }, [])


    return (
        <div>

            <Slider autoPlay={true} autoPlayTime={7000}/>
            <Box sx={{pr: 5, pl: 5}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} md={8}>
                        <News data={news}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Contacts/>
                    </Grid>

                </Grid>
            </Box>

        </div>
    );
}

export default MainPage;