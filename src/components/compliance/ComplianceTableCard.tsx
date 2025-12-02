// import { useMemo, useState } from "react";
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Chip,
//   Paper,
//   Stack,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import type { GridColDef, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
// import type { ComplianceRow } from "../../types/compliance";
// import type { WorkbenchStateAPI } from "../../hooks/useWorkbenchState";

// interface ComplianceTableCardProps {
//   workbench: WorkbenchStateAPI;
// }

// type FilterMode = "all" | "low" | "mandatory";

// const ComplianceTableCard = ({ workbench }: ComplianceTableCardProps) => {
//   const { state, setRows, setSelectedRowId } = workbench;
//   const { rows } = state;

//   const [filterMode, setFilterMode] = useState<FilterMode>("all");
//   const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
//     type: "include",
//     ids: new Set<GridRowId>(),
//   });

//   const columns: GridColDef<ComplianceRow>[] = [
//     { field: "outlineNumber", headerName: "Outline", width: 90 },
//     { field: "chunkId", headerName: "Chunk", width: 110 },
//     {
//       field: "text",
//       headerName: "Original requirement",
//       flex: 1,
//       minWidth: 220,
//     },
//     {
//       field: "rephrasedRequirement",
//       headerName: "Rephrased requirement",
//       flex: 1.2,
//       minWidth: 260,
//       editable: true,
//     },
//     {
//       field: "compliant",
//       headerName: "Compliance",
//       width: 130,
//       editable: true,
//       type: "singleSelect",
//       valueOptions: ["Yes", "No", "Partial"],
//     },
//     {
//       field: "mandatoryOptional",
//       headerName: "Mandatory?",
//       width: 150,
//       editable: true,
//       type: "singleSelect",
//       valueOptions: ["Mandatory", "Optional", "Not specified"],
//     },
//     {
//       field: "confidence",
//       headerName: "Conf.",
//       width: 90,
//       valueFormatter: (value: number | undefined) => {
//         const v = value ?? 0;
//         return `${Math.round(v * 100)}%`;
//       },
//     },
//   ];

//   // filter rows based on mode
//   const filteredRows = useMemo(() => {
//     if (filterMode === "low") {
//       return rows.filter((r) => (r.confidence ?? 0) < 0.7);
//     }
//     if (filterMode === "mandatory") {
//       return rows.filter((r) => r.mandatoryOptional === "Mandatory");
//     }
//     return rows;
//   }, [rows, filterMode]);

//   // Extract selected IDs from the selection model
//   const selectedIds = useMemo<string[]>(() => {
//     if (selectionModel.type === "include") {
//       return Array.from(selectionModel.ids).map((id) => String(id));
//     }
//     // Handle exclude type: get all row IDs except excluded ones
//     return rows
//       .map((r) => r.id)
//       .filter((id) => !selectionModel.ids.has(id));
//   }, [selectionModel, rows]);

//   const handleRowUpdate = (newRow: ComplianceRow) => {
//     setRows((prev) => prev.map((r) => (r.id === newRow.id ? newRow : r)));
//     return newRow;
//   };

//   const handleFilterChange = (
//     _event: React.MouseEvent<HTMLElement>,
//     value: FilterMode | null
//   ) => {
//     if (value) setFilterMode(value);
//   };

//   const handleBulkSetCompliance = (status: "Yes" | "No") => {
//     if (selectedIds.length === 0) return;

//     setRows((prev) =>
//       prev.map((row) =>
//         selectedIds.includes(row.id) ? { ...row, compliant: status } : row
//       )
//     );
//   };

//   const handleSave = () => {
//     const selected = rows.filter((r) => selectedIds.includes(r.id));
//     console.log("✅ Saving reviewed rows:", selected);
//     alert(`Saved ${selected.length} selected row(s).`);
//   };

//   return (
//     <Paper
//       sx={{
//         p: 2.5,
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* header & controls */}
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems={{ xs: "flex-start", sm: "center" }}
//         spacing={2}
//         sx={{ mb: 2, flexWrap: "wrap" }}
//       >
//         <Box>
//           <Typography variant="h6">Compliance table</Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             {filteredRows.length} of {rows.length} rows • mock data
//           </Typography>
//         </Box>

//         <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//           <ToggleButtonGroup
//             size="small"
//             exclusive
//             value={filterMode}
//             onChange={handleFilterChange}
//           >
//             <ToggleButton value="all">All</ToggleButton>
//             <ToggleButton value="low">Low confidence</ToggleButton>
//             <ToggleButton value="mandatory">Mandatory only</ToggleButton>
//           </ToggleButtonGroup>

//           <Chip label="RFP_sample.pdf" size="small" />

//           <ButtonGroup
//             size="small"
//             sx={{
//               borderRadius: 999,
//               overflow: "hidden",
//               boxShadow: "0 0 0 1px rgba(15,23,42,0.05)",
//             }}
//           >
//             <Button
//               onClick={() => handleBulkSetCompliance("Yes")}
//               disabled={selectedIds.length === 0}
//             >
//               Yes
//             </Button>
//             <Button
//               onClick={() => handleBulkSetCompliance("No")}
//               disabled={selectedIds.length === 0}
//             >
//               No
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//               disabled={selectedIds.length === 0}
//             >
//               Save
//             </Button>
//           </ButtonGroup>
//         </Stack>
//       </Stack>

//       {/* table */}
//       <Box sx={{ flex: 1 }}>
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           getRowId={(row) => row.id}
//           checkboxSelection
//           density="comfortable"
//           disableRowSelectionOnClick={false}
//           processRowUpdate={handleRowUpdate}
//           onProcessRowUpdateError={(error) => console.error(error)}
//           onRowClick={(params) => setSelectedRowId(params.row.id)}
//           rowSelectionModel={selectionModel}
//           onRowSelectionModelChange={setSelectionModel}
//           sx={{
//             "& .MuiDataGrid-columnHeaders": {
//               bgcolor: "rgba(249, 250, 251, 0.9)",
//             },
//           }}
//         />
//       </Box>
//     </Paper>
//   );
// };

// export default ComplianceTableCard;

// helooooooooooooooooooooooooooooooooo

// import { useMemo, useState, useRef } from "react";
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Chip,
//   Paper,
//   Stack,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import type { GridColDef } from "@mui/x-data-grid";
// import type { ComplianceRow } from "../../types/compliance";
// import type { WorkbenchStateAPI } from "../../hooks/useWorkbenchState";

// interface ComplianceTableCardProps {
//   workbench: WorkbenchStateAPI;
// }

// type FilterMode = "all" | "low" | "mandatory";
// type ComplianceFilter = "yes" | "no" | "all";

// const ComplianceTableCard = ({ workbench }: ComplianceTableCardProps) => {
//   const { state, setRows, setSelectedRowId, exportSelection } = workbench;
//   const { rows, fileName, loading } = state;

//   const [filterMode, setFilterMode] = useState<FilterMode>("all");
//   const [complianceFilter, setComplianceFilter] =
//     useState<ComplianceFilter>("yes");

//   // simple selection store: just IDs
//   const [selectionIds, setSelectionIds] = useState<(string | number)[]>([]);

//   // refs for drag-to-scroll
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const isDragging = useRef(false);
//   const lastX = useRef(0);

//   const columns: GridColDef<ComplianceRow>[] = [
//     { field: "outlineNumber", headerName: "Outline", width: 90 },
//     { field: "chunkId", headerName: "Chunk", width: 110 },
//     {
//       field: "text",
//       headerName: "Original requirement",
//       flex: 1,
//       minWidth: 300,
//       renderCell: (params) => (
//         <div
//           style={{
//             whiteSpace: "normal",
//             wordBreak: "break-word",
//             lineHeight: "1.4",
//             padding: "8px 0",
//           }}
//         >
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "rephrasedRequirement",
//       headerName: "Rephrased requirement",
//       flex: 1.2,
//       minWidth: 260,
//       editable: true,
//     },
//     {
//       field: "compliant",
//       headerName: "AI Decision",
//       width: 130,
//       editable: true,
//       type: "singleSelect",
//       valueOptions: ["Yes", "No", "Partial"],
//     },
//     {
//       field: "mandatoryOptional",
//       headerName: "Your Opinion",
//       width: 150,
//       editable: true,
//       type: "singleSelect",
//       valueOptions: ["Critical", "Optional", "Not specified"],
//     },
//     {
//       field: "confidence",
//       headerName: "Conf.",
//       width: 90,
//       valueFormatter: (params: any) => {
//         const v = Number(params?.value ?? 0);
//         return `${Math.round(v * 100)}%`;
//       },
//     },
//   ];

//   // filter rows based on mode + compliance filter
//   const filteredRows = useMemo(() => {
//     let output = [...rows];

//     if (filterMode === "low") {
//       output = output.filter((r) => (r.confidence ?? 0) < 0.7);
//     } else if (filterMode === "mandatory") {
//       output = output.filter((r) => r.mandatoryOptional === "Mandatory");
//     }

//     if (complianceFilter === "yes") {
//       output = output.filter(
//         (r) => String(r.compliant).toLowerCase() === "yes"
//       );
//     } else if (complianceFilter === "no") {
//       output = output.filter(
//         (r) => String(r.compliant).toLowerCase() === "no"
//       );
//     }
//     // "all" → no extra filter

//     return output;
//   }, [rows, filterMode, complianceFilter]);

//   const selectedIds = selectionIds;
//   const hasSelection = selectedIds.length > 0;

//   const handleRowUpdate = (newRow: ComplianceRow) => {
//     setRows((prev) => prev.map((r) => (r.id === newRow.id ? newRow : r)));
//     return newRow;
//   };

//   const handleFilterChange = (
//     _event: React.MouseEvent<HTMLElement>,
//     value: FilterMode | null
//   ) => {
//     if (value) setFilterMode(value);
//   };

//   const handleComplianceFilterChange = (
//     _event: React.MouseEvent<HTMLElement>,
//     value: ComplianceFilter | null
//   ) => {
//     if (value) setComplianceFilter(value);
//   };

//   const handleBulkSetCompliance = (status: "Yes" | "No") => {
//     if (!hasSelection) return;

//     setRows((prev) =>
//       prev.map((row) =>
//         selectedIds.includes(row.id) ? { ...row, compliant: status } : row
//       )
//     );
//   };

//   const handleSave = async () => {
//     if (!hasSelection) return;

//     const selectedRows = rows.filter((r) => selectedIds.includes(r.id));
//     if (!selectedRows.length) return;

//     await exportSelection(selectedRows);
//   };

//   // ====== DRAG-TO-SCROLL HANDLERS ======
//   const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
//     // Only left button
//     if (event.button !== 0) return;
//     if (!scrollRef.current) return;

//     isDragging.current = true;
//     lastX.current = event.clientX;
//     scrollRef.current.style.cursor = "grabbing";
//     scrollRef.current.style.userSelect = "none";
//   };

//   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDragging.current || !scrollRef.current) return;

//     const deltaX = event.clientX - lastX.current;
//     lastX.current = event.clientX;

//     // invert for natural feel (drag left → scroll right)
//     scrollRef.current.scrollLeft -= deltaX;
//   };

//   const endDrag = () => {
//     if (!scrollRef.current) return;
//     isDragging.current = false;
//     scrollRef.current.style.cursor = "grab";
//     scrollRef.current.style.removeProperty("user-select");
//   };

//   return (
//     <Paper
//       sx={{
//         p: 2.5,
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* header & controls */}
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems={{ xs: "flex-start", sm: "center" }}
//         spacing={2}
//         sx={{ mb: 2, flexWrap: "wrap" }}
//       >
//         <Box>
//           <Typography variant="h6">Compliance table</Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             {filteredRows.length} of {rows.length} rows •{" "}
//             {fileName ? fileName : "no file selected"}
//           </Typography>
//         </Box>

//         <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//           {/* Confidence / mandatory filter */}
//           <ToggleButtonGroup
//             size="small"
//             exclusive
//             value={filterMode}
//             onChange={handleFilterChange}
//           >
//             <ToggleButton value="all">All</ToggleButton>
//             <ToggleButton value="low">Low confidence</ToggleButton>
//             <ToggleButton value="mandatory">Mandatory only</ToggleButton>
//           </ToggleButtonGroup>

//           {/* Compliance Yes/No/All filter */}
//           <ToggleButtonGroup
//             size="small"
//             exclusive
//             value={complianceFilter}
//             onChange={handleComplianceFilterChange}
//           >
//             <ToggleButton value="yes">Yes</ToggleButton>
//             <ToggleButton value="no">No</ToggleButton>
//             <ToggleButton value="all">All</ToggleButton>
//           </ToggleButtonGroup>

//           <Chip
//             label={fileName ? fileName.replace(/\.pdf$/i, "") : "No PDF"}
//             size="small"
//           />

//           <ButtonGroup
//             size="small"
//             sx={{
//               borderRadius: 999,
//               overflow: "hidden",
//               boxShadow: "0 0 0 1px rgba(15,23,42,0.05)",
//             }}
//           >
//             <Button
//               onClick={() => handleBulkSetCompliance("Yes")}
//               disabled={!hasSelection || loading}
//             >
//               Yes
//             </Button>
//             <Button
//               onClick={() => handleBulkSetCompliance("No")}
//               disabled={!hasSelection || loading}
//             >
//               No
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//               disabled={!hasSelection || loading}
//             >
//               Save & Export
//             </Button>
//           </ButtonGroup>
//         </Stack>
//       </Stack>

//       {/* table */}
//       <Box sx={{ flex: 1 }}>
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           getRowId={(row) => row.id}
//           checkboxSelection
//           density="comfortable"
//           disableRowSelectionOnClick={false}
//           processRowUpdate={handleRowUpdate}
//           getRowHeight={() => "auto"}
//           onProcessRowUpdateError={(error) => console.error(error)}
//           onRowClick={(params) => setSelectedRowId(params.row.id)}
//           onRowSelectionModelChange={(newSelection: any) => {
//             // Support both v5/6 (array) and v7 (object with ids)
//             if (Array.isArray(newSelection)) {
//               setSelectionIds(newSelection as (string | number)[]);
//             } else if (
//               newSelection &&
//               typeof newSelection === "object" &&
//               "ids" in newSelection
//             ) {
//               const idsSet = (newSelection as any).ids;
//               setSelectionIds(Array.from(idsSet) as (string | number)[]);
//             } else {
//               setSelectionIds([]);
//             }
//           }}
//           sx={{
//             "& .MuiDataGrid-columnHeaders": {
//               bgcolor: "rgba(249, 250, 251, 0.9)",
//             },
//             "& .MuiDataGrid-cell": {
//               whiteSpace: "normal !important",
//               wordWrap: "break-word !important",
//               display: "flex",
//               alignItems: "flex-start",
//             },
//           }}
//           loading={loading}
//           // ⭐ drag-to-scroll wiring — cast as any to silence TS
//           slotProps={
//             {
//               virtualScroller: {
//                 ref: (el: HTMLDivElement | null) => {
//                   scrollRef.current = el;
//                   if (el) {
//                     el.style.cursor = "grab";
//                   }
//                 },
//                 onMouseDown: handleMouseDown as any,
//                 onMouseMove: handleMouseMove as any,
//                 onMouseUp: endDrag as any,
//                 onMouseLeave: endDrag as any,
//               },
//             } as any
//           }
//         />
//       </Box>
//     </Paper>
//   );
// };

// export default ComplianceTableCard;
import { useMemo, useState, useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  // Chip,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import type { ComplianceRow } from "../../types/compliance";
import type { WorkbenchStateAPI } from "../../hooks/useWorkbenchState";

interface ComplianceTableCardProps {
  workbench: WorkbenchStateAPI;
}

type FilterMode = "all" | "low" | "mandatory";
type ComplianceFilter = "yes" | "no" | "all";

// simple Arabic detector for bidi styling
const ARABIC_RE = /[\u0600-\u06FF]/;

const ComplianceTableCard = ({ workbench }: ComplianceTableCardProps) => {
  const { state, setRows, setSelectedRowId, exportSelection } = workbench;
  const { rows, fileName, loading } = state;

  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [complianceFilter, setComplianceFilter] =
    useState<ComplianceFilter>("yes");

  // simple selection store: just IDs
  const [selectionIds, setSelectionIds] = useState<(string | number)[]>([]);

  // refs for drag-to-scroll
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const columns: GridColDef<ComplianceRow>[] = [
    { field: "outlineNumber", headerName: "Outline", width: 90 },
    { field: "chunkId", headerName: "Chunk", width: 110 },
    {
      field: "text",
      headerName: "Original requirement",
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        const value = String(params.value ?? "");
        const isArabic = ARABIC_RE.test(value);
        return (
          <div
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: "1.4",
              padding: "8px 0",
              direction: isArabic ? "rtl" : "ltr",
              unicodeBidi: "plaintext",
              textAlign: isArabic ? "right" : "left",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "rephrasedRequirement",
      headerName: "Rephrased requirement",
      flex: 1.2,
      minWidth: 260,
      editable: true,
      renderCell: (params) => {
        const value = String(params.value ?? "");
        const isArabic = ARABIC_RE.test(value);
        return (
          <div
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: "1.4",
              padding: "8px 0",
              direction: isArabic ? "rtl" : "ltr",
              unicodeBidi: "plaintext",
              textAlign: isArabic ? "right" : "left",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "compliant",
      headerName: "AI Decision",
      width: 130,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Yes", "No", "Partial"],
    },
    {
      field: "mandatoryOptional",
      headerName: "Your Opinion",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Critical", "Optional", "Not specified"],
    },
    {
      field: "confidence",
      headerName: "Conf.",
      width: 90,
      valueFormatter: (params: any) => {
        const v = Number(params?.value ?? 0);
        return `${Math.round(v * 100)}%`;
      },
    },
  ];

  // filter rows based on mode + compliance filter
  const filteredRows = useMemo(() => {
    let output = [...rows];

    if (filterMode === "low") {
      output = output.filter((r) => (r.confidence ?? 0) < 0.7);
    } else if (filterMode === "mandatory") {
      output = output.filter((r) => r.mandatoryOptional === "Mandatory");
    }

    if (complianceFilter === "yes") {
      output = output.filter(
        (r) => String(r.compliant).toLowerCase() === "yes"
      );
    } else if (complianceFilter === "no") {
      output = output.filter(
        (r) => String(r.compliant).toLowerCase() === "no"
      );
    }
    // "all" → no extra filter

    return output;
  }, [rows, filterMode, complianceFilter]);

  const selectedIds = selectionIds;
  const hasSelection = selectedIds.length > 0;

  const handleRowUpdate = (newRow: ComplianceRow) => {
    setRows((prev) => prev.map((r) => (r.id === newRow.id ? newRow : r)));
    return newRow;
  };

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: FilterMode | null
  ) => {
    if (value) setFilterMode(value);
  };

  const handleComplianceFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: ComplianceFilter | null
  ) => {
    if (value) setComplianceFilter(value);
  };

  const handleBulkSetCompliance = (status: "Yes" | "No") => {
    if (!hasSelection) return;

    setRows((prev) =>
      prev.map((row) =>
        selectedIds.includes(row.id) ? { ...row, compliant: status } : row
      )
    );
  };

  const handleSave = async () => {
    if (!hasSelection) return;

    const selectedRows = rows.filter((r) => selectedIds.includes(r.id));
    if (!selectedRows.length) return;

    await exportSelection(selectedRows);
  };

  // ====== DRAG-TO-SCROLL HANDLERS ======
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only left button
    if (event.button !== 0) return;
    if (!scrollRef.current) return;

    isDragging.current = true;
    lastX.current = event.clientX;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;

    const deltaX = event.clientX - lastX.current;
    lastX.current = event.clientX;

    // invert for natural feel (drag left → scroll right)
    scrollRef.current.scrollLeft -= deltaX;
  };

  const endDrag = () => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
    scrollRef.current.style.removeProperty("user-select");
  };

  return (
    <Paper
      sx={{
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* header & controls */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 2, flexWrap: "wrap" }}
      >
        <Box>
          <Typography variant="h6">Compliance table</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {filteredRows.length} of {rows.length} rows •{" "}
            {fileName ? fileName : "no file selected"}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          {/* Confidence / mandatory filter */}
          <ToggleButtonGroup
            size="small"
            exclusive
            value={filterMode}
            onChange={handleFilterChange}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="low">Low confidence</ToggleButton>
            <ToggleButton value="mandatory">Mandatory only</ToggleButton>
          </ToggleButtonGroup>

          {/* Compliance Yes/No/All filter */}
          <ToggleButtonGroup
            size="small"
            exclusive
            value={complianceFilter}
            onChange={handleComplianceFilterChange}
          >
            <ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>

          {/* <Chip
            label={fileName ? fileName.replace(/\.pdf$/i, "") : "No PDF"}
            size="small"
          /> */}

          <ButtonGroup
            size="small"
            sx={{
              borderRadius: 999,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(15,23,42,0.05)",
            }}
          >
            <Button
              onClick={() => handleBulkSetCompliance("Yes")}
              disabled={!hasSelection || loading}
            >
              Yes
            </Button>
            <Button
              onClick={() => handleBulkSetCompliance("No")}
              disabled={!hasSelection || loading}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!hasSelection || loading}
            >
              Save & Export
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>

      {/* table */}
      <Box sx={{ flex: 1 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection
          density="comfortable"
          disableRowSelectionOnClick={false}
          processRowUpdate={handleRowUpdate}
          getRowHeight={() => "auto"}
          onProcessRowUpdateError={(error) => console.error(error)}
          onRowClick={(params) => setSelectedRowId(params.row.id)}
          onRowSelectionModelChange={(
            newSelection: GridRowSelectionModel | any
          ) => {
            // Support both v5/6 (array) and v7 (object with ids)
            if (Array.isArray(newSelection)) {
              setSelectionIds(newSelection as (string | number)[]);
            } else if (
              newSelection &&
              typeof newSelection === "object" &&
              "ids" in newSelection
            ) {
              const idsSet = (newSelection as any).ids;
              setSelectionIds(Array.from(idsSet) as (string | number)[]);
            } else {
              setSelectionIds([]);
            }
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "rgba(249, 250, 251, 0.9)",
            },
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal !important",
              wordWrap: "break-word !important",
              display: "flex",
              alignItems: "flex-start",
            },
          }}
          loading={loading}
          // drag-to-scroll wiring
          slotProps={
            {
              virtualScroller: {
                ref: (el: HTMLDivElement | null) => {
                  scrollRef.current = el;
                  if (el) {
                    el.style.cursor = "grab";
                  }
                },
                onMouseDown: handleMouseDown as any,
                onMouseMove: handleMouseMove as any,
                onMouseUp: endDrag as any,
                onMouseLeave: endDrag as any,
              },
            } as any
          }
        />
      </Box>
    </Paper>
  );
};

export default ComplianceTableCard;
