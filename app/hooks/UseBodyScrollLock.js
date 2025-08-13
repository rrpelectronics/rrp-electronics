// hooks/UseBodyScrollLock.js
"use client"
import { useEffect } from 'react';

const UseBodyScrollLock = (isLocked, scrollableSelector = '.popup-content-scrollable') => {
    useEffect(() => {
        let timeoutId;
        let touchMoveHandler;

        if (isLocked) {
            // Add 1.5 second delay before locking
            timeoutId = setTimeout(() => {
                // Function to prevent body scroll
                const preventBodyScroll = () => {
                    // Store original body styles
                    const originalStyle = window.getComputedStyle(document.body);
                    const originalOverflow = originalStyle.overflow;
                    const originalPosition = originalStyle.position;
                    const originalTop = originalStyle.top;
                    const originalWidth = originalStyle.width;
                    
                    // Store current scroll position
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                    // Apply styles to prevent scrolling
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.top = `-${scrollTop}px`;
                    document.body.style.width = '100%';
                    
                    // Store values for cleanup
                    document.body.dataset.scrollTop = scrollTop;
                    document.body.dataset.originalOverflow = originalOverflow;
                    document.body.dataset.originalPosition = originalPosition;
                    document.body.dataset.originalTop = originalTop;
                    document.body.dataset.originalWidth = originalWidth;
                };

                // Prevent touch events on iOS Safari
                touchMoveHandler = (e) => {
                    // Allow scrolling within specified scrollable content
                    if (e.target.closest(scrollableSelector)) {
                        return;
                    }
                    e.preventDefault();
                };

                // Apply scroll prevention
                preventBodyScroll();
                
                // Add touch event listener for iOS
                document.addEventListener('touchmove', touchMoveHandler, { passive: false });
            }, 1500); // 1.5 second delay
        }

        // Cleanup function
        return () => {
            // Clear the timeout if component unmounts or isLocked changes before delay completes
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Function to restore body scroll
            const restoreBodyScroll = () => {
                // Get stored values
                const scrollTop = parseInt(document.body.dataset.scrollTop || '0');
                const originalOverflow = document.body.dataset.originalOverflow || 'visible';
                const originalPosition = document.body.dataset.originalPosition || 'static';
                const originalTop = document.body.dataset.originalTop || 'auto';
                const originalWidth = document.body.dataset.originalWidth || 'auto';
                
                // Restore original styles
                document.body.style.overflow = originalOverflow;
                document.body.style.position = originalPosition;
                document.body.style.top = originalTop;
                document.body.style.width = originalWidth;
                
                // Restore scroll position
                window.scrollTo(0, scrollTop);
                
                // Clean up dataset
                delete document.body.dataset.scrollTop;
                delete document.body.dataset.originalOverflow;
                delete document.body.dataset.originalPosition;
                delete document.body.dataset.originalTop;
                delete document.body.dataset.originalWidth;
            };

            // Only restore if body was actually locked (has the dataset marker)
            if (document.body.dataset.scrollTop !== undefined) {
                restoreBodyScroll();
            }
            
            // Remove touch event listener using the stored reference
            if (touchMoveHandler) {
                document.removeEventListener('touchmove', touchMoveHandler);
            }
        };
    }, [isLocked, scrollableSelector]);
};

export default UseBodyScrollLock;