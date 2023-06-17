import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GridContainer from "../components/GridContainer";
import { removeSnackbar, setSnackbar } from "../redux/slices/snackbarSlice";
import { RootState } from "../redux/store";
import { motion } from "framer-motion";
import Textfield from "../components/Textfield";
import SnackBar from "../components/SnackBar";
import Filter2RoundedIcon from "@mui/icons-material/Filter2Rounded";

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
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Incorrect type of email"
    )
    .required("required"),
  password: Yup.string().required("required"),
  confirmPassword: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const CompanySecretData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put(``, values)
        .then((res) => {
          console.log(res.data);
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
            4000
          );
        });
    },
  });

  return (
    <div className="sign-up">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ThemeProvider theme={theme}>
          <div style={{ marginTop: "3em" }} className="user-profile-data">
            {snackbar.open ? <SnackBar /> : null}
            <form onSubmit={formik.handleSubmit}>
              <GridContainer
                backgroundColor="#ff1744"
                icon={<Filter2RoundedIcon />}
                content="Secret data"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    label="E-Mail"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.email ? (
                        <div className="error">{formik.errors.email} </div>
                      ) : null
                    }
                    error={
                      Boolean(formik.errors.email) &&
                      Boolean(formik.touched.email)
                    }
                    type={undefined}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    label="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.password ? (
                        <div className="error">{formik.errors.password} </div>
                      ) : null
                    }
                    error={
                      Boolean(formik.errors.password) &&
                      Boolean(formik.touched.password)
                    }
                    type="password"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    label="Confirm password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.confirmPassword ? (
                        <div className="error">
                          {formik.errors.confirmPassword}{" "}
                        </div>
                      ) : null
                    }
                    error={
                      Boolean(formik.errors.confirmPassword) &&
                      Boolean(formik.touched.confirmPassword)
                    }
                    type="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit">
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </ThemeProvider>
      </motion.div>
    </div>
  );
};
export default CompanySecretData;
