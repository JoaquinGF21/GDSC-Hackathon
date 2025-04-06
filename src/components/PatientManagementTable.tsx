import React, { useState } from 'react';
import { Search, Calendar, Users, AlertCircle, CheckCircle, Clock, Filter, ChevronDown, ChevronUp, Eye } from 'lucide-react';

// Import sample data
const patientData = [
  {
    id: "PT-2025-001",
    firstName: "Emma",
    lastName: "Johnson",
    dob: "1978-06-15",
    gender: "female",
    skinType: "type2",
    riskLevel: "Moderate",
    profileComplete: true,
    lastVisit: "2025-03-20",
    nextAppointment: "2025-04-25",
    notes: "Patient has family history of melanoma. Regular 6-month check recommended."
  },
  {
    id: "PT-2025-002",
    firstName: "Michael",
    lastName: "Chen",
    dob: "1985-11-23",
    gender: "male",
    skinType: "type3",
    riskLevel: "Low",
    profileComplete: true,
    lastVisit: "2025-03-15",
    nextAppointment: "2025-10-15",
    notes: "Annual check recommended. No concerning lesions at last visit."
  },
  {
    id: "PT-2025-003",
    firstName: "Sarah",
    lastName: "Williams",
    dob: "1967-09-04",
    gender: "female",
    skinType: "type1",
    riskLevel: "High",
    profileComplete: true,
    lastVisit: "2025-04-01",
    nextAppointment: "2025-07-01",
    notes: "Patient has history of basal cell carcinoma. Quarterly checks recommended."
  },
  {
    id: "PT-2025-004",
    firstName: "James",
    lastName: "Garcia",
    dob: "1992-03-12",
    gender: "male",
    skinType: "type4",
    riskLevel: "Low to Moderate",
    profileComplete: false,
    lastVisit: "2025-03-25",
    nextAppointment: null,
    notes: "New patient. Medical history questionnaire incomplete. First scan performed, no concerning lesions."
  },
  {
    id: "PT-2025-005",
    firstName: "Emily",
    lastName: "Thompson",
    dob: "1988-12-10",
    gender: "female",
    skinType: "type2",
    riskLevel: "Moderate",
    profileComplete: true,
    lastVisit: "2025-03-10",
    nextAppointment: "2025-09-10",
    notes: "Several atypical moles being monitored. Semi-annual checks recommended."
  }
];

const PatientManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sort patients based on current sort field and direction
  const sortedPatients = [...patientData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Filter patients based on active filter
  const filteredPatients = sortedPatients.filter(patient => {
    if (activeFilter === 'high-risk') return patient.riskLevel === 'High';
    if (activeFilter === 'incomplete') return !patient.profileComplete;
    if (activeFilter === 'followup-needed') return patient.nextAppointment !== null;
    return true; // 'all' filter
  });

  // Search functionality
  const searchedPatients = filteredPatients.filter(patient => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      patient.firstName.toLowerCase().includes(searchTermLower) ||
      patient.lastName.toLowerCase().includes(searchTermLower) ||
      patient.id.toLowerCase().includes(searchTermLower)
    );
  });

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Get risk level color
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600';
      case 'Moderate': return 'text-orange-500';
      case 'Low to Moderate': return 'text-yellow-600';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Users className="h-6 w-6 mr-2 text-indigo-600" />
            Patient Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            View and manage your patients and their scans
          </p>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              className="p-2 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center"
            >
              <Filter className="h-5 w-5" />
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            {/* Filter dropdown would go here */}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 mb-4">
        <button 
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => setActiveFilter('all')}
        >
          All Patients
        </button>
        <button 
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'high-risk' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => setActiveFilter('high-risk')}
        >
          High Risk
        </button>
        <button 
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'incomplete' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => setActiveFilter('incomplete')}
        >
          Incomplete Profile
        </button>
        <button 
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'followup-needed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => setActiveFilter('followup-needed')}
        >
          Follow-up Needed
        </button>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastName')}
                >
                  <div className="flex items-center">
                    Patient
                    {sortField === 'lastName' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('riskLevel')}
                >
                  <div className="flex items-center">
                    Risk Level
                    {sortField === 'riskLevel' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastVisit')}
                >
                  <div className="flex items-center">
                    Last Visit
                    {sortField === 'lastVisit' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('nextAppointment')}
                >
                  <div className="flex items-center">
                    Next Appointment
                    {sortField === 'nextAppointment' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.firstName} {patient.lastName}</div>
                        <div className="text-sm text-gray-500">{patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{calculateAge(patient.dob)} years • {patient.gender === 'male' ? 'Male' : 'Female'}</div>
                    <div className="text-sm text-gray-500">
                      Skin Type: {patient.skinType.replace('type', 'Type ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(patient.riskLevel)}`}>
                      {patient.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(patient.lastVisit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.nextAppointment ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-indigo-500 mr-1" />
                        <span className="text-sm text-gray-900">{formatDate(patient.nextAppointment)}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not scheduled</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.profileComplete ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" /> Complete
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-4 w-4 mr-1" /> Incomplete
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-md">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Upcoming Appointments</h3>
              <p className="text-xs text-gray-500">Next 7 days</p>
            </div>
          </div>
          <div className="space-y-3">
            {patientData.filter(p => p.nextAppointment && new Date(p.nextAppointment) <= new Date(new Date().setDate(new Date().getDate() + 7))).length > 0 ? (
              patientData.filter(p => p.nextAppointment && new Date(p.nextAppointment) <= new Date(new Date().setDate(new Date().getDate() + 7)))
                .map(patient => (
                <div key={patient.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{patient.firstName} {patient.lastName}</p>
                    <p className="text-xs text-gray-500">{formatDate(patient.nextAppointment)}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(patient.riskLevel)}`}>
                    {patient.riskLevel}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No upcoming appointments this week</p>
            )}
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-2 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">High Risk Patients</h3>
              <p className="text-xs text-gray-500">Requiring immediate attention</p>
            </div>
          </div>
          <div className="space-y-3">
            {patientData.filter(p => p.riskLevel === 'High').length > 0 ? (
              patientData.filter(p => p.riskLevel === 'High').map(patient => (
                <div key={patient.id} className="border-l-2 border-red-500 pl-3 py-1">
                  <p className="text-sm font-medium">{patient.firstName} {patient.lastName}</p>
                  <p className="text-xs text-gray-500">{patient.notes}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No high risk patients at this time</p>
            )}
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-2 rounded-md">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Incomplete Profiles</h3>
              <p className="text-xs text-gray-500">Requires follow-up</p>
            </div>
          </div>
          <div className="space-y-3">
            {patientData.filter(p => !p.profileComplete).length > 0 ? (
              patientData.filter(p => !p.profileComplete).map(patient => (
                <div key={patient.id} className="flex justify-between items-center">
                  <p className="text-sm font-medium">{patient.firstName} {patient.lastName}</p>
                  <button className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Follow Up</button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No incomplete profiles at this time</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Summary Statistics */}
      <div className="mt-6 bg-white shadow-sm rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="text-2xl font-bold text-indigo-700">{patientData.length}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">High Risk</p>
            <p className="text-2xl font-bold text-red-600">{patientData.filter(p => p.riskLevel === 'High').length}</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Moderate Risk</p>
            <p className="text-2xl font-bold text-orange-600">{patientData.filter(p => p.riskLevel === 'Moderate').length}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Low Risk</p>
            <p className="text-2xl font-bold text-green-600">{patientData.filter(p => p.riskLevel === 'Low').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagementTable;