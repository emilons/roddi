import React, {Fragment} from "react";
import Star from "./Star";

/**
 * A non-interactive version of StarVote component: 
 * A row of 5 Star components. Displays the priority level of a member's vote
 * @param {int} props value - Value of a member's vote
 * @returns render of StarVoteRender
 */
function StarVoteRender(props) {
    const value = props.value;

    return (
        <Fragment>
            <Star id={1} value={value}/>
            <Star id={2} value={value}/>
            <Star id={3} value={value}/>
            <Star id={4} value={value}/>
            <Star id={5} value={value}/>
        </Fragment>
    );
}
export default StarVoteRender;