// import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
// import HeroSection from "./components/HeroSection";
// import WorkbenchLayout from "./components/layout/WorkbenchLayout";
// import { penguinTheme } from "./theme/penguinTheme";

// function App() {
//   return (
//     <ThemeProvider theme={penguinTheme}>
//       <CssBaseline />

//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: "background.default",
//           py: { xs: 4, md: 6 },
//         }}
//       >
//         <Container maxWidth="xl">
//           {/* ⬇️ Shared centered frame for BOTH components */}
//           <Box
//             sx={{
//               maxWidth: 1200,      // ⭐ Same width for hero + layout
//               mx: "auto",          // ⭐ Centers perfectly
//               display: "flex",
//               flexDirection: "column",
//               gap: 6,
//             }}
//           >
//             <HeroSection />
//             <WorkbenchLayout />
//           </Box>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default App;

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import HeroSection from "./components/HeroSection";
import WorkbenchLayout from "./components/layout/WorkbenchLayout";
import { penguinTheme } from "./theme/penguinTheme";

function App() {
  return (
    <ThemeProvider theme={penguinTheme}>
      <CssBaseline />

      {/* 1. OUTERMOST WRAPPER: Forces full screen width and centers children */}
      <Box
        sx={{
          width: "100vw",             // 👈 FORCE full viewport width
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",            // 👈 Enables Flexbox
          justifyContent: "center",   // 👈 Pushes everything to the middle
          py: 6,                      // Vertical padding
          overflowX: "hidden"         // Prevents horizontal scrollbar
        }}
      >
        
        {/* 2. CONTENT WRAPPER: Limits size to 1200px */}
        <Box
          sx={{
            width: "100%",            // Take all available space...
            maxWidth: "1200px",       // ...until 1200px
            px: 2,                    // Side padding for mobile
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <HeroSection />
          <WorkbenchLayout />
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default App;
