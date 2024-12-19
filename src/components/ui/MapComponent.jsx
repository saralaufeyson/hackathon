'use client';

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {

    const coordinates = [
        { lat: 51.505, lng: -0.09, title: 'Marker 1' },
        { lat: 51.515, lng: -0.1, title: 'Marker 2' },
        { lat: 51.525, lng: -0.11, title: 'Marker 3' }
      ];


  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([51.505, -0.09], 13); // Set initial view

    // Add tile layer (OpenStreetMap in this example)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers based on coordinates
    coordinates.forEach(({ lat, lng, title }) => {
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(title)
        .openPopup(); // Open popup on marker click
    });

    // Cleanup map instance on component unmount
    return () => {
      map.remove();
    };
  }, [coordinates]); // Re-run on coordinates change

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
