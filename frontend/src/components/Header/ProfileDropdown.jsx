import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../services/postgres_auth_service';
import { logout, deleteProfile } from '../../store/authSlice';

function ProfileDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await authService.deleteAccount({ id: userData.id });
        dispatch(deleteProfile());
        navigate('/signup');
      } catch (error) {
        console.error('Delete account failed:', error);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="px-4 py-2 bg-blue text-lightBlue rounded-lg hover:bg-deepBlue"
      >
        Profile
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <div className="p-4 border-b">
            <p className="font-bold">{userData?.name || 'User'}</p>
            <p className="text-sm text-gray-600">{userData?.email}</p>
          </div>
          <button
            onClick={() => navigate('/edit-profile')}
            className="w-full text-left px-4 py-2 hover:bg-skyBlue"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-skyBlue"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-skyBlue"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
