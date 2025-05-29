import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import Auth from './components/Auth';
import ExtendedProfile from './components/ExtendedProfile';
import Profile from './components/Profile';
import { supabase } from './supabaseClient';
import StudentLoanCalculator from './components/StudentLoanCalculator';
import Explore from './components/Explore';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

export const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

// Wrapper component to use useLocation with AnimatePresence
const AnimatedRoutes = ({ session, profileCompleted }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Auth /></PageTransition>} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            session ? (
              profileCompleted ? (
                <PageTransition><Layout /></PageTransition>
              ) : (
                <Navigate to="/complete-profile" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/explore" element={<PageTransition><Explore /></PageTransition>} />
          <Route path="dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="transactions" element={<PageTransition><Transactions /></PageTransition>} />
          <Route path="student-loan-calculator" element={<PageTransition><StudentLoanCalculator /></PageTransition>} />
          <Route path="profile" element={<PageTransition><Profile /></PageTransition>} />
        </Route>

        {/* Extended Profile Route */}
        <Route
          path="/complete-profile"
          element={
            session ? (
              profileCompleted ? (
                <Navigate to="/explore" replace />
              ) : (
                <PageTransition><ExtendedProfile /></PageTransition>
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [session, setSession] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkProfileCompletion(session.user.id);
      } else {
        setProfileCompleted(false);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkProfileCompletion(session.user.id);
      } else {
        setProfileCompleted(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkProfileCompletion = async (userId) => {
    try {
      console.log('Checking profile for user:', userId);
      
      // First try to get the profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('Profile check response:', { data, error });

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('No profile found, creating new profile');
          // No profile found, create one with minimal required fields
          const newProfile = {
            id: userId,
            is_student: false,
            profile_completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          console.log('Creating new profile with data:', newProfile);

          const { error: insertError } = await supabase
            .from('profiles')
            .insert([newProfile]);
          
          if (insertError) {
            console.error('Error creating initial profile:', insertError);
            throw insertError;
          }
          setProfileCompleted(false);
        } else {
          console.error('Error checking profile:', error);
          throw error;
        }
      } else {
        console.log('Profile found:', data);
        setProfileCompleted(data?.profile_completed || false);
      }
    } catch (error) {
      console.error('Error in checkProfileCompletion:', error);
      setProfileCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ProfileContext.Provider value={{ profileCompleted, setProfileCompleted }}>
      <div className="flex h-screen bg-gray-100">
        <main className="flex-1 overflow-auto">
          <AnimatedRoutes session={session} profileCompleted={profileCompleted} />
        </main>
      </div>
    </ProfileContext.Provider>
  );
}

export default App;
