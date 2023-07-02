import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import SnackBar from "../SnackBar";
import { useState } from "react";
import StepOne from "./StepOne";
import moment from "moment";
import StepTwo from "./StepTwo";

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
  street: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  houseNumber: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g, "Numbers only")
    .required("required"),
  zipCode: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g, "Numbers only")
    .required("required"),
  city: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  birthday: Yup.string().required("required"),
  birthPlace: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
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

function EditDriversProfile(props: { getDrivers: () => Promise<void> }) {
  const driver = useSelector((state: RootState) => state.driver.driver);
  const snackbar = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const formik = useFormik({
    initialValues: {
      id: driver?._id,
      firstName: driver?.firstName,
      lastName: driver?.lastName,
      phoneNumber: driver?.phoneNumber,
      birthday: driver?.birthday,
      birthPlace: driver?.birthPlace,
      street: driver?.street,
      houseNumber: driver?.houseNumber,
      zipCode: driver?.zipCode,
      city: driver?.city,
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
      if (page === 0) {
        setPage(page + 1);
      }
      if (page === 1) {
        await axios.put(`/driver/edit/${driver?._id}`, values).then((res) => {
          props.getDrivers();
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
                removeSnackbar({
                  open: false,
                  severity: "error",
                  message: "",
                })
              ),
            4000
          );
        });
      }
    },
  });

  const pageOne = (
    <StepOne
      // value
      valueFirstName={formik.values.firstName}
      valueLastName={formik.values.lastName}
      valuePhoneNumber={formik.values.phoneNumber}
      valueBirthday={moment(formik.values.birthday)}
      valueStreet={formik.values.street}
      valueHouseNumber={formik.values.houseNumber}
      valueZipCode={formik.values.zipCode}
      valueCity={formik.values.city}
      valueBirthPlace={formik.values.birthPlace}
      // onChange
      onChangeFirstName={formik.handleChange}
      onChangeLastName={formik.handleChange}
      onChangePhoneNumber={formik.handleChange}
      onChangeBirthday={(value, context) => {
        const date = moment(value);
        formik.setFieldValue("birthday", date);
      }}
      onChangeBirthPlace={formik.handleChange}
      onChangeStreet={formik.handleChange}
      onChangeHouseNumber={formik.handleChange}
      onChangeZipCode={formik.handleChange}
      onChangeCity={formik.handleChange}
      // error
      errorFirstName={
        Boolean(formik.errors.firstName) && Boolean(formik.touched.firstName)
      }
      errorLastName={
        Boolean(formik.errors.lastName) && Boolean(formik.touched.lastName)
      }
      errorPhoneNumber={
        Boolean(formik.errors.phoneNumber) &&
        Boolean(formik.touched.phoneNumber)
      }
      errorBirthday={
        Boolean(formik.errors.birthday) && Boolean(formik.touched.birthday)
      }
      errorBirthPlace={
        Boolean(formik.errors.birthPlace) && Boolean(formik.touched.birthPlace)
      }
      errorStreet={
        Boolean(formik.errors.street) && Boolean(formik.touched.street)
      }
      errorHouseNumber={
        Boolean(formik.errors.houseNumber) &&
        Boolean(formik.touched.houseNumber)
      }
      errorZipCode={
        Boolean(formik.errors.zipCode) && Boolean(formik.touched.zipCode)
      }
      errorCity={Boolean(formik.errors.city) && Boolean(formik.touched.city)}
      // holder
      holderFirstName={
        formik.touched.firstName ? (
          <div className="error">{formik.errors.firstName} </div>
        ) : null
      }
      holderLastName={
        formik.touched.lastName ? (
          <div className="error">{formik.errors.lastName} </div>
        ) : null
      }
      holderPhoneNumber={
        formik.touched.phoneNumber ? (
          <div className="error">{formik.errors.phoneNumber} </div>
        ) : null
      }
      holderBirthday={
        formik.touched.birthday ? (
          <div className="error">{formik.errors.birthday} </div>
        ) : null
      }
      holderBirthPlace={
        formik.touched.birthPlace ? (
          <div className="error">{formik.errors.birthPlace} </div>
        ) : null
      }
      holderStreet={
        formik.touched.street ? (
          <div className="error">{formik.errors.street} </div>
        ) : null
      }
      holderHouseNumber={
        formik.touched.houseNumber ? (
          <div className="error">{formik.errors.houseNumber} </div>
        ) : null
      }
      holderZipCode={
        formik.touched.zipCode ? (
          <div className="error">{formik.errors.zipCode} </div>
        ) : null
      }
      holderCity={
        formik.touched.city ? (
          <div className="error">{formik.errors.city} </div>
        ) : null
      }
    />
  );

  const pageTwo = (
    <StepTwo
      // value
      valueLicenceNumber={formik.values.licenceNumber}
      valueLicenceTyp={formik.values.licenceTyp}
      valueLicenceTypExpire={moment(formik.values.licenceTypExpire)}
      valueCodeNumber={formik.values.codeNumber}
      valueCodeNumberExpire={moment(formik.values.codeNumberExpire)}
      valueDriverCardNumber={formik.values.driverCardNumber}
      valueDriverCardNumberExpire={moment(formik.values.driverCardNumberExpire)}
      // onChange
      onChangeLicenceNumber={formik.handleChange}
      onChangeLicenceTyp={formik.handleChange}
      onChangeLicenceTypExpire={(value, context) => {
        const date = moment(value);
        // convert the string value to a Moment object
        formik.setFieldValue("licenceTypExpire", date);
      }}
      onChangeCodeNumber={formik.handleChange}
      onChangeCodeNumberExpire={(value, context) => {
        const date = moment(value);
        // convert the string value to a Moment object
        formik.setFieldValue("codeNumberExpire", date);
      }}
      onChangeDriverCardNumber={formik.handleChange}
      onChangeDriverCardNumberExpire={(value, context) => {
        const date = moment(value);
        // convert the string value to a Moment object
        formik.setFieldValue("driverCardNumberExpire", date);
      }}
      // error
      errorLicenceNumber={
        Boolean(formik.errors.licenceNumber) &&
        Boolean(formik.touched.licenceNumber)
      }
      errorLicenceTyp={
        Boolean(formik.errors.licenceTyp) && Boolean(formik.touched.licenceTyp)
      }
      errorLicenceTypExpire={
        Boolean(formik.errors.licenceTypExpire) &&
        Boolean(formik.touched.licenceTypExpire)
      }
      errorCodeNumber={
        Boolean(formik.errors.codeNumber) && Boolean(formik.touched.codeNumber)
      }
      errorCodeNumberExpire={
        Boolean(formik.errors.codeNumberExpire) &&
        Boolean(formik.touched.codeNumberExpire)
      }
      errorDriverCardNumber={
        Boolean(formik.errors.driverCardNumber) &&
        Boolean(formik.touched.driverCardNumber)
      }
      errorDriverCardNumberExpire={
        Boolean(formik.errors.driverCardNumberExpire) &&
        Boolean(formik.touched.driverCardNumberExpire)
      }
      // holder
      holderLicenceNumber={
        formik.touched.licenceNumber ? (
          <div className="error">{formik.errors.licenceNumber} </div>
        ) : null
      }
      holderLicenceTyp={
        formik.touched.licenceTyp ? (
          <div className="error">{formik.errors.licenceTyp} </div>
        ) : null
      }
      holderLicenceTypExpire={
        formik.touched.licenceTypExpire ? (
          <div className="error">{formik.errors.licenceTypExpire} </div>
        ) : null
      }
      holderCodeNumber={
        formik.touched.codeNumber ? (
          <div className="error">{formik.errors.codeNumber} </div>
        ) : null
      }
      holderCodeNumberExpire={
        formik.touched.codeNumberExpire ? (
          <div className="error">{formik.errors.codeNumberExpire} </div>
        ) : null
      }
      holderDriverCardNumber={
        formik.touched.driverCardNumber ? (
          <div className="error">{formik.errors.driverCardNumber}</div>
        ) : null
      }
      holderDriverCardNumberExpire={
        formik.touched.driverCardNumberExpire ? (
          <div className="error">{formik.errors.driverCardNumberExpire} </div>
        ) : null
      }
    />
  );

  return (
    <div>
      {snackbar.open ? <SnackBar /> : null}
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={{ xs: 3 }}
          direction="row"
          alignItems="center"
        >
          {page === 0 ? pageOne : pageTwo}
          <Grid item xs={12}>
            <Button variant="contained" size="small" type="submit">
              {page === 0 ? "Next" : "Confirm"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default EditDriversProfile;
