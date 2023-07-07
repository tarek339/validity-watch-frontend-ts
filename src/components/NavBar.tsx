import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
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

const iconStyle = {
  color: "grey",
  cursor: "pointer",
};

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: 2, backgroundColor: "transparent" }}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
