import { Backdrop, Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { submitShop, updateShop } from "../../api";
import AddUpdateMap from "../Maps/AddUpdateMap";

export default function AddUpdateShop({ setOpen, open, shopData, setrows }) {
  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [phone, setphone] = useState("");
  const [location, setlocation] = useState("");
  const [position, setposition] = useState(null);

  const handleClose = (e) => {
    setOpen(false);
  };
  const handleAdd = async () => {
    const shopObj = {
      name: name,
      code: code,
      phone: phone,
      location: location ? location : "unknow",
      position: position ? position : { _lat: 30.0444196, _long: 31.2357116 },
    };
    console.log("add shop", shopObj);
    setrows(await submitShop(shopObj));
    handleClose();
  };
  const handleUpdate = async () => {
    const shopObj = {
      name: name,
      code: code,
      phone: phone,
      location: location,
      position: position,
    };
    setrows(await updateShop(shopData.id, shopObj));
    handleClose();
  };

  useEffect(() => {
    if (shopData) {
      setname(shopData.name);
      setcode(shopData.code);
      setphone(shopData.phone);
      setlocation(shopData.location);
      setposition(shopData.position);
    }
    return () => {
      setname("");
      setcode("");
      setphone("");
      setlocation("");
      setposition(null);
    };
  }, [shopData]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={(e) => {
        handleClose(e);
      }}
    >
      <Grid
        sx={{
          background: "#fff",
          width: "80%",
          boxSizing: "border-box",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          color: "black",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Box width={"100%"}>Shop Location</Box>
        <Grid sx={{ height: "200px", width: "100%" }}>
          <AddUpdateMap
            setlocation={setlocation}
            setposition={setposition}
            position={position}
          />
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={3}>
            <TextField
              label="Shop Name"
              id="outlined-size-small"
              size="small"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Phone Number"
              id="outlined-size-small"
              size="small"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Shop Code"
              id="outlined-size-small"
              size="small"
              value={code}
              onChange={(e) => {
                setcode(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <Button
            item
            xs={4}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            item
            xs={4}
            variant="contained"
            onClick={shopData ? handleUpdate : handleAdd}
          >
            {shopData ? "update" : "Continue"}
          </Button>
        </Grid>
      </Grid>
    </Backdrop>
  );
}
