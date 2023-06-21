import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import GridContainer from "../GridContainer";
import Textfield from "../Textfield";
import SnackBar from "../SnackBar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

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
});

const AddTrucks = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const formik = useFormik({
    initialValues: {
      indicator: "",
      name: "",
      type: "",
      weight: "",
      nextHU: "",
      nextSP: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .post("", values)
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
              backgroundColor="#00a152"
              icon={<LocalShippingIcon />}
              content="Add trucks"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Indicator"
                  name="indicator"
                  value={formik.values.indicator}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.indicator) &&
                    Boolean(formik.touched.indicator)
                  }
                  type={undefined}
                />
                {formik.touched.indicator ? (
                  <div className="error">{formik.errors.indicator} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.name) && Boolean(formik.touched.name)
                  }
                  type={undefined}
                />
                {formik.touched.name ? (
                  <div className="error">{formik.errors.name} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.type) && Boolean(formik.touched.type)
                  }
                  type={undefined}
                />
                {formik.touched.type ? (
                  <div className="error">{formik.errors.type} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Weight"
                  name="weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.weight) &&
                    Boolean(formik.touched.weight)
                  }
                  type={undefined}
                />
                {formik.touched.weight ? (
                  <div className="error">{formik.errors.weight} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Next HU"
                  name="nextHU"
                  value={formik.values.nextHU}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.nextHU) &&
                    Boolean(formik.touched.nextHU)
                  }
                  type={undefined}
                />
                {formik.touched.nextHU ? (
                  <div className="error">{formik.errors.nextHU} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Textfield
                  autoFocus={false}
                  label="Next SP"
                  name="nextSP"
                  value={formik.values.nextSP}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.nextSP) &&
                    Boolean(formik.touched.nextSP)
                  }
                  type={undefined}
                />
                {formik.touched.nextSP ? (
                  <div className="error">{formik.errors.nextSP} </div>
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
export default AddTrucks;
