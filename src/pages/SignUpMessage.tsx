import { Typography } from "@mui/material";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignUpMessage() {
  const emailVerified = useSelector(
    (state: RootState) => state.user.user?.emailVerified
  );
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && emailVerified) {
      return navigate("/");
    }
  });
  return (
    <div>
      <Typography variant="h4">
        Please verify your account. We sent you an email.
      </Typography>
    </div>
  );
}

export default SignUpMessage;
