import SlideImage from "./SlideImage";

import "./../Slider.scss";

export default function Slide({data: {url, title, caption}}) {
    return (
        <div className="slide">
            <SlideImage src={url} title={title} caption={caption}/>
        </div>
    );
}