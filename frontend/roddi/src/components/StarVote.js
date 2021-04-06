import React, {Fragment} from "react";
import Star from "./Star";
import star from "../images/star.png";
import starFilled from "../images/star_filled.png";

/**
 * A row of 5 Star components. Displays the priority level of a member's vote
 * @param {int} props value - Value of a member's vote
 * @returns render of StarVote
 */
function StarVote(props) {
    let value = props.value;
    const data = [1,2,3,4,5]

    /**
     * Fill all the stars including and before the one that was clicked.
     * @param {int} v - which star was clicked
     */
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

    /**
     * Click handler
     * @param {GUI-Object} e - e.target identifies the GUI element that was clicked
     */
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