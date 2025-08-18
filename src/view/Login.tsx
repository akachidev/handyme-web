import AuthLayout from "@/components/layouts/AuthLayout";
import LoginScreen from "@/components/auth/Login";

const Login = () => {
  return (
    <AuthLayout allowAnimation>
      <LoginScreen />
    </AuthLayout>
  );
};

export default Login;
