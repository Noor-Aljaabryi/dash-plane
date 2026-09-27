import NavItem from "./NavItem";
// بتسمح لنا ننقل المستخدم من صفحة لصفحة باستخدام  بالجافاسكريبت  بدل ما يضغط على رابط.
import { useNavigate, useLocation } from "react-router-dom";

import {
  Home,
  Users,
  FileText,
  Bookmark,
  MessageSquare,
  Bell,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import profileImage from "../assets/profile.png";

function Sidebar() {
  // ربط
  const navigate = useNavigate();
  const location = useLocation();
  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("flashMessage", "تم تسجيل الخروج بنجاح ..");
    navigate("/login", { replace: true });
  };

  //
  return (
    <aside className="w-64 bg-white border-l border-gray-200 h-screen flex flex-col justify-between hidden lg:flex rtl">
      {/* Header */}
      <div>
        <div
          className="
            w-[255.2px]
            h-[78.8px]
            flex
            items-center
            gap-4
            pt-5
            pr-5
            pb-5
            pl-[50.13px]
            border-b-[0.8px]
            border-[#F1F5F9]
          "
        >
          <div className="flex items-center gap-2">
            <img
              src={profileImage}
              alt="User"
              className="w-[50px] h-[50px]  object-contain"
            />

            <div className="flex flex-col items-end mr-5">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                COACH
              </span>

              <h3 className="font-bold text-[#1A4762] text-sm">
                لوحة تحكم المدرب
              </h3>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-[#F8F9FA]">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex justify-around gap-2 ">
                <h3 className="font-bold text-[#343A40] text-sm">كابتن أحمد</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  نشط
                </span>
              </div>
            </div>
          </div>
          <NavItem
            icon={<Home size={20} />}
            label="الرئيسية"
            to="/dashboard"
            active={location.pathname === "/dashboard"}
          />

          <NavItem
            icon={<Users size={20} />}
            label="المشتركون"
            to="/dashboard/Subscribers"
            active={location.pathname === "/dashboard/Subscribers"}
          />
           <NavItem
            icon={<Users size={20} />}
            label="طلبات الاشتراك"
            to="/dashboard/Subscribers-Request"
            active={location.pathname === "/dashboard/Subscribers-Request"}
          />

          <NavItem icon={<FileText size={20} />} label="الخطط" />

          <NavItem icon={<Bookmark size={20} />} label="الحزم" />

          <NavItem
            icon={<Bell size={20} />}
            label="الإشعارات"
            badge="1"
            badgeColor="bg-red-500"
          />

          <NavItem icon={<User size={20} />} label="الملف الشخصي" />

          <NavItem icon={<Settings size={20} />} label="الإعدادات" />
          <NavItem
            icon={<LogOut size={20} />}
            label="تسجيل الخروج"
            logoutColor="text-red-500 "
            onClick={handleLogout}
          />
        </nav>
      </div>

      {/* Footer Progress */}
      <div className="p-4 border border-[#7FA279] rounded-lg rounded-lg m-4 ">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span className="font-bold text-[#184159] text-[12px] leading-[16px] text-right">
            طاقة المشتركين
          </span>
          <span>28 / 35</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-700 h-2 rounded-full"
            style={{ width: "80%" }}
          />
        </div>

        <p className="text-xs text-gray-400 mt-2 text-center">
          متبقي 7 مقاعد لاستقبال مشتركين جدد
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
