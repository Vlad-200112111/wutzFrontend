import React from 'react';
import Heading from "../../../../UI/Heading/Heading";
import Cart from "../../../../UI/Carts/Cart";

function News({data, isAuthorized, setNews}) {
    return (
        <>
            <Heading title={"Новости"}/>
            {
                data?.map((item, index) => {
                        return (
                            <Cart
                                setNews={setNews}
                                id={item.id}
                                isAuthorized={isAuthorized}
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