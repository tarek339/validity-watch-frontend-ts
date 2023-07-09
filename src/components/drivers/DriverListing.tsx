import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import ProfileDrawer from "./ProfileDrawer";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { differenceInDays } from "date-fns";
import TableComponent from "../TableComponent";
import { Driver } from "../../types/driverTypes";
import { useDispatch } from "react-redux";
import { addDriver } from "../../redux/slices/driverSlice";
import StyledTableParts from "../StyledTableParts";
import ModalView from "../ModalView";
import MobileViewHolder from "./MobileViewHolder";

function DriverListing() {
  const driver = useSelector((state: RootState) => state.driver.driver);
  const drivers = useSelector((state: RootState) => state.property.drivers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const leftDays = differenceInDays(
    driver?.licenceTypExpire ? new Date(driver.licenceTypExpire) : new Date(),
    new Date()
  );
  const leftDaysSecond = differenceInDays(
    driver?.codeNumberExpire ? new Date(driver.codeNumberExpire) : new Date(),
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
      />

      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Driver listing"
          />
          <div className="table-content">
            <TableComponent
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              childrenRows={drivers.length}
              tableHeadOne={"Name"}
              tableHeadTwo={"Type"}
              tableHeadThree={"Activity"}
              childrenCount={drivers.length}
              totalRows={totalRows}
              setTotalRows={setTotalRows}
              mappedChildren={(rowsPerPage > 0
                ? drivers.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : drivers
              ).map((driver: Driver, index) => (
                <StyledTableParts
                  onClick={() => {
                    axios.get(`/driver/driver/${driver._id}`).then((res) => {
                      dispatch(addDriver(res.data));
                    });
                  }}
                  key={driver._id}
                  firstChild={
                    index + 1 + " " + driver.firstName + " " + driver.lastName
                  }
                  secondChild={driver.licenceTyp}
                  thirdChild={driver.licenceTyp}
                />
              ))}
              modalView={
                <ModalView
                  children={
                    <MobileViewHolder
                      leftDays={leftDays}
                      leftDaysSecond={leftDaysSecond}
                      leftDaysThird={leftDaysThird}
                    />
                  }
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
