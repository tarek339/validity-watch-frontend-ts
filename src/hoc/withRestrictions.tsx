import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function withRestriction(Component: () => JSX.Element | null) {
  return () => {
    const user = useSelector((state: RootState) => state.user?.user);
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        return navigate("/sign-in");
      }
    }, [navigate, user]);

    if (!user) {
      return null;
    }

    return (
      <>
        <Component />
      </>
    );
  };
}
