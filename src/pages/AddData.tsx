import { useState } from "react";
import AddDriver from "../components/drivers/AddDriver";
import withRestriction from "../hoc/withRestrictions";
import { Button, Grid } from "@mui/material";
import AddTrucks from "../components/drivers/AddTrucks";
import AddTrailers from "../components/drivers/AddTrailers";
import { motion } from "framer-motion";

function AddData() {
  const [page, setPage] = useState(0);
  return (
    <div className="add-data-holder">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ minHeight: "calc(90vh - 50px)" }}>
          {page === 0 ? (
            <AddDriver />
          ) : page === 1 ? (
            <AddTrucks />
          ) : (
            <AddTrailers />
          )}
        </div>
        <div className="add-data-button">
          <Grid
            container
            justifyContent="space-between"
            alignContent="flex-end"
          >
            <Button
              sx={{ width: "96px" }}
              disabled={page === 0 ? true : false}
              onClick={() => setPage(page - 1)}
              variant="contained"
            >
              {page === 0 ? "Drivers" : page === 1 ? "Drivers" : "Trucks"}
            </Button>
            <Button
              sx={{ width: "96px" }}
              disabled={page === 2 ? true : false}
              onClick={() => setPage(page + 1)}
              variant="contained"
            >
              {page === 0 ? "Trucks" : page === 1 ? "Trailers" : "Trailers"}
            </Button>
          </Grid>
        </div>
        <div className="add-data-button-lg">
          <Grid container justifyContent="center" alignContent="flex-end">
            <div className="add-data-btn-left">
              <Button
                sx={{ width: "96px" }}
                disabled={page === 0 ? true : false}
                onClick={() => setPage(page - 1)}
                variant="contained"
              >
                {page === 0 ? "Drivers" : page === 1 ? "Drivers" : "Trucks"}
              </Button>
            </div>
            <div className="add-data-btn-right">
              <Button
                sx={{ width: "96px" }}
                disabled={page === 2 ? true : false}
                onClick={() => setPage(page + 1)}
                variant="contained"
              >
                {page === 0 ? "Trucks" : page === 1 ? "Trailers" : "Trailers"}
              </Button>
            </div>
          </Grid>
        </div>
      </motion.div>
    </div>
  );
}

export default withRestriction(AddData);
