import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Login.css"; // CSS 파일을 불러옵니다.

const Login = ({ setName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([
    { username: "kypl", password: "1234" }, // 기본 사용자 추가
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      setName(user.username);
    } else {
      alert("아이디나 비밀번호가 잘못되었습니다.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (users.some((user) => user.username === username)) {
      alert("이미 사용 중인 아이디입니다.");
    } else {
      setUsers([...users, { username, password }]);
      alert("회원가입이 완료되었습니다!");
      setIsRegistering(false); // 등록 완료 후 로그인 화면으로 돌아가기
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName("");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-animated">
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              안녕하세요, {username}님!
            </h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 mt-10 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <FaUserCircle className="text-6xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {isRegistering ? "회원가입" : "로그인"}
            </h2>
            <form
              onSubmit={isRegistering ? handleRegister : handleLogin}
              className="mt-8 space-y-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
              >
                {isRegistering ? "회원가입" : "로그인"}
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-blue-500 hover:underline"
              >
                {isRegistering
                  ? "이미 계정이 있으신가요? 로그인"
                  : "계정이 없으신가요? 회원가입"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
