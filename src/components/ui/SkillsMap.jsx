'use client';

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../utils/api';

const SkillsMap = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(
          '/users/skills/nearby?latitude=51.505&longitude=-0.09&skill=paramedic&maxDistance=5000'
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    users.forEach(({ location, username, skills, distance }) => {
      L.marker([location.coordinates[1], location.coordinates[0]])
        .addTo(map)
        .bindPopup(
          `<strong>${username}</strong><br>Skills: ${skills
            .map(skill => skill.name)
            .join(', ')}<br>Distance: ${distance}m`
        );
    });

    return () => {
      map.remove();
    };
  }, [users]);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default SkillsMap;