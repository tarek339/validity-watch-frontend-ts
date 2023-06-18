import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GridContainer from "../components/GridContainer";
import { removeSnackbar, setSnackbar } from "../redux/slices/snackbarSlice";
import SnackBar from "../components/SnackBar";
import { RootState } from "../redux/store";
import { motion } from "framer-motion";
import Textfield from "../components/Textfield";
import PasswordIcon from "@mui/icons-material/Password";
import { useEffect } from "react";

const validationSchema = Yup.object({
  password: Yup.string().required("required"),
  confirmPassword: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);
  const user = useSelector((state: RootState) => state.user.user);
  const emailVerified = useSelector(
    (state: RootState) => state.user.user?.emailVerified
  );

  useEffect(() => {
    if (user && emailVerified) {
      return navigate("/");
    }
    if (!window.location.href.includes("token")) {
      return navigate("/");
    }
  }, [user, emailVerified, navigate]);

  const formik = useFormik({
    initialValues: {
      password: "tarek123",
      confirmPassword: "tarek123",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put("/company/forgot-password-handler", values)
        .then((res) => {
          console.log(res?.data?.message);
          dispatch(
            setSnackbar({
              open: true,
              severity: "success",
              message: res?.data?.message,
            })
          );
          setTimeout(
            () =>
              dispatch(
                removeSnackbar({ open: false, severity: "error", message: "" })
              ),
            4000
          );
        })
        .then(() => navigate("/sign-in"))
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
                removeSnackbar({ open: false, severity: "error", message: "" })
              ),
            4000
          );
        });
    },
  });

  return (
    <div className="sign-up">
      {snackbar.open ? <SnackBar /> : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sign-form">
          <form onSubmit={formik.handleSubmit}>
            <GridContainer
              backgroundColor="#03a9f4"
              icon={<PasswordIcon />}
              content="Reset password"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Textfield
                  autoFocus={false}
                  label="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.password) &&
                    Boolean(formik.touched.password)
                  }
                  type="password"
                />
                {formik.touched.password ? (
                  <div className="error">{formik.errors.password} </div>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <Textfield
                  autoFocus={false}
                  label="Confirm password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.confirmPassword) &&
                    Boolean(formik.touched.confirmPassword)
                  }
                  type="password"
                />
                {formik.touched.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword} </div>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit">
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
export default ResetPassword;
