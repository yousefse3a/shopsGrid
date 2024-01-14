import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin
} from "@vis.gl/react-google-maps";
export default function ShopsMap({ shopsData }) {
  const [position, setposition] = useState({ lat: 30.0444196, lng: 31.2357116 });
  useEffect(() => {
    if (shopsData.length) {
      setposition({
        lat: +shopsData[0].position._lat,
        lng: +shopsData[0].position._long,
      });
    }
  }, [shopsData]);

  return (
    <APIProvider apiKey={"AIzaSyBsDTd3IDUwyaoZ5yXyw7ntvZZTQQv5dvY"}>
      <div style={{ height: "100%", width: "100%" }}>
        <Map
          zoom={12}
          center={position}
          mapId={"4786772016e8c3dc"}
          disableDefaultUI
        >
          {shopsData.map((shop, index) => {
            return (
              <>
                <AdvancedMarker
                  position={{
                    lat: +shop.position._lat,
                    lng: +shop.position._long,
                  }}
                >
                  <Pin
                    background={"#1769aa"}
                    borderColor={"#1769aa"}
                    glyphColor={"#FFF"}
                    scale={1.2}
                  />
                </AdvancedMarker>
              </>
            );
          })}
        </Map>
      </div>
    </APIProvider>
  );
}
