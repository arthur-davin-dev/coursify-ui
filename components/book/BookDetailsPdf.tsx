// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { FaArrowLeft, FaArrowRight, FaExpand, FaDownload } from "react-icons/fa";
// import { ImSpinner2 } from "react-icons/im";

// // Standard CSS imports for react-pdf
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";


// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function BookDetailsPdf({ file_url }: { file_url: string }) {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [containerWidth, setContainerWidth] = useState<number>(0);
//   const pdfContainerRef = useRef<HTMLDivElement>(null);
//   const viewerRef = useRef<HTMLDivElement>(null);

//   // Handle responsive width for the PDF Page
//   useEffect(() => {
//     const updateWidth = () => {
//       if (pdfContainerRef.current) {
//         // Subtracting padding/margins to prevent overflow
//         setContainerWidth(pdfContainerRef.current.offsetWidth);
//       }
//     };

//     updateWidth();
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, []);

//   const toggleFullScreen = () => {
//     if (viewerRef.current?.requestFullscreen) {
//       viewerRef.current.requestFullscreen();
//     }
//   };

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//     setPageNumber(1); // Reset to page 1 if file_url changes
//   }

//   return (
//     <div className="w-full flex flex-col items-center">
//       {/* Control Bar */}
//       <div className="flex gap-4 mb-4 p-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 w-full max-w-lg justify-center items-center shadow-sm">
//         <button 
//           onClick={() => setPageNumber(p => Math.max(p - 1, 1))} 
//           disabled={pageNumber <= 1} 
//           className="p-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
//         >
//           <FaArrowLeft />
//         </button>
        
//         <span className="dark:text-white font-medium min-w-[80px] text-center">
//           {pageNumber} / {numPages || "..."}
//         </span>

//         <button 
//           onClick={() => setPageNumber(p => Math.min(p + 1, numPages || p))} 
//           disabled={pageNumber >= (numPages || 1)} 
//           className="p-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
//         >
//           <FaArrowRight />
//         </button>

//         <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-600 mx-2" />

//         <button 
//           onClick={toggleFullScreen} 
//           className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
//           title="Full Screen"
//         >
//           <FaExpand />
//         </button>

//         <a 
//           href={file_url} 
//           download 
//           target="_blank" 
//           rel="noreferrer" 
//           className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
//           title="Download PDF"
//         >
//           <FaDownload />
//         </a>
//       </div>

//       {/* PDF Viewer Container */}
//       <div 
//         ref={viewerRef} 
//         className="w-full bg-gray-200 dark:bg-gray-950 rounded-lg overflow-hidden flex justify-center min-h-[600px] border dark:border-gray-800 shadow-inner"
//       >
//         <div ref={pdfContainerRef} className="w-full max-w-4xl p-4 overflow-y-auto flex justify-center">
//           <Document 
//             file={file_url} 
//             onLoadSuccess={onDocumentLoadSuccess}
//             loading={
//               <div className="flex flex-col items-center my-20">
//                 <ImSpinner2 className="animate-spin text-4xl text-blue-500" />
//                 <p className="mt-2 text-gray-500">Loading PDF engine...</p>
//               </div>
//             }
//             error={
//               <div className="text-red-500 my-20">
//                 Failed to load PDF. Please check the file link.
//               </div>
//             }
//           >
//             <Page 
//               key={`page_${pageNumber}`}
//               pageNumber={pageNumber} 
//               width={containerWidth > 40 ? containerWidth - 40 : 300} 
//               renderMode="canvas"
//             />
//           </Document>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FaArrowLeft, FaArrowRight, FaExpand, FaCompress, FaDownload } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

// Standard CSS imports for react-pdf
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function BookDetailsPdf({ file_url }: { file_url: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Handle responsive width for the PDF Page
  useEffect(() => {
    const updateWidth = () => {
      if (pdfContainerRef.current) {
        // Subtracting padding/margins to prevent overflow
        setContainerWidth(pdfContainerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Track fullscreen state changes (e.g. user presses Esc key)
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (viewerRef.current?.requestFullscreen) {
        viewerRef.current.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      document.exitFullscreen();
    }
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1); // Reset to page 1 if file_url changes
  }

  return (
    <div className="w-full flex flex-col items-center">

      {/* viewerRef wraps BOTH the controls AND the PDF so fullscreen works */}
      <div
        ref={viewerRef}
        className="w-full bg-gray-200 dark:bg-gray-950 rounded-lg overflow-hidden flex flex-col items-center border dark:border-gray-800 shadow-inner"
      >

        {/* Control Bar — inside viewerRef so it appears in fullscreen */}
        <div className="flex gap-4 my-3 p-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 w-full max-w-lg justify-center items-center shadow-sm">
          <button
            onClick={() => setPageNumber(p => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            className="p-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft />
          </button>

          <span className="dark:text-white font-medium min-w-[80px] text-center">
            {pageNumber} / {numPages || "..."}
          </span>

          <button
            onClick={() => setPageNumber(p => Math.min(p + 1, numPages || p))}
            disabled={pageNumber >= (numPages || 1)}
            className="p-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
          >
            <FaArrowRight />
          </button>

          <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-600 mx-2" />

          {/* Toggle between FaExpand and FaCompress based on fullscreen state */}
          <button
            onClick={toggleFullScreen}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>

          <a
            href={file_url}
            download
            target="_blank"
            rel="noreferrer"
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            title="Download PDF"
          >
            <FaDownload />
          </a>
        </div>

        {/* PDF Viewer Content */}
        <div ref={pdfContainerRef} className="w-full max-w-4xl px-4 pb-4 overflow-y-auto flex justify-center min-h-[600px]">
          <Document
            file={file_url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center my-20">
                <ImSpinner2 className="animate-spin text-4xl text-blue-500" />
                <p className="mt-2 text-gray-500">Loading PDF engine...</p>
              </div>
            }
            error={
              <div className="text-red-500 my-20">
                Failed to load PDF. Please check the file link.
              </div>
            }
          >
            <Page
              key={`page_${pageNumber}`}
              pageNumber={pageNumber}
              width={containerWidth > 40 ? containerWidth - 40 : 300}
              renderMode="canvas"
            />
          </Document>
        </div>

      </div>
    </div>
  );
}