import React, { useEffect, useState } from 'react';
import { fetchTopPicks } from '../api/topPicksApi'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const TopPicks = () => {
    const [topPicks, setTopPicks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getTopPicks = async () => {
            try {
                const data = await fetchTopPicks();
                setTopPicks(data);
            } catch (error) {
                console.error('Error loading Top Picks:', error);
            } finally {
                setLoading(false);
            }
        };

        getTopPicks();
    }, []);

    const handleViewDetail = (id) => {
        navigate(`/view-detail-topPicks/${id}`); // Redirect to the detail view page with _id in the URL
    };

    return (
        <section className="top_picks_section">
            <div className="container">
                <h2>Top Picks</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : topPicks.length > 0 ? (
                    <div className="card_grid">
                        {topPicks.map((pick) => (
                            <div key={pick.id} className="card" onClick={() => handleViewDetail(pick.id)}>
                                <div className="card_image">
                                    <img src={pick.mainImage} alt={pick.title} />
                                </div>
                                <div className="card_content">
                                    <h3>{pick.title}</h3>
                                    <p>{pick.description}</p>
                                </div>
                                <div className="card_footer">
                                    <span className="likes">👍 {pick.likes}</span>
                                    <span className="views">👁️ {pick.views}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No Top Picks available.</p>
                )}
            </div>
        </section>
    );
};

export default TopPicks;
