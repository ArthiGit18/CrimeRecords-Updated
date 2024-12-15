import React from 'react';

const topPicksData = [
  {
    id: 1,
    image: '/assets/top/1 (1).jpg',
    title: 'Mystery of the Abandoned Warehouse',
    description: 'Discover the chilling events that transpired in the deserted warehouse.',
    likes: 120,
    views: 3500,
  },
  {
    id: 2,
    image: '/assets/top/1 (2).jpg',
    title: 'Infamous Heist Chronicles',
    description: 'Relive the most daring heists that stunned the world.',
    likes: 200,
    views: 4200,
  },
  {
    id: 3,
    image: '/assets/top/1 (3).jpg',
    title: 'Unsolved Case Files',
    description: 'Dive into the most puzzling cold cases still haunting detectives.',
    likes: 95,
    views: 2800,
  },
  {
    id: 4,
    image: '/assets/top/1 (4).jpg',
    title: 'Legends of the Underworld',
    description: 'Explore the lives of notorious criminals who ruled the streets.',
    likes: 150,
    views: 4000,
  }
];

const TopPicks = () => {
  return (
    <section className="top_picks_section">
      <div className="container">
        <h2>Top Picks</h2>
        <div className="card_grid">
          {topPicksData.map((pick) => (
            <div key={pick.id} className="card">
              <div className="card_image">
                <img src={pick.image} alt={pick.title} />
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
      </div>
    </section>
  );
};

export default TopPicks;
