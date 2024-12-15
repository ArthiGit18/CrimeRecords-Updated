import React, { useState } from 'react';

const cardsData = [
    {
        title: 'The Heist of the Century',
        image: '/assets/top/1 (1).jpg',
        description: 'A daring robbery that shocked the world, where millions were stolen right under the noses of the authorities.',
    },
    {
        title: 'The Mystery of the Vanishing Heiress',
        image: '/assets/top/1 (2).jpg',
        description: 'A young heiress disappears without a trace, leaving behind only a trail of secrets and unanswered questions.',
    },
    {
        title: 'The Cold Case of the Silent Witness',
        image: '/assets/top/1 (3).jpg',
        description: 'A murder mystery where a key witness remained silent for decades, and the truth was finally uncovered in an unexpected twist.',
    },
    {
        title: 'The Cold Case of the Silent Witness',
        image: '/assets/top/1 (4).jpg',
        description: 'A murder mystery where a key witness remained silent for decades, and the truth was finally uncovered in an unexpected twist.',
    },
];

const Cards = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [dialogData, setDialogData] = useState(null);

    const openDialog = (card) => {
        setDialogData(card);
    };

    const closeDialog = () => {
        setDialogData(null);
    };
    
    console.log("setExpandedIndex", setExpandedIndex);

    return (
        <div className='card_section'>
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
                            <p>{expandedIndex === index ? card.description : `${card.description.substring(0, 100)}...`}</p>
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
                        <button className="subscribe-button">Know More</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
