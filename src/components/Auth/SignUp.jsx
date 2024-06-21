import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup, ReferFriendRegistration } from '../../services/common/common';

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required').min(8, 'Full name must be at least 8 characters').max(50, 'Full name must be less than 50 characters').test('test-id', 'Full name must be at least 5 characters', (value) => value && value.length >= 5),
  email: Yup.string().email('Invalid email address').required('Email is required').test('test-id', 'Email is required', (value) => value && value.length > 0),
  mobile_number: Yup.string().required('Mobile number is required').length(10, 'Mobile number must be 10 digits').test('test-id', 'Mobile number must be 10 digits', (value) => value && value.length === 10),
  password: Yup.string().required('Password is required')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
  ).test('test-id', 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character', (value) => value && value.length >= 8),
  profile_image: Yup.mixed()
  .test('required', 'Image is required', (value) => value && value.length > 0)
    .test('fileFormat', 'Invalid file format. Only JPG, JPEG, and PNG files are allowed', (value) => {
      if (value && value.length > 0) {
        return ['image/jpg', 'image/jpeg', 'image/png'].includes(value[0].type);
      }
      return true;
    })
    .test('fileSize', 'Image size must be less than 1 MB', (value) => {
      if (value && value.length > 0) {
        return value[0].size <= 1048576; // 1 MB = 1048576 bytes
      }
      return true;
    }),
  referral_email: Yup.string().email('Invalid email address').notRequired(),
});

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(validationSchema),
  });
 
  const [error, setError] = useState('');
  const [referralEmail, setReferralEmail] = useState('');
const [userId,setUserId] = useState('')
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const Refer_email = queryParams.get('email');

    if (Refer_email) {
      setReferralEmail(Refer_email);
      setUserId(id)
    }

 
  }, [location.search]);

  const onSubmit = async (formData) => {
    try {
      const formDataWithCorrectProfileImage = {
        ...formData,
        profile_image: formData.profile_image[0],
      };

      if(!referralEmail){
var response;
      
       response = await signup(formDataWithCorrectProfileImage);
      }
     else{
        const referSignup = {
          ...formData,
        profile_image: formData.profile_image[0],
        userid:userId,
        email:referralEmail,
        friend_email:formData.email,
        friend_email_requested:formData.email
        }
         response = await ReferFriendRegistration(referSignup)
      }
      if (response.status === 200) {

        setError('');
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data.email || error.response?.data?.error);
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-md:py-12">
      <h2 className="text-2xl font-bold text-center mb-4" data-testid="signup-heading">Sign Up</h2>
      <div className="max-md:max-w-xl w-1/2 max-sm:w-full p-8 bg-white rounded-lg shadow-md" data-testid="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField label="Full Name" name="full_name" register={register} error={errors.full_name?.message} testId="full-name-input" />
          <InputField label="Email" name="email" register={register} error={errors.email?.message} testId="email-input" />
          <InputField label="Mobile Number" name="mobile_number" register={register} type="tel" error={errors.mobile_number?.message} testId="mobile-number-input" />
          <InputField label="Password" name="password" register={register} type="password" error={errors.password?.message} testId="password-input" />
          <InputField label="Profile Image" name="profile_image" register={register} type="file" accept=".jpg, .jpeg, .png" error={errors.profile_image?.message} testId="profile-image-input" />
        {referralEmail &&
        (
          <InputField label="Referral Email" name="referral_email" register={register} type="email" error={errors.referral_email?.message} testId="referral-email-input" defaultValue={referralEmail} />
        )}
          {error && <p className="text-red-500 text-sm mt-1 mb-4" data-testid="signup-error">{error}</p>}

          <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200" data-testid="signup-submit-button" disabled={isSubmitting}>
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4" data-testid="signup-login-link">
          Already have an account? <span className="text-blue-500 cursor-pointer" data-testid="goBack" onClick={handleLoginClick}>Log in</span>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, name, register, type = 'text', error, testId, defaultValue = '' }) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      {...register(name)}
      type={type}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      data-testid={testId} // Ensure this is directly on the input element
      defaultValue={defaultValue}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Signup;
