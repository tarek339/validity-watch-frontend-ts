import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GridContainer from "./GridContainer";
import { removeSnackbar, setSnackbar } from "../redux/slices/snackbarSlice";
import { RootState } from "../redux/store";
import { motion } from "framer-motion";
import Textfield from "./Textfield";
import SnackBar from "./SnackBar";
import Filter2RoundedIcon from "@mui/icons-material/Filter2Rounded";
import { useEffect } from "react";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 750,
      lg: 980,
      xl: 1530,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const validationSchema = Yup.object({
  password: Yup.string().required("required"),
  confirmPassword: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ChangePassword = (props: { page: number; setPage: Function }) => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  useEffect(() => {
    setTimeout(() => props.setPage(props.page - 1), 30000);
  }, [props]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put(`/company/change-password`, values)
        .then((res) => {
          console.log(res.data);
          props.setPage(props.page - 1);
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
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ThemeProvider theme={theme}>
        {snackbar.open ? <SnackBar /> : null}
        <form onSubmit={formik.handleSubmit}>
          <GridContainer
            backgroundColor="#4caf50"
            icon={<Filter2RoundedIcon />}
            content="Change password"
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Textfield
                autoFocus={true}
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

            <Grid item xs={12} sm={6}>
              <Textfield
                autoFocus={false}
                label="Confirm password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  Boolean(formik.errors.confirmPassword) &&
                  Boolean(formik.touched.confirmPassword)
                }
                type="password"
                helperText={undefined}
              />
              {formik.touched.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword} </div>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button fullWidth variant="contained" type="submit">
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </ThemeProvider>
    </motion.div>
  );
};
export default ChangePassword;
