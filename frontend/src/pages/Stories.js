import React, { useState, useEffect } from 'react';
import { fetchCards } from '../api/cardApi'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const Cards = () => {
    const [cardsData, setCardsData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [dialogData, setDialogData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadCards = async () => {
            try {
                const data = await fetchCards();
                setCardsData(data);
            } catch (error) {
                console.error('Error loading cards:', error);
            }
        };

        loadCards();
    }, []);

    const openDialog = (card) => {
        setDialogData(card);
    };

    const closeDialog = () => {
        setDialogData(null);
    };

    const handleKnowMore = (_id) => {
        navigate(`/payment/${_id}`);
    };

    return (
        <div className="card_section">
            <h2>Tales of the Unexplained: True Stories of Mystery</h2>
            <div className="cards-wrapper">
                <div className="cards-container">
                    {cardsData.map((card, index) => (
                        <div
                            key={index}
                            className={`card 
                                ${hoveredIndex === null || hoveredIndex === index ? 'active' : ''} 
                                ${hoveredIndex !== null && hoveredIndex !== index ? 'blurred' : ''}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img src={card.image} alt={card.title} />
                            <h3>{card.title}</h3>
                            <p>{card.description.substring(0, 100)}...</p>
                            <button onClick={() => openDialog(card)} className="read-more">
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {dialogData && (
                <div className="dialog-overlay" onClick={closeDialog}>
                    <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                        <img src={dialogData.image} alt={dialogData.title} />
                        <h3>{dialogData.title}</h3>
                        <p>Unlock the Story Subscription starting from $34 for 1 Month</p>
                        <button onClick={closeDialog} className="close-button">Close</button>
                        <button
                            onClick={() => handleKnowMore(dialogData._id)}
                            className="subscribe-button"
                        >
                            Know More
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
