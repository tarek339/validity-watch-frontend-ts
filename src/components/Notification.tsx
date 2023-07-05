import {
  Badge,
  Grid,
  IconButton,
  Popover,
  Typography,
  Box,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { differenceInDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Truck } from "../types/truckTypes";
import { Trailer } from "../types/trailerTypes";
import { Driver } from "../types/driverTypes";
import FeedbackSharpIcon from "@mui/icons-material/FeedbackSharp";
import { useDispatch, useSelector } from "react-redux";
import {
  setDrivers,
  setTrailers,
  setTrucks,
} from "../redux/slices/propertySlice";
import { RootState } from "../redux/store";
import { io } from "socket.io-client";

const iconStyle = {
  color: "grey",
  cursor: "pointer",
};

function Notification() {
  // Popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // Popver

  const dispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.property.drivers);
  const trucks = useSelector((state: RootState) => state.property.trucks);
  const trailers = useSelector((state: RootState) => state.property.trailers);
  const user = useSelector((state: RootState) => state.user.user);

  const getCompanyProperties = useCallback(async () => {
    try {
      const res: AxiosResponse<any, any> = await axios.get(
        `/company/properties`
      );
      dispatch(setDrivers(res.data.drivers));
      dispatch(setTrucks(res.data.trucks));
      dispatch(setTrailers(res.data.trailers));
    } catch (err) {
      console.log("Err", err);
    }
  }, [dispatch]);

  useEffect(() => {
    getCompanyProperties();
  }, [getCompanyProperties]);

  useEffect(() => {
    let socket = io("http://localhost:4500", {
      auth: {
        companyId: user?._id,
      },
    });
    socket.on("DRIVERS", (drivers) => {
      dispatch(setDrivers(drivers));
    });
    socket.on("TRUCKS", (trucks) => {
      dispatch(setTrucks(trucks));
    });
    socket.on("TRAILERS", (trailers) => {
      dispatch(setTrailers(trailers));
    });
  }, [dispatch, user?._id]);

  let isDriverExpired = false;
  let isTruckExpired = false;
  let isTrailerExpired = false;
  let expiredDriverNames: string[] = [];
  let expiredTruckIndicators: string[] = [];
  let expiredTrailerIndicators: string[] = [];

  drivers.forEach((driver: Driver) => {
    const leftDays = differenceInDays(
      new Date(driver.licenceTypExpire),
      new Date()
    );
    const leftDaysSecond = differenceInDays(
      new Date(driver.codeNumberExpire),
      new Date()
    );
    const leftDaysThird = differenceInDays(
      new Date(driver.driverCardNumberExpire),
      new Date()
    );
    if (leftDays <= 90 || leftDaysSecond <= 90 || leftDaysThird <= 90) {
      isDriverExpired = true;
      expiredDriverNames.push(" " + driver.firstName + " " + driver.lastName);
    }
  });

  trucks.forEach((truck: Truck) => {
    const leftDays = differenceInDays(new Date(truck.nextHU), new Date());
    const leftDaysSecond = differenceInDays(new Date(truck.nextSP), new Date());
    if (leftDays <= 60 || leftDaysSecond <= 60) {
      isTruckExpired = true;
      expiredTruckIndicators.push(" " + truck.indicator);
    }
  });

  trailers.forEach((trailer: Trailer) => {
    const leftDays = differenceInDays(new Date(trailer.nextHU), new Date());
    const leftDaysSecond = differenceInDays(
      new Date(trailer.nextSP),
      new Date()
    );
    if (leftDays <= 60 || leftDaysSecond <= 60) {
      isTrailerExpired = true;
      expiredTrailerIndicators.push(" " + trailer.indicator);
    }
  });

  const NotDriver =
    isDriverExpired && expiredDriverNames.length > 1
      ? `Check drivers ${expiredDriverNames} `
      : isDriverExpired && expiredDriverNames.length <= 1
      ? `Check driver ${expiredDriverNames} `
      : isDriverExpired && expiredDriverNames.length === 0
      ? null
      : null;

  const NotTrucks =
    isTruckExpired && expiredTruckIndicators.length > 1
      ? `Check trucks ${expiredTruckIndicators} `
      : isTruckExpired && expiredTruckIndicators.length <= 1
      ? `Check truck ${expiredTruckIndicators} `
      : isTruckExpired && expiredTruckIndicators.length === 0
      ? null
      : null;

  const NotTrailers =
    isTrailerExpired && expiredTrailerIndicators.length > 1
      ? `Check trailers ${expiredTrailerIndicators} `
      : isTrailerExpired && expiredTrailerIndicators.length <= 1
      ? `Check trailer ${expiredTrailerIndicators} `
      : isTrailerExpired && expiredTrailerIndicators.length === 0
      ? null
      : null;

  return (
    <div>
      <IconButton
        disabled={
          isDriverExpired || isTruckExpired || isTrailerExpired ? false : true
        }
        onClick={handleClick}
        style={iconStyle}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Badge
            badgeContent={
              expiredDriverNames.length +
              expiredTruckIndicators.length +
              expiredTrailerIndicators.length
            }
            color="error"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <FeedbackSharpIcon />
          </Badge>
        </Grid>
      </IconButton>
      <Popover
        elevation={0}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            borderRadius: 5,
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography>{NotDriver}</Typography>
          <Typography>{NotTrucks}</Typography>
          <Typography>{NotTrailers}</Typography>
        </Box>
      </Popover>
    </div>
  );
}

export default Notification;
