"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/register"
      const body = tab === "login"
        ? { email, password }
        : { email, password, name }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Errore")
        return
      }

      localStorage.setItem("trace_token", data.token)
      router.push("/account")
    } catch {
      setError("Errore di connessione")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-sm">
        {/* Tabs */}
        <div className="flex border-b border-[#1a1a1a] mb-8">
          <button
            onClick={() => { setTab("login"); setError("") }}
            className={`flex-1 pb-3 text-xs tracking-[0.2em] uppercase transition-colors ${
              tab === "login" ? "text-white border-b border-white" : "text-[#6b6558] hover:text-white"
            }`}
          >
            Accedi
          </button>
          <button
            onClick={() => { setTab("register"); setError("") }}
            className={`flex-1 pb-3 text-xs tracking-[0.2em] uppercase transition-colors ${
              tab === "register" ? "text-white border-b border-white" : "text-[#6b6558] hover:text-white"
            }`}
          >
            Registrati
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === "register" && (
            <div>
              <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030] transition-colors"
                placeholder="Il tuo nome"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030] transition-colors"
              placeholder="nome@email.com"
            />
          </div>

          <div>
            <label className="block text-xs text-[#6b6558] tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-[#0d0d0d] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#303030] transition-colors"
              placeholder="••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#a09a8a] transition-colors disabled:opacity-50"
          >
            {loading ? "..." : (tab === "login" ? "Accedi" : "Registrati")}
          </button>
        </form>
      </div>
    </div>
  )
}
