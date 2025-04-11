import React from 'react'
import { Facebook, Twitter, Linkedin,ArrowLeft  } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


function Legal() {
    const navigate = useNavigate();

  return (
    <>
         <div className="p-8 max-w-5xl mx-auto text-gray-800">
         <div className="flex items-center gap-2 p-4 cursor-pointer text-[#333] hover:bg-[#ebebeb] w-[90px] transition-all  duration-200"
     onClick={()=>navigate('/')}
  >
    <ArrowLeft className="h-5 w-5" />
    <span className="text-sm font-medium">Back</span>
  </div>
      <h1 className="text-3xl font-bold mb-6 border-b-[5px] border-[#e19917] pb-6">Legal & Policies - DOKJAN</h1>

      
      {/* License */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">MIT License</h2>
        <p className="mb-2">Copyright (c) 2025 DOKJAN</p>
        <p className="mb-4">
          Permission is granted, free of charge, to anyone obtaining a copy of this software and associated docs (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the following conditions:
        </p>
        <p className="mb-4">
          The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        </p>
        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        </p>
      </section>

      <hr className='my-3'/>

      {/* Privacy Policy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="mb-2">Effective Date: March 7, 2025</p>
        <p className="mb-4">At DOKJAN (dokjan.site), we value your privacy and are committed to protecting your personal data.</p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Information Collected:</strong> Name, email, educational/project data, and usage analytics.</li>
          <li><strong>Use of Data:</strong> Service delivery, personalization, communication, and analytics.</li>
          <li><strong>Cookies:</strong> No.</li>
          <li><strong>User Rights:</strong> Access, delete, or request your data anytime.</li>
        </ul>
        <p>Contact us at <strong>rushikeshparekar11@gmail.com</strong> for questions.</p>
      </section>


<hr className='my-3'/>


      {/* Terms & Conditions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <p className="mb-2">Effective Date: March 7, 2025</p>
        <p className="mb-4">By using DOKJAN (dokjan.site), you agree to these terms:</p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Eligibility:</strong> You must be 13+ years old.</li>
          <li><strong>User Account:</strong> You are responsible for your login info and content.</li>
          <li><strong>Prohibited Use:</strong> No hacking, illegal activity, or reverse engineering.</li>
          <li><strong>IP:</strong> Your data is yours, but the platform content is ours.</li>
          <li><strong>Liability:</strong> We’re not liable for damages due to use of the site.</li>
          <li><strong>Changes:</strong> Terms may change and continued use implies acceptance.</li>
        </ul>
        <p>Contact: <strong>rushikeshparekar11@gmail.com</strong></p>
      </section>


          {/* ///// footer */}
    <footer className=" bg-[#e6f1fd] text-gray-900 py-8 px-6 text-center shadow-lg rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-30" />
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-indigo-600">Dokjan</h2>
          <p className="text-gray-600 mt-1">The Ultimate Project Management Solution</p>
          
          <div className="mt-4 flex gap-6">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-all"><Facebook size={24} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-500 transition-all"><Twitter size={24} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-700 transition-all"><Linkedin size={24} /></a>
          </div>
          

          
          <p className="text-sm text-gray-500 mt-4">&copy; 2025 Dokjan. All Rights Reserved.</p>
        </div>
      </footer>


    </div>
    </>
  )
}

export default Legal
