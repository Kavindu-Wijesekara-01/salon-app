import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // URL එකෙන් token ගන්න
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams(); // URL එකේ තියෙන token එක ගන්නවා
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const parseRes = await response.json();

      if (response.ok) {
        toast.success(parseRes.message);
        navigate("/login"); // සාර්ථක නම් Login පිටුවට යවනවා
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;