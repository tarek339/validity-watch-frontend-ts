import { useState } from "react";
import { Box, Drawer, Grid, IconButton, Typography } from "@mui/material";
import MenuItemsHolder from "./MenuItemsHolder";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MenuIcon from "@mui/icons-material/Menu";

const boxStyle = {
  margin: "10px",
  height: "100%",
  borderRadius: "12px",
  background: "linear-gradient(to top, #000, #323232)",
};

const boxHeader = {
  fontSize: "24px",
  color: "#fff",
};

const divider = {
  width: "100%",
  margin: "0px 20px 0px 20px",
  borderImage: "linear-gradient(to left, #323232, #7d7d7d 50%, #323232) 1",
  borderBottom: "1px solid",
};

function DrawerMenu() {
  const [open, setOpen] = useState(window.innerWidth > 899 ? true : false);
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        BackdropProps={{
          style: { backgroundColor: "transparent" },
        }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 300,
            border: "1px solid transparent",
            bgcolor: "transparent",
          },
        }}
        variant={window.innerWidth < 899 ? "temporary" : "permanent"}
        elevation={0}
      >
        <Box sx={boxStyle}>
          <Grid
            sx={{ padding: "1em" }}
            container
            justifyContent="center"
            alignItems="center"
            columnGap={2}
            direction="column"
          >
            <Grid container justifyContent="center" alignItems="center">
              <Typography sx={boxHeader}>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <div style={divider}></div>
          </Grid>
          <MenuItemsHolder setOpen={setOpen} />
        </Box>
      </Drawer>
    </div>
  );
}

export default DrawerMenu;
