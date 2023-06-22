import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  MenuItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import GridContainer from "../GridContainer";
import Textfield from "../Textfield";
import SnackBar from "../SnackBar";
import Person2Icon from "@mui/icons-material/Person2";
import SelectBar from "../SelectBar";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 501,
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
  phoneNumber: Yup.string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g,
      "Incorrect type of phone number"
    )
    .required("required"),
  licenceNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/)
    .required("required"),
  licenceTyp: Yup.string().required("required"),
  licenceTypExpire: Yup.string().required("required"),
  codeNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/)
    .required("required"),
  codeNumberExpire: Yup.string().required("required"),
  driverCardNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/)
    .required("required"),
  // driverCardNumberExpire: Yup.string().required("required"),
});

const AddDriver = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);
  const user = useSelector((state: RootState) => state.user.user);

  const formik = useFormik({
    initialValues: {
      id: user?._id,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      licenceNumber: "",
      licenceTyp: "",
      licenceTypExpire: "",
      codeNumber: "",
      codeNumberExpire: "",
      driverCardNumber: "",
      driverCardNumberExpire: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .post("/driver/sign-up", values)
        .then((res) => {
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

  const values = [
    {
      id: 1,
      value: "C1E",
      name: "C1E",
    },
    {
      id: 2,
      value: "C1",
      name: "C1",
    },
    {
      id: 3,
      value: "C",
      name: "C",
    },
    {
      id: 4,
      value: "CE",
      name: "CE",
    },
  ];

  return (
    <div className="section">
      <ThemeProvider theme={theme}>
        {snackbar.open ? <SnackBar /> : null}
        <div className="section-child">
          <form
            className="section-child-content"
            onSubmit={formik.handleSubmit}
          >
            <GridContainer
              backgroundColor="#f73378"
              icon={<Person2Icon />}
              content="Add drivers"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                  <div className="error">{formik.errors.firstName} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  <div className="error">{formik.errors.lastName} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  <div className="error">{formik.errors.phoneNumber} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Licence number"
                  name="licenceNumber"
                  value={formik.values.licenceNumber}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.licenceNumber) &&
                    Boolean(formik.touched.licenceNumber)
                  }
                  type={undefined}
                />
                {formik.touched.licenceNumber ? (
                  <div className="error">{formik.errors.licenceNumber} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectBar
                  label="Licence Typ"
                  name="licenceTyp"
                  value={formik.values.licenceTyp}
                  onChange={formik.handleChange}
                  error={
                    Boolean(formik.errors.licenceTyp) &&
                    Boolean(formik.touched.licenceTyp)
                  }
                  children={values.map((value) => {
                    return (
                      <MenuItem key={value.id} value={value.value}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                />
                {formik.touched.licenceTyp ? (
                  <div className="error">{formik.errors.licenceTyp} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Licence typ expiry date"
                  name="licenceTypExpire"
                  value={formik.values.licenceTypExpire}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.licenceTypExpire) &&
                    Boolean(formik.touched.licenceTypExpire)
                  }
                  type={undefined}
                />
                {formik.touched.licenceTypExpire ? (
                  <div className="error">{formik.errors.licenceTypExpire} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Code number"
                  name="codeNumber"
                  value={formik.values.codeNumber}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.codeNumber) &&
                    Boolean(formik.touched.codeNumber)
                  }
                  type={undefined}
                />
                {formik.touched.codeNumber ? (
                  <div className="error">{formik.errors.codeNumber} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Code number expiry date"
                  name="codeNumberExpire"
                  value={formik.values.codeNumberExpire}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.codeNumberExpire) &&
                    Boolean(formik.touched.codeNumberExpire)
                  }
                  type={undefined}
                />
                {formik.touched.codeNumberExpire ? (
                  <div className="error">{formik.errors.codeNumberExpire} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Driver card number"
                  name="driverCardNumber"
                  value={formik.values.driverCardNumber}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.driverCardNumber) &&
                    Boolean(formik.touched.driverCardNumber)
                  }
                  type={undefined}
                />
                {formik.touched.driverCardNumber ? (
                  <div className="error">{formik.errors.driverCardNumber}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Driver card number expire"
                  name="driverCardNumberExpire"
                  value={formik.values.driverCardNumberExpire}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.driverCardNumberExpire) &&
                    Boolean(formik.touched.driverCardNumberExpire)
                  }
                  type={undefined}
                />
                {formik.touched.driverCardNumberExpire ? (
                  <div className="error">
                    {formik.errors.driverCardNumberExpire}{" "}
                  </div>
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
      </ThemeProvider>
    </div>
  );
};
export default AddDriver;
