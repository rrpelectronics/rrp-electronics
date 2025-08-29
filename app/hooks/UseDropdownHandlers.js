// hooks/UseDropdownHandlers.js
import { useRef, useState, useCallback } from 'react';

const UseDropdownHandlers = (isMobile) => {
  const timeoutRef = useRef(null);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isOperationsOpen, setIsOperationsOpen] = useState(false);

  const handleMouseEnter = useCallback(
    (dropdown) => {
      if (isMobile) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (dropdown === "company") {
        setIsCompanyOpen(true);
        setIsSolutionsOpen(false);
        setIsOperationsOpen(false);
      } else if (dropdown === "solutions") {
        setIsSolutionsOpen(true);
        setIsCompanyOpen(false);
        setIsOperationsOpen(false);
      } else if (dropdown === "operations") {
        setIsOperationsOpen(true);
        setIsCompanyOpen(false);
        setIsSolutionsOpen(false);
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(
    (dropdown) => {
      if (isMobile) return;

      timeoutRef.current = setTimeout(() => {
        if (dropdown === "company") {
          setIsCompanyOpen(false);
        } else if (dropdown === "solutions") {
          setIsSolutionsOpen(false);
        } else if (dropdown === "operations") {
          setIsOperationsOpen(false);
        }
      });
    },
    [isMobile]
  );

//   const handleAccessibilityClick = useCallback(() => {
//     if (isMobile) {
//       setIsOperationsOpen((prev) => !prev);
//       setIsSolutionsOpen(false);
//       setIsCompanyOpen(false);
//     }
//   }, [isMobile]);

//   const handleLanguageClick = useCallback(() => {
//     if (isMobile) {
//       setIsSolutionsOpen((prev) => !prev);
//       setIsOperationsOpen(false);
//       setIsCompanyOpen(false);
//     }
//   }, [isMobile]);

  return {
    isCompanyOpen,
    isSolutionsOpen,
    isOperationsOpen,
    handleMouseEnter,
    handleMouseLeave,
    // handleAccessibilityClick,
    // handleLanguageClick,
    setIsCompanyOpen,
    setIsSolutionsOpen,
    setIsOperationsOpen,
  };
};

export default UseDropdownHandlers;