import GridContainer from "../GridContainer";
import { Button, Grid, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Textfield from "../Textfield";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import SelectBar from "../SelectBar";
import SnackBar from "../SnackBar";
import PickDate from "../PickDate";
import moment from "moment";

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
    .matches(/^[a-zA-Z0-9 ]*$/, "No special characters")
    .required("required"),
  licenceTyp: Yup.string().required("required"),
  licenceTypExpire: Yup.string().required("required"),
  codeNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "No special characters")
    .required("required"),
  codeNumberExpire: Yup.string().required("required"),
  driverCardNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "No special characters")
    .required("required"),
  driverCardNumberExpire: Yup.string().required("required"),
});

function EditDriversProfile() {
  const driver = useSelector((state: RootState) => state.driver.driver);
  const snackbar = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: driver?._id,
      firstName: driver?.firstName,
      lastName: driver?.lastName,
      phoneNumber: driver?.phoneNumber,
      licenceNumber: driver?.licenceNumber,
      licenceTyp: driver?.licenceTyp,
      licenceTypExpire: driver?.licenceTypExpire,
      codeNumber: driver?.codeNumber,
      codeNumberExpire: driver?.codeNumberExpire,
      driverCardNumber: driver?.driverCardNumber,
      driverCardNumberExpire: driver?.driverCardNumberExpire,
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put(`/driver/edit/${driver?._id}`, values)
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

  const height = {
    style: { height: "10px" },
  };
  return (
    <div className="profile-section-child">
      {snackbar.open ? <SnackBar /> : null}
      <GridContainer
        backgroundColor="#00a152"
        icon={<AccountCircleIcon />}
        content="Edit data"
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container rowSpacing={2} alignItems="center">
          <Grid item xs={5}>
            <Typography>First name</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              label={undefined}
              name={"firstName"}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.firstName) &&
                Boolean(formik.touched.firstName)
              }
              type={undefined}
              autoFocus={false}
              inputProps={height}
            />
            {formik.touched.firstName ? (
              <div className="error">{formik.errors.firstName}</div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Last name</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              autoFocus={false}
              label={undefined}
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.lastName) &&
                Boolean(formik.touched.lastName)
              }
              type={undefined}
              inputProps={height}
            />
            {formik.touched.lastName ? (
              <div className="error">{formik.errors.lastName}</div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Phone num.</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              autoFocus={false}
              label={undefined}
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.phoneNumber) &&
                Boolean(formik.touched.phoneNumber)
              }
              type={undefined}
              inputProps={height}
            />
            {formik.touched.phoneNumber ? (
              <div className="error">{formik.errors.phoneNumber} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Licence num.</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              autoFocus={false}
              label={undefined}
              name="licenceNumber"
              value={formik.values.licenceNumber}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.licenceNumber) &&
                Boolean(formik.touched.licenceNumber)
              }
              type={undefined}
              inputProps={height}
            />
            {formik.touched.licenceNumber ? (
              <div className="error">{formik.errors.licenceNumber} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Licence type</Typography>
          </Grid>
          <Grid item xs={7}>
            <SelectBar
              sx={{
                height: "27px",
              }}
              label={undefined}
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
          <Grid item xs={5}>
            <Typography>Expiry date</Typography>
          </Grid>
          <Grid item xs={7}>
            <PickDate
              views={["year", "month", "day"]}
              format={"DD.MM.YYYY"}
              value={moment(formik.values.licenceTypExpire)}
              onChange={(value, context) => {
                const date = moment(value);
                // convert the string value to a Moment object
                formik.setFieldValue("licenceTypExpire", date);
              }}
              error={
                Boolean(formik.errors.licenceTypExpire) &&
                Boolean(formik.touched.licenceTypExpire)
              }
              inputLabel={"Expiry date"}
            />
            {formik.touched.licenceTypExpire ? (
              <div className="error">{formik.errors.licenceTypExpire} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Code num.</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              autoFocus={false}
              label={undefined}
              name="codeNumber"
              value={formik.values.codeNumber}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.codeNumber) &&
                Boolean(formik.touched.codeNumber)
              }
              type={undefined}
              inputProps={height}
            />
            {formik.touched.codeNumber ? (
              <div className="error">{formik.errors.codeNumber} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Expiry date</Typography>
          </Grid>
          <Grid item xs={7}>
            <PickDate
              views={["year", "month", "day"]}
              format={"DD.MM.YYYY"}
              value={moment(formik.values.codeNumberExpire)}
              onChange={(value, context) => {
                const date = moment(value);
                // convert the string value to a Moment object
                formik.setFieldValue("codeNumberExpire", date);
              }}
              error={
                Boolean(formik.errors.codeNumberExpire) &&
                Boolean(formik.touched.codeNumberExpire)
              }
              inputLabel={"Expiry date"}
            />
            {formik.touched.codeNumberExpire ? (
              <div className="error">{formik.errors.codeNumberExpire} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Driver card num.</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              autoFocus={false}
              label={undefined}
              name="driverCardNumber"
              value={formik.values.driverCardNumber}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.driverCardNumber) &&
                Boolean(formik.touched.driverCardNumber)
              }
              type={undefined}
              inputProps={height}
            />
            {formik.touched.driverCardNumber ? (
              <div className="error">{formik.errors.driverCardNumber}</div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Expiry date</Typography>
          </Grid>
          <Grid item xs={7}>
            <PickDate
              views={["year", "month", "day"]}
              format={"DD.MM.YYYY"}
              value={moment(formik.values.driverCardNumberExpire)}
              onChange={(value, context) => {
                const date = moment(value);
                // convert the string value to a Moment object
                formik.setFieldValue("driverCardNumberExpire", date);
              }}
              error={
                Boolean(formik.errors.driverCardNumberExpire) &&
                Boolean(formik.touched.driverCardNumberExpire)
              }
              inputLabel="Expiry date"
            />
            {formik.touched.driverCardNumberExpire ? (
              <div className="error">
                {formik.errors.driverCardNumberExpire}{" "}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="small">
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default EditDriversProfile;
