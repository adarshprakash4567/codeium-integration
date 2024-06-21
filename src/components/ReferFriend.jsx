import React, { useState } from 'react';
import { ReferFriend } from '../services/common/common';
import { toast } from 'react-toastify';

const RefersFriend = ({ userId }) => {
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setIsDisabled(event.target.value === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ReferFriend({ 'friend_email': email, 'userid': userId });
 console.log(response);
 if(response.message == 'Email sent successfully'){
  toast.success('Email sent successfully')
 }
    } catch (error) {
      toast.error('Something went wrong.')
    }
    setEmail('');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-6 bg-white shadow-md rounded-lg" data-testid="refer-friend-component">
      <h1 className="text-2xl font-bold mb-4 text-center" data-testid="refer-friend-title">Refer a Friend</h1>
      <form onSubmit={handleSubmit} className="space-y-4" data-testid="refer-friend-form">
        <div className="relative">
          <input
            type="email"
            id="email"
            placeholder="Enter friend's email"
            value={email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
            data-testid="email-input"
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          data-testid="refer-button"
        >
          Refer
        </button>
      </form>
    </div>
  );
};

export default RefersFriend;
