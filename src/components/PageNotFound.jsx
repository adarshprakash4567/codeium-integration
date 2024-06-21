import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?t=st=1718094986~exp=1718098586~hmac=a7ec005b34e38cc8db675eb71cd6655571c451d3f04425fb6eea2848378d29a3&w=1380"
        alt="404 - Page Not Found"
        className="w-64 h-64 mb-4"
      />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600">Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

export default PageNotFound;