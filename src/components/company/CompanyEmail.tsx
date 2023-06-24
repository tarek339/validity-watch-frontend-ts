import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GridContainer from "../GridContainer";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import { RootState } from "../../redux/store";
import { motion } from "framer-motion";
import Textfield from "../Textfield";
import SnackBar from "../SnackBar";
import Filter3RoundedIcon from "@mui/icons-material/Filter3Rounded";

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
});

const CompanyEmail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const formik = useFormik({
    initialValues: {
      email: user?.email,
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put(`/company/edit-email`, values)
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
            5000
          );
        });
    },
  });

  return (
    <div className="section">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ThemeProvider theme={theme}>
          <div className="section-child">
            {snackbar.open ? <SnackBar /> : null}
            <form
              className="section-child-content"
              onSubmit={formik.handleSubmit}
            >
              <GridContainer
                backgroundColor="#3d5afe"
                icon={<Filter3RoundedIcon />}
                content="Change E-mail"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Textfield
                    inputProps={undefined}
                    autoFocus={false}
                    label="E-Mail"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                      Boolean(formik.errors.email) &&
                      Boolean(formik.touched.email)
                    }
                    type={undefined}
                    helperText={undefined}
                  />
                  {formik.touched.email ? (
                    <div className="error"> {formik.errors.email} </div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <div className="edit-button">
                    <Button fullWidth variant="contained" type="submit">
                      Edit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </ThemeProvider>
      </motion.div>
    </div>
  );
};
export default CompanyEmail;
