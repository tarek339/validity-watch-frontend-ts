import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import TruckDrawer from "./TruckDrawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TableComponent from "../TableComponent";
import { Truck } from "../../types/truckTypes";
import { addTruck, removeTruck } from "../../redux/slices/truckSlice";
import StyledTableParts from "../StyledTableParts";
import moment from "moment";
import MobileViewHolder from "./MobileViewHolder";
import ModalView from "../ModalView";
import { differenceInDays } from "date-fns";
import { RootState } from "../../redux/store";
import { GetCompanyProperty } from "../../api/getCompProp";

function DriverListing() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const truck = useSelector((state: RootState) => state.truck.truck);
  const trucks = useSelector((state: RootState) => state.property.trucks);

  useEffect(() => {
    GetCompanyProperty(dispatch);
  }, [dispatch]);

  const leftDays = differenceInDays(
    truck?.nextHU ? new Date(truck.nextHU) : new Date(),
    new Date()
  );
  const leftDaysSecond = differenceInDays(
    truck?.nextSP ? new Date(truck.nextSP) : new Date(),
    new Date()
  );

  return (
    <div className="section">
      <TruckDrawer leftDays={leftDays} leftDaysSecond={leftDaysSecond} />
      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Truck listing"
          />
          <div className="table-content">
            <TableComponent
              childrenRows={trucks.length}
              tableHeadOne={"Indicator"}
              tableHeadTwo={"Next HU"}
              tableHeadThree={"Next SP"}
              childrenCount={trucks.length}
              mappedChildren={(rowsPerPage > 0
                ? trucks.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : trucks
              ).map((truck: Truck, index) => (
                <StyledTableParts
                  onClick={() => {
                    axios.get(`/truck/truck/${truck._id}`).then((res) => {
                      dispatch(removeTruck());
                      dispatch(addTruck(res.data));
                    });
                  }}
                  key={truck._id}
                  firstChild={index + 1 + " " + truck.indicator}
                  secondChild={moment(truck.nextHU).format("DD.MM.YYYY")}
                  thirdChild={moment(truck.nextSP).format("DD.MM.YYYY")}
                />
              ))}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              modalView={
                <ModalView
                  children={
                    <MobileViewHolder
                      leftDays={leftDays}
                      leftDaysSecond={leftDaysSecond}
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
