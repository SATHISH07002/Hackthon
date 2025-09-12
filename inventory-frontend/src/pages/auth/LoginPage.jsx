import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // TODO: integrate API
    setTimeout(() => {
      login({ name: 'Store Owner', email }, 'demo-token')
      navigate('/')
    }, 600)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="card w-full max-w-md p-8">
        <h1 className="mb-2 text-center text-2xl font-semibold text-gray-800">Welcome back</h1>
        <p className="mb-6 text-center text-sm text-gray-600">Sign in to manage your inventory</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-700">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="you@store.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="••••••••" />
          </div>
          <button disabled={loading} className="btn-primary w-full">{loading? 'Signing in...' : 'Sign in'}</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">Don’t have an account? <Link to="/register" className="text-primary-600 hover:underline">Create one</Link></p>
      </div>
    </div>
  )
}


