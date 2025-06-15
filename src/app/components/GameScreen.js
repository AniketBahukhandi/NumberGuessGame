"use client";
import React from 'react';

const GameScreen = ({
  gameStarted, timeLeft, guess, setGuess,
  handlePlay, handleGuess, message, attempts,
  score, highScore, handleResetGame,
  handleResetHighScore, handleLogout
}) => {
  return (
    <div className="game-container">
      <h2>🎯 Number Guessing Game</h2>
      <p>Guess the number between 1 and 100</p>
      {gameStarted && <p>⏱ Time Left: {timeLeft}s</p>}

      {!gameStarted && <button onClick={handlePlay}>▶️ Play</button>}
        {
        gameStarted && 
      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={e => setGuess(e.target.value)}
        disabled={!gameStarted || timeLeft === 0}
      />}
      { gameStarted && 
      <button onClick={handleGuess} disabled={!gameStarted || timeLeft === 0}>✅ Submit Guess</button>
        }

      <p className="message">{message}</p>
      <p>Attempts: {attempts}</p>
      <p>Current Score: {score}</p>
      <p>High Score: {highScore ?? '--'}</p>

      <button onClick={handleResetGame}> Reset Game</button>
      <button onClick={handleResetHighScore}>Reset High Score</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => alert('Leaderboard coming soon')}>Leaderboard</button>
    </div>
  );
};

export default GameScreen;