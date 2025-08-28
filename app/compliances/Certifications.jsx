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
  const [modalTitle, setModalTitle] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.width = "100vw";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.width = "100vw";
    } else {
      document.body.style.overflow = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.width = "";
    };
  }, [isModalOpen]);

  const openModal = (type, src, title) => {
    setCurrentFile({ type, src });
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFile(null);
    setModalTitle("");
  };

  const getPdfSrc = (src) =>
    src.includes(".pdf")
      ? `${src}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-width`
      : src;

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <SectionHeader
        heading="Certifications & Standards"
        text="At RRP Electronics, our globally recognized certifications reflect our commitment to quality, safety, and sustainability, ensuring every product meets international standards."
      />

      <div
        ref={containerRef}
        className="col-span-4 grid grid-cols-4 gap-x-3.5 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-5"
      >
        <div
          onClick={() =>
            isMobile
              ? openModal("image", "images/compliances/trial.png", "ISO 9001:2015")
              : openModal("pdf", "images/compliances/ems.pdf", "ISO 9001:2015")
          }
          className="cursor-pointer col-span-4 md:col-span-2 aspect-[590/290] w-full p-4 flex flex-col justify-between bg-whiteBg"
        >
          <div className="flex justify-end">
            <img
              src="/images/icons/arrow_outward.svg"
              alt="ISO Icon"
              className="h-7 w-7 md:h-10 md:w-10"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 data-animate-text className="text-heading4 leading-[115%] text-black">
              ISO 9001:2015
            </h3>
            <p data-animate-text className="text-bodySmall leading-[120%] text-textPrimary">
              Quality Management System
            </p>
          </div>
        </div>

        <div
          onClick={() =>
            isMobile
              ? openModal("image", "images/compliances/trial.png", "REACH Compliance")
              : openModal("pdf", "images/compliances/ems.pdf", "REACH Compliance")
          }
          className="cursor-pointer col-span-4 md:col-span-2 aspect-[590/290] w-full p-4 flex flex-col justify-between bg-whiteBg"
        >
          <div className="flex justify-end">
            <img
              src="/images/icons/arrow_outward.svg"
              alt="REACH Icon"
              className="h-7 w-7 md:h-10 md:w-10"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 data-animate-text className="text-heading4 leading-[115%] text-black">
              REACH Compliance
            </h3>
            <p data-animate-text className="text-bodySmall leading-[120%] text-textPrimary">
              Registration, Evaluation, Authorization & Restriction of Chemicals
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative z-10 bg-white flex flex-col justify-center w-[95%] md:w-[70%] h-[70vh] md:h-[90vh]">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-bodyLarge text-black pr-4">
                {modalTitle}
              </h2>
              <button
                onClick={closeModal}
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
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
            <div className="flex-1 bg-white overflow-hidden min-w-0">
              {currentFile && currentFile.type === "pdf" && !isMobile && (
                <iframe
                  src={getPdfSrc(currentFile.src)}
                  className="w-full h-full border-0 bg-white min-w-0"
                  title={modalTitle}
                  style={{ overflow: "hidden" }}
                />
              )}
              {currentFile && currentFile.type === "image" && (
                <img
                  src={currentFile.src}
                  alt={modalTitle}
                  className="w-full h-full object-contain bg-white min-w-0"
                  style={{ maxHeight: "100%", overflow: "hidden" }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
