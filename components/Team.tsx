import { TEAM_MEMBERS } from '@/lib/demo-data'

export default function Team() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          El equipo
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-4">Helix</h2>
        <p className="text-helix-muted text-center mb-16 max-w-xl mx-auto">
          Un equipo pequeño y enfocado en construir tecnología que realmente funciona para negocios reales.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.name}
              className="flex flex-col items-center gap-4 bg-helix-card border border-[#1e3a5f] rounded-2xl p-8 w-52"
            >
              <div className="w-16 h-16 rounded-full bg-helix-green flex items-center justify-center text-helix-bg font-bold text-2xl">
                {m.initial}
              </div>
              <div className="text-center">
                <div className="text-helix-text font-semibold">{m.name}</div>
                <div className="text-helix-muted text-sm mt-1">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
