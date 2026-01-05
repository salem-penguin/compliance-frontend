// import { useMemo, useState } from "react";
// import type { ComplianceRow, PipelineStage } from "../types/compliance";

// const mockRows: ComplianceRow[] = [
//   {
//     id: "1",
//     chunkId: "Chunk_001",
//     outlineNumber: "1.1",
//     text: "يرغب المستشفى في التعاقد مع مزود خدمة لتطوير نظام تتبع المرضى.",
//     rephrasedRequirement:
//       "يجب على المزود تطوير نظام لتتبع المرضى بشكل لحظي داخل المستشفى.",
//     compliant: "Yes",
//     mandatoryOptional: "Mandatory",
//     confidence: 0.91,
//     pageNumber: 3,
//   },
//   {
//     id: "2",
//     chunkId: "Chunk_002",
//     outlineNumber: "1.2",
//     text: "يجب توفير تقارير دورية للإدارة.",
//     rephrasedRequirement:
//       "يجب على المزود تقديم تقارير استخدام وتقارير تقنية بشكل دوري للإدارة.",
//     compliant: "Partial",
//     mandatoryOptional: "Mandatory",
//     confidence: 0.68,
//     pageNumber: 4,
//   },
//    {
//     id: "2",
//     chunkId: "Chunk_002",
//     outlineNumber: "1.2",
//     text: "يجب توفير تقارير دورية للإدارة.",
//     rephrasedRequirement:
//       "يجب على المزود تقديم تقارير استخدام وتقارير تقنية بشكل دوري للإدارة.",
//     compliant: "Partial",
//     mandatoryOptional: "Mandatory",
//     confidence: 0.68,
//     pageNumber: 4,
//   },
//    {
//     id: "2",
//     chunkId: "Chunk_002",
//     outlineNumber: "1.2",
//     text: "يجب توفير تقارير دورية للإدارة.",
//     rephrasedRequirement:
//       "يجب على المزود تقديم تقارير استخدام وتقارير تقنية بشكل دوري للإدارة.",
//     compliant: "Partial",
//     mandatoryOptional: "Mandatory",
//     confidence: 0.68,
//     pageNumber: 4,
//   },
//    {
//     id: "2",
//     chunkId: "Chunk_002",
//     outlineNumber: "1.2",
//     text: "يجب توفير تقارير دورية للإدارة.",
//     rephrasedRequirement:
//       "يجب على المزود تقديم تقارير استخدام وتقارير تقنية بشكل دوري للإدارة.",
//     compliant: "Partial",
//     mandatoryOptional: "Mandatory",
//     confidence: 0.68,
//     pageNumber: 4,
//   },
//   {
//     id: "3",
//     chunkId: "Chunk_003",
//     outlineNumber: "2.1",
//     text: "توفير واجهة ويب لمتابعة حالة المرضى.",
//     rephrasedRequirement:
//       "يلتزم المزود بتوفير واجهة ويب تُمكّن الطاقم الطبي من متابعة حالة المرضى.",
//     compliant: "No",
//     mandatoryOptional: "Optional",
//     confidence: 0.55,
//     pageNumber: 5,
//   },
// ];

// export interface WorkbenchStateAPI {
//   state: {
//     file: File | null;
//     pdfUrl: string | null;
//     stage: PipelineStage;
//     rows: ComplianceRow[];
//     selectedRow: ComplianceRow | null;
//     logMessages: string[];
//   };
//   // like React setState: updater(prev) => new array
//   setRows: (updater: (prev: ComplianceRow[]) => ComplianceRow[]) => void;
//   setSelectedRowId: (id: string | null) => void;
//   handleFileChange: (file: File | null) => void;
//   runMockPipeline: () => void;
// }

// export function useWorkbenchState(): WorkbenchStateAPI {
//   const [file, setFile] = useState<File | null>(null);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [stage, setStage] = useState<PipelineStage>("idle");
//   const [rows, setRows] = useState<ComplianceRow[]>(mockRows);
//   const [selectedRowId, setSelectedRowIdRaw] = useState<string | null>(null);
//   const [logMessages, setLogMessages] = useState<string[]>([]);

//   const selectedRow = useMemo(
//     () => rows.find((r) => r.id === selectedRowId) ?? null,
//     [rows, selectedRowId]
//   );

//   const handleFileChange = (newFile: File | null) => {
//     setFile(newFile);
//     if (newFile) {
//       setStage("file_selected");
//       const url = URL.createObjectURL(newFile);
//       setPdfUrl(url);
//       setLogMessages((prev) => [...prev, `📄 Loaded file: ${newFile.name}`]);
//     } else {
//       setStage("idle");
//       setPdfUrl(null);
//     }
//   };

//   const setSelectedRowId = (id: string | null) => {
//     setSelectedRowIdRaw(id);
//   };

//   const runMockPipeline = () => {
//     if (!file) return;

//     setLogMessages((prev) => [...prev, "🚀 Starting pipeline..."]);
//     setStage("extracting_text");

//     setTimeout(() => {
//       setStage("fixing_arabic");
//       setLogMessages((prev) => [
//         ...prev,
//         "🔤 Fixing Arabic text direction...",
//       ]);
//     }, 800);

//     setTimeout(() => {
//       setStage("chunking");
//       setLogMessages((prev) => [
//         ...prev,
//         "✂️ Chunking document into sections...",
//       ]);
//     }, 1600);

//     setTimeout(() => {
//       setStage("running_ai");
//       setLogMessages((prev) => [
//         ...prev,
//         "🤖 Running AI compliance analysis...",
//       ]);
//     }, 2400);

//     setTimeout(() => {
//       setStage("ready");
//       setLogMessages((prev) => [
//         ...prev,
//         "✅ Compliance table ready for review.",
//       ]);
//     }, 3200);
//   };

//   return {
//     state: { file, pdfUrl, stage, rows, selectedRow, logMessages },
//     setRows: (updater) => setRows((prev) => updater(prev)),
//     setSelectedRowId,
//     handleFileChange,
//     runMockPipeline,
//   };
// }
// src/hooks/useWorkbenchState.ts
// src/hooks/useWorkbenchState.ts
// src/hooks/useWorkbenchState.ts
// src/hooks/useWorkbenchState.ts


// helloooooooooooo


// import { useCallback, useState } from "react";
// import type { ComplianceRow } from "../types/compliance";

// export type Language = "english" | "arabic" | null;

// export interface WorkbenchState {
//   rows: ComplianceRow[];
//   language: Language;
//   fileName: string | null;
//   loading: boolean;
//   error: string | null;
//   selectedRowId: string | null;

//   // PDF preview:
//   pdfUrl: string | null;
//   selectedRow: ComplianceRow | null;
// }

// export interface WorkbenchStateAPI {
//   state: WorkbenchState;
//   setRows: React.Dispatch<React.SetStateAction<ComplianceRow[]>>;
//   setSelectedRowId: (id: string | null) => void;
//   runCompliance: (file: File) => Promise<void>;
//   exportSelection: (rows: ComplianceRow[]) => Promise<void>;
// }

// const API_BASE = "http://localhost:8000"; // adjust if needed

// export function useWorkbenchState(): WorkbenchStateAPI {
//   const [rows, setRows] = useState<ComplianceRow[]>([]);
//   const [language, setLanguage] = useState<Language>(null);
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRowId, setSelectedRowIdState] = useState<string | null>(null);

//   // PDF preview state
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [selectedRow, setSelectedRow] = useState<ComplianceRow | null>(null);

//   // keep last object URL to revoke it
//   const [localPdfObjectUrl, setLocalPdfObjectUrl] = useState<string | null>(null);

//   const runCompliance = useCallback(async (file: File) => {
//     try {
//       setLoading(true);
//       setError(null);
//       setFileName(file.name);
//       setSelectedRowIdState(null);
//       setSelectedRow(null);

//       // 🔹 1) Create a local blob URL so the PDF shows IMMEDIATELY in the preview
//       if (localPdfObjectUrl) {
//         URL.revokeObjectURL(localPdfObjectUrl);
//       }
//       const objectUrl = URL.createObjectURL(file);
//       setLocalPdfObjectUrl(objectUrl);
//       setPdfUrl(objectUrl); // this is what PdfPreviewPanel uses

//       // 🔹 2) Call backend for compliance rows (text only)
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch(`${API_BASE}/api/compliance/run`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const detail = await res.text();
//         throw new Error(detail || `Backend error: ${res.status}`);
//       }

//       const data = (await res.json()) as {
//         language: Language;
//         rows: ComplianceRow[];
//         splitRows: any[];
//         pdfFileName: string;
//       };

//       setLanguage(data.language ?? null);
//       setRows(Array.isArray(data.rows) ? data.rows : []);

//       // 👉 We **do not** change pdfUrl here, because the user is already
//       // looking at the local PDF preview. When you implement highlight +
//       // annotated PDFs, you can update pdfUrl to the annotated endpoint.
//       //
//       // Example later:
//       // setPdfUrl(`${API_BASE}/api/compliance/pdf/${data.pdfFileName}`);
//     } catch (err: any) {
//       console.error("runCompliance error:", err);
//       setError(err?.message || "Failed to process PDF");
//       setRows([]);
//       setLanguage(null);
//       setPdfUrl(null);
//       setSelectedRow(null);
//       setSelectedRowIdState(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [localPdfObjectUrl]);

//   const setSelectedRowId = useCallback(
//     (id: string | null) => {
//       setSelectedRowIdState(id);
//       if (id == null) {
//         setSelectedRow(null);
//         return;
//       }
//       const row = rows.find((r) => r.id === id) || null;
//       setSelectedRow(row);
//     },
//     [rows]
//   );

//   const exportSelection = useCallback(
//     async (selectedRows: ComplianceRow[]) => {
//       if (!selectedRows.length) return;

//       try {
//         const payload = {
//           fileName: fileName || "RFP",
//           rows: selectedRows,
//         };

//         const res = await fetch(`${API_BASE}/api/compliance/export-xlsx`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           const detail = await res.text();
//           throw new Error(detail || `Export error: ${res.status}`);
//         }

//         const blob = await res.blob();
//         const url = window.URL.createObjectURL(blob);

//         const a = document.createElement("a");
//         a.href = url;
//         a.download =
//           (fileName ? fileName.replace(/\.pdf$/i, "") : "compliance") +
//           "_compliance.xlsx";

//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(url);
//       } catch (err: any) {
//         console.error("exportSelection error:", err);
//         alert(err?.message || "Failed to export Excel file");
//       }
//     },
//     [fileName]
//   );

//   return {
//     state: {
//       rows,
//       language,
//       fileName,
//       loading,
//       error,
//       selectedRowId,
//       pdfUrl,
//       selectedRow,
//     },
//     setRows,
//     setSelectedRowId,
//     runCompliance,
//     exportSelection,
//   };
// }
import { useCallback, useState } from "react";
import type { ComplianceRow } from "../types/compliance";

export type Language = "english" | "arabic" | null;

export interface WorkbenchState {
  rows: ComplianceRow[];
  language: Language;
  fileName: string | null;
  loading: boolean;
  error: string | null;
  selectedRowId: string | null;

  // PDF preview:
  pdfUrl: string | null;
  selectedRow: ComplianceRow | null;
}

export interface WorkbenchStateAPI {
  state: WorkbenchState;
  setRows: React.Dispatch<React.SetStateAction<ComplianceRow[]>>;
  setSelectedRowId: (id: string | null) => void;
  runCompliance: (file: File) => Promise<void>;
  exportSelection: (rows: ComplianceRow[]) => Promise<void>;
}

//const API_BASE = "http://192.168.2.124:8000"; // adjust if needed
//const API_BASE = "http://127.0.0.1:8000"
const API_BASE = "https://757a296cf7ad.ngrok-free.app";
export function useWorkbenchState(): WorkbenchStateAPI {
  const [rows, setRows] = useState<ComplianceRow[]>([]);
  const [language, setLanguage] = useState<Language>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowIdState] = useState<string | null>(null);

  // PDF preview state
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<ComplianceRow | null>(null);

  // keep last object URL to revoke it
  const [localPdfObjectUrl, setLocalPdfObjectUrl] = useState<string | null>(
    null
  );

  const runCompliance = useCallback(
    async (file: File) => {
      try {
        setLoading(true);
        setError(null);
        setFileName(file.name);
        setSelectedRowIdState(null);
        setSelectedRow(null);

        // 1) Local blob URL so PDF shows immediately
        if (localPdfObjectUrl) {
          URL.revokeObjectURL(localPdfObjectUrl);
        }
        const objectUrl = URL.createObjectURL(file);
        setLocalPdfObjectUrl(objectUrl);
        setPdfUrl(objectUrl);

        // 2) Call backend for compliance rows
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API_BASE}/api/compliance/run`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const detail = await res.text();
          throw new Error(detail || `Backend error: ${res.status}`);
        }

        const data = (await res.json()) as {
          language: Language;
          rows: ComplianceRow[];
          splitRows: any[];
          pdfFileName: string;
        };

        setLanguage(data.language ?? null);
        setRows(Array.isArray(data.rows) ? data.rows : []);

        // If you later want to use the processed/annotated PDF:
        // setPdfUrl(`${API_BASE}/api/compliance/pdf/${data.pdfFileName}`);
      } catch (err: any) {
        console.error("runCompliance error:", err);
        setError(err?.message || "Failed to process PDF");
        setRows([]);
        setLanguage(null);
        setPdfUrl(null);
        setSelectedRow(null);
        setSelectedRowIdState(null);
      } finally {
        setLoading(false);
      }
    },
    [localPdfObjectUrl]
  );

  const setSelectedRowId = useCallback(
    (id: string | null) => {
      setSelectedRowIdState(id);
      if (id == null) {
        setSelectedRow(null);
        return;
      }
      const row = rows.find((r) => r.id === id) || null;
      setSelectedRow(row);
    },
    [rows]
  );

  const exportSelection = useCallback(
    async (selectedRows: ComplianceRow[]) => {
      if (!selectedRows.length) return;

      try {
        const payload = {
          fileName: fileName || "RFP",
          rows: selectedRows,
        };

        const res = await fetch(`${API_BASE}/api/compliance/export-xlsx`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const detail = await res.text();
          throw new Error(detail || `Export error: ${res.status}`);
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download =
          (fileName ? fileName.replace(/\.pdf$/i, "") : "compliance") +
          "_compliance.xlsx";

        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (err: any) {
        console.error("exportSelection error:", err);
        alert(err?.message || "Failed to export Excel file");
      }
    },
    [fileName]
  );

  return {
    state: {
      rows,
      language,
      fileName,
      loading,
      error,
      selectedRowId,
      pdfUrl,
      selectedRow,
    },
    setRows,
    setSelectedRowId,
    runCompliance,
    exportSelection,
  };
}
