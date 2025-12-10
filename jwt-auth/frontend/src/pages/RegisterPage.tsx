import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import { PasswordStrengthIndicator } from "../components/ui/PasswordStrengthIndicator";
import { UserPlus, Sparkles, ArrowRight, Shield, ArrowLeft } from "lucide-react";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, isRegistering } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const emailValue = watch("email");
  const nameValue = watch("name");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      navigate("/dashboard");
    } catch (error) {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative">
      <AnimatedBackground />
      
      <div className="w-full max-w-md scale-bounce">
        <Card glass hover={false} className="backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader className="text-center relative">
            {/* Back Button */}
            <Link 
              to="/" 
              className="absolute -top-2 -left-2 flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100/80 transition-all text-gray-700 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Trang chủ</span>
            </Link>
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg float-animation">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-4xl mb-2">
              Đăng Ký
            </CardTitle>
            <p className="text-gray-600 font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              Tạo tài khoản mới để bắt đầu
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="slide-in-left stagger-1">
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  value={emailValue || ""}
                  {...register("email")}
                />
              </div>

              <div className="slide-in-left stagger-2">
                <Input
                  label="Tên (Tùy chọn)"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  error={errors.name?.message}
                  value={nameValue || ""}
                  {...register("name")}
                />
              </div>

              <div className="slide-in-left stagger-3">
                <Input
                  label="Mật khẩu"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  value={passwordValue || ""}
                  {...register("password")}
                />
                {passwordValue && (
                  <div className="mt-4 p-4 bg-white/80 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-primary-600" />
                      <span className="text-sm font-bold text-gray-700">
                        Kiểm tra độ mạnh mật khẩu
                      </span>
                    </div>
                    <PasswordStrengthIndicator password={passwordValue} />
                  </div>
                )}
              </div>

              <div className="slide-in-left stagger-4">
                <Input
                  label="Xác nhận mật khẩu"
                  type="password"
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  value={confirmPasswordValue || ""}
                  success={!!confirmPasswordValue && confirmPasswordValue === passwordValue && !errors.confirmPassword}
                  {...register("confirmPassword")}
                />
              </div>

              <div className="slide-in-up stagger-5">
                <div className="flex items-start gap-2 text-xs text-gray-600 bg-primary-50 p-3 rounded-lg border border-primary-200">
                  <Shield className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <p>
                    Bằng việc đăng ký, bạn đồng ý với{" "}
                    <a href="#" className="text-primary-600 font-semibold hover:underline">
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-primary-600 font-semibold hover:underline">
                      Chính sách bảo mật
                    </a>{" "}
                    của chúng tôi.
                  </p>
                </div>
              </div>

              <div className="slide-in-up stagger-6">
                <Button 
                  type="submit" 
                  className="w-full group" 
                  isLoading={isRegistering}
                  size="lg"
                >
                  {!isRegistering && (
                    <>
                      <span>Tạo Tài Khoản</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 slide-in-up stagger-7">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-600 font-medium">
                    Hoặc
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm slide-in-up stagger-8">
              <span className="text-gray-600">Đã có tài khoản? </span>
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-bold hover:underline transition-all inline-flex items-center gap-1 group"
              >
                Đăng nhập
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl -z-10 float-animation"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl -z-10 float-animation" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
}