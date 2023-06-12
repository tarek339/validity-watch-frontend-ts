import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import GridContainer from "../components/GridContainer";
import { removeSnackbar, setSnackbar } from "../redux/slices/snackbarSlice";
import SnackBar from "../components/SnackBar";
import { RootState } from "../redux/store";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name min. 3 letters")
    .matches(/^[A-Za-z]+$/, "Letters only")
    .required("required"),
  lastName: Yup.string()
    .min(3, "Last name min. 3 letters")
    .matches(/^[A-Za-z]+$/, "Letters only")
    .required("required"),
  companyName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Letters only")
    .required("required"),
  ceo: Yup.string()
    .matches(/^[A-Za-z]+$/, "Letters only")
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
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
  street: Yup.string()
    .matches(/^[A-Za-z]+$/, "Letters only")
    .required("required"),
  houseNumber: Yup.number()
    .typeError("Invalid type of house number")
    .required("required"),
  zipCode: Yup.number()
    .typeError("Invalid type of zipc code")
    .required("required"),
  city: Yup.string()
    .matches(/^[A-Za-z]+$/, "Letters only")
    .required("required"),
  communityLicence: Yup.string().required("required"),
});

const iconStyle = {
  color: "#fff",
  backgroundColor: "#9c27b0",
  borderRadius: "50%",
  padding: "5px",
};

const ContactForm = () => {
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
    onSubmit: async (values, { resetForm }) => {
      await axios
        .post("/company/sign-up", values)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          dispatch(addUser(res.data.user));
        })

        .then(() => navigate("/sign-up-msg"))
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
      <GridContainer>
        <HttpsOutlinedIcon style={iconStyle} fontSize="medium" />
      </GridContainer>
      <GridContainer>
        <Typography variant="h4">Sign Up </Typography>
        <Typography variant="h4">or</Typography>
        <Button onClick={() => navigate("/sign-in")}>
          <Typography variant="h5">Sign In</Typography>
        </Button>
      </GridContainer>

      {snackbar.open ? <SnackBar /> : null}

      <div className="sign-form">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="firstName"
                variant="outlined"
                size="small"
                label="First name"
                className="TextField-without-border-radius"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.firstName ? formik.errors.firstName : null
                }
                error={
                  Boolean(formik.errors.firstName) &&
                  Boolean(formik.touched.firstName)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="lastName"
                variant="outlined"
                size="small"
                label="Last name"
                className="TextField-without-border-radius"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.lastName ? formik.errors.lastName : null
                }
                error={
                  Boolean(formik.errors.lastName) &&
                  Boolean(formik.touched.lastName)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="companyName"
                variant="outlined"
                size="small"
                label="Company name"
                className="TextField-without-border-radius"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.companyName ? formik.errors.companyName : null
                }
                error={
                  Boolean(formik.errors.companyName) &&
                  Boolean(formik.touched.companyName)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="ceo"
                variant="outlined"
                size="small"
                label="CEO"
                className="TextField-without-border-radius"
                value={formik.values.ceo}
                onChange={formik.handleChange}
                helperText={formik.touched.ceo ? formik.errors.ceo : null}
                error={
                  Boolean(formik.errors.ceo) && Boolean(formik.touched.ceo)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                size="small"
                label="E-Mail"
                className="TextField-without-border-radius"
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.touched.email ? formik.errors.email : null}
                error={
                  Boolean(formik.errors.email) && Boolean(formik.touched.email)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="phoneNumber"
                variant="outlined"
                size="small"
                label="Phone number"
                className="TextField-without-border-radius"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.phoneNumber ? formik.errors.phoneNumber : null
                }
                error={
                  Boolean(formik.errors.phoneNumber) &&
                  Boolean(formik.touched.phoneNumber)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="password"
                variant="outlined"
                size="small"
                label="Password"
                type="password"
                className="TextField-without-border-radius"
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.password ? formik.errors.password : null
                }
                error={
                  Boolean(formik.errors.password) &&
                  Boolean(formik.touched.password)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="confirmPassword"
                variant="outlined"
                size="small"
                label="Confirm assword"
                type="password"
                className="TextField-without-border-radius"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : null
                }
                error={
                  Boolean(formik.errors.confirmPassword) &&
                  Boolean(formik.touched.confirmPassword)
                }
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="street"
                variant="outlined"
                size="small"
                label="Street"
                className="TextField-without-border-radius"
                value={formik.values.street}
                onChange={formik.handleChange}
                helperText={formik.touched.street ? formik.errors.street : null}
                error={
                  Boolean(formik.errors.street) &&
                  Boolean(formik.touched.street)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="houseNumber"
                variant="outlined"
                size="small"
                label="House number"
                className="TextField-without-border-radius"
                value={formik.values.houseNumber}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.houseNumber ? formik.errors.houseNumber : null
                }
                error={
                  Boolean(formik.errors.houseNumber) &&
                  Boolean(formik.touched.houseNumber)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="zipCode"
                variant="outlined"
                size="small"
                label="Zip Code"
                className="TextField-without-border-radius"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.zipCode ? formik.errors.zipCode : null
                }
                error={
                  Boolean(formik.errors.zipCode) &&
                  Boolean(formik.touched.zipCode)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="city"
                variant="outlined"
                size="small"
                label="City"
                className="TextField-without-border-radius"
                value={formik.values.city}
                onChange={formik.handleChange}
                helperText={formik.touched.city ? formik.errors.city : null}
                error={
                  Boolean(formik.errors.city) && Boolean(formik.touched.city)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="communityLicence"
                variant="outlined"
                size="small"
                label="Community license"
                className="TextField-without-border-radius"
                value={formik.values.communityLicence}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.communityLicence
                    ? formik.errors.communityLicence
                    : null
                }
                error={
                  Boolean(formik.errors.communityLicence) &&
                  Boolean(formik.touched.communityLicence)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};
export default ContactForm;
