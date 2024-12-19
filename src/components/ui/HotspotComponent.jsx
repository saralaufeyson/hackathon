'use client';

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Utility to calculate the distance between two coordinates
const calculateDistance = (coord1, coord2) => {
  const radlat1 = Math.PI * coord1.lat / 180;
  const radlat2 = Math.PI * coord2.lat / 180;
  const theta = coord1.lng - coord2.lng;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515 * 1609.34; // Convert to meters (1 mile = 1609.34 meters)
  return dist;
};

// Function to group coordinates based on proximity
const groupCoordinatesByRadius = (coordinates, radius) => {
  const groups = [];
  
  coordinates.forEach(coord => {
    let placed = false;
    for (let group of groups) {
      if (calculateDistance(group.center, coord) <= radius) {
        group.points.push(coord);
        placed = true;
        break;
      }
    }
    if (!placed) {
      groups.push({ center: coord, points: [coord], level: coord.level });
    }
  });

  return groups.map(group => {
    const latSum = group.points.reduce((sum, p) => sum + p.lat, 0);
    const lngSum = group.points.reduce((sum, p) => sum + p.lng, 0);
    const center = {
      lat: latSum / group.points.length,
      lng: lngSum / group.points.length,
    };

    const maxDistance = group.points.reduce((max, p) => {
      const dist = calculateDistance(center, p);
      return Math.max(max, dist);
    }, 0);

    const radiusToUse = isNaN(maxDistance) || maxDistance <= 0 ? 1 : maxDistance;

    return {
      ...center,
      radius: radiusToUse,
      level: getLevelBasedOnRadius(radiusToUse),
      title: `${getLevelBasedOnRadius(radiusToUse)} Impact Zone`,
    };
  });
};

// Determine the level based on radius size
const getLevelBasedOnRadius = (radius) => {
  if (radius > 700) {
    return 'high'; // Dangerous
  } else if (radius >= 300) {
    return 'medium'; // Moderately dangerous
  } else {
    return 'low'; // Less dangerous
  }
};

const zones = [
    { "lat": 51.50062337597689, "lng": -0.1698470372365053, "level": "high" },
    { "lat": 51.56179282824567, "lng": -0.07576818140407052, "level": "high" },
    { "lat": 51.51992100372747, "lng": -0.10826785286585613, "level": "high" },
    { "lat": 51.51795111432607, "lng": -0.052113397687968896, "level": "high" },
    { "lat": 51.53800343675703, "lng": -0.16068082136095385, "level": "high" },
    { "lat": 51.52158652992449, "lng": -0.11908999717623403, "level": "medium" },
    { "lat": 51.511816170531, "lng": -0.08735510009912974, "level": "medium" },
    { "lat": 51.539227372498445, "lng": -0.11690351503325025, "level": "medium" },
    { "lat": 51.49864821765411, "lng": -0.10590768266309777, "level": "medium" },
    { "lat": 51.54507576526737, "lng": -0.15088713269893927, "level": "medium" },
    { "lat": 51.5240442195666, "lng": -0.13699420984339974, "level": "medium" },
    { "lat": 51.542047293121165, "lng": -0.06295180693133844, "level": "medium" },
    { "lat": 51.54509528555142, "lng": -0.17218522883100396, "level": "low" },
    { "lat": 51.53861438747607, "lng": -0.06365789477298273, "level": "low" },
    { "lat": 51.509892411327044, "lng": -0.10830954726809323, "level": "low" },
    { "lat": 51.518495831569, "lng": -0.14055829000142478, "level": "low" },
    { "lat": 51.509270942373256, "lng": -0.09010898268355733, "level": "low" },
    { "lat": 51.55331614551246, "lng": -0.12963146487533456, "level": "low" },
    { "lat": 51.53172844276314, "lng": -0.11923329380803639, "level": "low" },
    { "lat": 51.536812020867046, "lng": -0.14700060983825394, "level": "low" },
    { "lat": 51.516987240591796, "lng": -0.05579410265234738, "level": "low" },
    { "lat": 51.54046230038416, "lng": -0.12726663603194058, "level": "low" },
    { "lat": 51.559271027988494, "lng": -0.06781094103929725, "level": "low" },
    { "lat": 51.54964805771874, "lng": -0.11367667416450278, "level": "low" },
    { "lat": 51.523206092934714, "lng": -0.10891374336666328, "level": "low" },
    { "lat": 51.528195072910464, "lng": -0.08058929733623243, "level": "low" },
    { "lat": 51.53183895639033, "lng": -0.09878693859800887, "level": "low" },
    { "lat": 51.52668098327634, "lng": -0.12206256819074648, "level": "low" },
    { "lat": 51.526784306974015, "lng": -0.09954181545212151, "level": "low" },
    { "lat": 51.52608979802233, "lng": -0.11111171234853916, "level": "low" }
];

const HotspotMapComponent = () => {
  useEffect(() => {
    const map = L.map('hotspot-map').setView([51.505, -0.09], 13); // Default view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const groupedZones = groupCoordinatesByRadius(zones, 1000); // 1 km radius

    groupedZones.forEach(({ lat, lng, radius, level, title }) => {
      let color;
      switch (level) {
        case 'high':
          color = 'red';
          break;
        case 'medium':
          color = 'orange';
          break;
        case 'low':
          color = 'yellow';
          break;
        default:
          color = 'blue';
      }

      L.circle([lat, lng], {
        color: color,
        radius: radius,
        fillOpacity: 0.4,
        weight: 2,
        fillColor: color,
      })
        .addTo(map)
        .bindPopup(title)
        .openPopup();
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="hotspot-map" className="h-96 w-full rounded-lg shadow-lg" />;
};

export default HotspotMapComponent;
