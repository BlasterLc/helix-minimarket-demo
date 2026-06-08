const FEATURES = [
  { icon: '🧾', title: 'Registra tus facturas solo con una foto',    desc: 'Manda la foto y Helix detecta todos los productos automáticamente. Tu stock se actualiza solo.' },
  { icon: '💬', title: 'Responde tus preguntas de stock al instante', desc: 'Escribe tu consulta en WhatsApp como le preguntarías a un empleado. Respuesta en segundos.' },
  { icon: '🔔', title: 'Te avisa antes de quedarte sin producto',     desc: 'Alertas automáticas de quiebre de stock, productos por vencer y baja rotación.' },
  { icon: '📉', title: 'Controla tus mermas y productos dañados',    desc: 'Registra mermas desde el chat y mantén tu inventario exacto sin planillas.' },
  { icon: '📊', title: 'Ve tus números en tiempo real',              desc: 'Ventas, capital, resultado del mes. Todo en un panel claro y siempre actualizado.' },
]

export default function Features() {
  return (
    <section className="py-24 px-6 bg-helix-bg2">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          Lo que hace por ti
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-16">
          Todo lo que necesitas para<br />gestionar bien tu negocio
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-helix-card border border-[#1e3a5f] rounded-2xl p-6 hover:border-helix-green/30 transition-colors"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-helix-text font-semibold mb-2">{f.title}</h3>
              <p className="text-helix-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
