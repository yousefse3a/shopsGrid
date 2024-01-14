import { Box, Grid } from "@mui/material";
import Tablegrid from "./Components/Tablegrid/Tablegrid";
import AddUpdateShop from "./Components/AddUpdateShop/AddUpdateShop";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { useEffect, useState } from "react";
import { getShopList } from "./api";
import ShopsMap from "./Components/Maps/ShopsMap";

function App() {
  const [rows, setrows] = useState([]);
  const [open, setOpen] = useState(false);
  const [updatedShopDetails, setupdatedShopDetails] = useState(null);
  const handleOpen = (shopData) => {
    console.log("shopData", shopData);
    setupdatedShopDetails(shopData);
    setOpen(true);
  };
  const getData = async () => {
    setrows(await getShopList());
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          xs={10}
          sx={{ display: "flex", alignItems: "end", gap: "1rem" }}
        >
          <Box sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
            Shops Management
          </Box>
          <Grid
            sx={{
              color: "#1769aa",
              fontSize: "1rem ",
              fontWeight: "500",
              display: "flex",
              gap: "5px",
            }}
            onClick={() => {
              handleOpen(null);
            }}
          >
            <AddCircleSharpIcon /> Add Shop
          </Grid>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{
            height: "250px",
            boxSizing: "border-box",
            margin: "1rem",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <ShopsMap shopsData={rows} />
        </Grid>
        <Grid item xs={10}>
          <Tablegrid
            item
            handleOpenBackDrop={handleOpen}
            rows={rows}
            setrows={setrows}
          />
        </Grid>
      </Grid>
      <AddUpdateShop
        open={open}
        setOpen={setOpen}
        shopData={updatedShopDetails}
        setrows={setrows}
      />
    </>
  );
}

export default App;
