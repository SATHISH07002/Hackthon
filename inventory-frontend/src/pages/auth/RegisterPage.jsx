import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

export default function RegisterPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [storeName, setStoreName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // TODO: integrate API
    setTimeout(() => {
      login({ name: storeName, email }, 'demo-token')
      navigate('/')
    }, 600)
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
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-custom-cream/10 blur-xl"></div>
      <div className="absolute bottom-20 left-20 h-40 w-40 rounded-full bg-custom-cream/5 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-custom-cream/8 blur-lg"></div>
      
      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-custom-cream/10 border border-custom-cream/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-custom-cream/20 rounded-2xl mb-4 backdrop-blur-sm">
              <svg className="w-8 h-8 text-custom-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-custom-cream mb-2">Create Your Store</h1>
            <p className="text-custom-cream/80 text-sm">Register to start tracking inventory</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-custom-cream/90 mb-2">Store Name</label>
              <input 
                value={storeName} 
                onChange={(e)=>setStoreName(e.target.value)} 
                required 
                className="w-full rounded-xl border border-custom-cream/20 bg-custom-cream/10 px-4 py-3 text-custom-cream placeholder-custom-cream/60 focus:border-custom-cream/40 focus:outline-none focus:ring-2 focus:ring-custom-cream/20 backdrop-blur-sm transition-all duration-200" 
                placeholder="STRIKERS Store" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-custom-cream/90 mb-2">Email Address</label>
              <input 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                required 
                type="email" 
                className="w-full rounded-xl border border-custom-cream/20 bg-custom-cream/10 px-4 py-3 text-custom-cream placeholder-custom-cream/60 focus:border-custom-cream/40 focus:outline-none focus:ring-2 focus:ring-custom-cream/20 backdrop-blur-sm transition-all duration-200" 
                placeholder="you@strikers.com" 
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
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-custom-cream/70 text-sm">
              Already have an account? 
              <Link to="/login" className="text-custom-cream hover:text-custom-cream/80 font-medium ml-1 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


