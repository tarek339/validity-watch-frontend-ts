import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import DriverTable from "../DriverTable";

function DriverListing() {
  return (
    <div className="section">
      <div className="section-child">
        <div className="section-child-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Driver listing"
          />
          <div className="table-content">
            <DriverTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
