import { Button, Grid } from "@mui/material";
import GridContainer from "../components/GridContainer";
import { SetStateAction, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Textfield from "../components/Textfield";
import { removeSnackbar, setSnackbar } from "../redux/slices/snackbarSlice";
import SnackBar from "../components/SnackBar";
import { RootState } from "../redux/store";
import LockResetIcon from "@mui/icons-material/LockReset";

function ForgotPassword() {
  const [email, setEmail] = useState("tarekjassine@gmail.com");
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/company/forgot-password-email", { email })
      .then((res) => {
        console.log(res?.data?.message);
        dispatch(
          setSnackbar({
            open: true,
            severity: "success",
            message: res.data.message,
          })
        );
        setTimeout(
          () =>
            dispatch(
              removeSnackbar({ open: false, severity: "", message: "" })
            ),
          5000
        );
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
        <div className="sign-form">
          {snackbar.open ? <SnackBar /> : null}
          <form onSubmit={handleSubmit}>
            <GridContainer
              backgroundColor="#673ab7"
              icon={<LockResetIcon />}
              content="Reset password"
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="Password"
                  name="password"
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
                <Button fullWidth variant="contained" type="submit">
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
