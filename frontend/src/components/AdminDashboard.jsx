import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = ({ setAuth }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceInputs, setServiceInputs] = useState({ s_name: "", s_description: "", s_price: "", s_duration: "", s_image: "" });

  const { s_name, s_description, s_price, s_duration, s_image } = serviceInputs;
  const onServiceChange = (e) => setServiceInputs({ ...serviceInputs, [e.target.name]: e.target.value });

  // Data Fetching
  const getAppointments = async () => {
    try {
      const response = await fetch("/appointments/all", { headers: { token: localStorage.getItem("token") } });
      setAppointments(await response.json());
    } catch (err) { console.error(err.message); }
  };

  const getServices = async () => {
    try {
      const response = await fetch("/services");
      setServices(await response.json());
    } catch (err) { console.error(err.message); }
  };

  const changeStatus = async (id, status) => {
    try {
      const response = await fetch(`/appointments/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: localStorage.getItem("token") },
        body: JSON.stringify({ status })
      });
      if(response.ok) { toast.success(`Updated to ${status}`); getAppointments(); }
    } catch (err) { console.error(err.message); }
  };

  const onSubmitService = async (e) => {
    e.preventDefault();
    try {
        const body = { name: s_name, description: s_description, price: s_price, duration: s_duration, image: s_image };
        const url = editingServiceId ? `/services/${editingServiceId}` : "/services";
        const method = editingServiceId ? "PUT" : "POST";
        const response = await fetch(url, { method, headers: { "Content-Type": "application/json", token: localStorage.getItem("token") }, body: JSON.stringify(body) });
        if (response.ok) { toast.success("Success!"); setShowServiceModal(false); getServices(); setServiceInputs({ s_name: "", s_description: "", s_price: "", s_duration: "", s_image: "" }); setEditingServiceId(null); }
    } catch (err) {}
  };

  const deleteService = async (id) => {
    if(window.confirm("Delete this service?")) { await fetch(`/services/${id}`, { method: "DELETE", headers: { token: localStorage.getItem("token") } }); getServices(); }
  };

  const openEditModal = (s) => { setEditingServiceId(s.service_id); setServiceInputs({ s_name: s.service_name, s_description: s.service_description, s_price: s.service_price, s_duration: s.service_duration, s_image: s.service_image }); setShowServiceModal(true); };

  useEffect(() => { getAppointments(); getServices(); }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setAuth(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-6 md:p-10 ">
      <ToastContainer theme="dark" />
      
      {/* 1. SIMPLE HEADER (No Fixed Navbar) */}
      

      <div className="max-w-7xl mx-auto mt-20">
        
        {/* 2. SIMPLE TABS */}
        <div className="flex gap-4 mb-8">
            <button 
                onClick={() => setActiveTab('appointments')} 
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'appointments' ? 'bg-pink-600 text-white shadow-md' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
                Appointments
            </button>
            <button 
                onClick={() => setActiveTab('services')} 
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'services' ? 'bg-pink-600 text-white shadow-md' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
                Services
            </button>
            
            {activeTab === 'services' && (
                <button 
                    onClick={() => { setEditingServiceId(null); setServiceInputs({s_name:"",s_description:"",s_price:"",s_duration:"",s_image:""}); setShowServiceModal(true); }} 
                    className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md"
                >
                    + Add New Service
                </button>
            )}
        </div>

        {/* 3. APPOINTMENTS TABLE (Clean & Simple) */}
        {activeTab === 'appointments' && (
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Date & Time</th>
                                <th className="px-6 py-4 font-semibold">Customer Info</th>
                                <th className="px-6 py-4 font-semibold">Service</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {appointments.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No appointments found.</td></tr>
                            ) : (
                                appointments.map(app => (
                                    <tr key={app.appointment_id} className="hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium">{new Date(app.appointment_date).toLocaleDateString()}</div>
                                            <div className="text-blue-400 text-xs">{app.appointment_time}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">{app.user_name}</div>
                                            <div className="text-xs text-gray-400">{app.user_contact}</div>
                                            <div className="text-xs text-blue-300 cursor-pointer hover:underline">{app.user_email}</div>
                                        </td>
                                        <td className="px-6 py-4">{app.service_name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                                                ${app.status === 'Confirmed' ? 'bg-green-900 text-green-300' : 
                                                  app.status === 'Cancelled' ? 'bg-red-900 text-red-300' : 
                                                  'bg-yellow-900 text-yellow-300'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            {app.status === 'Pending' && (
                                                <>
                                                    <button onClick={() => changeStatus(app.appointment_id, 'Confirmed')} className="text-green-400 hover:text-green-300 hover:underline font-medium">Accept</button>
                                                    <button onClick={() => changeStatus(app.appointment_id, 'Cancelled')} className="text-red-400 hover:text-red-300 hover:underline font-medium">Reject</button>
                                                </>
                                            )}
                                            {app.status === 'Confirmed' && (
                                                <button onClick={() => changeStatus(app.appointment_id, 'Cancelled')} className="text-red-400 hover:text-red-300 text-xs hover:underline">Cancel Booking</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* 4. SERVICES LIST (Simple Cards) */}
        {activeTab === 'services' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(s => (
                    <div key={s.service_id} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white">{s.service_name}</h3>
                            <div className="flex gap-3 text-sm">
                                <button onClick={() => openEditModal(s)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                <button onClick={() => deleteService(s.service_id)} className="text-red-400 hover:text-red-300">Delete</button>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{s.service_description}</p>
                        <div className="flex justify-between items-center text-sm font-medium pt-4 border-t border-gray-700">
                            <span className="text-green-400">Rs. {s.service_price}</span>
                            <span className="text-gray-500">Duration: {s.service_duration}</span>
                        </div>
                    </div>
                ))}
             </div>
        )}

        {/* 5. MODAL (Clean Dark Style) */}
        {showServiceModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-2xl border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">{editingServiceId ? "Edit Service" : "Add New Service"}</h2>
                        <button onClick={() => setShowServiceModal(false)} className="text-gray-400 hover:text-white text-lg">✕</button>
                    </div>
                    <form onSubmit={onSubmitService} className="space-y-4">
                        <input name="s_name" placeholder="Service Name" value={s_name} onChange={onServiceChange} className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 outline-none" required />
                        <textarea name="s_description" placeholder="Description" value={s_description} onChange={onServiceChange} className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 outline-none h-24 resize-none" required />
                        <div className="flex gap-4">
                            <input name="s_price" placeholder="Price (Rs)" value={s_price} onChange={onServiceChange} className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 outline-none" required />
                            <input name="s_duration" placeholder="Duration" value={s_duration} onChange={onServiceChange} className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 outline-none" required />
                        </div>
                        <input name="s_image" placeholder="Image URL" value={s_image} onChange={onServiceChange} className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-500 outline-none" required />
                        
                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors mt-2">
                            {editingServiceId ? "Update Service" : "Add Service"}
                        </button>
                    </form>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;