import React from 'react'
import { Calendar1, Ellipsis, ExternalLink, LockOpen, ClockAlert, UserRound, Users, Paperclip  } from 'lucide-react';
import { RiImageAddFill } from "react-icons/ri";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function ProjectCardThree({data}) {
    console.log(data)
    const navigate = useNavigate();
    //    projectname = zomato;

    //const createdDate = new Date(createdAt);
    //const currentDate = new Date();
    //const timeDiff = currentDate - createdDate;
    //const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
    //const timeAgo = daysAgo === 0 ? 'Today' : `${daysAgo} days ago`;

    return (
        <>
            <div className="h-[250px] w-[330px] pb-3 justify-between flex flex-col rounded-md shadow-black hover: hover:shadow-md border-2 border-[#dddedd] hover:border-[#c2c2c2] "   >

                <div className="pt-2 pl-2 flex items-center justify-between pr-3 " >
                    <div className="h-9 w-9 bg-[#776aff] font-bold text-white rounded-lg flex justify-center items-center cursor-pointer"  onClick={()=>navigate(`/documentation/${data.projectname}`)}>
                        {data.projectname ? data.projectname.substring(0, 2).toUpperCase() : 'NA'}
                    </div>
                    <div className=" w-[90%] justify-between flex">
                        <div className="pl-2 cursor-pointer"  onClick={()=>navigate(`/documentation/${data.projectname}`)}>
                            <h1 className="text-[15px] font-bold text-[#2f3035] ">{data.projectname}</h1>
                            <h1 className="text-[12px] text-gray-700">{data.type}</h1>
                        </div>
                        <span className='h-7 w-7 items-center flex justify-center rounded-full hover:bg-[#e7e7e7]'><Ellipsis className="text-gray-500 h-5 w-5" /></span>
                    </div>
                </div>

                <div className='flex items-center gap-2 border-[1px] rounded-lg hover:border-[#bebebe] bg-[#e7e7e7] px-[2px] py-[2px] mx-2 mt-1 cursor-pointer'  onClick={()=>navigate(`/profile/${data.createdby.name}`)}>
                    <div className="h-4 w-4 bg-[#776aff] text-[6px] text-white rounded-full flex justify-center items-center">RU</div>
                    <h2 className='text-[12px] font-semibold'>{data.createdby.name}</h2>
                    <h3 className='text-[9px] mt-[1px] ml-3'>{data.createdby.email}</h3>
                </div>

                {/* image div */}
                <div className="w-full px-2 mt-2 relative group">
                    <img
                        src="https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png"
                        alt="Project Preview"
                        className="rounded-sm w-full h-[100px] object-cover"
                    />

                    <div className="absolute mx-2 inset-0 bg-black bg-opacity-40 hidden group-hover:flex items-center justify-center rounded-sm transition duration-300">
                        <RiImageAddFill className="h-6 w-6 text-white" />
                    </div>
                </div>


                <div></div>
                <div></div>


                {/* Time and Users Info */}
                <div className="py-0 pl-3 gap-4 flex">
                    <div className='flex flex-col '><div className='flex items-center '><Users className='h-[13px] w-[13px]' /><h1 className='text-[13px] ml-1'>0</h1></div> <h3 className='text-[9px]'>Contributor</h3></div>
                    <div className='flex flex-col '><div className='flex items-center '><Paperclip className='h-[13px] w-[13px]' /><h1 className='text-[13px] ml-1'>0</h1></div> <h3 className='text-[9px]'>Attachments</h3></div>
                    <div className='flex flex-col items-center h-[24px] ml-[95px] bg-[#e7e7e7] pt-1 px-2 mt-1 py-[2px]'><div className='flex items-center '><FaClockRotateLeft className='h-[11px] w-[11px]' /><h1 className='text-[10px] ml-1'>10 daysAgo</h1></div></div>

                </div>
            </div>

        </>
    )
}

export default ProjectCardThree
