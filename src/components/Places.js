// import React, { useState, useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// export default function Places() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
//     libraries: ["places"],
//   });

//   if (loadError) {
//     console.error(loadError);
//     return <div>There was an error loading the map.</div>;
//   }

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <ErrorBoundary>
//       <Map />
//     </ErrorBoundary>
//   );
// }

// function Map() {
//   const center = useMemo(() => ({ lat:  26.6406, lng: -81.8723 }), []);
//   const [selected, setSelected] = useState(null);

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>

//       <GoogleMap
//         zoom={10}
//         center={center}
//         mapContainerClassName="map-container"
//       >
//         {selected && <Marker position={selected} />}
//       </GoogleMap>
//     </>
//   );
// }

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error(error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <div>There was an error rendering the map.</div>;
//     }

//     return this.props.children;
//   }
// }
