import React, { useState } from 'react';
import { MapPin, User, Phone, Award, Check } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const VolunteerForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    skills: '',
    mobile: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // In a real app, you would use proper navigation here
      console.log('Navigating to maps...');
    }, 3000);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#fff6e9' }}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#ff7f3e' }}>
          Become a Volunteer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <User className="text-gray-400" size={20} />
              <span className="text-gray-700">Name</span>
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2"
              style={{ borderColor: '#80c4e9' }}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <MapPin className="text-gray-400" size={20} />
              <span className="text-gray-700">Location</span>
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2"
              style={{ borderColor: '#80c4e9' }}
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Award className="text-gray-400" size={20} />
              <span className="text-gray-700">Skill Set</span>
            </label>
            <textarea
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2"
              style={{ borderColor: '#80c4e9' }}
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Phone className="text-gray-400" size={20} />
              <span className="text-gray-700">Mobile Number</span>
            </label>
            <input
              type="tel"
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2"
              style={{ borderColor: '#80c4e9' }}
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded text-white font-semibold transition-colors"
            style={{ backgroundColor: '#ff7f3e' }}
          >
            Submit
          </button>
        </form>

        {showSuccess && (
          <Alert className="mt-4 bg-green-100 border-green-400">
            <AlertDescription className="text-green-700">
              Thank you for volunteering! Redirecting to maps...
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

const SeekHelpForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    items: new Set()
  });

  const availableItems = [
    'Food Supplies',
    'Medical Assistance',
    'Transportation',
    'Shelter',
    'Clothing',
    'Emergency Kit',
    'Water Supply',
    'Medical Supplies'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // In a real app, you would use proper navigation here
      console.log('Navigating to maps...');
    }, 3000);
  };

  const toggleItem = (item) => {
    const newItems = new Set(formData.items);
    if (newItems.has(item)) {
      newItems.delete(item);
    } else {
      newItems.add(item);
    }
    setFormData({...formData, items: newItems});
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#fff6e9' }}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#ff7f3e' }}>
          Request Help
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <MapPin className="text-gray-400" size={20} />
              <span className="text-gray-700">Your Location</span>
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2"
              style={{ borderColor: '#80c4e9' }}
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 mb-2">Items Needed:</label>
            <div className="grid grid-cols-2 gap-2">
              {availableItems.map((item) => (
                <label key={item} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={formData.items.has(item)}
                    onChange={() => toggleItem(item)}
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded text-white font-semibold transition-colors"
            style={{ backgroundColor: '#ff7f3e' }}
          >
            Submit Request
          </button>
        </form>

        {showSuccess && (
          <Alert className="mt-4 bg-green-100 border-green-400">
            <AlertDescription className="text-green-700">
              Your request has been sent! Redirecting to maps...
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export { VolunteerForm, SeekHelpForm };