import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSnackbar } from "../redux/slices/snackbarSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const handleClose = () => {
    dispatch(setSnackbar({ open: true, severity: "", message: "" }));
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
