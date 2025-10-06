import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { portfolioEvents } from '../utils/umami';
import jader from '../../immagini/AVATAR/1.jpg';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

    try {
      // Controlla se l'utente esiste nel database
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('role', 'admin')
        .single();

      if (userError || !user) {
        throw new Error('Credenziali non valide');
      }

      // Verifica la password
      if (email === user.email && password === user.password) {
        localStorage.setItem('admin_user', JSON.stringify(user));
        // Traccia il login admin
        portfolioEvents.adminLogin();
        onLoginSuccess(user);
      } else {
        throw new Error('Credenziali non valide');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    };

    return (
        <div className="min-h-screen montserrat items-center justify-center bg-white  grid md:grid-cols-2">
            <img src={jader} alt="Logo" className="w-full h-full object-cover" />
            <div className="max-w-md w-full p-8 flex justify-center items-center space-y-8">
                <section className='shadow-lg rounded-md p-4'>
                <div className=''>
                    <h2 className="mt-6  montserrat text-center text-3xl font-bold text-gray-900">
                        Accesso al pannello
                    </h2>
                    <hr className='my-4 text-scuro' />
                    <p className="text-center text-md text-gray-600">
                        Accedi alla dashboard per aggiungere contenuti, modificare, eliminare e visualizzare le analytics del sito.  
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm space-y-">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-scuro-2 text-white hover:bg-scuro-2 transition-all duration-300 hover:scale-95"
                        >
                            {loading ? 'Accesso in corso...' : 'Accedi'}
                        </button>
                        <Link to="/" className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-scuro-2 text-white hover:bg-scuro-2 transition-all duration-300 hover:scale-95 mt-1'>Torna al sito</Link>
                    </div>
                </form>
                <hr className='my-4 text-scuro' /> 
                <p className='text-center text-sm mt-3 font-medium text-gray-600'>* Area riservata </p>
                </section>
            </div>
        </div>
    );
};

export default Login;
