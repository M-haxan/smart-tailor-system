import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTemplate, getTemplates, reset } from '../features/measurements/measurementSlice';
import { Plus, Trash2, Save, Ruler } from 'lucide-react';
import toast from 'react-hot-toast';

const MeasurementSettings = () => {
  const dispatch = useDispatch();
  const { templates, isLoading, isError, isSuccess, message } = useSelector((state) => state.measurements);
  
  // Form State
  const [typeName, setTypeName] = useState('');
  // Fields List (String Array): ["Length", "Chest"]
  const [fields, setFields] = useState(['']); 

  useEffect(() => {
    dispatch(getTemplates()); // Page load hote hi list mangwao
    
    // Agar save ho gaya to form clear karo
    if (isSuccess && message === 'Template Created Successfully!') {
        toast.success(message);
        setTypeName('');
        setFields(['']);
        dispatch(reset());
    }
    if (isError) {
        toast.error(message);
        dispatch(reset());
    }
  }, [dispatch, isSuccess, isError, message]);

  // 1. Add Empty Field Input
  const addFieldInput = () => {
    setFields([...fields, '']);
  };

  // 2. Remove Field Input
  const removeFieldInput = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  // 3. Handle Field Typing
  const handleFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  // 4. Submit Form
  const onSubmit = (e) => {
    e.preventDefault();
    if (!typeName.trim()) return toast.error("Template Name is required!");
    
    // Khali fields filter karo
    const validFields = fields.filter(f => f.trim() !== '');
    if (validFields.length === 0) return toast.error("Add at least one measurement field!");

    // Backend ko data bhejo
    const data = {
        name: typeName,
        fields: validFields // ["Length", "Chest"]
    };

    dispatch(addTemplate(data));
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Measurement Settings</h1>
        <p className="text-sm text-gray-500">Configure measurement forms (e.g. Suit, Kurta)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: CREATE FORM */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Plus size={20} className="text-[#258C78]"/> Create New Template
            </h2>
            
            <form onSubmit={onSubmit}>
                {/* Template Name */}
                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Template Name</label>
                    <input 
                        type="text" 
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-gray-50"
                        placeholder="e.g. Shalwar Kameez, Pant Coat"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                    />
                </div>

                {/* Fields Builder */}
                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Fields (Naap ki Cheezein)</label>
                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={index} className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder={`Field ${index + 1} (e.g. Length)`}
                                    className="flex-1 border p-2.5 rounded-lg focus:border-teal-500 outline-none"
                                    value={field}
                                    onChange={(e) => handleFieldChange(index, e.target.value)}
                                />
                                {fields.length > 1 && (
                                    <button type="button" onClick={() => removeFieldInput(index)} className="p-2.5 text-red-400 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={18}/>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addFieldInput} className="text-sm text-[#258C78] font-bold mt-3 flex items-center gap-1 hover:underline">
                        <Plus size={16}/> Add Another Field
                    </button>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#258C78] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : <><Save size={18}/> Save Template</>}
                </button>
            </form>
          </div>

          {/* RIGHT: SAVED TEMPLATES LIST */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Your Templates</h2>
            {templates.length > 0 ? (
                templates.map((template) => (
                    <div key={template._id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#258C78]">
                                    <Ruler size={20}/>
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">{template.name}</h3>
                            </div>
                            {/* Delete Button (Agar backend allow kare) */}
                            {/* <button className="text-gray-400 hover:text-red-500"><Trash2 size={18}/></button> */}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pl-13">
                            {template.fields.map((field, i) => (
                                <span key={i} className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200">
                                    {field}
                                </span>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No templates found. Create one!</p>
                </div>
            )}
          </div>

      </div>
    </div>
  );
};

export default MeasurementSettings;