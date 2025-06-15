"use client";
import React, { useState, useEffect } from 'react';
import './game.css';

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const Game = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [number, setNumber] = useState(getRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Make your first guess!');
  const [attempts, setAttempts] = useState(0);
  const [highScore, setHighScore] = useState(null); // don't access localStorage directly here
  const [score, setScore] = useState('--');
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

  // ✅ Safely load high score from localStorage on client only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedScore = localStorage.getItem('highScore');
      if (storedScore) {
        setHighScore(Number(storedScore));
      }
    }
  }, []);

  // ⏱️ Timer effect
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setMessage(`Time's up! The number was ${number}`);
      setGameStarted(false);
    }
  }, [timeLeft, gameStarted, number]);

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handlePlay = () => {
    setGameStarted(true);
    setTimeLeft(60);
    setMessage('Make your first guess!');
    setNumber(getRandomNumber());
    setAttempts(0);
    setScore('--');
    setGuess('');
  };

  const handleGuess = () => {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (numGuess === number) {
      const currentScore = 100 - nextAttempts;
      setMessage(`🎉 Correct! You guessed it in ${nextAttempts} tries.`);
      setScore(currentScore);
      setGameStarted(false);

      if (!highScore || currentScore > highScore) {
        localStorage.setItem('highScore', currentScore);
        setHighScore(currentScore);
      }
    } else {
      setMessage(numGuess < number ? 'Too low!' : 'Too high!');
    }

    setGuess('');
  };

  const handleResetGame = () => {
    setNumber(getRandomNumber());
    setAttempts(0);
    setGuess('');
    setMessage('Make your first guess!');
    setScore('--');
    setGameStarted(false);
    setTimeLeft(60);
  };

  const handleResetHighScore = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('highScore');
    }
    setHighScore(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <div className="auth-links">
          <a href="#">Sign Up</a>
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h2>🎯 Number Guessing Game</h2>
      <p>Guess the number between 1 and 100.</p>
      {gameStarted && <p>⏱️ Time Left: {timeLeft}s</p>}

      {!gameStarted && (
        <button onClick={handlePlay} className="play-btn">▶️ Play</button>
      )}

      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={e => setGuess(e.target.value)}
        disabled={!gameStarted || timeLeft === 0}
      />
      <button onClick={handleGuess} disabled={!gameStarted || timeLeft === 0}>✅ Submit Guess</button>

      <p className="message">{message}</p>
      <p>Attempts: {attempts}</p>
      <p>Current Score: {score}</p>
      <p>🏆 High Score: {highScore ?? '--'}</p>

      <button onClick={handleResetGame}>🔁 Reset Game</button>
      <button onClick={handleResetHighScore}>❌ Reset High Score</button>
      <button onClick={handleLogout}>🚪 Logout</button>
      <button onClick={() => alert('Leaderboard feature coming soon!')}>📊 Leaderboard</button>
    </div>
  );
};

export default Game;
