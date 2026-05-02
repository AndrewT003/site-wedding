import React from "react";
import "../static/style/visitors_text.css"
import useScrollAnimation from "../static/js/useScrollAnimation";

function Visitors_text(){
    const { elementRef, isVisible } = useScrollAnimation();

    return(
        <div ref={elementRef} className={`visitors_parallax_section ${isVisible ? 'visible' : ''}`}>
            <div className="visitors_text">
                <h1 className="text-center">Дорогі гості</h1>
                <h2 className="text-center">З величезною радістю запрошуємо вас стати частиною нашої казки.
                    Ми віримо та сподіваємося, що цей день стане гарним початком довгого та щасливого життя.</h2>
            </div>
        </div>
    )
}
export default Visitors_text;