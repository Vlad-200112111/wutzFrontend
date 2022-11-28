import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";

import Arrows from "./Items/Controls/Arrows";
import Dots from "./Items/Controls/Dots";

import Slide1 from "./../../../Assets/Images/Slide1.jpg"
import Slide2 from "./../../../Assets/Images/Slide2.jpg"
import Slide3 from "./../../../Assets/Images/Slide3.jpg"
import Slide4 from "./../../../Assets/Images/Slide4.jpg"

import SlidesList from "./Items/SlidesList";

import MainLogo from "./../../../Assets/Images/mainLogo.png";

export const SliderContext = createContext();

const Slider = function ({ width, height, autoPlay, autoPlayTime }) {
    const [items, setItems] = useState([]);
    const [slide, setSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null)

    useEffect(() => {
        setItems(
            [
                {
                    url: Slide1,
                    title: "Slide 1",
                    caption: "В своём стремлении повысить качество жизни, они забывают, что социально-экономическое развитие влечет за собой процесс внедрения и модернизации укрепления моральных ценностей. Значимость этих проблем настолько очевидна, что существующая теория является качественно новой ступенью благоприятных перспектив. Также как новая модель организационной деятельности не оставляет шанса для как самодостаточных, так и внешне зависимых концептуальных решений.",
                },
                {
                    url: Slide2,
                    title: "Slide 1",
                    caption: "В своём стремлении повысить качество жизни, они забывают, что социально-экономическое развитие влечет за собой процесс внедрения и модернизации укрепления моральных ценностей. Значимость этих проблем настолько очевидна, что существующая теория является качественно новой ступенью благоприятных перспектив. Также как новая модель организационной деятельности не оставляет шанса для как самодостаточных, так и внешне зависимых концептуальных решений.",
                },
                {
                    url: Slide3,
                    title: "Slide 1",
                    caption: "В своём стремлении повысить качество жизни, они забывают, что социально-экономическое развитие влечет за собой процесс внедрения и модернизации укрепления моральных ценностей. Значимость этих проблем настолько очевидна, что существующая теория является качественно новой ступенью благоприятных перспектив. Также как новая модель организационной деятельности не оставляет шанса для как самодостаточных, так и внешне зависимых концептуальных решений.",
                },
                {
                    url: Slide4,
                    title: "Slide 1",
                    caption: "В своём стремлении повысить качество жизни, они забывают, что социально-экономическое развитие влечет за собой процесс внедрения и модернизации укрепления моральных ценностей. Значимость этих проблем настолько очевидна, что существующая теория является качественно новой ступенью благоприятных перспектив. Также как новая модель организационной деятельности не оставляет шанса для как самодостаточных, так и внешне зависимых концептуальных решений.",
                },
            ]
        )
    }, []);

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = items.length - 1;
        } else {
            slideNumber = (slide + direction) % items.length;
        }

        setSlide(slideNumber);
    };

    const goToSlide = (number) => {
        setSlide(number % items.length);
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;

        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e) => {
        if (touchPosition === null) {
            return;
        }

        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (direction > 10) {
            changeSlide(1);
        }

        if (direction < -10) {
            changeSlide(-1);
        }

        setTouchPosition(null);
    }

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, slide]); // when images uploaded or slide changed manually we start timer

    return (
        <div
            style={{ width, height }}
            className="slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                    items,
                }}
            >
                <Arrows />
                <img src={MainLogo} className="main-logo"/>
                <SlidesList />
                <Dots />
            </SliderContext.Provider>
        </div>
    );
};

Slider.propTypes = {
    autoPlay: PropTypes.bool,
    autoPlayTime: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};

Slider.defaultProps = {
    autoPlay: false,
    autoPlayTime: 5000,
    width: "100%",
    height: "100%"
};

export default Slider;