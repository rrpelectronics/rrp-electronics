// "use client";
// import React from "react";
// import SectionHeader from "@/app/components/SectionHeader";
// import { useTextAnimation } from "../hooks/UseTextAnimation";

// export default function Certifications() {
//   const { containerRef } = useTextAnimation();
//   return (
//     <section className="h-fit w-full py-10 md:py-15 bg-white">
//       <SectionHeader
//         heading={"Certifications & Standards"}
//         text={
//           "At RRP Electronics, our globally recognized certifications reflect our commitment to quality, safety, and sustainability, ensuring every product meets international standards."
//         }
//       />

//       <div
//         ref={containerRef}
//         className="col-span-4 grid grid-cols-4 gap-x-3.5 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-5"
//       >
//         <div className="col-span-4 md:col-span-2 aspect-[590/290] w-full p-4 flex flex-col justify-between bg-whiteBg">
//           <div className="flex justify-end">
//             <img
//               src="/images/icons/arrow_outward.svg"
//               alt="ISO Icon"
//               className="h-7 w-7 md:h-10 md:w-10"
//             />
//           </div>
//           <div className="flex flex-col gap-4">
//             <h3
//               data-animate-text
//               className="text-heading4 leading-[115%] text-black"
//             >
//               ISO 9001:2015
//             </h3>
//             <p
//               data-animate-text
//               className="text-bodySmall leading-[120%] text-textPrimary"
//             >
//               Quality Management System
//             </p>
//           </div>
//         </div>

//         <div className="col-span-4 md:col-span-2 aspect-[590/290] w-full p-4 flex flex-col justify-between bg-whiteBg">
//           <div className="flex justify-end">
//             <img
//               src="/images/icons/arrow_outward.svg"
//               alt="ISO Icon"
//               className="h-7 w-7 md:h-10 md:w-10"
//             />
//           </div>
//           <div className="flex flex-col gap-4">
//             <h3 data-animate-text className="text-heading4 leading-[115%] text-black">
//               REACH Compliance
//             </h3>
//             <p data-animate-text className="text-bodySmall leading-[120%] text-textPrimary">
//               Registration, Evaluation, Authorization & Restriction of Chemicals
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import { useTextAnimation } from "../hooks/UseTextAnimation";

export default function Certifications() {
  const { containerRef } = useTextAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const pdfFiles = {
    iso9001: "/Images/compliances/RRP QMS.pdf",
    reach: "/Images/compliances/RRP EMS Certificate.pdf",
  };

  useEffect(() => {
    if (isModalOpen) {
      if (window.lenis) {
        window.lenis.stop();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = "";
    }

    return () => {
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openPdfModal = (pdfType) => {
    if (pdfType === "iso9001") {
      setCurrentPdf(pdfFiles.iso9001);
      setModalTitle("ISO 9001:2015 - Quality Management System");
    } else if (pdfType === "reach") {
      setCurrentPdf(pdfFiles.reach);
      setModalTitle("REACH Compliance");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPdf(null);
    setModalTitle("");
  };

  return (
    <>
      <section className="h-fit w-full py-8 md:py-10 lg:py-15 bg-white">
        <SectionHeader
          heading={"Certifications & Standards"}
          text={
            "At RRP Electronics, our globally recognized certifications reflect our commitment to quality, safety, and sustainability, ensuring every product meets international standards."
          }
        />

        <div
          ref={containerRef}
          className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            {/* Card 1 */}
            <div
              onClick={() => openPdfModal("iso9001")}
              className="aspect-[590/290] w-full p-4 sm:p-5 md:p-6 flex flex-col justify-between bg-whiteBg cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <div className="flex justify-end">
                <img
                  src="/images/icons/arrow_outward.svg"
                  alt="ISO Icon"
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10"
                />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3
                  data-animate-text
                  className="text-heading4 leading-[115%] text-black"
                >
                  ISO 9001:2015
                </h3>
                <p
                  data-animate-text
                  className="text-bodySmall leading-[120%] text-textPrimary"
                >
                  Quality Management System
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => openPdfModal("reach")}
              className="aspect-[590/290] w-full p-4 sm:p-5 md:p-6 flex flex-col justify-between bg-whiteBg cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <div className="flex justify-end">
                <img
                  src="/images/icons/arrow_outward.svg"
                  alt="ISO Icon"
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10"
                />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3
                  data-animate-text
                  className="text-heading4 leading-[115%] text-black"
                >
                  REACH Compliance
                </h3>
                <p
                  data-animate-text
                  className="text-bodySmall leading-[120%] text-textPrimary"
                >
                  Registration, Evaluation, Authorization & Restriction of
                  Chemicals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal content */}
          <div
            className="relative z-10 
              w-[95%] h-[90%]          /* Mobile: 95% width, 90% height */
              sm:w-[95%] sm:h-[95%]   /* Small screens: 95% both */
              md:w-[90%] md:h-[90%]   /* Medium+ screens: 90% both */
              bg-white overflow-hidden flex flex-col rounded-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white flex-shrink-0">
              <h2 className="text-bodyLarge text-black truncate pr-4">
                {modalTitle}
              </h2>
              <button
                onClick={closeModal}
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* PDF Viewer */}
           <div className="flex-1 bg-white overflow-hidden">
  {currentPdf && (
    <iframe
      src={`${currentPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
      className="w-full h-full border-0 bg-white"
      title={modalTitle}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  )}
</div>
          </div>
        </div>
      )}
    </>
  );
}
