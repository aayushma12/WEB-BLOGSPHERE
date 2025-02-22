import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../services/postgres_auth_service';
import { updateProfile } from '../store/authSlice';
import { Container, Button, Input } from '../components';

function EditProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userData) {
      setValue('id', userData.id);
      setValue('name', userData.name);
      setValue('email', userData.email);
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    try {
      setError('');
      const updatedUser = await authService.updateProfile(data);
      dispatch(updateProfile(updatedUser));
      navigate('/');
    } catch (error) {
      console.error('Update profile error:', error);
      setError(error.message || 'Failed to update profile');
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('id')} />
          <Input
            label="Name"
            placeholder="Name"
            className="mb-4"
            {...register('name', { required: 'Name is required' })}
          />
          <Input
            label="Email"
            placeholder="Email"
            className="mb-4"
            {...register('email', { required: 'Email is required' })}
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default EditProfile;
