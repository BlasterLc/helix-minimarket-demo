const PROBLEMS = [
  {
    icon: '📋',
    title: 'Inventario siempre desactualizado',
    desc: 'Cada factura que llega significa horas de trabajo manual. El stock real nunca coincide con lo que tienes anotado.',
  },
  {
    icon: '📉',
    title: 'No sabes qué productos te dan más plata',
    desc: 'Sin datos claros, es difícil decidir qué pedir más, qué promover y qué dejar de vender.',
  },
  {
    icon: '🧾',
    title: 'Las facturas se acumulan sin registrar',
    desc: 'Llevarlas al sistema toma tiempo que no tienes. Al final del mes ya no recuerdas qué entró y cuándo.',
  },
]

export default function Problem() {
  return (
    <section className="py-24 px-6 bg-helix-bg2">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          El problema
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-4">
          Llevar un minimarket no debería ser tan difícil
        </h2>
        <p className="text-helix-muted text-center mb-16 max-w-xl mx-auto">
          Si reconoces alguno de estos dolores, Helix fue construido exactamente para ti.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="bg-helix-card border border-[#1e3a5f] rounded-2xl p-6">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-helix-text font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-helix-muted text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
