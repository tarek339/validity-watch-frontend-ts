import { Button, Grid, Typography, Link } from "@mui/material";
import GridContainer from "../components/GridContainer";
import { SetStateAction, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Textfield from "../components/Textfield";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sign-form">
          <form onSubmit={handleSubmit}>
            <GridContainer
              backgroundColor="#00a152"
              icon={<LockOpenRoundedIcon />}
              content="Sign in"
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Textfield
                  label="E-Mail"
                  name="email"
                  value={email}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setEmail(e.target.value)}
                  error={message ? true : false}
                  helperText={<div className="error">{message}</div>}
                  type={undefined}
                />
              </Grid>
              <Grid item xs={12}>
                <Textfield
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setPassword(e.target.value)}
                  error={message ? true : false}
                  helperText={<div className="error">{message}</div>}
                  type="password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit">
                  Sign in
                </Button>
              </Grid>
            </Grid>
            <Typography sx={{ marginTop: "10px" }}>
              Not an Account?{" "}
              <Link
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                underline="none"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </Link>
            </Typography>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUpCompany;
