import { useEffect, useState } from "react";
import api from "../services/api";
import { Plus } from "lucide-react";
import Button from "../components/Button";
import FilterTabs from "../components/filter/FilterTabs";
const SubscribersTable = () => {
  // State
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // search
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  // Get trainees from Laravel

  useEffect(() => {
    const getTrainees = async () => {
      try {
        const response = await api.get("/coach/trainees", {
          params: {
            search: search,
          },
        });

        console.log("Trainees response:", response.data);

        setTrainees(response.data?.data ?? []);
      } catch (error) {
        console.error("Error loading trainees:", error);

        setError("حدث خطأ أثناء تحميل المتدربين");
      } finally {
        setLoading(false);
      }
    };

    getTrainees();
  }, [submittedSearch]);

  // Error
  if (error) {
    return (
      <div className="w-full bg-white rounded-2xl border border-red-100 p-8 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/*  Page Header*/}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">المشتركون</h1>

          <p className="text-sm text-gray-500 mt-1">
            إدارة المشتركين، متابعة البرنامج اليومي، ومراجعة الخطط التدريبية
            والغذائية.
          </p>
        </div>

        <Button
          title="إضافة خطة مشتركة"
          Icon={Plus}
          color="bg-green-700 text-white"
        />
      </div>

      {/* Search*/}
      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="بحث باسم المشترك أو بريده الإلكتروني..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-right focus:outline-none focus:border-emerald-500 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSubmittedSearch(search);
              }
            }}
          />
        </div>
        <div className="flex-1 flex md:justify-end   overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <FilterTabs />
        </div>
      </div>

      {/* =========================
          Table
      ========================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <table className="w-full text-right border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase">
              <th className="py-3 px-4">اسم المشترك</th>

              <th className="py-3 px-4">الهدف الرياضي</th>

              <th className="py-3 px-4">نسبة الالتزام</th>

              <th className="py-3 px-4">آخر نشاط</th>

              <th className="py-3 px-4">حالة الخطة</th>

              <th className="py-3 px-4 text-center">الإجراءات</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
            {/* Loading */}
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  جاري تحميل المتدربين...
                </td>
              </tr>
            ) : trainees.length === 0 ? (
              /* Empty */
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  لا يوجد متدربين حاليًا
                </td>
              </tr>
            ) : (
              /* Data */
              trainees.map((subscription) => {
                // بيانات المتدرب الموجودة داخل subscription
                const trainee = subscription.trainee ?? {};

                return (
                  <tr
                    key={subscription.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* =========================
                        Trainee
                    ========================= */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                          {trainee.full_name
                            ? trainee.full_name.charAt(0)
                            : "؟"}
                        </span>

                        {/* Name + Email */}
                        <div>
                          <div className="font-semibold text-gray-800">
                            {trainee.full_name ?? "غير معروف"}
                          </div>

                          <div className="text-xs text-gray-400">
                            {trainee.email ?? "لا يوجد بريد"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* =========================
                        Goal
                    ========================= */}
                    <td className="py-4 px-4">
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
                        {trainee.user_profile?.goal?.title ?? "غير محدد"}
                      </span>
                    </td>

                    {/* =========================
                        Progress
                    ========================= */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">غير متوفر</span>

                        <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gray-300"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* =========================
                        Last Activity
                    ========================= */}
                    <td className="py-4 px-4">
                      <span className="text-gray-400">غير متوفر</span>
                    </td>

                    {/* =========================
                        Subscription Status
                    ========================= */}
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          subscription.status === "accepted"
                            ? "bg-emerald-50 text-emerald-600"
                            : subscription.status === "pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {subscription.status === "accepted"
                          ? "نشطة"
                          : subscription.status === "pending"
                            ? "قيد الانتظار"
                            : "مرفوضة"}
                      </span>
                    </td>

                    {/* =========================
                        Actions
                    ========================= */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        className="text-gray-400 font-bold cursor-pointer hover:text-gray-700"
                      >
                        ...
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribersTable;
