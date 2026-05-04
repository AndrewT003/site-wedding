import React, { useState } from "react";
import "../static/style/dres_code.css"
import "../static/style/fonts_for_elements.css"
import useScrollAnimation from "../static/js/useScrollAnimation";

// Імпорт фото костюмів
import darkBlueCostume from "../static/img/dresscode/dark_blue_costume.png";
import grayCostume from "../static/img/dresscode/gray_costume.png";
import lightBlueCostume from "../static/img/dresscode/light_blue_costume.png";
import lightCostume from "../static/img/dresscode/light_costume.png";

function DressCode() {
    const { elementRef, isVisible } = useScrollAnimation();

    // Масив з даними про костюми та кольори
    const dressItems = [
        {
            id: 0,
            color: "#2B395C",
            colorName: "dark_blue",
            image: darkBlueCostume,
            title: "Темно-синій"
        },
        {
            id: 1,
            color: "#8D98AA",
            colorName: "white_gray",
            image: grayCostume,
            title: "Сірий"
        },
        {
            id: 2,
            color: "#92C3F0",
            colorName: "light_blue",
            image: lightBlueCostume,
            title: "Світло-блакитний"
        },
        {
            id: 3,
            color: "#E5D3C3",
            colorName: "light_yelolow",
            image: lightCostume,
            title: "Світло-бежевий"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Перехід до попереднього слайду
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? dressItems.length - 1 : prev - 1));
    };

    // Перехід до наступного слайду
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === dressItems.length - 1 ? 0 : prev + 1));
    };

    // Вибір конкретного слайду по кліку на коло
    const selectSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div ref={elementRef} className={`dres_code ${isVisible ? 'visible' : ''}`}>
            <h1 className={"dres_code_text"}>Дрес-код</h1>
            <h2 className={"dres_code_text"}>Ми будемо дуже вдячні, якщо ви оберете наряди у кольорах нашого весілля:</h2>

            <div className="dress_code_container">
                {/* Кольорові кола вертикально */}
                <div className="dress_code_colors_vertical">
                    {dressItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`circle_color_dress_code ${currentSlide === index ? 'active' : ''}`}
                            id={item.colorName}
                            onClick={() => selectSlide(index)}
                            title={item.title}
                        />
                    ))}
                </div>

                {/* Слайдер з фото костюмів */}
                <div className="dress_code_slider">
                    {/* Стрілка вліво */}
                    <button className="slider_arrow slider_arrow_left" onClick={prevSlide} aria-label="Попередній">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Контейнер зображення */}
                    <div className="slider_image_container">
                        <img
                            src={dressItems[currentSlide].image}
                            alt={dressItems[currentSlide].title}
                            className="slider_image"
                        />
                        <div className="slider_title">{dressItems[currentSlide].title}</div>
                    </div>

                    {/* Стрілка вправо */}
                    <button className="slider_arrow slider_arrow_right" onClick={nextSlide} aria-label="Наступний">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Індикатори слайдів */}
                    <div className="slider_dots">
                        {dressItems.map((item, index) => (
                            <button
                                key={item.id}
                                className={`slider_dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => selectSlide(index)}
                                aria-label={`Перейти до ${item.title}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <h2 className={"dres_code_text"}>Разом ми створимо це свято особливим!</h2>
            <h2 className={"dres_code_text"}>Приємним компліментом для нас буде, якщо ви замість квітів вирішите подарувати нам пляшку алкогольного напою для нашої колекції, яку ми відкриємо на найближчому нашому сімейному святі.</h2>
        </div>
    )
}

export default DressCode;
