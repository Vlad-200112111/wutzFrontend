import React from 'react';
import Heading from "../../../../UI/Heading/Heading";
import CustomCartsNews from "../../../../UI/CustomCartsNews/CustomCartsNews";

function News({data, setNews}) {
    return (
        <>
            <Heading title={"Новости"}/>
            {
                data?.map((item, index) => {
                        return (
                            <CustomCartsNews
                                setNews={setNews}
                                id={item.id}
                                title={item.name}
                                description={item.caption}
                                url={item.url_image}
                                key={index}/>
                        )
                    }
                )
            }
        </>
    );
}

export default News;