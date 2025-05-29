import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { CurrencyDollarIcon, CalculatorIcon, UserIcon, Bars3Icon, ArrowRightStartOnRectangleIcon, GlobeAltIcon, ChartBarIcon } from '@heroicons/react/24/outline';

// Dark mode context
const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for dark mode preference
    return localStorage.getItem('finwiz-dark') === 'true';
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('finwiz-dark', darkMode);
  }, [darkMode]);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) setAvatarUrl(data.avatar_url);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Overlay behind sidebar, only on mobile when open */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0BCDAA] text-white"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Sidebar */}
        
        <div className={`fixed lg:static w-64 h-full bg-gradient-to-b from-[#0BCDAA] to-[#05A6D4] text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          {/* Logo/Branding */}
          <div className="p-6 flex items-center gap-3 border-b border-[#05A6D4]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5a1 1 0 100 2 1 1 0 000-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            <h2 className="text-2xl font-bold tracking-tight">FinWiz</h2>
          </div>

          <nav className="flex-1 mt-6 flex flex-col gap-2">
            <ul className="flex-1 flex flex-col gap-1">

              {/* Explore */}
              <li className={`flex items-center ${currentPath === '/explore' ? 'bg-[#05A6D4] border-l-4 border-[#0BCDAA]' : 'hover:bg-[#05A6D4]/80'} py-3 px-6 rounded-r-lg transition-all`}>
                <Link to="/explore" className="flex items-center gap-3 w-full">
                  <GlobeAltIcon className="h-6 w-6 text-white" />
                  <span className="font-medium text-lg">Explore</span>
                </Link>
              </li>

              {/* Dashboard */}
              <li className={`flex items-center ${currentPath === '/dashboard' ? 'bg-[#05A6D4] border-l-4 border-[#0BCDAA]' : 'hover:bg-[#05A6D4]/80'} py-3 px-6 rounded-r-lg transition-all` }>
                <Link to="/dashboard" className="flex items-center gap-3 w-full">
                  <ChartBarIcon className="h-6 w-6 text-white" />
                  <span className="font-medium text-lg">Dashboard</span>
                </Link>
              </li>

              {/* Transactions */}
              <li className={`flex items-center ${currentPath === '/transactions' ? 'bg-[#05A6D4] border-l-4 border-[#0BCDAA]' : 'hover:bg-[#05A6D4]/80'} py-3 px-6 rounded-r-lg transition-all` }>
                <Link to="/transactions" className="flex items-center gap-3 w-full">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" />
                  <span className="font-medium text-lg">Budget Management</span>
                </Link>
              </li>

              {/* Student Loan Calculator */}
              <li className={`flex items-center ${currentPath === '/student-loan-calculator' ? 'bg-[#05A6D4] border-l-4 border-[#0BCDAA]' : 'hover:bg-[#05A6D4]/80'} py-3 px-6 rounded-r-lg transition-all` }>
                <Link to="/student-loan-calculator" className="flex items-center gap-3 w-full">
                  <CalculatorIcon className="h-6 w-6 text-white" />
                  <span className="font-medium text-lg">Student Loan Calculator</span>
                </Link>
              </li>

              {/* Profile */}
              <li className={`flex items-center ${currentPath === '/profile' ? 'bg-[#05A6D4] border-l-4 border-[#0BCDAA]' : 'hover:bg-[#05A6D4]/80'} py-3 px-6 rounded-r-lg transition-all` }>
                <Link to="/profile" className="flex items-center gap-3 w-full">
                  <UserIcon className="h-6 w-6 text-white" />
                  <span className="font-medium text-lg">Profile</span>
                </Link>
              </li>
            </ul>

            {/* Logout */}
            <div className="border-t border-[#05A6D4] mt-6 pt-4 flex flex-col gap-2">
              {/* Profile/avatar can be placed here if needed */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left py-3 px-6 rounded-r-lg hover:text-white hover:bg-red-600 transition-all font-semibold"
              >
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-white" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col w-full">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
};

export default Layout; 