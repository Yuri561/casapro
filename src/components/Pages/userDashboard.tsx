import React from 'react'
import Dashboard from './Dashboard'
import Table from './Table'



const UserDashboard: React.FC = () => {
    return (
      <div className="flex flex-col space-y-6 p-4">
        <Dashboard />
        <Table />
      </div>
    );
  };
  
  export default UserDashboard;
  