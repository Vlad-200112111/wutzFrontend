import React from 'react';
import Heading from "../../../../UI/Heading/Heading";
import Cart from "../../../../UI/Carts/Cart";

function News({data}) {
    console.log(data.results)
    return (
        <>
            <Heading title={"Новости"}/>
            {
                data.results?.map((item, index) => {
                        return (
                            <Cart
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