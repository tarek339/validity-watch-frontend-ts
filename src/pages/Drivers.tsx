import withRestriction from "../hoc/withRestrictions";
import DriverListing from "../components/drivers/DriverListing";

function Drivers() {
  return (
    <div>
      <DriverListing />
    </div>
  );
}

export default withRestriction(Drivers);
