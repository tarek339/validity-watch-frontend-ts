import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";

const style = {
  backgroundColor: "transparent",
};
export default function BottomNav(props: { children: JSX.Element }) {
  return (
    <Box>
      <BottomNavigation style={style}>{props.children}</BottomNavigation>
    </Box>
  );
}
