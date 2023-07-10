import { AppBar, Grid, IconButton } from "@mui/material";
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
import { removeProperty } from "../redux/slices/propertySlice";
import { Stack } from "@mui/system";
import DrawerMenu from "./DrawerMenu";

const iconStyle = {
  color: "grey",
  cursor: "pointer",
};

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const emailVerified = useSelector(
    (state: RootState) => state.user.user?.emailVerified
  );
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <AppBar
        position="static"
        elevation={0}
        sx={{ zIndex: 2, backgroundColor: "transparent" }}
      >
        <Grid container justifyContent={"space-between"} alignItems="center">
          {user && emailVerified ? <DrawerMenu /> : null}
          <Stack direction="row" justifyContent="flex-end">
            {user && (
              <IconButton style={iconStyle}>
                <MessageSharpIcon />{" "}
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
                  dispatch(removeProperty());
                }}
                style={iconStyle}
              >
                <LogoutSharpIcon />
              </IconButton>
            )}
          </Stack>
        </Grid>
        <Grid container justifyContent="flex-end">
          {!user && (
            <IconButton
              onClick={() => {
                navigate("/sign-in");
              }}
              style={iconStyle}
            >
              <LoginSharpIcon />
            </IconButton>
          )}
        </Grid>
      </AppBar>
    </div>
  );
}

export default NavBar;
