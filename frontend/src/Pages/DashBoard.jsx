import React, { useState } from 'react';
import {LayoutPanelLeft,Star,Users,LayoutGrid,CalendarRange,UserRoundPlus,ListFilterPlus} from 'lucide-react';
import YourProject from './YourProject';
import Saved from './Saved';
import Workmates from './Workmates';
import GlobalPortfolio from './GlobalPortfolio';
import { Plus } from 'lucide-react';


function DashBoard() {
  const [active, setActive] = useState('Your Project');

  const items = [
    { name: 'Your Project', icon: LayoutPanelLeft },
    { name: 'Saved', icon: Star },
    { name: 'Workmates', icon: Users },
    { name: 'Global Portfolio', icon: LayoutGrid },
    { name: 'Calendar', icon: CalendarRange },
    { name: 'Filters', icon: ListFilterPlus }
  ];

  const renderContent = () => {
    switch (active) {
      case 'Your Project':
        return <YourProject />;
      case 'Saved':
        return <Saved />;
      case 'Workmates':
        return <Workmates />;
      case 'Global Portfolio':
        return <GlobalPortfolio />;
      case 'Calendar':
        return <Saved />;
      case 'Filters':
        return <Saved />;
      default:
        return <YourProject />;
    }
  };

  return (
    <div className='flex'>
  {/* Fixed Sidebar */}
  <div className='h-[94vh] w-[15%] border-r border-[#dddedd] flex flex-col justify-between fixed top-[6vh] left-0 bg-white z-50'>
    <ul className='list-none pl-4 flex flex-col gap-3 mt-10'>
      {items.map(({ name, icon: Icon }) => (
        <li
          key={name}
          onClick={() => setActive(name)}
          className={`flex justify-start items-center gap-2 w-56 h-9 rounded-sm pl-2 cursor-pointer ${
            active === name ? 'bg-[#e2e2e2]' : 'hover:bg-[#ebebeb]'
          }`}
        >
          <Icon className='h-4 w-4' />
          {name}
        </li>
        
      ))}
      <hr className='mr-4 mt-5 border-[#cacaca]'/>
      <li className='flex justify-center items-center gap-2 w-55 h-13 rounded-sm cursor-pointer hover:bg-[#e2e2e2] border border-2 border-[#e2e2e2] text-black '>
        <Plus className='h-5 w-5' /> Start New Project
      </li>
      
    </ul>

    <ul>
      <li className='flex justify-center items-center gap-2 w-62 h-13 rounded-sm cursor-pointer bg-black text-white ml-0.5'>
        <UserRoundPlus className='h-5 w-5' /> Share the Invite
      </li>
    </ul>
  </div>

  {/* Content Area (Shifted to right) */}
  <div className='w-[85%] min-h-[100vh] ml-[15%] p-6'>
    {renderContent()}
  </div>
</div>

  );
}

export default DashBoard;
