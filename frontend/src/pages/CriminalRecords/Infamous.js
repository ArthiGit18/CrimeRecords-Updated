import React from 'react';
import Header from '../../common/Header';

const Infamous = () => {
    const cardsData = [
        { id: 1, title: 'Card Title 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', likes: 120, views: 300, image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Card Title 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', likes: 200, views: 500, image: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Card Title 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', likes: 150, views: 400, image: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Card Title 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', likes: 150, views: 400, image: 'https://via.placeholder.com/150' },
    ];

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Infamous Criminals', href: '/infamousCriminals' },
      ];

    return (


        <div className='search_wrapper'>
            <Header title="Infamous Criminals" breadcrumb={breadcrumbItems} />
            <div className='container'>
                {/* Search Bar */}

                <div className='searchbar'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='search_input'
                    />
                </div>

                {/* Search Cards */}
                <div className='search_cards'>
                    {cardsData.map((card) => (
                        <div key={card.id} className='card'>
                            <img
                                src={card.image}
                                alt='Placeholder'
                                className='card_image'
                            />
                            <div className='card_content'>
                                <h3 className='card_title'>{card.title}</h3>
                                <p className='card_description'>
                                    {card.description}
                                </p>
                                <div className='card_actions'>
                                    <button className='view_more_button'>View More</button>
                                    <div className='card_stats'>
                                        <span className='likes'>❤️ {card.likes}</span>
                                        <span className='views'>👁️ {card.views}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Infamous;
