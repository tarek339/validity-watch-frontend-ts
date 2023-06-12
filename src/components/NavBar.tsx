import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  return (
    <div>
      {user && (
        <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
      )}
      {user && <Button onClick={() => navigate("/")}>Home</Button>}

      {user && (
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(removeUser());
          }}
        >
          Sign out
        </Button>
      )}
      {!user && (
        <Button
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign in
        </Button>
      )}
    </div>
  );
}

export default NavBar;
