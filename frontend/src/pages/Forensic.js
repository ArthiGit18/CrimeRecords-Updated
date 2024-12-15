import React from 'react';

const forensicFacts = [
  {
    img: '/assets/forensic/1 (1).jpg',
    title: 'DNA Analysis',
    description: 'Revolutionized solving crimes by matching suspects to crime scenes using genetic evidence.',
    likes: 120,
    views: 540,
  },
  {
    img: '/assets/forensic/1 (5).jpg',
    title: 'Fingerprint Detection',
    description: 'A vital method for identifying individuals using unique fingerprint patterns.',
    likes: 98,
    views: 450,
  },
  {
    img: '/assets/forensic/1 (4).jpg',
    title: 'Trace Evidence',
    description: 'Tiny fibers, hair, or debris help investigators connect suspects to crime scenes.',
    likes: 76,
    views: 370,
  },
  {
    img: '/assets/forensic/1 (3).jpg',
    title: 'Forensic Tools',
    description: 'Advanced tools like luminol and 3D imaging aid in uncovering hidden evidence.',
    likes: 150,
    views: 620,
  },
  {
    img: '/assets/forensic/1 (2).jpg',
    title: 'Ballistics',
    description: 'Examines firearms and bullets to establish links between weapons and crimes.',
    likes: 85,
    views: 400,
  },
];

const ForensicFacts = () => {
  return (
    <div className="forensic_facts_section">
      <h2>Forensic Facts</h2>
      <p>Discover the tools and techniques that bring criminals to justice.</p>
      <div className="facts_grid">
        {forensicFacts.map((fact, index) => (
          <div key={index} className="fact_card">
            <img src={fact.img} alt={fact.title} />
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
    </div>
  );
};

export default ForensicFacts;
