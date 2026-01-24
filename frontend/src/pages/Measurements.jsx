import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates, saveMeasurement, reset } from '../features/measurements/measurementSlice';
import { getCustomers } from '../features/customers/customerSlice'; 
import { Plus, Ruler, Save, User, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const Measurements = () => {
  const dispatch = useDispatch();

  // 1. Redux State se Data nikalo
  const { templates, isLoading, isSuccess, message } = useSelector((state) => state.measurements);
  const { customers } = useSelector((state) => state.customers);

  // 2. Local State (Form Data)
  const [customerId, setCustomerId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Pura Template Object (Name + Fields)
  
  // DYNAMIC STATE: Ye wo values hain jo user type karega (e.g., { Chest: "32", Length: "40" })
  const [fittings, setFittings] = useState({}); 
  const [notes, setNotes] = useState('');

  // 3. Page Load hote hi Customers aur Templates mangwao
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getTemplates());
  }, [dispatch]);

  // Success Message Handle
  useEffect(() => {
    if (isSuccess && message === 'Measurement Saved!') {
        toast.success(message);
        // Form Reset
        setCustomerId('');
        setSelectedTemplate(null);
        setFittings({});
        setNotes('');
        dispatch(reset());
    }
  }, [isSuccess, message, dispatch]);

  // 4. Jab Cloth Type Select ho
  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    const template = templates.find(t => t._id === templateId);
    setSelectedTemplate(template);
    setFittings({}); // Purana naap clear karo
  };

  // 5. Jab user Naap likhe (Dynamic Input Handler)
  const handleFittingChange = (fieldName, value) => {
    setFittings({
        ...fittings,
        [fieldName]: value // e.g. "Chest": "32"
    });
  };

  // 6. Submit Form
  const onSubmit = (e) => {
    e.preventDefault();
    if (!customerId) return toast.error("Please select a customer!");
    if (!selectedTemplate) return toast.error("Please select cloth type!");

    // Data tayaar karo backend k liye
    const measurementData = {
        customerId,
        clothType: selectedTemplate.name, // e.g., "Shalwar Kameez"
        fittings: fittings,               // { Chest: 32, Length: 40 }
        notes
    };

    dispatch(saveMeasurement(measurementData));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-teal-50 rounded-full text-[#258C78]">
            <Ruler size={24} />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-gray-800">New Measurement</h1>
            <p className="text-sm text-gray-500">Select customer and record fittings</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-8">

            {/* SECTION 1: SELECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Customer Dropdown */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <User size={16}/> Select Customer
                    </label>
                    <select 
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-gray-50"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    >
                        <option value="">-- Search Customer --</option>
                        {customers.map((c) => (
                            <option key={c._id} value={c._id}>{c.name} - {c.phone}</option>
                        ))}
                    </select>
                </div>

                {/* Cloth Type Dropdown (From Settings) */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <FileText size={16}/> Cloth Type
                    </label>
                    <select 
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-gray-50"
                        onChange={handleTemplateChange}
                        required
                    >
                        <option value="">-- Select Type (e.g. Suit) --</option>
                        {templates.map((t) => (
                            <option key={t._id} value={t._id}>{t.name}</option>
                        ))}
                    </select>
                    {templates.length === 0 && (
                        <p className="text-xs text-red-500 mt-1">
                            * No types found. Go to Settings to create one.
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-gray-100"/>

            {/* SECTION 2: DYNAMIC FIELDS AREA */}
            {selectedTemplate ? (
                <div className="animate-fade-in-up">
                    <h3 className="text-lg font-bold text-[#258C78] mb-4">
                        Enter {selectedTemplate.name} Measurements
                    </h3>
                    
                    {/* Yahan Jadoo Hoga: Fields automatically banengi */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedTemplate.fields.map((fieldName, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
                                    {fieldName}
                                </label>
                                <input 
                                    type="number" // Number keyboard mobile pr khulega
                                    className="w-full bg-transparent outline-none font-bold text-gray-800 text-lg placeholder-gray-300"
                                    placeholder="0.0"
                                    value={fittings[fieldName] || ''}
                                    onChange={(e) => handleFittingChange(fieldName, e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    {/* Extra Notes */}
                    <div className="mt-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Special Notes</label>
                        <textarea 
                            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-gray-50 h-24"
                            placeholder="Example: Collar hard rakhna hai, Pocket gol honi chahiye..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>

                </div>
            ) : (
                // Agar koi Type select nahi ki
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
                    <Ruler size={40} className="mx-auto mb-2 opacity-20"/>
                    <p>Select a <b>Cloth Type</b> above to see measurement fields.</p>
                </div>
            )}

            {/* SECTION 3: SUBMIT BUTTON */}
            <div className="flex justify-end pt-4">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-[#258C78] text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all flex items-center gap-2 disabled:opacity-50 disabled:translate-y-0"
                >
                    {isLoading ? 'Saving...' : <><Save size={20}/> Save Measurement</>}
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default Measurements;