import React, { useState } from 'react';

const ShareModelCard = ({onShare,onCancel}) => {
  const [username, setUsername] = useState('');
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-lg shadow-md p-6 w-80">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Enter the username</h2>
  
      {/* Username Input */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
      </div>
  
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            onShare(username);
          }}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          type="button"
        >
          Share
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ShareModelCard;
