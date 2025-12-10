import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import { 
  LogOut, 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Activity,
  TrendingUp,
  Zap,
  Bell,
  Settings,
  ChevronDown,
} from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Mock stats for demonstration
  const stats = [
    {
      title: "Tổng hoạt động",
      value: "2,543",
      change: "+12.5%",
      icon: Activity,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Hiệu suất",
      value: "98.5%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Điểm năng lượng",
      value: "847",
      change: "+8.1%",
      icon: Zap,
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Bảo mật",
      value: "100%",
      change: "Excellent",
      icon: Shield,
      color: "from-primary-500 to-primary-700",
      bgColor: "bg-primary-50",
      textColor: "text-primary-600",
    },
  ];

  const recentActivities = [
    { action: "Đăng nhập thành công", time: "2 phút trước", icon: "🔐" },
    { action: "Cập nhật hồ sơ", time: "1 giờ trước", icon: "👤" },
    { action: "Thay đổi mật khẩu", time: "2 ngày trước", icon: "🔑" },
    { action: "Kích hoạt 2FA", time: "1 tuần trước", icon: "✅" },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-white/30 shadow-lg slide-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-600">Quản lý tài khoản của bạn</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-white/50 rounded-xl transition-all hover:scale-110 active:scale-95">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse-glow"></span>
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-white/50 rounded-xl transition-all hover:scale-110 active:scale-95">
                <Settings className="w-5 h-5 text-gray-700" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-white/50 rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="hidden sm:block font-semibold text-gray-900">
                    {user?.name || "User"}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 glass rounded-xl shadow-2xl border border-white/30 overflow-hidden scale-bounce">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-bold text-gray-900">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start rounded-none hover:bg-red-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng Xuất
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 slide-in-up">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
            Xin chào, {user?.name || "User"}! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            Chào mừng bạn quay trở lại dashboard. Đây là tổng quan về tài khoản của bạn.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`slide-in-up stagger-${index + 1}`}
            >
              <Card hover className="group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <span className={`text-sm font-bold ${stat.textColor} px-2 py-1 ${stat.bgColor} rounded-full`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-2 slide-in-left">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Tài Khoản</CardTitle>
                <CardDescription>
                  Chi tiết về tài khoản và thông tin cá nhân
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all hover:scale-105">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Email</p>
                      <p className="font-bold text-gray-900 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all hover:scale-105">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide">User ID</p>
                      <p className="font-bold text-gray-900 font-mono text-sm">{user?.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all hover:scale-105">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Ngày tạo</p>
                      <p className="font-bold text-gray-900">
                        {new Date(user?.createdAt || "").toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 hover:shadow-lg transition-all hover:scale-105">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-primary-600 font-semibold uppercase tracking-wide">Bảo mật</p>
                      <p className="font-bold text-gray-900">Xuất sắc ✨</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 rounded-xl">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    🔐 Bảo Mật JWT
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✅</span>
                      <span><strong>Access Token</strong> được lưu trong memory (bảo vệ khỏi XSS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✅</span>
                      <span><strong>Refresh Token</strong> được lưu trong HTTP-only cookie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✅</span>
                      <span>Tự động refresh token khi hết hạn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✅</span>
                      <span>Protected routes chỉ cho phép user đã đăng nhập</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="slide-in-right">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt Động Gần Đây</CardTitle>
                <CardDescription>
                  Lịch sử hoạt động của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all hover:scale-105 cursor-pointer slide-in-right stagger-${index + 1}`}
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Xem tất cả
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}