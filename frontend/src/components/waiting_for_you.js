import React from "react";
import "../static/style/waiting_for_you.css"
import useScrollAnimation from "../static/js/useScrollAnimation";

function WaitingForYou(){
    const { elementRef, isVisible } = useScrollAnimation();

    // Липень 2026 - календар
    const july2026 = [
        [null, null, 1, 2, 3, 4, 5],      // Перший тиждень (1 липня - середа)
        [6, 7, 8, 9, 10, 11, 12],         // Другий тиждень
        [13, 14, 15, 16, 17, 18, 19],     // Третій тиждень (18 липня - п'ятниця)
        [20, 21, 22, 23, 24, 25, 26],     // Четвертий тиждень
        [27, 28, 29, 30, 31, null, null]  // П'ятий тиждень
    ];

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    const weddingDay = 18; // Дата весілля

    return(
        <div ref={elementRef} className={`waiting_wrapper ${isVisible ? 'visible' : ''}`}>
            {/* Заголовок з білим фоном */}
            <div className="waiting_header">
            </div>

            {/* Секція з фото та календарем */}
            <div className="waiting_for_you_section">
                <div className="waiting_overlay"></div>
                <div className="waiting_content">
                    {/* Календар */}
                    <div className="calendar_container">

                    {/* Дні тижня */}
                    <div className="calendar_weekdays">
                        {weekDays.map((day, index) => (
                            <div key={index} className="calendar_weekday">{day}</div>
                        ))}
                    </div>

                    {/* Дні місяця */}
                    <div className="calendar_days">
                        {july2026.map((week, weekIndex) => (
                            <div key={weekIndex} className="calendar_week">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`calendar_day ${day === weddingDay ? 'wedding_day' : ''} ${day === null ? 'empty' : ''}`}
                                    >
                                        {day !== null && (
                                            <span className="day_number">{day}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                    <p className="waiting_date_text">18 Липня 2026 року</p>
                </div>
            </div>
        </div>
    )
}

export default WaitingForYou;
