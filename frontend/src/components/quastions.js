import React, { useState } from "react";
import ReactDOM from "react-dom";
import '../static/style/quastions.css'
import '../static/style/fonts_for_elements.css'
import useScrollAnimation from "../static/js/useScrollAnimation";

function Quastions() {
    const { elementRef, isVisible } = useScrollAnimation();
    const [formData, setFormData] = useState({
        name: '',
        willAttend: '',
        drinks: [],
        food: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('success'); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDrinkChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            drinks: checked
                ? [...prev.drinks, value]
                : prev.drinks.filter(d => d !== value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Використовуємо змінну оточення для API URL
        const API_URL = process.env.REACT_APP_API_URL || '';

        try {
            const response = await fetch(`${API_URL}/api/submit-questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const result = await response.json();

            if (response.ok) {
                setModalType('success');
                // Встановлюємо повідомлення залежно від відповіді
                const message = formData.willAttend === 'yes'
                    ? 'Щиро дякуємо за вашу відповідь! Чекаємо на вас!'
                    : 'Щиро дякуємо за вашу відповідь';
                setModalMessage(message);
                setShowModal(true);
                // Очищаємо форму після успішної відправки
                setFormData({
                    name: '',
                    willAttend: '',
                    drinks: [],
                    food: ''
                });
            } else {
                setModalType('error');
                setModalMessage('Помилка: ' + result.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setModalType('error');
            setModalMessage('Помилка відправки форми. Спробуйте ще раз.');
            setShowModal(true);
        }
    };

    return (
        <>
            <div ref={elementRef} className={`quastions_section ${isVisible ? 'visible' : ''}`}>
                <h1 className="quastions_title">Просимо відповісти на декілька запитань, які ми підготували до 15 червня:</h1>
                <div className="quastions_container">
                    <form onSubmit={handleSubmit}>
                        <div className="quastion_item">
                            <label className="quastion_label">Як вас звати?</label>
                            <input
                                type="text"
                                name="name"
                                className="quastion_input"
                                placeholder="Ваше ім'я та прізвище"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="quastion_item">
                            <label className="quastion_label">Чи будете присутні?</label>
                            <div className="quastion_radio_group">
                                <label className="radio_option">
                                    <input
                                        type="radio"
                                        name="willAttend"
                                        value="yes"
                                        checked={formData.willAttend === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <span>Так, буду</span>
                                </label>
                                <label className="radio_option">
                                    <input
                                        type="radio"
                                        name="willAttend"
                                        value="no"
                                        checked={formData.willAttend === 'no'}
                                        onChange={handleChange}
                                    />
                                    <span>На жаль, не зможу</span>
                                </label>
                            </div>
                        </div>

                        <div className="quastion_item">
                            <label className="quastion_label">Що будете пити?</label>
                            <div className="quastion_checkbox_group">
                                {['Вино', 'Шампанське','Горілка', 'Коньяк', 'Безалкогольні напої'].map(drink => (
                                    <label key={drink} className="checkbox_option">
                                        <input
                                            type="checkbox"
                                            value={drink}
                                            checked={formData.drinks.includes(drink)}
                                            onChange={handleDrinkChange}
                                        />
                                        <span>{drink}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="quastion_submit">
                            Надіслати
                        </button>
                    </form>
                </div>
                <div className="last_text">
                    <h1 className={"last_text_h1"}>З Любов'ю Андрій та Ірина</h1>
                </div>
            </div>

            {showModal && ReactDOM.createPortal(
                <div className="modal_overlay" onClick={() => setShowModal(false)}>
                    <div className={`modal_content ${modalType}`} onClick={(e) => e.stopPropagation()}>
                        <div className="modal_message">{modalMessage}</div>
                        <button className="modal_close_btn" onClick={() => setShowModal(false)}>
                            Закрити
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

export default Quastions