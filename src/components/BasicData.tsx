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
import Filter1RoundedIcon from "@mui/icons-material/Filter1Rounded";

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
  firstName: Yup.string()
    .min(3, "First name min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  lastName: Yup.string()
    .min(3, "Last name min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  ceo: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .min(3, "CEO name min. 3 letters")
    .required("required"),
  phoneNumber: Yup.string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g,
      "Incorrect type of phone number"
    )
    .required("required"),
  companyName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  street: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  houseNumber: Yup.number().typeError("numbers only").required("required"),
  zipCode: Yup.number()
    .typeError("Invalid type of zipc code")
    .required("required"),
  city: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  communityLicence: Yup.string().required("required"),
});

const BasicData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      companyName: user?.companyName,
      ceo: user?.ceo,
      phoneNumber: user?.phoneNumber,
      street: user?.street,
      houseNumber: user?.houseNumber,
      city: user?.city,
      zipCode: user?.zipCode,
      communityLicence: user?.communityLicence,
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put(`/company/edit-profile`, values)
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
          <div className="user-profile-data">
            {snackbar.open ? <SnackBar /> : null}
            <form onSubmit={formik.handleSubmit}>
              <GridContainer
                backgroundColor="#ff9100"
                icon={<Filter1RoundedIcon />}
                content="Basic data"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    autoFocus={false}
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.firstName) &&
                      Boolean(formik.touched.firstName)
                    }
                    type={undefined}
                  />
                  {formik.touched.firstName ? (
                    <div className="error">{formik.errors.firstName}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    autoFocus={false}
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.lastName) &&
                      Boolean(formik.touched.lastName)
                    }
                    type={undefined}
                  />
                  {formik.touched.lastName ? (
                    <div className="error">{formik.errors.lastName}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    autoFocus={false}
                    label="Phone number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.phoneNumber) &&
                      Boolean(formik.touched.phoneNumber)
                    }
                    type={undefined}
                  />
                  {formik.touched.phoneNumber ? (
                    <div className="error">{formik.errors.phoneNumber}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    autoFocus={false}
                    label="Company name"
                    name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.companyName) &&
                      Boolean(formik.touched.companyName)
                    }
                    type={undefined}
                  />
                  {formik.touched.companyName ? (
                    <div className="error">{formik.errors.companyName}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    autoFocus={false}
                    label="CEO"
                    name="ceo"
                    value={formik.values.ceo}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.ceo) && Boolean(formik.touched.ceo)
                    }
                    type={undefined}
                  />
                  {formik.touched.ceo ? (
                    <div className="error">{formik.errors.ceo}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Textfield
                    autoFocus={false}
                    label="Community Licence"
                    name="communityLicence"
                    value={formik.values.communityLicence}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.communityLicence) &&
                      Boolean(formik.touched.communityLicence)
                    }
                    type={undefined}
                  />
                  {formik.touched.communityLicence ? (
                    <div className="error">
                      {formik.errors.communityLicence}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={8} md={4} lg={4}>
                  <Textfield
                    autoFocus={false}
                    label="Street"
                    name="street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.street) &&
                      Boolean(formik.touched.street)
                    }
                    type={undefined}
                  />
                  {formik.touched.street ? (
                    <div className="error">{formik.errors.street}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4} md={2} lg={2}>
                  <Textfield
                    autoFocus={false}
                    label="House Number"
                    name="houseNumber"
                    value={formik.values.houseNumber}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.houseNumber) &&
                      Boolean(formik.touched.houseNumber)
                    }
                    type={undefined}
                  />
                  {formik.touched.houseNumber ? (
                    <div className="error">{formik.errors.houseNumber} </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Textfield
                    autoFocus={false}
                    label="ZIP code"
                    name="zipCode"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.zipCode) &&
                      Boolean(formik.touched.zipCode)
                    }
                    type={undefined}
                  />
                  {formik.touched.zipCode ? (
                    <div className="error">{formik.errors.zipCode} </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Textfield
                    autoFocus={false}
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    helperText={undefined}
                    error={
                      Boolean(formik.errors.city) &&
                      Boolean(formik.touched.city)
                    }
                    type={undefined}
                  />
                  {formik.touched.city ? (
                    <div className="error">{formik.errors.city} </div>
                  ) : null}
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
export default BasicData;
