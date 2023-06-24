import MenuItems from "./MenuItems";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RvHookupIcon from "@mui/icons-material/RvHookup";
import Person2Icon from "@mui/icons-material/Person2";
import DashboardIcon from "@mui/icons-material/Dashboard";

const menuIcon = {
  color: "#fff",
  fontSize: "28px",
  paddingRight: "15px",
};

function MenuItemsHolder() {
  return (
    <div>
      {" "}
      <MenuItems
        route={"/"}
        icon={<DashboardIcon style={menuIcon} />}
        content={"Dashboard"}
      />
      <MenuItems
        route={"/add-data"}
        icon={<AddIcon style={menuIcon} />}
        content={"Data"}
      />
      <MenuItems
        route={"/user-profile"}
        icon={<AccountCircleIcon style={menuIcon} />}
        content={"Profile"}
      />
      <MenuItems
        route={"/drivers"}
        icon={<Person2Icon style={menuIcon} />}
        content={"Drivers"}
      />
      <MenuItems
        route={"/trucks"}
        icon={<LocalShippingIcon style={menuIcon} />}
        content={"Trucks"}
      />
      <MenuItems
        route={"/trailers"}
        icon={<RvHookupIcon style={menuIcon} />}
        content={"Trailers"}
      />
    </div>
  );
}

export default MenuItemsHolder;
