import { useEffect, useState } from "react";
import { BottomNavigationAction, Box, Drawer, Grid } from "@mui/material";
import DriversProfile from "./DriversProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BottomNav from "../BottomNav";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import EditDriversProfile from "./EditDriversProfile";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { removeDriver } from "../../redux/slices/driverSlice";

const boxStyle = {
  margin: "8px 10px 10px 10px",
  height: "100%",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
};

interface BottomNavBtns {
  id: number;
  component: React.ReactNode;
}

function ProfileDrawer() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const driver = useSelector((state: RootState) => state.driver.driver);
  const dispatch = useDispatch();

  useEffect(() => {
    if (driver) {
      setOpen(true);
    }
  }, [driver]);

  const deleteDriver = () => {
    axios.delete(`/driver/delete/${driver?._id}`).then(() => {
      dispatch(removeDriver());
      setOpen(false);
    });
  };

  const bottomNavigation = [
    {
      id: 1,
      component: (
        <BottomNavigationAction
          disableRipple
          showLabel={true}
          label="Close"
          icon={<CloseIcon />}
          onClick={() => {
            dispatch(removeDriver());
            setPage(0);
            setOpen(false);
          }}
        />
      ),
    },
    {
      id: 2,
      component: (
        <BottomNavigationAction
          disableRipple
          showLabel={true}
          label={page === 0 ? "Edit" : "Back"}
          icon={
            page === 0 ? (
              <ModeEditOutlineRoundedIcon />
            ) : (
              <ArrowBackRoundedIcon />
            )
          }
          onClick={
            page === 0 ? () => setPage(page + 1) : () => setPage(page - 1)
          }
        />
      ),
    },
    {
      id: 3,
      component: (
        <BottomNavigationAction
          disableRipple
          showLabel={true}
          label="Delete"
          icon={<PersonRemoveRoundedIcon />}
          onClick={deleteDriver}
        />
      ),
    },
  ];
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 400,
            border: "0px",
            bgcolor: "#ededed",
            paddingTop: "4em",
            zIndex: 1,
          },
        }}
        variant="persistent"
        elevation={0}
      >
        <Box sx={boxStyle}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            {page === 0 ? <DriversProfile /> : <EditDriversProfile />}

            <Grid container direction="row" justifyContent="space-between">
              {bottomNavigation.map((btn: BottomNavBtns) => {
                return (
                  <div key={btn.id}>
                    <BottomNav children={btn.component} />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </div>
  );
}

export default ProfileDrawer;
