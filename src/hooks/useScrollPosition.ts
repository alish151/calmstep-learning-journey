import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Store scroll positions by pathname
const scrollPositions = new Map<string, number>();

export const useScrollPosition = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Save scroll position when leaving the page
    const saveScrollPosition = () => {
      scrollPositions.set(location.pathname, window.scrollY);
    };

    // Add beforeunload and visibility change listeners
    window.addEventListener('beforeunload', saveScrollPosition);
    
    return () => {
      // Save position when unmounting
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Restore scroll position when navigating back
    if (navigationType === 'POP') {
      const savedPosition = scrollPositions.get(location.pathname);
      if (savedPosition !== undefined) {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          window.scrollTo(0, savedPosition);
        }, 0);
      }
    }
  }, [location.pathname, navigationType]);
};

export const saveScrollPosition = (pathname: string, position?: number) => {
  scrollPositions.set(pathname, position ?? window.scrollY);
};

export const getScrollPosition = (pathname: string): number => {
  return scrollPositions.get(pathname) || 0;
};

export const clearScrollPosition = (pathname: string) => {
  scrollPositions.delete(pathname);
};
