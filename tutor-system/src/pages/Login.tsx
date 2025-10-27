import { useState } from "react";
import { login } from "../Authentic/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";

export function Login(){
  const navigate = useNavigate();

  // state để lưu email và password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // xử lý khi nhấn nút login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = login(email, password);
    if (user) {
      navigate(`/${user.role}/dashboard`);
    } else {
      setError("Sai email hoặc mật khẩu!");
    }
  };

  return(
    <>
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
        >
          <h1 className="mb-4 text-center text-2xl font-semibold">Đăng nhập</h1>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>
      </div>
    </>
  )
}