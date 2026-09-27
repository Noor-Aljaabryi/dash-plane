import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await api.get("/coach/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
        setError("حدث خطأ أثناء تحميل بيانات لوحة التحكم");
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-6">
          {/*  المكان اللي كل شوي رح نغيره  */}
          <Outlet
            context={{
              dashboardData,
              loading,
              error,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
