import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { portfolioEvents } from '../utils/umami';
import { Link } from 'react-router-dom';
import BigButton from './bigButton';

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
    <div className="min-h-screen montserrat items-center justify-center bg-bianco flex flex-col">
      <div className="w-full h-full z-99 md:px-5 lg:block hidden relative" >
        <h2 className='text-scuro hidden md:block md:text-9xl font-extrabold  inter'>PANNELLO <br /> ADMIN</h2>
        <h2 className='text-scuro text-9xl block md:hidden font-extrabold absolute top-1/2 left-1/3 -translate-x-1/2 -rotate-90 z-[999] inter'>PANNELLO <br /> ADMIN</h2>
      </div>
      <div id='login' className="md:max-w-3/4 w-full p-8 flex justify-center items-center space-y-8">
        <section className=' rounded-md p-4 pb-5'>
          <h2 className="mt-6 inter  text-center text-7xl font-bold text-gray-900">
            Accesso al pannello
          </h2>
          <hr className='my-4 text-scuro' />
          <p className="text-center text-scuro font-normal text-3xl">
            Oltre questa sezione c'è il pannello di <span className='font-medium italic'>Jader</span>, per aggiungere dinamicamente progetti e competenze nel sito, controllare le analytics del sito e molto altro.
          </p>
          <div className=''>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md  grid grid-cols-1 md:grid-cols-2 gap-5 space-y-2">
              <div className='relative'>
                <span className='absolute -top-1/3 -left-4 bg-gradient-scuro z-99 px-3 text-2xl font-light text-bianco rounded-tl-md'>Email</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border-scuro border-1 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-2xl font-light "
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
              <span className='absolute -top-1/3 -left-4 bg-gradient-scuro z-99 px-3 text-2xl font-light text-bianco rounded-tl-md'>Password</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border-scuro border-1 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-2xl font-light "
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className='flex flex-col justify-center items-center gap-1'>
              <button
                type="submit"
                disabled={loading}
                className="cta mt-5 mb-5 mx-auto w-auto"
              >
                <span className="span">{loading ? 'Accesso' : 'Accedi'}</span>
                <span className="second">
                    <svg
                        width="50px"
                        height="20px"
                        viewBox="0 0 66 43"
                        version="1.1"
                    >
                        <g
                            id="arrow"

                        >
                            <path
                                className="one"
                                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                fill="#FFFFFF"
                            ></path>
                            <path
                                className="two"
                                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                fill="#FFFFFF"
                            ></path>
                            <path
                                className="three"
                                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                fill="#FFFFFF"
                            ></path>
                        </g>
                    </svg>
                </span>
                
              </button>
              <BigButton text='Torna al sito' href='/' />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
