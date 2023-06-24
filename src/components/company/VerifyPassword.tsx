import { Button, Grid } from "@mui/material";
import { SetStateAction, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Textfield from "../Textfield";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import SnackBar from "../SnackBar";
import { RootState } from "../../redux/store";
import GridContainer from "../GridContainer";
import Filter2RoundedIcon from "@mui/icons-material/Filter2Rounded";

function VerifyPassword(props: { page: number; setPage: Function }) {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/company/verify-password", {
        password,
      })
      .then(() => props.setPage(props.page + 1))
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {snackbar.open ? <SnackBar /> : null}
      <form onSubmit={handleSubmit}>
        <GridContainer
          backgroundColor="#ff1744"
          icon={<Filter2RoundedIcon />}
          content="Verify Password"
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Textfield
              inputProps={undefined}
              autoFocus={false}
              label="Password"
              name="password"
              value={password}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
              error={false}
              helperText={undefined}
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
    </motion.div>
  );
}

export default VerifyPassword;
