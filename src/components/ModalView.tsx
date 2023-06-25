import { Modal, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeDriver } from "../redux/slices/driverSlice";
import { removeTruck } from "../redux/slices/truckSlice";
import { removeTrailer } from "../redux/slices/trailerSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  p: 2,
  borderRadius: "15px",
};

function ModalView(props: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch(removeDriver());
    dispatch(removeTruck());
    dispatch(removeTrailer());
  }, [dispatch]);
  const driver = useSelector((state: RootState) => state.driver.driver);
  const truck = useSelector((state: RootState) => state.truck.truck);
  const trailer = useSelector((state: RootState) => state.trailer.trailer);

  useEffect(() => {
    if (driver || truck || trailer) {
      handleOpen();
    }
    if (window.innerWidth > 900) {
      handleClose();
    }
  }, [driver, truck, trailer, handleClose]);
  return (
    <Box>
      <Modal disableAutoFocus={true} open={open} onClose={handleClose}>
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </Box>
  );
}

export default ModalView;
