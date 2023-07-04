import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import TrailerDrawer from "./TrailerDrawer";
import TableComponent from "../TableComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Trailer } from "../../types/trailerTypes";
import { addTrailer, removeTrailer } from "../../redux/slices/trailerSlice";
import StyledTableParts from "../StyledTableParts";
import moment from "moment";
import MobileViewHolder from "./MobileViewHolder";
import ModalView from "../ModalView";
import { differenceInDays } from "date-fns";
import { RootState } from "../../redux/store";

function DriverListing() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [trailers, setTrailers] = useState([]);
  const dispatch = useDispatch();
  const trailer = useSelector((state: RootState) => state.trailer.trailer);

  const getTrailers = async () => {
    await axios
      .get(`/trailer/trailers`)
      .then((res) => {
        setTrailers(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    getTrailers();
  }, []);

  const leftDays = differenceInDays(
    trailer?.nextHU ? new Date(trailer.nextHU) : new Date(),
    new Date()
  );
  const leftDaysSecond = differenceInDays(
    trailer?.nextSP ? new Date(trailer.nextSP) : new Date(),
    new Date()
  );

  return (
    <div className="section">
      <TrailerDrawer
        getTrailers={getTrailers}
        leftDays={leftDays}
        leftDaysSecond={leftDaysSecond}
      />
      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Trailer listing"
          />
          <div className="table-content">
            <TableComponent
              childrenRows={trailers.length}
              tableHeadOne={"Indicator"}
              tableHeadTwo={"Next HU"}
              tableHeadThree={"Next SP"}
              childrenCount={trailers.length}
              mappedChildren={(rowsPerPage > 0
                ? trailers.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : trailers
              ).map((trailer: Trailer, index) => (
                <StyledTableParts
                  onClick={() => {
                    axios.get(`/trailer/trailer/${trailer._id}`).then((res) => {
                      dispatch(removeTrailer());
                      dispatch(addTrailer(res.data));
                    });
                  }}
                  key={trailer._id}
                  firstChild={index + 1 + " " + trailer.indicator}
                  secondChild={moment(trailer.nextHU).format("DD.MM.YYYY")}
                  thirdChild={moment(trailer.nextSP).format("DD.MM.YYYY")}
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
                      getTrailers={getTrailers}
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
