import {
  Button,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

theme.typography.body2 = {
  fontFamily: "Inter, sans-serif",
  fontSize: "22px",
  color: "#fff",
  textTransform: "capitalize",
  textAlign: "left",
};
const buttonStyle = {
  margin: "30px 20px 0px 20px",
  backgroundColor: "transparent",
  transition: "background 0.5s, color 0.5s",
};

function MenuItems(props: {
  icon: JSX.Element;
  content: string;
  route: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container alignItems="center" justifyContent="flex-start">
          <Button
            disableElevation={true}
            sx={buttonStyle}
            variant="contained"
            startIcon={props.icon}
            onClick={() => {
              navigate(props.route);
              window.innerWidth < 900
                ? props.setOpen(false)
                : props.setOpen(true);
            }}
          >
            <div style={{ width: "1000px" }}>
              <Typography variant="body2">{props.content}</Typography>
            </div>
          </Button>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default MenuItems;
