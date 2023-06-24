import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const driver = useSelector((state: RootState) => state.driver.driver);

  useEffect(() => {
    if (driver) {
      handleOpen();
    }
    if (window.innerWidth > 900) {
      handleClose();
    }
  }, [driver]);
  return (
    <Box>
      <Modal disableAutoFocus={true} open={open} onClose={handleClose}>
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </Box>
  );
}

export default ModalView;
