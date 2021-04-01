import React, {Fragment, useState, useEffect} from "react";
import star from "../images/star.png";
import starFilled from "../images/star_filled.png";

function Star(props) {
    const [number, setNumber] = useState(0)
    const [starClass, setStarClass] = useState("") //isFilled ? "starFilled" : "star";
    const [starSource, setStarSource] = useState(star) //isFilled ? starFilled : star;


    useEffect(() => {
        initFill();
        setNumber(props.id);
    }, []);

    function initFill() {
        if (props.interactive) {
            props.id <= props.value ? setStarClass("starFilled") : setStarClass("star");
        }
        else {
            setStarClass("starRender");
        }
        props.id <= props.value ? setStarSource(starFilled) : setStarSource(star);
    } 
    

    function handleClick(e) {
        // Checks whether this star should be interactive, handles click if it is
        if (props.interactive) {
            props.onClick(e);
        }
    }

    return(
        <Fragment>
            <img src={starSource} 
                id={"star"+number}
                className={starClass}
                alt={number}
                onClick={handleClick}
                /> 
        </Fragment>
    )   
}
export default Star;