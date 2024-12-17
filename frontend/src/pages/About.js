import React, { useEffect, useState } from 'react';
import { fetchAboutContent } from '../api/aboutApi'; // Adjust path as needed

const About = () => {
    const [aboutContent, setAboutContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAboutContent = async () => {
            try {
                const data = await fetchAboutContent();
                setAboutContent(data);
            } catch (error) {
                console.error('Error loading about content:', error);
            } finally {
                setLoading(false);
            }
        };

        getAboutContent();
    }, []);

    return (
        <section className="about_section">
            <div className="container">
                <div className="about_content">
                    {loading ? (
                        <p>Loading...</p>
                    ) : aboutContent.length > 0 ? (
                        aboutContent.map((item) => (
                            <div key={item._id}>
                                <h2>{item.title}</h2>
                                <p>{item.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No content available.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default About;
