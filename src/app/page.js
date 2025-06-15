"use client";
import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import GameScreen from './components/GameScreen';

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

export default function Home() {
  const [screen, setScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [number, setNumber] = useState(getRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Make your first guess!');
  const [attempts, setAttempts] = useState(0);
  const [highScore, setHighScore] = useState(null);
  const [score, setScore] = useState('--');
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hs = localStorage.getItem('highScore');
      if (hs) setHighScore(Number(hs));
      const users = localStorage.getItem('users');
      if (users) setRegisteredUsers(JSON.parse(users));
    }
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setMessage(`⏰ Time's up! The number was ${number}`);
      setGameStarted(false);
    }
  }, [timeLeft, gameStarted, number]);

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) return setError('Fill all fields');
    if (password !== confirmPassword) return setError('Passwords do not match');
    if (registeredUsers[email]) return setError('Already registered');
    const newUsers = { ...registeredUsers, [email]: password };
    localStorage.setItem('users', JSON.stringify(newUsers));
    setRegisteredUsers(newUsers);
    alert('Signup successful');
    setScreen('login');
    setError('');
  };

  const handleLogin = () => {
    if (registeredUsers[email] === password) {
      setIsLoggedIn(true);
      setScreen('game');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleForgotPassword = () => {
    if (!email || !password || !confirmPassword) return setError('Fill all fields');
    if (!registeredUsers[email]) return setError('Email not found');
    if (password !== confirmPassword) return setError('Passwords do not match');
  
    const updatedUsers = { ...registeredUsers, [email]: password };
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setRegisteredUsers(updatedUsers);
    alert('Password reset successful');
    setScreen('login');
    setError('');
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
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) return setMessage('Enter number 1-100');
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (num === number) {
      const currentScore = 100 - nextAttempts;
      setMessage(`🎉 Correct in ${nextAttempts} attempts!`);
      setScore(currentScore);
      setGameStarted(false);
      if (!highScore || currentScore > highScore) {
        localStorage.setItem('highScore', currentScore);
        setHighScore(currentScore);
      }
    } else {
      setMessage(num < number ? 'Too low!' : 'Too high!');
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
    localStorage.removeItem('highScore');
    setHighScore(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setScreen('login');
  };

  return (
    screen !== 'game' ? (
      <AuthForm
        screen={screen}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        handleForgotPassword={handleForgotPassword}
        setScreen={setScreen}
        error={error}
      />
    ) : (
      <GameScreen
        gameStarted={gameStarted}
        timeLeft={timeLeft}
        guess={guess}
        setGuess={setGuess}
        handlePlay={handlePlay}
        handleGuess={handleGuess}
        message={message}
        attempts={attempts}
        score={score}
        highScore={highScore}
        handleResetGame={handleResetGame}
        handleResetHighScore={handleResetHighScore}
        handleLogout={handleLogout}
      />
    )
  );
}
