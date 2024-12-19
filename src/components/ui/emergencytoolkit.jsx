import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const EmergencyToolkit = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const emergencyItems = {
    "Check if you have all these": [
      "3-day water supply (1 gallon per person per day)",
      "Non-perishable food",
      "Sleeping bags",
      "first aid",
      "flashlight",
      "whistle",
      "MAsk",
      "Imp docs"
    
    ]
    
  };

  const handleToggleItem = (item) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item);
    } else {
      newCheckedItems.add(item);
    }
    setCheckedItems(newCheckedItems);
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // In a real app, you would use proper navigation here
      console.log('Navigating to maps...');
    }, 3000);
  };

  const totalItems = Object.values(emergencyItems).flat().length;
  const checkedCount = checkedItems.size;
  const progress = (checkedCount / totalItems) * 100;

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#fff6e9' }}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: '#ff7f3e' }}>
            Emergency Toolkit Checklist
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Ensure you have these essential items ready for emergency situations
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Progress: {checkedCount}/{totalItems} items
              </span>
              <span className="text-sm font-medium" style={{ color: '#ff7f3e' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: '#80c4e9' }}
              ></div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-6">
            {Object.entries(emergencyItems).map(([category, items]) => (
              <div key={category} className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-3" style={{ color: '#ff7f3e' }}>
                  {category}
                </h2>
                <div className="space-y-2">
                  {items.map((item) => (
                    <label
                      key={item}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item)}
                        onChange={() => handleToggleItem(item)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className={`text-gray-700 ${checkedItems.has(item) ? 'line-through text-gray-400' : ''}`}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-3 rounded-lg text-white font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
            style={{ backgroundColor: '#ff7f3e' }}
          >
            <CheckCircle2 size={24} />
            <span>We're Set to Go!</span>
          </button>

          {showSuccess && (
            <Alert className="mt-4 bg-green-100 border-green-400">
              <AlertDescription className="text-green-700 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Great job preparing! Redirecting to maps...</span>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyToolkit;