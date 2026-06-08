'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { DASHBOARD_METRICS, WEEKLY_SALES } from '@/lib/demo-data'

const METRICS = [
  { label: 'Ventas del día',     value: DASHBOARD_METRICS.salesDay,              icon: '💰', trend: '+12% vs ayer',   warn: false },
  { label: 'Quiebres de stock',  value: String(DASHBOARD_METRICS.stockBreaks),    icon: '⚠️', trend: 'productos',     warn: true  },
  { label: 'Capital inventario', value: DASHBOARD_METRICS.inventoryCapital,       icon: '📦', trend: 'en bodega',     warn: false },
  { label: 'Resultado del mes',  value: DASHBOARD_METRICS.ebit,                  icon: '📊', trend: 'EBIT acumulado', warn: false },
]

export default function Dashboard() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          Panel de control
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-4">
          Tus números, siempre visibles
        </h2>
        <p className="text-helix-muted text-center mb-16 max-w-xl mx-auto">
          Un resumen de todo lo que pasa en tu negocio, actualizado en tiempo real.
        </p>
        <div className="bg-helix-card border border-[#1e3a5f] rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-helix-green flex items-center justify-center">
                <span className="text-helix-bg font-bold text-sm">H</span>
              </div>
              <span className="text-helix-text font-semibold">Helix Dashboard</span>
            </div>
            <span className="text-helix-dim text-xs">Sábado 7 Jun · 18:43</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className={`rounded-xl p-4 border ${
                  m.warn
                    ? 'border-amber-400/30 bg-amber-400/5'
                    : 'border-[#1e3a5f] bg-helix-bg'
                }`}
              >
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className={`text-xl font-bold ${m.warn ? 'text-amber-400' : 'text-helix-green'}`}>
                  {m.value}
                </div>
                <div className="text-helix-dim text-xs mt-1">{m.label}</div>
                <div className="text-helix-muted text-[10px] mt-0.5">{m.trend}</div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-helix-dim text-sm mb-4">Ventas semanales (CLP)</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={WEEKLY_SALES} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#112240',
                    border: '1px solid #1e3a5f',
                    borderRadius: 8,
                    color: '#f1f5f9',
                    fontSize: 12,
                  }}
                  formatter={(v) => [`$${(v as number).toLocaleString('es-CL')}`, 'Ventas']}
                  cursor={{ fill: 'rgba(0,208,132,0.05)' }}
                />
                <Bar dataKey="amount" fill="#00d084" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
