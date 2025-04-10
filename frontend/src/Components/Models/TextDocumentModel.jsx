import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";


function TextDocumentModel({ onClose }) {
    const { projectName } = useParams();

    const [textDocs, setTextDocs] = useState({
        textname: "",
        textnamelogo: "None",
        textContent: ""
    });
        let [loading, setLoading] = useState(false);
    

    const handleChange = (e) => {
        setTextDocs({ ...textDocs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!textDocs.textname || !textDocs.textContent) {
            toast.error("All fields are required!");
            setLoading(false)
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8081/project/${projectName}/textdocs`, { TextDocsObject: textDocs });

            if (response.status === 200) {
                toast.success("Text Data Added Successfully!");
                window.location.reload();
                setTextDocs({ textname: "", textnamelogo: "None", textContent: "" });
                setLoading(false)
            }
        } catch (error) {
            console.error("Error adding text data:", error);
            toast.error("Failed to add text data.");
            setLoading(false)
        }
    };




    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 px-4">
                <div className="relative w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">

                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold pb-2">
                        &times;
                    </button>

                    {/* <h2 className="text-1xl font-semibold text-center mb-6">New Text </h2> */}

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Text Name Logo */}
                        <div className='flex w-full gap-4'>
                            <div className='w-[18%] mr-2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Text Name Logo</label>
                                <select
                                    name="textnamelogo"
                                    value={textDocs.textnamelogo}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="None">None</option>
                                    <option value="Dot">Dot</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Research">Research</option>
                                    <option value="Other">Other</option>
                                </select>

                            </div>

                            {/* Text Name */}
                            <div className='w-[80%]'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Text Name</label>
                                <input
                                    type="text"
                                    name="textname"
                                    value={textDocs.textname}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Aim, Introduction."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
                            <textarea
                                name="textContent"
                                value={textDocs.textContent}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Brief overview of Aim, Introduction..."
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
                        >
                     {!loading ? "Add Text Data" :  <ClipLoader color='white' className='w-8' size='25px' aria-label="Loading Spinner" data-testid="loader"/>}

                        </button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default TextDocumentModel;
