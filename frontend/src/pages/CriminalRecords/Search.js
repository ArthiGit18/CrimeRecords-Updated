import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../common/Header';
import { useNavigate } from 'react-router-dom';
import { fetchSearchResults } from '../../api/searchApi'; // Import the function to fetch results

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleViewMore = (id) => {
        navigate(`/view-detail/${id}`); // Navigate to the DetailView page with the specific id
    };

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Search', href: '/search' },
    ];

    const handleSearch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSearchResults(searchQuery);
            setCardsData(data);
        } catch (err) {
            setError('Error fetching search results.');
        } finally {
            setLoading(false);
        }
    }, [searchQuery]); // Memoize based on searchQuery
    
    useEffect(() => {
        // Fetch data on initial load (with an empty search)
        handleSearch();
    }, [handleSearch]);

    return (
        <div className="search_wrapper">
            <Header title="Search by Name" breadcrumb={breadcrumbItems} />
            <div className="container">
                {/* Search Bar */}
                <div className="searchbar">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search_input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search_button" onClick={handleSearch}>
                        Search
                    </button>
                </div>

                {/* Loading and Error States */}
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}

                {/* Search Cards */}
                <div className="search_cards">
                    {cardsData.length > 0 ? (
                        cardsData.map((card) => (
                            <div key={card.id} className="card">
                                <img
                                    src={card.mainImage || 'https://via.placeholder.com/150'}
                                    alt={card.title}
                                    className="card_image"
                                />
                                <div className="card_content">
                                    <h3 className="card_title">{card.title}</h3>
                                    <p className="card_description">{card.description}</p>
                                    <div className="card_actions">
                                    <button
                                            className="view_more_button"
                                            onClick={() => handleViewMore(card.id)} // Trigger navigation on button click
                                        >
                                            View More
                                        </button>
                                        <div className="card_stats">
                                            <span className="likes">❤️ {card.likes}</span>
                                            <span className="views">👁️ {card.views}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
