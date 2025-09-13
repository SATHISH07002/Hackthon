import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    clearError()
  }, [clearError])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      // Error is handled by the store
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-custom-dark via-custom-orange to-custom-coral">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-custom-cream/5 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,232,216,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-custom-cream/10 blur-xl"></div>
      <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-custom-cream/5 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-custom-cream/8 blur-lg"></div>
      
      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-custom-cream/10 border border-custom-cream/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-custom-cream/20 rounded-2xl mb-4 backdrop-blur-sm">
              <svg className="w-8 h-8 text-custom-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-custom-cream mb-2">Welcome to STRIKERS</h1>
            <p className="text-custom-cream/80 text-sm">Sign in to manage your inventory</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-custom-cream/90 mb-2">Email Address</label>
              <input 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                required 
                type="email" 
                className="w-full rounded-xl border border-custom-cream/20 bg-custom-cream/10 px-4 py-3 text-custom-cream placeholder-custom-cream/60 focus:border-custom-cream/40 focus:outline-none focus:ring-2 focus:ring-custom-cream/20 backdrop-blur-sm transition-all duration-200" 
                placeholder="admin@inventory.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-custom-cream/90 mb-2">Password</label>
              <input 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                required 
                type="password" 
                className="w-full rounded-xl border border-custom-cream/20 bg-custom-cream/10 px-4 py-3 text-custom-cream placeholder-custom-cream/60 focus:border-custom-cream/40 focus:outline-none focus:ring-2 focus:ring-custom-cream/20 backdrop-blur-sm transition-all duration-200" 
                placeholder="••••••••" 
              />
            </div>
            <button 
              disabled={loading} 
              className="w-full bg-custom-mustard/20 hover:bg-custom-mustard/30 text-custom-cream font-semibold py-3 px-4 rounded-xl border border-custom-mustard/30 hover:border-custom-mustard/40 focus:outline-none focus:ring-2 focus:ring-custom-mustard/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-custom-cream/70 text-sm">
              Don't have an account? 
              <Link to="/register" className="text-custom-cream hover:text-custom-cream/80 font-medium ml-1 transition-colors duration-200">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


