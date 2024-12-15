import React, { useState, useRef } from 'react';

const BedtimeStorySection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference to the audio element

  const handleAudioToggle = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      // If the audio is already playing, pause it. If it's paused or ended, play it.
      if (audioElement.paused || audioElement.ended) {
        audioElement.play()
          .then(() => {
            setIsPlaying(true); // Set state to playing
          })
          .catch((error) => {
            console.error("Error while trying to play the audio:", error);
          });
      } else {
        audioElement.pause();
        setIsPlaying(false); // Set state to paused
      }
    } else {
      console.error('Audio element not found.');
    }
  };

  return (
    <div className="bedtime-story-section">
      <div className="content-wrapper">
        <h2>Bedtime Story: The Enchanted Forest</h2>
        <p className="story-paragraph">
          Once upon a time, in a mystical land far away, there was an enchanted forest where the trees whispered ancient secrets. The air was thick with magic, and the stars above sparkled like diamonds. Deep in the heart of the forest lived creatures who had never been seen by humans. Every night, the forest would come alive with stories of the past, waiting to be told to those brave enough to listen...
        </p>
        <button className="read-more-btn">Read More</button>
        <div className="audio-controls">
          <button onClick={handleAudioToggle} className="audio-icon">
            🎧 {isPlaying ? 'Pause' : 'Play'}
          </button>
          <audio ref={audioRef}>
            <source src="/assets/audio/story.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default BedtimeStorySection;
