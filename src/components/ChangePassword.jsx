import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { EditPassword } from '../services/common/common';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PasswordChangeComponent = ({ loggedIn, UserId }) => {
  const validationSchema = Yup.object().shape({
    oldPassword: loggedIn ? Yup.string().required("Old Password is required") : Yup.string(),
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response;
      if (!loggedIn) {
        response = await EditPassword({
          userid: UserId,
          password: data.newPassword,
        });
      } else {
        response = await EditPassword({
          old_password: data.oldPassword,
          password: data.newPassword,
        });
      }

      if (response.message === 'Password updated successfully') {
        toast.success("Password changed successfully");
        if (loggedIn) {
          navigate('/user/dashboard');
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg shadow-lg p-4">
      <h3 className="text-2xl font-bold mb-4 mt-6" data-testid="change-password-title">Change password</h3>

      {loggedIn && (
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            {...register("oldPassword")}
            data-testid="oldPassword"
            className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm" data-testid="oldPassword-error">{errors.oldPassword.message}</p>
          )}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          {...register("newPassword")}
          data-testid="newPassword"
          className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm" data-testid="newPassword-error">{errors.newPassword.message}</p>
        )}
      </div>

      <button
        data-testid='submit'
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default PasswordChangeComponent;
