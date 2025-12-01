// import { Box, Button, Chip, Stack, Typography } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Chip, Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 4,
        p: { xs: 3, md: 4 },
        boxShadow : 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",            // ⬅️ CENTER
        textAlign: "center",             // ⬅️ CENTER TEXT
        maxWidth: 900,                   // optional: cleaner width
        mx: "auto",                      // ⬅️ CENTER THE BOX ITSELF
        mb: 4,
      }}
    >
      <Chip
        label="Penguin • Pen Lab"
        color="secondary"
        variant="outlined"
        sx={{ mb: 2, fontWeight: 500 }}
      />

      <Typography
        variant="h1"
        sx={{
          mb: 1,
          fontSize: { xs: "1.8rem", md: "2.4rem" },
          fontWeight: 700,
        }}
      >
        Compliance Intelligence. Simplified.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 3,
          maxWidth: 620,
        }}
      >
        Upload an RFP PDF, let AI build your compliance table, and review
        everything in one modern workspace — optimized for Arabic tenders.
      </Typography>

      {/* { <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          sx={{ px: 6 }}
        >
          Upload RFP PDF
        </Button>
      </Stack> } */}
    </Box>
  );
};

export default HeroSection;
