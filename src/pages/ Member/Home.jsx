import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

import { getUserDetails } from '../../services/common/common'
import ReferFriend from "../../components/ReferFriend";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);
        setUserId(userDetails?.id)
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
  console.log(user,'user');

  const handleEdit = () => {
    navigate(`/user/edit-user/${user?.id}`, { state: { user } });
  };

  const handleReferFriend = () => {
    navigate('/refer-friend',);
  }

  return (
    <div className="flex h-screen  mt-6 bg-gray-100">
      <div className="w-full">
        <div className="relative h-80">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.profile_image || ""}
              alt={user?.name || ""}
              className="w-32 h-32 rounded-full object-cover"
              data-testid="profile-image"
            />
          </div>
          <img
            src="https://img.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148423542.jpg?t=st=1718268572~exp=1718272172~hmac=a969f07017ab05046336ce5dde893343e9e3ef856877453f89fe63bf7b449894&w=1380"
            alt="Cover Image"
            className="w-full h-80 object-cover rounded-t-lg"
            data-testid="cover-image"
          />
        </div>
        <div className="mt-10 bg-white rounded-lg shadow-lg p-4" data-testid="profile-form">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={user?.full_name || ""}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                data-testid="full-name-input"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                data-testid="email-input"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={user?.mobile_number || ""}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                data-testid="mobile-number-input"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={handleEdit}
                className="p-2"
                data-testid="edit-button"
              >
                <CiEdit className="h-8 w-8 text-blue-500" />
              </button>
            </div>
          </div>
          <ReferFriend onClick={handleReferFriend} userId={userId} />
        </div>


      </div>
    </div>
  );
};

export default Home;

