import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'John Doe',
    work: 'Detective',
    content: 'This website is an invaluable resource for anyone interested in criminal cases and forensic science. The information is thorough and detailed.',
  },
  {
    name: 'Jane Smith',
    work: 'Forensic Expert',
    content: 'I rely on this website for up-to-date forensic facts and case studies. It has helped me in my research and work immensely.',
  },
  {
    name: 'Mark Johnson',
    work: 'Crime Reporter',
    content: 'A fascinating and thrilling dive into the world of crime and justice. The cases and content are engaging and well-researched.',
  },
  {
    name: 'Linda Carter',
    work: 'Investigator',
    content: 'An incredible platform for both professionals and enthusiasts. I love how the site breaks down complicated cases and forensic facts.',
  },
  {
    name: 'David Williams',
    work: 'Lawyer',
    content: 'A fantastic resource for understanding the criminal justice system. The cases are intriguing, and the forensic information is top-notch.',
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically swipe testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    </div>
  );
};

export default Testimonial;
