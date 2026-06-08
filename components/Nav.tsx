export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-helix-bg/80 backdrop-blur-sm border-b border-helix-green/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-helix-green flex items-center justify-center">
            <span className="text-helix-bg font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-helix-text text-lg">Helix Minimarket</span>
          <span className="text-helix-dim text-sm hidden sm:block">por Helix Team</span>
        </div>
        <a
          href="#demo"
          className="px-4 py-2 rounded-lg bg-helix-green text-helix-bg font-semibold text-sm hover:bg-helix-green/90 transition-colors"
        >
          Ver Demo
        </a>
      </div>
    </nav>
  )
}
