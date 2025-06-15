"use client";
import React from 'react';


const AuthForm = ({
  screen,
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleLogin,
  handleSignup,
  handleForgotPassword,
  setScreen,
  error
}) => {
  return (
    <div className="auth-container">
      <h2>
        {screen === 'login' ? 'Login' : screen === 'signup' ? 'Sign Up' : 'Forgot Password'}
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {(screen === 'login' || screen === 'signup') && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}

      {screen !== 'login' && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      )}

      {error && <p className="error-text">{error}</p>}

      {screen === 'login' && <button className="primary-btn" onClick={handleLogin}>Login</button>}
      {screen === 'signup' && <button className="primary-btn" onClick={handleSignup}>Sign Up</button>}
      {screen === 'forgot' && <button className="primary-btn" onClick={handleForgotPassword}>Reset Password</button>}

      <div className="auth-links">
        {screen === 'login' && (
          <>
            <a href="#" onClick={() => setScreen('signup')}>Don't have an account? Sign Up</a>
            <a href="#" onClick={() => setScreen('forgot')}>Forgot Password?</a>
          </>
        )}
        {screen !== 'login' && (
          <a href="#" onClick={() => setScreen('login')}>Back to Login</a>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
