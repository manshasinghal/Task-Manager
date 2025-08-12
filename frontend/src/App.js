import { useState, useEffect } from 'react';
import Home from './Home';
import Signup from './Signup';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleUserLogin = (newUserData) => {
    setUser(newUserData);
    setUserId(newUserData.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 font-poppins text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-900 via-indigo-800 to-slate-900 relative overflow-hidden flex flex-col items-center font-poppins px-4 sm:px-6 lg:px-8 py-10">
      {/* subtle decorative blur blobs */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-16 h-72 w-72 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 bg-indigo-500/10 rounded-full blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl w-full backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl shadow-black/30 rounded-3xl px-6 sm:px-10 py-10 relative z-10">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-200 to-indigo-200 drop-shadow-md mb-2">
          Weekly Task Manager
        </h1>
        <p className="text-center text-sm sm:text-base text-indigo-100/80 mb-10 max-w-xl mx-auto">
          Plan, focus, and celebrate progress. A refreshed interface for clarity & momentum.
        </p>
        {user ? (
          <Home user={user} setUser={setUser} userId={userId} />
        ) : (
          <Signup onSignupSuccess={handleUserLogin} />
        )}
      </div>
      <footer className="mt-10 text-indigo-200/50 text-xs tracking-wide">
        Crafted for productivity • {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
