const STEPS = [
  {
    number: '01',
    icon: '📸',
    title: 'Fotea la factura',
    desc: 'Mándale una foto de la factura a Helix por WhatsApp. El sistema lee todos los productos automáticamente y actualiza tu stock al instante.',
  },
  {
    number: '02',
    icon: '💬',
    title: 'Pregunta lo que necesitas',
    desc: '¿Cuánto tengo de leche? ¿Qué vendí esta semana? Escríbelo como le preguntarías a un empleado y Helix te responde al segundo.',
  },
  {
    number: '03',
    icon: '🔔',
    title: 'Recibe alertas automáticas',
    desc: 'Helix te avisa solo cuando un producto está por agotarse, cuando hay vencimientos o cuando tu capital está estancado.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-helix-bg">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          ¿Cómo funciona?
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-4">
          Sin apps nuevas. Todo por WhatsApp.
        </h2>
        <p className="text-helix-muted text-center mb-16 max-w-xl mx-auto">
          No necesitas aprender ninguna plataforma nueva. Helix vive donde ya estás.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.number} className="relative">
              <div className="text-helix-green/10 text-8xl font-bold absolute -top-6 -left-2 select-none leading-none">
                {s.number}
              </div>
              <div className="relative bg-helix-card border border-[#1e3a5f] rounded-2xl p-6 pt-8">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-helix-text font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-helix-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
