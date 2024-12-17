import React, { useState, useEffect } from 'react';
import { fetchTestimonials } from '../api/testimonialApi'; // Adjust path as necessary

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                const data = await fetchTestimonials();
                setTestimonials(data);
            } catch (error) {
                console.error('Error loading testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTestimonials();
    }, []);

    // Automatically swipe testimonials every 5 seconds
    useEffect(() => {
        if (testimonials.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [testimonials]);

    // Handle previous and next button clicks
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    return (
        <div className="testimonial_section">
            <h2>What People Are Saying</h2>
            {loading ? (
                <p>Loading testimonials...</p>
            ) : testimonials.length > 0 ? (
                <div className="testimonial_wrapper">
                    <div className="testimonial_card">
                        <div className="testimonial_info">
                            <h4>{testimonials[currentIndex].name}</h4>
                            <p>{testimonials[currentIndex].work}</p>
                        </div>
                        <p>"{testimonials[currentIndex].content}"</p>
                    </div>

                    {/* Previous and Next Buttons */}
                    <button className="prev_btn" onClick={handlePrev}>❮</button>
                    <button className="next_btn" onClick={handleNext}>❯</button>
                </div>
            ) : (
                <p>No testimonials available.</p>
            )}
        </div>
    );
};

export default Testimonial;
