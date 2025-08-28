// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function PopupCard() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const showTimer = setTimeout(() => {
//       setShowPopup(true);
//       setTimeout(() => setIsVisible(true), 50);
//     }, 2000);

//     return () => clearTimeout(showTimer);
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       const closeTimer = setTimeout(() => {
//         handleClose();
//       }, 12000);

//       return () => clearTimeout(closeTimer);
//     }
//   }, [isVisible]);

//   const handleClose = () => {
//     setIsVisible(false);
//     setTimeout(() => {
//       setShowPopup(false);
//     }, 800);
//   };

//   if (!showPopup) return null;

//   return (
//     <div 
//       className={`w-full h-screen fixed inset-0 flex items-center justify-center z-50 transition-all duration-700 ease-out ${
//         isVisible 
//           ? 'backdrop-blur-sm bg-black/60 opacity-100' 
//           : 'backdrop-blur-0 bg-black/0 opacity-0'
//       }`}
//     >
//       <div 
//         className={`flex flex-col items-start gap-[6px] transition-all duration-700 ease-out transform ${
//           isVisible 
//             ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
//             : 'opacity-0 scale-50 translate-y-12 rotate-12'
//         }`}
//       >
//         <button
//           onClick={handleClose}
//           className={`w-full text-end text-white text-bodySmall transition-all duration-500 delay-300 ease-out ${
//             isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
//           }`}
//           aria-label="Close"
//         >
//           Close
//         </button>
//         <div 
//           className={`w-[348px] h-[435px] aspect-[4/3] overflow-hidden rounded-lg shadow-2xl transition-all duration-700 ease-out delay-100 ${
//             isVisible 
//               ? 'opacity-100 scale-100 translate-y-0' 
//               : 'opacity-0 scale-75 translate-y-10'
//           }`}
//         >
//           <Image
//             src="/Images/home/pop-up.webp"
//             alt="Card Image"
//             width={348}
//             height={435}
//             className={`object-cover w-full h-full transition-all duration-700 ease-out ${
//               isVisible ? 'scale-100' : 'scale-110'
//             }`}
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PopupCard() {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setIsVisible(true), 50);
    }, 2000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const closeTimer = setTimeout(() => {
        handleClose();
      }, 12000);

      return () => clearTimeout(closeTimer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  if (!showPopup) return null;

  return (
    <div className={`w-full h-screen fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/60 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`flex flex-col items-start gap-[6px] transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={handleClose}
          className="w-full text-end text-white text-bodySmall"
          aria-label="Close"
        >
          Close
        </button>
        <div className="w-[348px] h-[435px] aspect-[4/3] overflow-hidden">
          <Image
            src="/Images/home/pop-up.webp"
            alt="Card Image"
            width={348}
            height={435}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}