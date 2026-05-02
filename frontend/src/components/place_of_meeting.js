import React from "react";
import place_of_meeting from "../static/img/Place_of_meeting.png";
import "../static/style/place_of_meeting.css";
import useScrollAnimation from "../static/js/useScrollAnimation";

function PlaceOfMeeting() {
    const { elementRef, isVisible } = useScrollAnimation();

    return (
        <div ref={elementRef} className={`place_of_meeting_section ${isVisible ? 'visible' : ''}`}>
            <h1 className={"text_place_of_meeting text-center mt-5"}>Місце проведення</h1>
            <img
            className="place_of_meeting_img"
            src={place_of_meeting}
            alt="place_of_meeting img"
            style={{width:'100%',height:'100%'}}
            />
        </div>
    )
}
export default PlaceOfMeeting;