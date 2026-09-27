import { Plus, Bell, Search, Calendar } from 'lucide-react';
import Button from "./Button";
import NotificationBell from "./NotificationBell";


function Header() {
  return (
    <header className="flex flex-col m-5 md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      
     
      <div className="flex items-center gap-4 w-full md:w-auto">
        
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="ابحث عن مشترك، هدفك، أو بريد..." 
            className="w-full bg-gray-100 border-none rounded-xl py-2.5 pr-10 pl-4 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        
      
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm
         bg-white px-3 py-2 rounded-lg border border-gray-200 whitespace-nowrap">
          <Calendar size={16} />
          <span>الأربعاء 15 سبتمبر 2023</span>
        </div>
        
       <Button
            title="خطة جديدة"
            Icon={Plus}
            color="bg-green-700 text-white"
        />
        
       
   
          <NotificationBell />
       <div className="hidden md:flex items-center gap-2 bg-white px-3 py-3 rounded-full border border-green-500 whitespace-nowrap">
    <img
        src="/profile.jpg"
        alt="صورة المستخدم"
        className="w-5 h-5 rounded-full object-cover"
    />
</div>
      </div>

    </header>
  );
}

export default Header;