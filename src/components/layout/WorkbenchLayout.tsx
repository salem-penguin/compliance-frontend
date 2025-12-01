// import { Box } from "@mui/material";
// import { useWorkbenchState } from "../../hooks/useWorkbenchState";
// import ProcessPanel from "../process/ProcessPanel";
// import PdfPreviewPanel from "../pdf/PdfPreviewPanel";
// import ComplianceTableCard from "../compliance/ComplianceTableCard";

// const WorkbenchLayout = () => {
//   const workbench = useWorkbenchState();

//   return (
//     <Box
//       id="workbench"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: { xs: 3, md: 4 },
//       }}
//     >
//       {/* Top row: pipeline + PDF preview */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "1fr", // mobile: stacked
//             md: "minmax(0, 360px) minmax(0, 1.3fr)", // desktop: sidebar + main
//           },
//           gap: { xs: 3, md: 4 },
//           alignItems: "flex-start",
//         }}
//       >
//         <ProcessPanel workbench={workbench} />
//         <PdfPreviewPanel workbench={workbench} />
//       </Box>

//       {/* Full-width table under everything */}
//       <Box
//         sx={{
//           minHeight: 340,
//         }}
//       >
//         <ComplianceTableCard workbench={workbench} />
//       </Box>
//     </Box>
//   );
// };

// export default WorkbenchLayout;
import { Box } from "@mui/material";
import { useWorkbenchState } from "../../hooks/useWorkbenchState";
import ProcessPanel from "../process/ProcessPanel";
import PdfPreviewPanel from "../pdf/PdfPreviewPanel";
import ComplianceTableCard from "../compliance/ComplianceTableCard";

const WorkbenchLayout = () => {
  const workbench = useWorkbenchState();

  return (
    <Box
      id="workbench"
      sx={{
        width: "100%", 
        maxWidth : "2000px",
        px : -1,// ⭐ Ensures this component fills the parent container
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, md: 4 },
      }}
    >
      {/* Top row: pipeline + PDF preview */}
      <Box
        sx={{
          display: "grid",
                
          gridTemplateColumns: {
            xs: "1fr", // mobile: stacked
            md: "350px 1fr", // ⭐ FIXED: Fixed sidebar width, rest takes available space
          },
          gap: { xs: 3, md: 4 },
          alignItems: "stretch", 
          minHeight: { md: 600 }, 
        }}
      >
        <ProcessPanel workbench={workbench} />
        {/* Ensure the PDF Panel takes full height of the grid cell */}
        <Box sx={{ height: "100%", '& > *': { height: '100%' } ,
                boxShadow : 13,}}>
           <PdfPreviewPanel workbench={workbench} />
        </Box>
      </Box>

      {/* Full-width table under everything */}
      <Box
        sx={{
          minHeight: 400,
                    boxShadow : 15,
        }}
      >
        <ComplianceTableCard workbench={workbench} />
      </Box>
    </Box>
  );
};

export default WorkbenchLayout;