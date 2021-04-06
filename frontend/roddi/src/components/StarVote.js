import React, {Fragment, useState, useEffect} from "react";
import Star from "./Star";
import star from "../images/star.png";
import starFilled from "../images/star_filled.png";

function StarVote(props) {
    //const [value, setValue] = useState(props.value);
    let value = props.value;
    const data = [1,2,3,4,5]

    function fillStars(v) {
        data.forEach((element) => {
            let e = document.getElementById("star"+element)
            if (element <= v) {
                e.src = starFilled;
                e.className = "starFilled";
            }
            else {
                e.src = star;
                e.className = "star";
            }
        })
    }

    function handleClick(e) {
        value = e.target.alt
        fillStars(value);
        props.onClick(value);
    }

    return (
        <Fragment>
            {data.map((element) => (
                <Star key={"star"+element} id={element} interactive={true}
                onClick={handleClick} value={value}/>
            ))}    
        </Fragment>
    )
}
export default StarVote;