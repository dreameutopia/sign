'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import confetti from 'canvas-confetti'
import { Loader2, Mail, Lock, User, Send, Eye, EyeOff } from 'lucide-react'

export default function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine)
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
      // 模拟成功登录/注册
      launchConfetti()
    }, 2000)
  }

  const handleSendVerificationCode = () => {
    setIsSendingCode(true)
    // 模拟发送验证码
    setTimeout(() => {
      setIsSendingCode(false)
    }, 2000)
  }

  const launchConfetti = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // 从左边发射彩带
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0, 0.3), y: Math.random() - 0.2 } 
      }))
      
      // 从右边发射彩带
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 1), y: Math.random() - 0.2 } 
      }))
    }, 250)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-[20rem] font-bold opacity-10 select-none">
            Welcome
          </div>
        </div>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="relative">
        <Card className="w-[400px] absolute top-4 left-4 h-full bg-white/5 -z-10 transform rotate-3 backdrop-blur-sm" />
        <Card className="w-[400px] relative z-10 shadow-xl bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
          <CardHeader>
            <div className="flex justify-center items-center space-x-2 cursor-pointer" onClick={launchConfetti}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <CardTitle 
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              >
                DreamEutopia
              </CardTitle>
            </div>
            <CardDescription className="text-center text-gray-600">请输入您的邮箱以登录或创建账户</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" className="text-sm">登录</TabsTrigger>
                <TabsTrigger value="register" className="text-sm">注册</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">邮箱</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input id="login-email" type="email" placeholder="请输入您的邮箱" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-8 bg-white/50" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input 
                          id="login-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="请输入您的密码" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          className="pl-8 pr-10 bg-white/50" 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        请稍候
                      </>
                    ) : (
                      '登录'
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="register-email" className="text-sm font-medium text-gray-700">邮箱</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input id="register-email" type="email" placeholder="请输入您的邮箱" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-8 bg-white/50" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="verification-code" className="text-sm font-medium text-gray-700">验证码</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-grow">
                          <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                          <Input id="verification-code" type="text" placeholder="请输入验证码" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="pl-8 bg-white/50" />
                        </div>
                        <Button type="button" variant="outline" onClick={handleSendVerificationCode} disabled={isSendingCode} className="bg-white/50 hover:bg-white">
                          {isSendingCode ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="register-password" className="text-sm font-medium text-gray-700">密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input 
                          id="register-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="请创建密码" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          className="pl-8 pr-10 bg-white/50" 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        请稍候
                      </>
                    ) : (
                      '注册'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-gray-500">
              注册即表示您同意我们的{' '}
              <a href="#" className="underline hover:text-gray-700">服务条款</a> 和{' '}
              <a href="#" className="underline hover:text-gray-700">隐私政策</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}