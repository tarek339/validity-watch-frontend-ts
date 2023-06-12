import { Button, Grid, TextField, Typography } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import GridContainer from "../components/GridContainer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const iconStyle = {
  color: "#fff",
  backgroundColor: "#9c27b0",
  borderRadius: "50%",
  padding: "5px",
};

function SignUpCompany() {
  const [email, setEmail] = useState("tarekjassine@gmail.com");
  const [password, setPassword] = useState("tarek123");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/company/sign-in", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(addUser(res.data.company));
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.log(err?.response?.data?.message);
        setMessage(err?.response?.data?.message);
      });
  };

  return (
    <div className="sign-up">
      <GridContainer>
        <HttpsOutlinedIcon style={iconStyle} fontSize="medium" />
      </GridContainer>
      <GridContainer>
        <Typography variant="h4">Sign In</Typography>
        <Typography variant="h4">or</Typography>
        <Button>
          {" "}
          <Typography variant="h5" onClick={() => navigate("/sign-up")}>
            Sign Up
          </Typography>
        </Button>
      </GridContainer>

      <div className="sign-form">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="First name"
                className="TextField-without-border-radius"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={message ? true : false}
                helperText={message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="First name"
                className="TextField-without-border-radius"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={message ? true : false}
                helperText={message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default SignUpCompany;
