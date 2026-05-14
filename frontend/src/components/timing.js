import React from "react";
import ring_timing from "../static/img/ring_timing.png"
import church_timing from "../static/img/church_timing.png"
import restaurant_timing from "../static/img/restouran_timing.png"
import "../static/style/timing.css"
import useScrollAnimation from "../static/js/useScrollAnimation";

function Timing(){
    const { elementRef, isVisible } = useScrollAnimation();

    return (
        <div className="timing">
            <div ref={elementRef} className={`timeline ${isVisible ? 'visible' : ''}`}>

                <div className="timeline-line" />

                <div className="timeline-item">
                    <div className="timeline-image">
                        <img src={ring_timing} alt="ring_timing" />
                    </div>

                    <div className="timeline-dot" />

                    <div className="timeline-content">
                        <div className="time">12:00</div>
                        <div className="label">ЗАГС</div>
                        <div className="address">проспект Академіка Глушкова, 1к8, Павильон 8</div>
                    </div>
                </div>

                <div className="timeline-item">
                    <div className="timeline-image">
                        <img src={church_timing} alt="church_timing" />
                    </div>

                    <div className="timeline-dot" />

                    <div className="timeline-content">
                        <div className="time">13:30</div>
                        <div className="label">Вінчання</div>
                        <div className="address">вулиця Самійла Кішки, 3-a</div>
                    </div>
                </div>

                <div className="timeline-item">
                    <div className="timeline-image">
                        <img src={restaurant_timing} alt="restaurant_timing" />
                    </div>

                    <div className="timeline-dot" />

                    <div className="timeline-content">
                        <div className="time">15:30</div>
                        <div className="label">Ресторан</div>
                        <div className="address">Музейний провулок, 4</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Timing;