import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { motion } from "framer-motion";
import { getUserList } from "../../services/common/common";
import ReferFriend from "../../components/ReferFriend";


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [showError, setShowError] = useState(false);
  const defaultImage = 'https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg?t=st=1718773871~exp=1718777471~hmac=88fe3e02505e4af130f777cbe42aa3171fd795f9558d69c2a5d99b882d9ffda8&w=1380'
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setShowError(false);
        console.log(page, "11");
        const response = await getUserList(pageSize, page);
      
        setUsers(response?.results);
        setShowError("");
      } catch (error) {
        setShowError(true);
      }
    };

    fetchUsers();
  }, [page]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 1 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        damping: 10,
        stiffness: 50,
      },
    }),
  };

  const handleEdit = (user) => {
    navigate(`/admin/edit-user/${user.id}`, { state: { user } });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-end items-center mb-4">
      </div>
      <h2 className="text-2xl font-bold mb-4" data-testid="dashboard-title">
        Users List
      </h2>
  
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            className={`bg-white rounded-lg shadow-md p-6 flex flex-col justify-between`}
            variants={cardVariants}
            initial="hidden"
            animate={index === index && "visible"}
            custom={index}
            data-testid={`user-card-${user.full_name}`}
          >
            <div className="flex items-center mb-4">
              <img
                src={user.profile_image || defaultImage}
                alt={user.full_name}
                className="w-24 h-24 rounded-full mr-4 object-cover"
                data-testid={`user-image-${user.full_name}`}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold mb-2 truncate" data-testid={`user-name-${user.full_name}`}>
                  {user.full_name}
                </h3>
                <p className="text-gray-500 truncate w-full" data-testid={`user-email-${user.full_name}`}>
                  {user.email}
                </p>
                <p className="text-gray-500 truncate w-full" data-testid={`user-mobile-${user.full_name}`}>
                  {user.mobile_number}
                </p>
              </div>
            </div>
            <button
              className="self-end p-2 text-gray-500 transition-colors duration-300 ease-in-out"
              onClick={() => handleEdit(user)}
              data-testid={`edit-button-${user.id}`}
            >
              <AiOutlineEdit className="h-5 w-5 hover:text-blue-500" />
            </button>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="mr-2 p-2 text-gray-500 transition-colors duration-300 ease-in-out"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          data-testid="previous-button"
        >
          Previous
        </button>
        <button
          className="p-2 text-gray-500 transition-colors duration-300 ease-in-out"
          onClick={() => setPage(page + 1)}
          disabled={showError}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
      <ReferFriend/>
    </div>
  );
};

export default Dashboard;



