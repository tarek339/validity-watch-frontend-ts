import { Button, Grid, Typography } from "@mui/material";
import GridContainer from "../GridContainer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import Textfield from "../Textfield";
import SnackBar from "../SnackBar";
import PickDate from "../PickDate";
import moment from "moment";

const validationSchema = Yup.object({
  indicator: Yup.string().required("required"),
  name: Yup.string()
    .min(3, "Name min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  type: Yup.string()
    .min(3, "Typ min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  weight: Yup.string()
    .matches(/^[0-9]+$/, "Numbers only")
    .required("required"),
  nextHU: Yup.string().required("required"),
  nextSP: Yup.string().required("required"),
});

function EditTruck() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);
  const truck = useSelector((state: RootState) => state.truck.truck);

  const formik = useFormik({
    initialValues: {
      id: truck?._id,
      indicator: truck?.indicator,
      name: truck?.name,
      type: truck?.type,
      weight: truck?.weight,
      nextHU: truck?.nextHU,
      nextSP: truck?.nextSP,
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put(`/truck/edit-truck/${truck?._id}`, values)
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

  const height = {
    style: { height: "10px" },
  };
  return (
    <div className="profile-section-child">
      <GridContainer
        backgroundColor="#00a162"
        icon={<LocalShippingIcon />}
        content="Edit"
      />
      {snackbar.open ? <SnackBar /> : null}
      <form onSubmit={formik.handleSubmit}>
        <Grid container rowSpacing={2} alignItems="center">
          <Grid item xs={5}>
            <Typography>Indicator</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              label={undefined}
              name={"indicator"}
              value={formik.values.indicator}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.indicator) &&
                Boolean(formik.touched.indicator)
              }
              type={undefined}
              autoFocus={false}
              inputProps={height}
            />
            {formik.touched.indicator ? (
              <div className="error">{formik.errors.indicator} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              label={undefined}
              name={"name"}
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.name) && Boolean(formik.touched.name)
              }
              type={undefined}
              autoFocus={false}
              inputProps={height}
            />
            {formik.touched.name ? (
              <div className="error">{formik.errors.name} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Type</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              label={undefined}
              name={"type"}
              value={formik.values.type}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.type) && Boolean(formik.touched.type)
              }
              type={undefined}
              autoFocus={false}
              inputProps={height}
            />
            {formik.touched.type ? (
              <div className="error">{formik.errors.type} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Weight</Typography>
          </Grid>
          <Grid item xs={7}>
            <Textfield
              label={undefined}
              name={"weight"}
              value={formik.values.weight}
              onChange={formik.handleChange}
              helperText={undefined}
              error={
                Boolean(formik.errors.weight) && Boolean(formik.touched.weight)
              }
              type={undefined}
              autoFocus={false}
              inputProps={height}
            />
            {formik.touched.weight ? (
              <div className="error">{formik.errors.weight} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Next HU</Typography>
          </Grid>
          <Grid item xs={7}>
            <PickDate
              views={["year", "month", "day"]}
              format={"DD.MM.YYYY"}
              value={moment(formik.values.nextHU)}
              onChange={(value, context) => {
                const date = moment(value);
                // convert the string value to a Moment object
                formik.setFieldValue("nextHU", date);
              }}
              error={
                Boolean(formik.errors.nextHU) && Boolean(formik.touched.nextHU)
              }
              inputLabel={"Next HU"}
            />
            {formik.touched.nextHU ? (
              <div className="error">{formik.errors.nextHU} </div>
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <Typography>Next SP</Typography>
          </Grid>
          <Grid item xs={7}>
            <PickDate
              views={["year", "month", "day"]}
              format={"DD.MM.YYYY"}
              value={moment(formik.values.nextSP)}
              onChange={(value, context) => {
                const date = moment(value);
                // convert the string value to a Moment object
                formik.setFieldValue("nextSP", date);
              }}
              error={
                Boolean(formik.errors.nextSP) && Boolean(formik.touched.nextSP)
              }
              inputLabel={"Next SP"}
            />
            {formik.touched.nextSP ? (
              <div className="error">{formik.errors.nextSP} </div>
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

export default EditTruck;
