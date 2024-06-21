import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { EditUserDetail } from "../../services/common/common";
import ChangePassword from "../ChangePassword";
import { toast } from "react-toastify";

const getValidationSchema = (isUser) => {
  return Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(5, "Full name must be at least 5 characters")
      .max(50, "Full name must be less than 50 characters"),
    email: isUser
      ? Yup.string()
      : Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
    mobileNumber: Yup.string()
      .required("Mobile number is required")
      .length(10, "Mobile number must be 10 digits"),
    profileImage: Yup.mixed()
      .test(
        "fileFormat",
        "Invalid file format. Only JPG, JPEG, and PNG files are allowed",
        (value) => {
          if (value && value.length > 0) {
            return ["image/jpg", "image/jpeg", "image/png"].includes(
              value[0].type
            );
          }
          return true;
        }
      )
      .test("fileSize", "Image size must be less than 1 MB", (value) => {
        if (value && value.length > 0) {
          return value[0].size <= 1048576; // 1 MB = 1048576 bytes
        }
        return true;
      }),
  });
};

const EditUser = () => {
  const location = useLocation();
  const user = location.state?.user;
  console.log(user,'123')
  const isUser = localStorage.getItem("role") === "User";
  const [tempProfileImage, setTempProfileImage] = useState(user?.profileImage);
  const fileInputRef = useRef(null);
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(getValidationSchema(isUser)),
  });

  const formData = watch();

  const isFormDisabled =
    formData.fullName === user?.full_name &&
    formData.email === user?.email &&
    formData.mobileNumber === user?.mobile_number &&
    formData.profileImage === user?.profile_image;

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);
    const formData = new FormData();
    formData.append("full_name", data.fullName);
    if (!isUser) {
      formData.append("email", data.email);
    }
    formData.append("mobile_num", data.mobileNumber);
    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profile_image", data.profileImage[0]);
    }
    formData.append("userid", user?.id);

    console.log("Form data after conversion:", formData);

    try {
      const response = await EditUserDetail(formData, user.id);
      console.log("Response from EditUserDetail:", response);
      // Handle response as needed
      if (response.message == 'Fields updated successfully') {
        toast.success("User details edited successfully.");
        if(isUser){
        navigate('/user/dashboard');

        }else{
        navigate('/admin/dashboard');
        }
      }
    } catch (error) {
      toast.error("Some error occured!");
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setTempProfileImage(URL.createObjectURL(file));
    setValue("profileImage", [file]);
    await trigger("profileImage"); // Trigger validation for the profileImage field
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4" data-testid="edit-user-title">
        Edit User
      </h2>
      <form
        className="bg-gray-100 rounded-lg shadow-lg p-4"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="edit-user-form"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-2" data-testid="name-label">
              Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              defaultValue={user?.full_name}
              className={`border border-gray-300 rounded px-3 py-2 ${
                errors.fullName ? "border-red-500" : ""
              }`}
              data-testid="name-input"
            />
            {errors.fullName && (
              <span className="text-red-500" data-testid="name-error">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2" data-testid="email-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              defaultValue={user?.email}
              disabled={isUser}
              className={`border border-gray-300 rounded px-3 py-2 ${
                errors.email && !isUser ? "border-red-500" : ""
              }`}
              data-testid="email-input"
            />
            {!isUser && errors.email && (
              <span className="text-red-500" data-testid="email-error">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="mobileNumber"
              className="mb-2"
              data-testid="mobile-number-label"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              {...register("mobileNumber")}
              defaultValue={user?.mobile_number}
              className={`border border-gray-300 rounded px-3 py-2 ${
                errors.mobileNumber ? "border-red-500" : ""
              }`}
              data-testid="mobile-number-input"
            />
            {errors.mobileNumber && (
              <span className="text-red-500" data-testid="mobile-number-error">
                {errors.mobileNumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="profileImage"
              className="mb-2"
              data-testid="profile-image-label"
            >
              Profile Image
            </label>
            <div className="flex items-center">
              <img
                src={tempProfileImage}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover mr-4"
                data-testid="profile-image"
              />
              <input
                type="file"
                {...register("profileImage")}
                id="profileImage"
                ref={fileInputRef}
                accept=".jpg, .jpeg, .png"
                onChange={handleProfileImageChange}
                className="hidden"
                data-testid="profile-image-input"
              />
              <AiOutlineEdit
                className="h-6 w-6 text-blue-500 cursor-pointer"
                onClick={() => fileInputRef.current.click()}
                data-testid="profile-image-edit-icon"
              />
            </div>
            {errors.profileImage && (
              <span className="text-red-500" data-testid="profile-image-error">
                {errors.profileImage.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${
            isFormDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isFormDisabled}
          data-testid="save-button"
        >
          Save
        </button>
        {/* <h2 className="text-xl font-bold mt-4" data-testid="change-password-title">Change Password</h2> */}
        {/* <ChangePassword /> */}
      </form>
      <ChangePassword loggedIn={isUser} UserId={user?.id}/>
    </div>
  );
};

export default EditUser;
