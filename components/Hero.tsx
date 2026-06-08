export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-helix-green/30 bg-helix-green/10 text-helix-green text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-helix-green animate-pulse" />
            Helix Team
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-helix-text leading-tight mb-6">
            Automatiza tu minimarket
            <br />
            <span className="text-helix-green">con IA</span>
          </h1>
          <p className="text-helix-muted text-lg leading-relaxed mb-8">
            Gestiona tu stock, registra facturas y recibe alertas automáticas
            — todo desde WhatsApp, sin aprender nada nuevo.
          </p>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-helix-green text-helix-bg font-bold text-base hover:bg-helix-green/90 transition-colors"
          >
            Ver cómo funciona →
          </a>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}

function PhoneMockup() {
  return (
    <div className="w-[260px] h-[500px] bg-[#0b141a] rounded-[36px] border-4 border-[#1e3a5f] shadow-2xl overflow-hidden flex flex-col">
      <div className="h-8 bg-[#0b141a] flex justify-center items-end pb-1">
        <div className="w-16 h-1 bg-[#1e3a5f] rounded-full" />
      </div>
      <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-helix-green flex items-center justify-center text-helix-bg font-bold text-sm flex-shrink-0">H</div>
        <div>
          <div className="text-helix-text text-sm font-semibold">Helix Minimarket 🤖</div>
          <div className="text-helix-green text-xs">● en línea</div>
        </div>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2 bg-[#0b141a]">
        <div className="self-end bg-[#005c4b] text-helix-text text-xs px-3 py-2 rounded-lg rounded-br-sm max-w-[78%]">
          ¿Qué productos están por vencer?
          <div className="text-[10px] text-[#8696a0] text-right mt-1">14:30 ✓✓</div>
        </div>
        <div className="self-start bg-[#202c33] text-helix-text text-xs px-3 py-2 rounded-lg rounded-bl-sm max-w-[85%]">
          <span className="text-helix-green text-[10px] font-bold">IA </span>
          🕐 Por vencer esta semana:<br/>• Yogur 200g — 3 días<br/>• Pan Molde — 2 días<br/>• Leche fresca 1L — 4 días
          <div className="text-[10px] text-[#8696a0] text-right mt-1">14:30</div>
        </div>
        <div className="self-start bg-[#202c33] border-l-2 border-amber-400 text-helix-text text-xs px-3 py-2 rounded-lg rounded-bl-sm max-w-[85%] mt-1">
          🔔 <span className="font-semibold">Alerta:</span> Stock crítico en Aceite Vegetal
          <div className="text-[10px] text-[#8696a0] text-right mt-1">18:00</div>
        </div>
      </div>
    </div>
  )
}
