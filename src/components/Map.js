/* global google */
import { Wrapper } from "@googlemaps/react-wrapper";
import { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

export default function Map() {
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      version="beta"
      libraries={["marker"]}
    >
      <MyMap />
    </Wrapper>
  );
}

const mapOptions = {
  mapId: process.env.REACT_APP_PUBLIC_MAP_ID,
  center: { lat: 26.6406, lng: -81.8723 },
  zoom: 10,
  
};


function MyMap() {
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);

  return (
    <>
      <div ref={ref} id="map" />
      {map && <Construction map={map} />}
    </>
  );
}

const constructData = {
  A: {
    name: "Bonita Bay Construction Entrance",
    position: { lat: 26.34882, lng: -81.81001 },
  },
  B: {
    name: "The Villages at Country Creek Construction Entrance",
    position: { lat: 26.43169, lng: -81.79461 }, 
  },
  C: {
    name: "Fiddler's Creek Construction Entrance",
    position: { lat: 26.03381, lng: -81.65539 },
  }
};

function Construction({ map }) {
  const [data, setData] = useState(constructData);

  return (
    <>
      {Object.entries(data).map(([key, construction]) => (
        <Marker key={key} map={map} position={construction.position}>
          <div className={`marker`}>
            <h2>{construction.name}</h2>
          </div>
        </Marker>
      ))}
    </>
  );
}

function Marker({map, children, position}) {
const markerRef = useRef();
const rootRef = useRef();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement('div');
      rootRef.current = createRoot(container);

      markerRef.current = new google.maps.marker.AdvancedMarkerView({
        position,
        content : container,
      })
    }
  }, [])

  useEffect(() => {
    rootRef.current.render(children);
    markerRef.current.position = position;
    markerRef.current.map = map
  }, [map, position, children])
}

