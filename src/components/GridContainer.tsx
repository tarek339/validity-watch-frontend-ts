import { Box, Grid, Paper, Typography } from "@mui/material";

export default function GridContainer(props: {
  content: string;
  icon: React.ReactNode;
  backgroundColor: string;
}) {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        sx={{ marginBottom: "20px" }}
      >
        <Paper
          elevation={4}
          style={{
            borderRadius: "13px",
            marginTop: "-4.7em",
            backgroundColor: props.backgroundColor,
          }}
        >
          <Box
            sx={{
              fontSize: "28px",
              color: "#fff",
              padding: "15px",
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              {props.icon}
            </Grid>
          </Box>
        </Paper>
        <Typography sx={{ fontSize: "28px", color: "#000" }}>
          {props.content}
        </Typography>
      </Grid>
    </div>
  );
}
