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

function MenuItemsHolder(props: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <MenuItems
        route={"/"}
        icon={<DashboardIcon style={menuIcon} />}
        content={"Dashboard"}
        setOpen={props.setOpen}
      />
      <MenuItems
        route={"/add-data"}
        icon={<AddIcon style={menuIcon} />}
        content={"Data"}
        setOpen={props.setOpen}
      />
      <MenuItems
        route={"/user-profile"}
        icon={<AccountCircleIcon style={menuIcon} />}
        content={"Profile"}
        setOpen={props.setOpen}
      />
      <MenuItems
        route={"/drivers"}
        icon={<Person2Icon style={menuIcon} />}
        content={"Drivers"}
        setOpen={props.setOpen}
      />
      <MenuItems
        route={"/trucks"}
        icon={<LocalShippingIcon style={menuIcon} />}
        content={"Trucks"}
        setOpen={props.setOpen}
      />
      <MenuItems
        route={"/trailers"}
        icon={<RvHookupIcon style={menuIcon} />}
        content={"Trailers"}
        setOpen={props.setOpen}
      />
    </div>
  );
}

export default MenuItemsHolder;
