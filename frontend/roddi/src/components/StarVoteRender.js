import React, {Fragment, useState, useEffect} from "react";
import Star from "./Star";

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