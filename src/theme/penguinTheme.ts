import { createTheme } from "@mui/material/styles";

export const penguinTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f7b724ff", // warm accent
    },
    secondary: {
      main: "#1F2933", // dark accent
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F3EF", // warm off-white
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: "2.4rem",
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.95rem",
    },
  },

  // 🔥 custom shadows – EXACTLY 25 entries (0..24)
  shadows: [
    // 0
    "none",

    // 1–5: subtle neutral shadows
    "0px 1px 2px rgba(17,24,39,0.06)",   // 1
    "0px 1px 3px rgba(17,24,39,0.08)",   // 2
    "0px 2px 6px rgba(17,24,39,0.08)",   // 3
    "0px 4px 10px rgba(17,24,39,0.10)",  // 4
    "0px 6px 14px rgba(17,24,39,0.12)",  // 5

    // 6–8: warm orange–tinted shadows (match #f7b724)
    "0px 8px 18px rgba(247,183,36,0.16)", // 6
    "0px 10px 24px rgba(247,183,36,0.18)",// 7
    "0px 14px 32px rgba(247,183,36,0.20)",// 8

    // 9–12: slightly stronger, mixed warm/neutral
    "0px 16px 36px rgba(17,24,39,0.16)",  // 9
    "0px 18px 40px rgba(17,24,39,0.18)",  // 10
    "0px 20px 44px rgba(247,183,36,0.18)",// 11
    "0px 24px 52px rgba(247,183,36,0.20)",// 12

    // 13–24: reuse nice soft shadows for higher levels
    "0px 8px 18px rgba(247,183,36,0.16)", // 13
    "0px 10px 24px rgba(247,183,36,0.18)",// 14
    "0px 14px 32px rgba(247,183,36,0.20)",// 15
    "0px 16px 36px rgba(17,24,39,0.16)",  // 16
    "0px 18px 40px rgba(17,24,39,0.18)",  // 17
    "0px 20px 44px rgba(247,183,36,0.18)",// 18
    "0px 24px 52px rgba(247,183,36,0.20)",// 19
    "0px 24px 55px rgba(17,24,39,0.20)",  // 20
    "0px 28px 60px rgba(17,24,39,0.22)",  // 21
    "0px 32px 70px rgba(17,24,39,0.24)",  // 22
    "0px 36px 80px rgba(17,24,39,0.26)",  // 23
    "0px 40px 90px rgba(17,24,39,0.28)",  // 24
  ],

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // pill buttons
          textTransform: "none",
          fontWeight: 500,
          // optional warm glow for primary buttons:
          // boxShadow: "0px 8px 18px rgba(247,183,36,0.25)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});
