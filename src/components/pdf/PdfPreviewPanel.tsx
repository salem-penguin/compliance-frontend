import { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import type { WorkbenchStateAPI } from "../../hooks/useWorkbenchState";

interface PdfPreviewPanelProps {
  workbench: WorkbenchStateAPI;
}


const PdfPreviewPanel = ({ workbench }: PdfPreviewPanelProps) => {
  const { state } = workbench;
  const { pdfUrl, selectedRow } = state;

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

  // Update pageNumber when selectedRow changes
  useEffect(() => {
    if (selectedRow?.pageNumber) {
      setPageNumber(selectedRow.pageNumber);
    }
  }, [selectedRow]);

  // Load PDF when pdfUrl changes
  useEffect(() => {
    if (!pdfUrl) {
      pdfDocRef.current = null;
      setNumPages(0);
      setPageNumber(1);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const loadPdfJs = async () => {
      // Load pdf.js if not already loaded
      if (!(window as any).pdfjsLib) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.async = true;
        document.head.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load pdf.js"));
        });

        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }
    };

    loadPdfJs()
      .then(() => {
        if (cancelled) return;
        const pdfjsLib = (window as any).pdfjsLib;
        return pdfjsLib.getDocument(pdfUrl).promise;
      })
      .then((pdf: any) => {
        if (!pdf || cancelled) return;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages || 0);
        setPageNumber(1); // reset to first page on new PDF
        setLoading(false);
      })
      .catch((err: any) => {
        if (cancelled) return;
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF");
        setLoading(false);
      });

    return () => {
      cancelled = true;
      pdfDocRef.current = null;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfUrl]);

  // Render current page whenever pageNumber or scale changes
  useEffect(() => {
    const pdfDoc = pdfDocRef.current;
    const canvas = canvasRef.current;
    if (!pdfDoc || !canvas) return;

    const renderPage = async () => {
      try {
        // Cancel previous render if still running
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {
            // ignore
          }
          renderTaskRef.current = null;
        }

        const page = await pdfDoc.getPage(pageNumber);
        const context = canvas.getContext("2d");
        if (!context) return;

        const viewport = page.getViewport({ scale });

        // Set canvas size according to viewport (this controls zoom)
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = viewport.width * outputScale;
        canvas.height = viewport.height * outputScale;

        // CSS size – don't force width: 100%, let the canvas grow
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        const renderContext = {
          canvasContext: context,
          viewport,
          transform,
        };

        // Clear previous frame
        context.clearRect(0, 0, canvas.width, canvas.height);

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;
        renderTaskRef.current = null;
      } catch (err) {
        console.error("Error rendering page:", err);
      }
    };

    renderPage();
  }, [pageNumber, scale]);

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(numPages || 1, prev + 1));
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(3.0, prev + 0.2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.4, prev - 0.2));
  };

  const handleResetZoom = () => {
    setScale(1.0);
  };
console.log("PdfPreviewPanel pdfUrl =", pdfUrl);

  return (
    <Paper
      sx={{
        p: 2.5,
        height: "100%",
                  boxShadow : 15,
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F9FAFB",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          PDF Preview
        </Typography>

        {pdfUrl && (
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              bgcolor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: 1,
              p: 0.5,
            }}
          >
            <Tooltip title="Zoom Out">
              <span>
                <IconButton
                  size="small"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.4}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M8 11h6"
                    />
                  </svg>
                </IconButton>
              </span>
            </Tooltip>
            <Typography
              variant="body2"
              onClick={handleResetZoom}
              sx={{
                px: 1.5,
                py: 0.5,
                minWidth: 50,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { bgcolor: "#F3F4F6" },
                borderRadius: 0.5,
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {Math.round(scale * 100)}%
            </Typography>
            <Tooltip title="Zoom In">
              <span>
                <IconButton
                  size="small"
                  onClick={handleZoomIn}
                  disabled={scale >= 3.0}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M11 8v6M8 11h6"
                    />
                  </svg>
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
      </Box>

      {/* Empty State */}
      {!pdfUrl && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            border: "2px dashed #D1D5DB",
            bgcolor: "#FFFFFF",
          }}
        >
          <Box sx={{ textAlign: "center", maxWidth: 320, px: 3 }}>
            <Box
              sx={{
                mx: "auto",
                width: 64,
                height: 64,
                bgcolor: "#F3F4F6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="#9CA3AF"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </Box>
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 500, mb: 1 }}
            >
              No PDF loaded
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Upload an RFP PDF to preview it here with automatic navigation to
              selected requirements.
            </Typography>
          </Box>
        </Box>
      )}

      {/* PDF Viewer */}
      {pdfUrl && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {/* Selection Info Banner */}
          {selectedRow && (
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 1.5,
                bgcolor: "#EEF2FF",
                border: "1px solid #C7D2FE",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#4338CA" }}
              >
                {/* Viewing: {selectedRow.outlineNumber || "Selected Requirement"} */}
              </Typography>
            </Box>
          )}

          {/* PDF Container */}
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              overflow: "auto",
              position: "relative",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              p: 2,
            }}
          >
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "error.main",
                }}
              >
                <Typography>{error}</Typography>
              </Box>
            )}
            {!loading && !error && (
              <canvas
                ref={canvasRef}
                style={{
                  display: "block",
                  margin: "0 auto",
                }}
              />
            )}
          </Box>

          {/* Navigation Controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              py: 1.5,
              px: 2,
              borderRadius: 1.5,
              bgcolor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <IconButton
              size="small"
              onClick={handlePrevPage}
              disabled={pageNumber <= 1}
              sx={{
                "&:disabled": { opacity: 0.4 },
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <input
                type="number"
                value={pageNumber}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!Number.isNaN(val) && val >= 1 && val <= (numPages || 1)) {
                    setPageNumber(val);
                  }
                }}
                style={{
                  width: "64px",
                  padding: "4px 8px",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "1px solid #D1D5DB",
                  borderRadius: "4px",
                  outline: "none",
                }}
                min={1}
                max={numPages || 1}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {numPages > 0 ? `of ${numPages}` : "Page"}
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={handleNextPage}
              disabled={pageNumber >= (numPages || 1)}
              sx={{
                "&:disabled": { opacity: 0.4 },
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PdfPreviewPanel;
