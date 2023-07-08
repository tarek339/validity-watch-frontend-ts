import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";
import { removeDriver } from "../redux/slices/driverSlice";
import { removeTruck } from "../redux/slices/truckSlice";
import { removeTrailer } from "../redux/slices/trailerSlice";
import Notification from "./Notification";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RvHookupIcon from "@mui/icons-material/RvHookup";
import Person2Icon from "@mui/icons-material/Person2";
import DashboardIcon from "@mui/icons-material/Dashboard";

const iconStyle = {
  color: "grey",
  cursor: "pointer",
};

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const checkPath =
    window.location.pathname === "/"
      ? "Dashboard"
      : window.location.pathname === "/add-data"
      ? "Add data"
      : window.location.pathname === "/user-profile"
      ? "Company Profile"
      : window.location.pathname === "/drivers"
      ? "Drivers"
      : window.location.pathname === "/trucks"
      ? "Trucks"
      : window.location.pathname === "/trailers"
      ? "Trailers"
      : "";

  const checkPathIcon =
    window.location.pathname === "/" ? (
      <DashboardIcon />
    ) : window.location.pathname === "/add-data" ? (
      <AddIcon />
    ) : window.location.pathname === "/user-profile" ? (
      <AccountCircleIcon />
    ) : window.location.pathname === "/drivers" ? (
      <Person2Icon />
    ) : window.location.pathname === "/trucks" ? (
      <RvHookupIcon />
    ) : window.location.pathname === "/trailers" ? (
      <LocalShippingIcon />
    ) : (
      ""
    );

  return (
    <div className="navbar">
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: 2, backgroundColor: "transparent" }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Stack
              direction="row"
              style={{
                textTransform: "uppercase",
                color: "grey",
                paddingLeft: window.innerWidth > 899 ? "300px" : "50px",
              }}
            >
              {checkPathIcon} &nbsp;
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                {" / "}
                {checkPath}
              </Typography>
            </Stack>

            <Box>
              <Grid container justifyContent="flex-end">
                {user && (
                  <IconButton style={iconStyle}>
                    <Grid container justifyContent="center" alignItems="center">
                      <MessageSharpIcon />{" "}
                    </Grid>
                  </IconButton>
                )}

                {user && <Notification />}

                {user && (
                  <IconButton
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(removeUser());
                      dispatch(removeDriver());
                      dispatch(removeTruck());
                      dispatch(removeTrailer());
                    }}
                    style={iconStyle}
                  >
                    <Grid container justifyContent="center" alignItems="center">
                      <LogoutSharpIcon />
                    </Grid>
                  </IconButton>
                )}

                {!user && (
                  <IconButton
                    onClick={() => {
                      navigate("/sign-in");
                    }}
                    style={iconStyle}
                  >
                    <Grid container justifyContent="center" alignItems="center">
                      <LoginSharpIcon />
                    </Grid>
                  </IconButton>
                )}
              </Grid>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
