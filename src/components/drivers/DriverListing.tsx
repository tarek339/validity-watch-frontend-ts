import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import DriverTable from "./DriverTable";
import ProfileDrawer from "./ProfileDrawer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { differenceInDays } from "date-fns";

function DriverListing() {
  const driver = useSelector((state: RootState) => state.driver.driver);
  const [drivers, setDrivers] = useState([]);
  const getDrivers = async () => {
    await axios
      .get(`/driver/drivers`)
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    getDrivers();
  }, []);

  const leftDays = differenceInDays(
    driver?.driverCardNumberExpire
      ? new Date(driver.licenceTypExpire)
      : new Date(),
    new Date()
  );
  const leftDaysSecond = differenceInDays(
    driver?.driverCardNumberExpire
      ? new Date(driver.codeNumberExpire)
      : new Date(),
    new Date()
  );
  const leftDaysThird = differenceInDays(
    driver?.driverCardNumberExpire
      ? new Date(driver.driverCardNumberExpire)
      : new Date(),
    new Date()
  );

  return (
    <div className="section">
      <ProfileDrawer
        leftDays={leftDays}
        leftDaysSecond={leftDaysSecond}
        leftDaysThird={leftDaysThird}
        getDrivers={getDrivers}
      />
      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Driver listing"
          />
          <div className="table-content">
            <DriverTable
              leftDays={leftDays}
              leftDaysSecond={leftDaysSecond}
              leftDaysThird={leftDaysThird}
              getDrivers={getDrivers}
              drivers={drivers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
