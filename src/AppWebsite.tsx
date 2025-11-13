import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LandingPage } from './pages/LandingPage';
import { WaitlistForm } from './components/website/WaitlistForm';
import './index.css';

/**
 * Simplified App component for static website generation (GitHub Pages)
 * Only includes the landing page without authentication or protected routes
 * Always uses dark mode
 */
function AppWebsite() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  // Force dark mode for website
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  // Intercept navigation clicks and show waitlist form
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      
      if (button && (
        button.textContent?.includes('Sign In') ||
        button.textContent?.includes('Start Free Trial') ||
        button.textContent?.includes('Get Started')
      )) {
        e.preventDefault();
        e.stopPropagation();
        setShowWaitlist(true);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Redirect all other routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showWaitlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWaitlist(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowWaitlist(false)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <WaitlistForm onClose={() => setShowWaitlist(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default AppWebsite;

