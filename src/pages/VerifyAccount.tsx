import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RootState } from "../redux/store";

function VerifyAccount() {
  const [search] = useSearchParams();
  console.log(search.get("token"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailVerified = useSelector(
    (state: RootState) => state.user.user?.emailVerified
  );
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user && emailVerified) {
      navigate("/");
    }
    if (!user) {
      navigate("/sign-in");
    }
    axios
      .post("/company/verify-account", { token: search.get("token") })
      .then((res) => {
        console.log(res.data);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, dispatch, navigate, emailVerified, user]);
  return null;
}

export default VerifyAccount;
