import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MapPin,
  BotMessageSquare,
  Utensils,
  Coffee,
  Hotel,
  Clock,
  Wallet,
  Plane,
  UserRound,
  Calendar,
  MessageSquare,
  Bot,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  ChevronRight,
  TrendingUp,
  Globe,
  Star,
  Menu,
  X,
  Compass,
  Moon,
  Sun,
  Pencil,
  Trash2,
  CheckCircle2,
  MoreVertical,
  Map,
  NotebookPen
} from "lucide-react";
import Loading from "../../components/Loading";
import CustomerRegChatbot from "../Chatbot/CustomerRegChatbot";
import TravelRecommChatbot from "../Chatbot/TravelRecommChatbot";
import TripPlannerChatbot from "../Chatbot/TripPlannerChatbot";
import { useTranslation } from "react-i18next";

const CustomerRegisterChatbot = () => (
  <CustomerRegChatbot />
);
const TravelModeRecomChatbot = () => (
  <TravelRecommChatbot />
);

const TravelPlanChatbot = () => (
  <TripPlannerChatbot />
);

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetch("https://finalprojectbackend-five.vercel.app/api/Customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: t("sidebar.home") },
    { id: "customer", icon: UserRound, label: t("sidebar.customeList") },
    { id: "trips", icon: Plane, label: t("sidebar.travelRecommendations") },
    { id: "chatbot", icon: NotebookPen, label: t("sidebar.customerRegister") },
    { id: "tripplanner", icon: BotMessageSquare, label: t("sidebar.supportBuddy") },
    { id: "settings", icon: Settings, label: t("sidebar.settings") },
  ];

  const stats = [
    {
      label: "Total Trips",
      value: "12",
      icon: Plane,
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      label: "Countries",
      value: "8",
      icon: Globe,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Planned",
      value: "3",
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Reviews",
      value: "24",
      icon: Star,
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  const upcomingTrips = [
    {
      destination: "Galle Fort, Sri Lanka",
      date: "Oct 15 - Oct 22",
      status: "Upcoming",
      image: "pic4.jpeg",
    },
    {
      destination: "Nine Arches Bridge, Sri Lanka",
      date: "Nov 02 - Nov 09",
      status: "Planning",
      image: "pic2.jpeg",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      case "Planning":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      default:
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
    }
  }

  const handleEditClick = (customer) => {
    setEditingCustomer(customer)
    setEditFormData({ ...customer })
    setShowEditModal(true)
  }

  const handleDeleteClick = (customerId) => {
    setShowDeleteModal(customerId)
  }

  const handleStatusClick = (customerId) => {
    setShowStatusModal(customerId)
  }

  const handleUpdateCustomer = () => {
    setCustomers(customers.map((c) => (c.id === editFormData.id ? editFormData : c)))
    setShowEditModal(false)
    setEditingCustomer(null)
  }

  const handleDeleteCustomer = () => {
    setCustomers(customers.filter((c) => c.id !== showDeleteModal))
    setShowDeleteModal(null)
  }

  const handleStatusChange = (newStatus) => {
    setCustomers(customers.map((c) => (c.id === showStatusModal ? { ...c, status: newStatus } : c)))
    setShowStatusModal(null)
  }


  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex overflow-hidden font-sans transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 dark:bg-blue-600 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400 dark:bg-emerald-600 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                Guide Buddy
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-slate-900/5 dark:bg-white/10 text-cyan-600 dark:text-cyan-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] dark:shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{t("logout")}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen relative z-10">
        {/* Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 rounded-lg"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1 pl-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <span className="text-sm font-medium hidden sm:block">
                  Alex Johnson
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center border border-white/20">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-white/5 text-sm transition-colors text-slate-700 dark:text-slate-200">
                    My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-white/5 text-sm transition-colors text-slate-700 dark:text-slate-200">
                    Subscription
                  </button>
                  <hr className="my-1 border-slate-100 dark:border-white/5" />
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-white/5 text-sm text-rose-500 dark:text-rose-400 transition-colors">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Welcome back, Alex!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Where are we heading next?
                  </p>
                </div>
                
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 backdrop-blur-sm group hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-2 rounded-xl bg-slate-50 dark:bg-white/5 ${stat.color}`}
                      >
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {stat.value}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Trips */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                      <Plane className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                      Upcoming Journeys
                    </h3>
                    <button className="text-cyan-600 dark:text-cyan-400 text-sm hover:underline">
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {upcomingTrips.map((trip, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group cursor-pointer shadow-sm dark:shadow-none"
                      >
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.destination}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-white/10"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {trip.destination}
                          </h4>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {trip.date}
                          </p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
                          {trip.status}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-slate-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick AI Help */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 dark:from-cyan-600/20 dark:to-blue-600/20 border border-cyan-500/20 dark:border-cyan-400/20 backdrop-blur-md relative overflow-hidden group shadow-sm dark:shadow-none">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MessageSquare className="w-24 h-24 text-slate-900 dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    Need Inspiration?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                    Ask our Travel AI for the best spots, budget tips, or custom
                    itineraries for your next adventure.
                  </p>
                  <button
                    onClick={() => setActiveTab("chatbot")}
                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-cyan-50 transition-colors"
                  >
                    Start Chatting
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customer" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Customers
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Manage your travel clients and their profiles.
                  </p>
                </div>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-95">
                  Add New Customer
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                  <Loading
                    className="col-span-full flex items-center justify-center min-h-[50vh]"
                    text="Fetching customers..."
                  />
                ) : customers.length === 0 ? (
                  <p className="col-span-full text-center text-slate-500 dark:text-slate-400">
                    No customers found.
                  </p>
                ) : (
                  customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="group bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-none relative"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10 flex items-center justify-center border border-slate-200 dark:border-white/10">
                            <UserRound className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {customer.name.toUpperCase()}
                            </h4>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusStyle(
                                customer.status
                              )}`}
                            >
                              {customer.status}
                            </span>
                          </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-2 mb-6 pl-4.5">
                        {/* Age / Profile */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <MessageSquare
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.age}
                          </span>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <MapPin
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.address}
                          </span>
                        </div>

                        {/* Foods */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <Utensils
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.foods}
                          </span>
                        </div>

                        {/* Beverages */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <Coffee
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.beverages}
                          </span>
                        </div>

                        {/* Hotels */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <Hotel
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.hotels}
                          </span>
                        </div>

                        {/* Mode of Travel */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <Plane
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.mode_of_travel}
                          </span>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <Clock
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.duration}
                          </span>
                        </div>

                        {/* Budget */}
                        <div className="flex items-center gap-4 text-sm text-white">
                          <Wallet
                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-medium tracking-wide">
                            {customer.budget}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-white/5 pt-4">
                            <button
                        onClick={() => handleEditClick(customer)}
                        title="Edit"
                        className="flex items-center justify-center p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-500/20"
                      >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          title="Delete"
                          className="flex items-center justify-center p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          title="Mark as Complete"
                          className="flex items-center justify-center p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/20"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "chatbot" && (
            <div className="h-full animate-in zoom-in-95 duration-300">
              <CustomerRegisterChatbot />
            </div>
          )}
           {activeTab === "trips" && (
            <div className="h-full animate-in zoom-in-95 duration-300">
             <TravelModeRecomChatbot />
            </div>
          )}
               {activeTab === "tripplanner" && (
            <div className="h-full animate-in zoom-in-95 duration-300">
            <TripPlannerChatbot />
            </div>
          )}

          {activeTab !== "dashboard" &&
            activeTab !== "chatbot" &&
            activeTab !== "customer" &&
            activeTab !== "trips" &&
            activeTab !== "tripplanner" && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/10">
                  <Settings className="w-10 h-10 text-slate-400 dark:text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
                  {activeTab} section
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  This section is currently under development. Check back soon
                  for more exciting travel features!
                </p>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
                >
                  Return to Overview
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Home;
