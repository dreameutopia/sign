import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? '欢迎回来' : '创建账户'}
        </h1>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? '还没有账户？注册' : '已有账户？登录'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;