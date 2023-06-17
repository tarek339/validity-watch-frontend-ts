import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import GridContainer from "../components/GridContainer";
import { removeSnackbar, setSnackbar } from "../redux/slices/snackbarSlice";
import SnackBar from "../components/SnackBar";
import { RootState } from "../redux/store";
import { motion } from "framer-motion";
import Textfield from "../components/Textfield";
import SensorOccupiedRoundedIcon from "@mui/icons-material/SensorOccupiedRounded";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  lastName: Yup.string()
    .min(3, "Last name min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  companyName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  ceo: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .min(3, "CEO name min. 3 letters")
    .required("required"),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Incorrect type of email"
    )
    .required("required"),
  phoneNumber: Yup.string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g,
      "Incorrect type of phone number"
    )
    .required("required"),
  password: Yup.string().required("required"),
  confirmPassword: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
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

const SignUpCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const formik = useFormik({
    initialValues: {
      firstName: "Tarek",
      lastName: "Tarek",
      companyName: "Tarek",
      ceo: "Tarek",
      email: "tarekjassine@gmail.com",
      phoneNumber: "121232112323",
      password: "tarek123",
      confirmPassword: "tarek123",
      street: "asdasdd",
      houseNumber: "12",
      city: "aasdad",
      zipCode: "1212",
      communityLicence: "asddd",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .post("/company/sign-up", values)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          dispatch(addUser(res.data.user));
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
              backgroundColor="#f73378"
              icon={<SensorOccupiedRoundedIcon />}
              content="Sign up"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Textfield
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.firstName ? (
                      <div className="error">{formik.errors.firstName} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.firstName) &&
                    Boolean(formik.touched.firstName)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={6}>
                <Textfield
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.lastName ? (
                      <div className="error">{formik.errors.lastName} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.lastName) &&
                    Boolean(formik.touched.lastName)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={6}>
                <Textfield
                  label="Company name"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.companyName ? (
                      <div className="error">{formik.errors.companyName} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.companyName) &&
                    Boolean(formik.touched.companyName)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={6}>
                <Textfield
                  label="CEO"
                  name="ceo"
                  value={formik.values.ceo}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.ceo ? (
                      <div className="error">{formik.errors.ceo} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.ceo) && Boolean(formik.touched.ceo)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <Textfield
                  label="Phone number"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.phoneNumber ? (
                      <div className="error">{formik.errors.phoneNumber} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.phoneNumber) &&
                    Boolean(formik.touched.phoneNumber)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={8}>
                <Textfield
                  label="Street"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.street ? (
                      <div className="error">{formik.errors.street} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.street) &&
                    Boolean(formik.touched.street)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={4}>
                <Textfield
                  label="House Number"
                  name="houseNumber"
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.houseNumber ? (
                      <div className="error">{formik.errors.houseNumber} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.houseNumber) &&
                    Boolean(formik.touched.houseNumber)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={6}>
                <Textfield
                  label="ZIP code"
                  name="zipCode"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.zipCode ? (
                      <div className="error">{formik.errors.zipCode} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.zipCode) &&
                    Boolean(formik.touched.zipCode)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={6}>
                <Textfield
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.city ? (
                      <div className="error">{formik.errors.city} </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.city) && Boolean(formik.touched.city)
                  }
                  type={undefined}
                />
              </Grid>
              <Grid item xs={12}>
                <Textfield
                  label="Community Licence"
                  name="communityLicence"
                  value={formik.values.communityLicence}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.communityLicence ? (
                      <div className="error">
                        {formik.errors.communityLicence}{" "}
                      </div>
                    ) : null
                  }
                  error={
                    Boolean(formik.errors.communityLicence) &&
                    Boolean(formik.touched.communityLicence)
                  }
                  type={undefined}
                />
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
export default SignUpCompany;
