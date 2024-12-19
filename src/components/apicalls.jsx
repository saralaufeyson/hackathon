// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// src/services/authService.js
import api from './api';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/users/login', { email, password });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      return { user, token };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/users/register', userData);
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      return { user, token };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout() {
    localStorage.removeItem('token');
  }
};

// src/services/resourceService.js
import api from './api';

export const resourceService = {
  async createResource(resourceData) {
    try {
      const response = await api.post('/resources', resourceData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create resource');
    }
  },

  async getNearbyResources(latitude, longitude, type, maxDistance) {
    try {
      const response = await api.get('/resources/nearby', {
        params: { latitude, longitude, type, maxDistance }
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch resources');
    }
  }
};

// src/utils/websocket.js
export const createWebSocketConnection = (token) => {
  const socket = new WebSocket('ws://localhost:8000');

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'auth', token }));
  };

  return socket;
};

// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { authService } from '../../services/authService';

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.login(email, password);
      onLogin(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
};

// src/components/resources/NearbyResources.jsx
import React, { useState, useEffect } from 'react';
import { resourceService } from '../../services/resourceService';

export const NearbyResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const result = await resourceService.getNearbyResources(12.96, 77.78, null, 5000);
        setResources(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Nearby Resources</h2>
      {resources.map((resource) => (
        <div key={resource._id} className="p-4 border rounded">
          <h3 className="font-bold">{resource.name}</h3>
          <p>Type: {resource.type}</p>
          <p>Status: {resource.status}</p>
          <p>Distance: {resource.distance.toFixed(2)}m</p>
        </div>
      ))}
    </div>
  );
};

// src/components/alerts/AlertMonitor.jsx
import React, { useState, useEffect } from 'react';
import { createWebSocketConnection } from '../../utils/websocket';

export const AlertMonitor = () => {
  const [alerts, setAlerts] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const ws = createWebSocketConnection(token);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'emergency:alert') {
        setAlerts(prev => [...prev, data.alert]);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Active Alerts</h2>
      {alerts.map((alert) => (
        <div key={alert._id} className="p-4 border rounded bg-red-100">
          <h3 className="font-bold">{alert.type}</h3>
          <p>Priority: {alert.priority}</p>
          <p>{alert.description}</p>
        </div>
      ))}
    </div>
  );
};