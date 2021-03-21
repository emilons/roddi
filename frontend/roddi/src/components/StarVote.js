import React, {Fragment, useState} from "react";


function StarVote(props) {
    const value = useState(props.value)


    //
    // bytt fra a tag til img og finn en annen måte å kjøre hover på
    //
    //
    
    function mValue(v) {
        console.log(v)
    }
    let starList = [1,2,3,4,5];
    if (value > 0) {
        return (
            <Fragment>
            {starList.map((element) => (
                (element <= value) ? 
                <a href={"javascript"+mValue(element)} key={"a"+element} className="starFilled"/> : <a href={"javascript"+mValue(element)} key={"a"+element} className="star" />
            ))}
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
            {starList.map((element) => (
                <a href={"javascript"+mValue(element)} key={"a"+element}  className="star"/>
            ))}
            </Fragment> 
        )
    }
}
export default StarVote;