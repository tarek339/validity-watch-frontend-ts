import {
  Button,
  Grid,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import GridContainer from "../components/GridContainer";
import { SetStateAction, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Textfield from "../components/Textfield";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import { removeSnackbar, setSnackbar } from "../redux/slices/snackbarSlice";
import SnackBar from "../components/SnackBar";
import { RootState } from "../redux/store";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 510,
      md: 750,
      lg: 980,
      xl: 1530,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

function SignUpCompany() {
  const [email, setEmail] = useState("tarekjassine@gmail.com");
  const [password, setPassword] = useState("tarek123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

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
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        dispatch(
          setSnackbar({
            open: true,
            severity: "error",
            message: err?.response?.data?.message,
          })
        );
        setTimeout(
          () =>
            dispatch(
              removeSnackbar({ open: false, severity: "", message: "" })
            ),
          5000
        );
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
        <ThemeProvider theme={theme}>
          <div className="sign-form">
            {snackbar.open ? <SnackBar /> : null}
            <form onSubmit={handleSubmit}>
              <GridContainer
                backgroundColor="#00a152"
                icon={<LockOpenRoundedIcon />}
                content="Sign in"
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Textfield
                    autoFocus={false}
                    label="E-Mail"
                    name="email"
                    value={email}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setEmail(e.target.value)}
                    error={false}
                    helperText={undefined}
                    type={undefined}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textfield
                    autoFocus={false}
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setPassword(e.target.value)}
                    error={false}
                    helperText={undefined}
                    type="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit">
                    Sign in
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ marginTop: "10px" }}>
                    Forgot password?{" "}
                    <Link
                      sx={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      underline="none"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Reset here
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </ThemeProvider>
      </motion.div>
    </div>
  );
}

export default SignUpCompany;
