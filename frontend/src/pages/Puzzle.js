import React, { useState } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";

const PuzzleGameSection = () => {
  const [text, setText] = useState("Unpuzzle the pieces!!");
  const [currentImage, setCurrentImage] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  // Images array with URLs for each puzzle image
  const images = [
    
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5",  // Image 1
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",  // Image 2
    "https://images.unsplash.com/photo-1589286945863-49e2d84d8e89",  // Image 3
  ];

  // This function is triggered when the puzzle is solved
  const handleSolved = () => {
    setText("Congratulations!! You solved the puzzle!");
    setIsSolved(true);  // Mark the puzzle as solved
  };

  // This function resets the game and shows the next unsolved puzzle
  const handleRematch = () => {
    setCurrentImage((prev) => (prev + 1) % images.length); // Cycle to the next image
    setText("Unpuzzle the pieces!!"); // Reset the text
    setIsSolved(false); // Reset the solved state
  };

  return (
    <div className="puzzle-game-section">
      <h2>{text}</h2>
      <p className="description">Challenge yourself to solve the jigsaw puzzle. Click "Rematch" for a new image!</p>

      {/* Display the puzzle */}
      <JigsawPuzzle
        imageSrc={images[currentImage]}  // Display the current image
        rows={3}
        columns={3}
        onSolved={handleSolved}  // Triggered when the puzzle is solved
        className="jigsaw-puzzle"
      />

      {/* Show the Rematch button if the puzzle is solved */}
      {isSolved && (
        <button className="rematch-btn" onClick={handleRematch}>
          Rematch
        </button>
      )}
    </div>
  );
};

export default PuzzleGameSection;
