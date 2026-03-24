import React, { useState, useEffect, useContext } from "react";
import userService from "../services/user.service";
import { AuthContext } from "../context/AuthContext";
import { User, Key, Save } from "lucide-react";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    userService.getUserProfile().then(
      (response) => {
        setUserData(response.data);
        setLoading(false);
      },
      (error) => {
        setError("Error loading profile");
        setLoading(false);
      }
    );
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    userService.updateProfile(userData).then(
      (response) => {
        setMessage(response.data.message);
        // Update local user data if needed
        const localUser = JSON.parse(localStorage.getItem("user"));
        localUser.email = userData.email;
        localStorage.setItem("user", JSON.stringify(localUser));
        setCurrentUser(localUser);
      },
      (error) => {
        setError("Error updating profile");
      }
    );
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    userService.changePassword(passwords.oldPassword, passwords.newPassword).then(
      (response) => {
        setMessage(response.data.message);
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      },
      (error) => {
        setError(error.response?.data?.message || "Error changing password");
      }
    );
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>

      {message && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow sm:rounded-lg p-6 border">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                disabled
                className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md py-2 px-3 text-gray-500 sm:text-sm"
                value={userData.username}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Update Profile
            </button>
          </form>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6 border">
          <div className="flex items-center mb-6">
            <Key className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Old Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Key className="h-4 w-4 mr-2" />
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
