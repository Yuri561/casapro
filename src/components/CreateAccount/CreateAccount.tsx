import React from "react";

const CreateAccount: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center sm:text-center min-h-screen bg-gray-100">
      <h2 className="text-3xl text-center font-bold text-gray-900 mb-6">
        Create Your Casa Pro Account
      </h2>
      <form className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <button className="w-full bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
