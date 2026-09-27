 HEAD
import { useState, useMemo } from "react";
import { X, Search, Info, Plus, Check, UtensilsCrossed } from "lucide-react";

const FOOD_ITEMS = [
  {
    id: "chicken",
    name: "صدر دجاج مشوي متبل",
    portion: "100 جرام",
    category: "بروتينات",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  {
    id: "salmon",
    name: "شريحة سمك سلمون طازج في الفرن",
    portion: "100 جرام",
    category: "بروتينات",
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 13,
  },
  {
    id: "eggs",
    name: "بيض بلدي مسلوق كامل (حبتين)",
    portion: "100جم تقريبًا",
    category: "بروتينات",
    calories: 144,
    protein: 12.6,
    carbs: 0.8,
    fat: 9.8,
  },
  {
    id: "yogurt",
    name: "زبادي يوناني طبيعي خالي الدسم",
    portion: "170 جرام",
    category: "ألبان وبروتينات",
    calories: 110,
    protein: 18,
    carbs: 6,
    fat: 0.4,
  },
  {
    id: "oats",
    name: "شوفان الحبة الكاملة مع القرفة",
    portion: "40 جرام جاف",
    category: "كربوهيدرات",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 2.5,
  },
  {
    id: "rice",
    name: "أرز بسمتي أبيض مطبوخ على البخار",
    portion: "100 جرام مطبوخ",
    category: "كربوهيدرات",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
  },
];

const FILTERS = [
  "الكل",
  "بروتينات",
  "كربوهيدرات",
  "دهون وبروتينات",
  "ألبان وبروتينات",
  "مكملات وبروتينات",
  "خضار وألياف",
];

function FoodRow({ item, added, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex flex-1 flex-col items-start gap-1.5 text-right">
        <p className="text-[15px] font-semibold text-gray-800">
          {item.name}{" "}
          <span className="font-normal text-gray-400">({item.portion})</span>
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
          <span className="font-bold text-gray-700">سعرة {item.calories}</span>
          <span className="text-gray-700">
            بروتين: <span className="font-medium">{item.protein} جم</span>
          </span>
          <span className="text-orange-500">
            كارب: <span className="font-medium">{item.carbs} جم</span>
          </span>
          <span className="text-emerald-600">
            دهون: <span className="font-medium">{item.fat} جم</span>
          </span>
        </div>
      </div>

      <button
        onClick={() => onToggle(item.id)}
        className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
          added
            ? "bg-white text-emerald-600 ring-1 ring-inset ring-emerald-500"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {added ? <Check size={16} /> : <Plus size={16} />}
        {added ? "أُضيفت" : "إضافة للوجبة"}
      </button>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [added, setAdded] = useState({});

  const toggleAdded = (id) =>
    setAdded((prev) => ({ ...prev, [id]: !prev[id] }));

  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      const matchesFilter =
        activeFilter === "الكل" || item.category === activeFilter;
      const matchesQuery = item.name.includes(query.trim());
      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter]);

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-gray-900/40 p-4 font-sans"
    >
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between px-6 pt-5">
          <div className="flex items-start gap-2 text-right">
            <div>
              <h2 className="flex items-center justify-start gap-2 text-lg font-bold text-gray-900">
                <UtensilsCrossed size={18} className="text-gray-500" />
                مكتبة الأغذية والوجبات
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                إضافة عنصر غذائي، أو وجبة إلى: <span className="font-semibold text-gray-700">الإفطار</span>
              </p>
            </div>
          </div>
          <button className="mt-1 text-gray-400 transition-colors hover:text-gray-600">
            <X size={22} />
          </button>
        </div>

        <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-800 ring-1 ring-inset ring-amber-200">
          <Info size={16} className="shrink-0 text-amber-500" />
          <span>
            تنبيه قيود المشترك (أحمد الشمري): حساسية من المأكولات البحرية
          </span>
        </div>

        <div className="mx-6 mt-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم الطعام (دجاج، سلمون، شوفان، زبادي...)"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-10 pl-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-right"
            />
          </div>
        </div>

        <div className="mx-6 mt-4 flex flex-wrap gap-2 justify-start flex-row">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-3 flex-1 overflow-y-auto px-6 pb-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <FoodRow
                key={item.id}
                item={item}
                added={!!added[item.id]}
                onToggle={toggleAdded}
              />
            ))
          ) : (
            <p className="py-10 text-center text-sm text-gray-400">
              لا توجد نتائج مطابقة لبحثك
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubscribersTable from "./pages/SubscribersTable";
import SubscribersRequset from "./pages/SubscribersRequset";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            Login
        ========================= */}
        <Route path="/" element={<Login />} />

        {/* =========================
            Dashboard
        ========================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          {/* /dashboard */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* /dashboard/subscribers */}
          <Route
            path="subscribers"
            element={<SubscribersTable />}
          />

          {/* /dashboard/subscribers-request */}
          <Route
            path="subscribers-request"
            element={<SubscribersRequset />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}


