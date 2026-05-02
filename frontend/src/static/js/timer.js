import React, { useEffect, useState, useRef } from "react";

const CountdownTimer = () => {
    const targetDate = new Date("2026-07-18T12:00");
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const checkVisibility = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight && rect.bottom > 0) {
                    setIsVisible(true);
                }
            }
        };

        checkVisibility();
        window.addEventListener('scroll', checkVisibility);

        return () => window.removeEventListener('scroll', checkVisibility);
    }, []);

    return (
        <div style={{
            position: "relative",
            textAlign: "center",
            minHeight: "150px",
            paddingTop: "40px"
        }}>
            <span
                ref={elementRef}
                className={`fly-text ${isVisible ? 'visible' : ''}`}
                style={{
                    fontSize: "30px",
                    position: "absolute",
                    right: "50px",
                    top: "0"
                }}
            >
                ЧЕРЕЗ
            </span>

            <p className={"time_left"} style={{ fontSize: "24px", margin: 0 }}>
                {timeLeft.days} днів {timeLeft.hours} годин{" "}
                {timeLeft.minutes} хвилин
            </p>
        </div>
    );
};

export default CountdownTimer;