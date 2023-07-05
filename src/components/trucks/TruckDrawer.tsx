import { useEffect, useState } from "react";
import { BottomNavigationAction, Box, Drawer, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BottomNav from "../BottomNav";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import TrucksProfile from "./TrucksProfile";
import EditTruck from "./EditTruck";
import { removeTruck } from "../../redux/slices/truckSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GridContainer from "../GridContainer";

const boxStyle = {
  margin: "8px 10px 10px 10px",
  height: "100%",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
};

interface BottomNavBtns {
  id: number;
  component: JSX.Element;
}

function TruckDrawer(props: { leftDays: number; leftDaysSecond: number }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const truck = useSelector((state: RootState) => state.truck.truck);
  const dispatch = useDispatch();

  useEffect(() => {
    if (truck) {
      setOpen(true);
      setPage(0);
    }
  }, [truck]);

  const deleteTruck = () => {
    axios.delete(`/truck/delete/${truck?._id}`).then(() => {
      dispatch(removeTruck());
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
            setOpen(false);
            setTimeout(() => dispatch(removeTruck()), 1000);
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
            page === 0
              ? () => setPage(page + 1)
              : () => {
                  setPage(page - 1);
                }
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
          label="Remove"
          icon={<RemoveCircleOutlineIcon />}
          onClick={deleteTruck}
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
        <Box className="profile-section-child" sx={boxStyle}>
          <GridContainer
            backgroundColor={page === 0 ? "#00a152" : "#3d5afe"}
            icon={
              page === 0 ? (
                <LocalShippingIcon />
              ) : (
                <ModeEditOutlineRoundedIcon />
              )
            }
            content={page === 0 ? "Profile" : "Edit"}
          />
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ height: "95%" }}
          >
            {page === 0 ? (
              <TrucksProfile
                leftDays={props.leftDays}
                leftDaysSecond={props.leftDaysSecond}
              />
            ) : (
              <EditTruck />
            )}

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

export default TruckDrawer;
