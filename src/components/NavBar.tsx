import { Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import FeedbackSharpIcon from "@mui/icons-material/FeedbackSharp";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";

const iconStyle = {
  color: "grey",
  cursor: "pointer",
};

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  return (
    <div>
      <Grid container justifyContent="flex-end">
        {user && (
          <IconButton style={iconStyle}>
            <MessageSharpIcon />{" "}
          </IconButton>
        )}

        {user && (
          <IconButton style={iconStyle}>
            <FeedbackSharpIcon />
          </IconButton>
        )}

        {user && (
          <IconButton
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(removeUser());
            }}
            style={iconStyle}
          >
            <LogoutSharpIcon />
          </IconButton>
        )}

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
    </div>
  );
}

export default NavBar;
