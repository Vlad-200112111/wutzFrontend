import React from 'react';
import Heading from "../../../../UI/Heading/Heading";
import Cart from "../../../../UI/Carts/Cart";

function News({data}) {
    return (
        <>
            <Heading title={"Новости"}/>
            {
                data.map((item, index) => {
                        return (
                            <Cart
                                title={item.title}
                                description={item.description}
                                url={item.url}
                                key={index}/>
                        )
                    }
                )
            }
        </>
    );
}

export default News;