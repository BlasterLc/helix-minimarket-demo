import { CONTACT } from '@/lib/demo-data'

export default function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-helix-green/5 to-transparent pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative">
        <h2 className="text-4xl font-bold text-helix-text mb-6">
          ¿Quieres algo así
          <br />
          <span className="text-helix-green">para tu negocio?</span>
        </h2>
        <p className="text-helix-muted text-lg mb-10">
          Conversemos. Cuéntanos tu operación y te mostramos cómo Helix puede transformarla.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-helix-green text-helix-bg font-bold text-base hover:bg-helix-green/90 transition-colors"
          >
            💬 Escribirnos por WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-helix-green/30 text-helix-green font-semibold text-base hover:bg-helix-green/10 transition-colors"
          >
            📧 Enviar email
          </a>
        </div>
      </div>
    </section>
  )
}
