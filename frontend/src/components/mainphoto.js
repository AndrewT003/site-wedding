import React from "react";
import "../static/style/fonts_for_elements.css"
import "../static/style/main_photo.css";
import "../static/style/main-style-adaptation.css"
import mainphoto from "../static/img/ring-img-under-date.png"
import mainphoto2 from "../static/img/our_main_photo.png"
import heart_photo from "../static/img/hearts_under_photo.png"
import useScrollAnimation from "../static/js/useScrollAnimation";

function Mainphoto(){
    const { elementRef, isVisible } = useScrollAnimation();

    return (
        <div ref={elementRef} className={`mainphoto-wrapper ${isVisible ? 'visible' : ''}`}>
        <div className={"d-flex flex-row align-items-space-between"}>

            <div  id={"left_block"}>

                <div id={"horizontal_line"}>
                    <h1 id={"main_wedding_date"}>18.07.2026</h1>
                </div>

            <div id={"vertical_line"}>
                <img
                    id={"ring_photo"}
                    src={mainphoto} alt=""
                    style={{width:'80px',height:'80px'}}/>

                {/* Фото для мобільних - всередині vertical_line */}
                <div className="mobile_photos">
                    <img
                        src={mainphoto2} alt=""
                        className="mobile_main_photo"/>
                    <img
                        src={heart_photo}
                        alt=""
                        className="mobile_heart_photo"/>
                </div>

                    <h1 className={"our_names_mainphoto"}>Андрій</h1>
                    <h1 className={"our_names_mainphoto"}>Та</h1>
                    <h1 className={"our_names_mainphoto"}>Ірина</h1>
            </div>

            </div>

            <div id={"right_block"} className="d-flex flex-column align-items-center">
                <img
                    src={mainphoto2} alt=""
                    style={{width:'300px',height:'400px'}}/>
                <img
                src={heart_photo}
                alt=""
                style={{width:'150px',height:'150px'}}/>
            </div>
        </div>
        </div>
    )
}

export default Mainphoto;