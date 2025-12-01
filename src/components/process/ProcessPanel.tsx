// import {
//   Box,
//   Button,
//   LinearProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Typography,
// } from "@mui/material";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import DownloadIcon from "@mui/icons-material/Download";
// import type { PipelineStage } from "../../types/compliance";
// import type { WorkbenchStateAPI } from "../../hooks/useWorkbenchState";

// interface ProcessPanelProps {
//   workbench: WorkbenchStateAPI;
// }

// const stageLabel: Record<PipelineStage, string> = {
//   idle: "Idle",
//   file_selected: "File selected",
//   extracting_text: "Extracting text from PDF",
//   fixing_arabic: "Fixing Arabic text",
//   chunking: "Chunking document",
//   running_ai: "Running AI compliance",
//   ready: "Ready for review",
//   error: "Error",
// };

// const ProcessPanel = ({ workbench }: ProcessPanelProps) => {
//   const { state, handleFileChange, runMockPipeline } = workbench;
//   const { file, stage, logMessages } = state;

//   const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] || null;
//     handleFileChange(f);
//   };

//   const processing =
//     stage === "extracting_text" ||
//     stage === "fixing_arabic" ||
//     stage === "chunking" ||
//     stage === "running_ai";

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//       <Paper sx={{ p: 2.5 }}>
//         <Typography variant="h6" sx={{ mb: 1.5 }}>
//           RFP pipeline
//         </Typography>

//         <Button
//           variant="outlined"
//           fullWidth
//           component="label"
//           startIcon={<UploadFileIcon />}
//           sx={{ mb: 1.5 }}
//         >
//           {file ? file.name : "Choose PDF"}
//           <input
//             type="file"
//             accept="application/pdf"
//             hidden
//             onChange={onFileInputChange}
//           />
//         </Button>

//         <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
//           {file ? "PDF ready to process." : "Upload a single RFP PDF to begin."}
//         </Typography>

//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<PlayArrowIcon />}
//           disabled={!file || processing}
//           onClick={runMockPipeline}
//           sx={{ mb: 2 }}
//         >
//           {processing ? "Running pipeline..." : "Run pipeline"}
//         </Button>

//         <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
//           Stage
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
//           {stageLabel[stage]}
//         </Typography>
//         {processing && <LinearProgress sx={{ mb: 1 }} />}

//         <Typography variant="subtitle2" sx={{ mt: 1 }}>
//           Logs
//         </Typography>
//         <Box
//           sx={{
//             mt: 0.5,
//             maxHeight: 140,
//             overflow: "auto",
//             bgcolor: "rgba(15,23,42,0.03)",
//             borderRadius: 2,
//           }}
//         >
//           <List dense>
//             {logMessages.length === 0 && (
//               <ListItem>
//                 <ListItemText primary="No logs yet." />
//               </ListItem>
//             )}
//             {logMessages.map((msg, idx) => (
//               <ListItem key={idx}>
//                 <ListItemText primary={msg} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Paper>

//       <Paper sx={{ p: 2 }}>
//         <Typography variant="subtitle1" sx={{ mb: 1 }}>
//           Export
//         </Typography>
//         <Button
//           startIcon={<DownloadIcon />}
//           variant="outlined"
//           size="small"
//           fullWidth
//           sx={{ mb: 1 }}
//         >
//           Export Excel
//         </Button>
//         <Button
//           startIcon={<DownloadIcon />}
//           variant="outlined"
//           size="small"
//           fullWidth
//           sx={{ mb: 1 }}
//         >
//           Export JSON
//         </Button>
//         <Button
//           startIcon={<DownloadIcon />}
//           variant="outlined"
//           size="small"
//           fullWidth
//         >
//           Annotated PDF
//         </Button>
//       </Paper>
//     </Box>
//   );
// };

// export default ProcessPanel;


// src/components/process/ProcessPanel.tsx
import { useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import type { WorkbenchStateAPI } from "../../hooks/useWorkbenchState";

interface ProcessPanelProps {
  workbench: WorkbenchStateAPI;
}

const ProcessPanel = ({ workbench }: ProcessPanelProps) => {
  const { state, runCompliance, exportSelection } = workbench;
  const { fileName, loading, error, language, rows } = state;

  const [file, setFile] = useState<File | null>(null);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const onRunClick = async () => {
    if (!file) return;
    await runCompliance(file);
  };

  const onExportAll = async () => {
    if (!rows.length) return;
    await exportSelection(rows);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2  , }}>
      <Paper sx={{ p: 2.5  ,           boxShadow : 13,}}>
        <Typography variant="h6" sx={{ mb: 1.5 , }}>
          RFP pipeline
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{ mb: 1.5 }}
        >
          {file?.name || fileName || "Choose PDF"}
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={onFileInputChange}
          />
        </Button>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          {fileName
            ? `Selected: ${fileName}`
            : "Upload a single RFP PDF to begin."}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          startIcon={<PlayArrowIcon />}
          disabled={!file || loading}
          onClick={onRunClick}
          sx={{ mb: 2 }}
        >
          {loading ? "Running pipeline..." : "Run pipeline"}
        </Button>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {language && (
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Detected language:{" "}
            <strong>
              {language === "arabic" ? "Arabic (Arabic pipeline)" : "English"}
            </strong>
          </Typography>
        )}

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {rows.length
            ? `${rows.length} compliance rows loaded from backend.`
            : "No compliance table yet — run the pipeline first."}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      {/* simple export block – you can later move these to the table card if you prefer */}
      <Paper sx={{ p: 2 ,           boxShadow : 13,}}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Export
        </Typography>
        <Button
          startIcon={<DownloadIcon />}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
          onClick={onExportAll}
          disabled={!rows.length}
        >
          Export all to Excel
        </Button>
      </Paper>
    </Box>
  );
};

export default ProcessPanel;
