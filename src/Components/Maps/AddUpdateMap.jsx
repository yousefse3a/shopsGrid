import { useState, useMemo, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Box } from "@mui/material";
import { Pin } from "@vis.gl/react-google-maps";

export default function AddUpdateMap({ position, setposition, setlocation }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAJ1zQ_uCTMkGkwjoEeeUsLojboBbWwS_Y",
    libraries: ["places"],
  });

  const center = { lat: 30.0444196, lng: 31.2357116 };
  const [selected, setSelected] = useState(
    position ? { lat: +position._lat, lng: +position._long } : null
  );

  const onMapClick = (e) => {
    setSelected({
      lat: +e.latLng.lat(),
      lng: +e.latLng.lng(),
    });
    setposition({
      _lat: +e.latLng.lat(),
      _long: +e.latLng.lng(),
    });
  };
  useEffect(() => {
    setSelected(
      position ? { lat: +position._lat, lng: +position._long } : null
    );
  }, [position]);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Box
        className="places-container"
        sx={{ position: "absolute", zIndex: "5555", margin: ".5rem" }}
      >
        <PlacesAutocomplete
          setSelected={setSelected}
          setlocation={setlocation}
          setposition={setposition}
        />
      </Box>
      <GoogleMap
        zoom={10}
        center={selected ? selected : center}
        mapContainerClassName="map-container"
        mapContainerStyle={{ height: "100%" }}
        onClick={onMapClick}
        options={{
          disableDefaultUI: true,
        }}
      >
        {selected && (
          <Marker position={selected}>
            <Pin
              background={"#1769aa"}
              borderColor={"#1769aa"}
              glyphColor={"#FFF"}
              scale={1.2}
            />
          </Marker>
        )}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, setlocation, setposition }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    setlocation(results[0].formatted_address);
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setposition({
      _lat: lat,
      _long: lng,
    });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
        id="searchBar"
      />
      <ComboboxPopover style={{ zIndex: "5555" }}>
        <ComboboxList >
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} className="result" />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
