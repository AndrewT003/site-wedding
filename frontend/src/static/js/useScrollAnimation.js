import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook для анімацій при скролі
 * @param {Object} options - Налаштування Intersection Observer
 * @returns {Object} - ref для елемента та стан видимості
 */
const useScrollAnimation = (options = {}) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Коли елемент стає видимим, встановлюємо isVisible в true
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Після спрацювання анімації можна відключити observer
                    if (elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                }
            },
            {
                threshold: 0.1, // Елемент вважається видимим, коли 10% його видно
                rootMargin: '0px 0px -50px 0px', // Трохи раніше спрацьовує
                ...options
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return { elementRef, isVisible };
};

export default useScrollAnimation;
