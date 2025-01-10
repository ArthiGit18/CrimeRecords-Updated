import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchForensicFacts } from '../api/forensicFactsApi'; // Adjust the path as needed

const ForensicFacts = () => {
    const [forensicFacts, setForensicFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
        const navigate = useNavigate();
    
        const handleViewMore = (_id) => {
            navigate(`/view-detail-forensic/${_id}`); // Navigate to the DetailView page with the specific id
        };
        const breadcrumbItems = [
            { label: 'Home', href: '/' },
            { label: 'Search', href: '/search' },
        ];
    

    useEffect(() => {
        const getForensicFacts = async () => {
            try {
                const data = await fetchForensicFacts();
                setForensicFacts(data);
            } catch (error) {
                console.error('Error loading Forensic Facts:', error);
            } finally {
                setLoading(false);
            }
        };

        getForensicFacts();
    }, []);

    return (
        <div className="forensic_facts_section">
            <h2>Forensic Facts</h2>
            <p>Discover the tools and techniques that bring criminals to justice.</p>
            {loading ? (
                <p>Loading...</p>
            ) : forensicFacts.length > 0 ? (
                <div className="facts_grid">
                    {forensicFacts.map((fact) => (
                        <div key={fact._id} className="fact_card">
                            <img src={fact.image} alt={fact.title} onClick={() => handleViewMore(fact._id)} />
                            <div className="card_content">
                                <h3>{fact.title}</h3>
                                <p>{fact.description}</p>
                                <div className="card_interactions">
                                    <span>👍 {fact.likes} Likes</span>
                                    <span>👁️ {fact.views} Views</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Forensic Facts available.</p>
            )}
        </div>
    );
};

export default ForensicFacts;
