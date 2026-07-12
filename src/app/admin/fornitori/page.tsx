"use client"

import { useState, useEffect } from "react"
import { getUsers } from "@/lib/db"

export default function AdminFornitori() {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("trace_token")
    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        const users = Array.isArray(data) ? data : []
        setSuppliers(users.filter((u: any) => u.role === "supplier"))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-[#6b6558] text-xs tracking-wider uppercase">Caricamento...</div>

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-white mb-8">Fornitori</h1>

      <div className="trace-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a1a1a]">
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Nome</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Email</th>
              <th className="text-left p-3 text-[#6b6558] text-xs tracking-wider uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s: any) => (
              <tr key={s.id} className="border-b border-[#0a0a0a]">
                <td className="p-3 text-white">{s.name}</td>
                <td className="p-3 text-[#8a8578] text-xs">{s.email}</td>
                <td className="p-3">
                  <span className={`text-xs tracking-wider uppercase ${s.approved ? "text-green-400" : "text-[#6b6558]"}`}>
                    {s.approved ? "Approvato" : "In attesa"}
                  </span>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-[#6b6558]">Nessun fornitore ancora.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
