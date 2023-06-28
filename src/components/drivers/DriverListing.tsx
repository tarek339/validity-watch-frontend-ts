import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import DriverTable from "./DriverTable";
import ProfileDrawer from "./ProfileDrawer";
import axios from "axios";
import { useEffect, useState } from "react";

function DriverListing() {
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

  return (
    <div className="section">
      <ProfileDrawer getDrivers={getDrivers} />
      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Driver listing"
          />
          <div className="table-content">
            <DriverTable getDrivers={getDrivers} drivers={drivers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
