import axios, { AxiosResponse } from "axios";
import {
  setDrivers,
  setTrailers,
  setTrucks,
} from "../redux/slices/propertySlice";

export const GetCompanyProperty = async (dispatch: any) => {
  try {
    const res: AxiosResponse<any, any> = await axios.get(`/company/properties`);
    dispatch(setDrivers(res.data.drivers));
    dispatch(setTrucks(res.data.trucks));
    dispatch(setTrailers(res.data.trailers));
  } catch (err) {
    console.log("Err", err);
  }
};
