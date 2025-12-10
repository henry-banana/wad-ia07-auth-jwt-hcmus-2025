import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import { Shield, Lock, Key, ArrowRight, CheckCircle2 } from "lucide-react";

export function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Lock,
      title: "Bảo Mật Tối Đa",
      description: "Access Token trong memory, Refresh Token trong HTTP-only cookies",
      color: "from-blue-500 to-blue-700",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      icon: Key,
      title: "Auto Refresh",
      description: "Tự động refresh token khi hết hạn, không bị gián đoạn",
      color: "from-green-500 to-green-700",
      bgColor: "from-green-50 to-green-100",
    },
    {
      icon: Shield,
      title: "Protected Routes",
      description: "Chỉ user đã xác thực mới truy cập được các trang bảo mật",
      color: "from-primary-500 to-primary-700",
      bgColor: "from-primary-50 to-primary-100",
    },
  ];

  const benefits = [
    "Bảo vệ khỏi XSS và CSRF attacks",
    "Performance cao với token caching",
    "Type-safe với TypeScript",
    "Responsive design, mobile-first",
    "UI/UX hiện đại với animations",
    "Form validation với Zod",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 py-20">
        <div className="max-w-4xl w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center slide-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl mb-8 shadow-2xl float-animation">
              <Shield className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-primary-600 to-primary-700 bg-clip-text text-transparent">
              JWT Authentication
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Secure, modern authentication với React + JWT
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-up stagger-5">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto group min-w-[200px]">
                  <span>Vào Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto group min-w-[200px]">
                    <span>Đăng Nhập</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                    Đăng Ký Ngay
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`slide-in-up stagger-${index + 1}`}
              >
                <div className={`p-6 glass border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="slide-in-up stagger-4">
            <div className="glass border-white/30 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Tính Năng Nổi Bật
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-all hover:scale-105 slide-in-left stagger-${index + 1}`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-600 text-sm">
            © 2025 JWT Authentication. Tống Dương Thái Hòa - 23120262
          </footer>
        </div>
      </div>
    </div>
  );
}