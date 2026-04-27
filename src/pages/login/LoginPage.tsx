import LoginForm from "../../features/auth/LoginForm";
import LoginHeader from "../../features/auth/LoginHeader";

export default function LoginPage() {
  return (
    <div
      className="flex min-h-screen w-full flex-col"
      style={{
        background:
          "linear-gradient(160deg, rgb(232,245,238) 0%, rgb(248,255,249) 40%, rgb(255,255,255) 100%)",
      }}
    >
      <LoginHeader />
      <LoginForm />
    </div>
  );
}
