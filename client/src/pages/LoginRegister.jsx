import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRegister({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      onLogin(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="login-register">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
          </>
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>

      {error && <p className="status error">{error}</p>}

      <button className="switch-mode" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </main>
  );
}

export default LoginRegister;