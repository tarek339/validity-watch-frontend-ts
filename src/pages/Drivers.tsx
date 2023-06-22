import axios from "axios";
import { useEffect, useState } from "react";
import withRestriction from "../hoc/withRestrictions";
import { Driver } from "../types/driverTypes";

function Drivers() {
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
    <div>
      {drivers.map((driver: Driver) => {
        return <p key={driver._id}>{driver.firstName} </p>;
      })}
    </div>
  );
}

export default withRestriction(Drivers);
