import { useState } from 'react';
import RecordList from './RecordList';
import RecordForm from './RecordForm';
import PaginatedRecord from './PaginatedRecord';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('welcome');

  return (
    <div className="flex flex-col items-center justify-center p-10">
      {/* Tab Navigation */}
      <nav className="flex mb-5">
        <button
          className={`px-6 py-3 ${activeTab === 'welcome' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('welcome')}
        >
          Welcome Admin Panel
        </button>
        <button
          className={`px-6 py-3 ${activeTab === 'view' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('view')}
        >
          View Employee
        </button>
        <button
          className={`px-6 py-3 ${activeTab === 'create' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('create')}
        >
          Create Employee
        </button>
        <button
          className={`px-6 py-3 ${activeTab === 'create' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('viewPaginated')}
        >
          Paginated Data
        </button>
      </nav>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'welcome' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Admin Panel</h2>
            <p>This is your dashboard, where you can manage employees.</p>
          </div>
        )}
        {activeTab === 'view' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">View Employee</h2>
            <p>Here you can view all the employees information.</p>
            <RecordList></RecordList>
          </div>
        )}
        {activeTab === 'create' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
            <p>Use this tab to add a new employee to the system.</p>
            <RecordForm></RecordForm>
          </div>
        )}
        {activeTab === 'viewPaginated' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
            <p>Use this tab to search sort filter employee in the system.</p>
            <PaginatedRecord></PaginatedRecord>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;