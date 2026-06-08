# Helix Demo Site — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un sitio demo interactivo de 9 secciones para Helix Team que muestra el sistema Helix (gestión de minimarket por WhatsApp con IA) a clientes potenciales no técnicos.

**Architecture:** Next.js 14 App Router, completamente estático (sin backend). Todos los datos demo viven en `lib/demo-data.ts` para facilitar la migración a v2 con backend real. Componentes con lógica del lado cliente (`ChatDemo`, `Dashboard`) usan `'use client'`. La animación del chat usa `useEffect` + `IntersectionObserver` para activarse al hacer scroll.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 3, Recharts 2, Node.js 24, desplegado en Vercel.

---

## Mapa de archivos

```
helix_levantar/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fuente Inter
│   ├── page.tsx            # Ensambla los 9 componentes de sección
│   └── globals.css         # Tailwind base + keyframe fadeInUp
├── components/
│   ├── Nav.tsx             # Barra de navegación fija
│   ├── Hero.tsx            # Hero con phone mockup estático
│   ├── Problem.tsx         # 3 pain points del dueño de minimarket
│   ├── HowItWorks.tsx      # 3 pasos de uso (sin tecnicismos)
│   ├── ChatDemo.tsx        # ★ Chat WhatsApp animado ('use client')
│   ├── Dashboard.tsx       # Panel de métricas + gráfico Recharts ('use client')
│   ├── Features.tsx        # 5 cards "Lo que hace por ti"
│   ├── Team.tsx            # 3 tarjetas de equipo con avatares
│   └── CTA.tsx             # Llamada a acción final con botones contacto
├── lib/
│   └── demo-data.ts        # Todos los datos configurables (equipo, métricas, chat)
├── __tests__/
│   └── demo-data.test.ts   # Verifica estructura de datos demo
├── tailwind.config.ts      # Tokens de color Helix + keyframes
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Task 1: Scaffolding del proyecto Next.js

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Inicializar Next.js en el directorio actual**

```bash
cd /home/blaster/helix_levantar
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

Cuando pregunte si continuar en directorio no vacío, responder `y`. Cuando pregunte sobre Turbopack responder `No` (más estable para producción).

Expected: Archivos creados, `node_modules/` instalado.

- [ ] **Step 2: Instalar Recharts**

```bash
npm install recharts
```

Expected: `recharts` aparece en `package.json` dependencies.

- [ ] **Step 3: Verificar que el proyecto arranca**

```bash
npm run dev
```

Expected: Consola muestra `Local: http://localhost:3000`. Abrir URL y ver la página de bienvenida de Next.js.

- [ ] **Step 4: Limpiar archivos boilerplate**

Eliminar el contenido por defecto de `app/page.tsx` y reemplazar con:

```tsx
export default function Home() {
  return <main className="bg-[#0a1628] min-h-screen" />
}
```

Eliminar el contenido de `app/globals.css` excepto las directivas de Tailwind:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 5: Verificar pantalla en negro**

Con `npm run dev` corriendo, el browser debe mostrar fondo negro (#0a1628). Sin errores en consola.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs .eslintrc.json .gitignore
git commit -m "feat: inicializar proyecto Next.js 14 con Tailwind y Recharts"
```

---

## Task 2: Tailwind config + tokens de color + animaciones

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Configurar tokens de color y animaciones en tailwind.config.ts**

Reemplazar el contenido completo de `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'helix-bg':    '#0a1628',
        'helix-bg2':   '#112240',
        'helix-card':  '#0d1b2a',
        'helix-green': '#00d084',
        'helix-text':  '#f1f5f9',
        'helix-muted': '#94a3b8',
        'helix-dim':   '#64748b',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.35s ease forwards',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Agregar estilos base en globals.css**

Reemplazar `app/globals.css` completo:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: #0a1628;
    color: #f1f5f9;
  }
}
```

- [ ] **Step 3: Probar que los tokens funcionan**

En `app/page.tsx`, agregar un elemento de prueba temporal:

```tsx
export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen flex items-center justify-center">
      <h1 className="text-helix-green text-4xl font-bold">Helix</h1>
    </main>
  )
}
```

Expected: Texto "Helix" en verde #00d084 sobre fondo oscuro en `localhost:3000`.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css app/page.tsx
git commit -m "feat: configurar tokens de color Helix y animaciones Tailwind"
```

---

## Task 3: Demo data — lib/demo-data.ts

**Files:**
- Create: `lib/demo-data.ts`
- Create: `__tests__/demo-data.test.ts`

- [ ] **Step 1: Escribir el test primero**

Crear `__tests__/demo-data.test.ts`:

```typescript
import { TEAM_MEMBERS, DASHBOARD_METRICS, WEEKLY_SALES, CHAT_MESSAGES, type ChatMessage } from '@/lib/demo-data'

describe('demo-data', () => {
  test('TEAM_MEMBERS tiene 3 entradas con campos requeridos', () => {
    expect(TEAM_MEMBERS).toHaveLength(3)
    TEAM_MEMBERS.forEach((m) => {
      expect(typeof m.initial).toBe('string')
      expect(typeof m.name).toBe('string')
      expect(typeof m.role).toBe('string')
    })
  })

  test('CHAT_MESSAGES tiene 6 mensajes con ids consecutivos', () => {
    expect(CHAT_MESSAGES).toHaveLength(6)
    CHAT_MESSAGES.forEach((msg, i) => {
      expect(msg.id).toBe(i + 1)
      expect(msg.delay).toBeGreaterThan(0)
      expect(['in', 'out', 'alert']).toContain(msg.type)
    })
  })

  test('CHAT_MESSAGES delays están en orden creciente', () => {
    for (let i = 1; i < CHAT_MESSAGES.length; i++) {
      expect(CHAT_MESSAGES[i].delay).toBeGreaterThan(CHAT_MESSAGES[i - 1].delay)
    }
  })

  test('WEEKLY_SALES tiene exactamente 7 días con montos positivos', () => {
    expect(WEEKLY_SALES).toHaveLength(7)
    WEEKLY_SALES.forEach((d) => {
      expect(typeof d.day).toBe('string')
      expect(d.amount).toBeGreaterThan(0)
    })
  })

  test('DASHBOARD_METRICS tiene los campos esperados', () => {
    expect(typeof DASHBOARD_METRICS.salesDay).toBe('string')
    expect(typeof DASHBOARD_METRICS.stockBreaks).toBe('number')
    expect(typeof DASHBOARD_METRICS.inventoryCapital).toBe('string')
    expect(typeof DASHBOARD_METRICS.ebit).toBe('string')
  })
})
```

- [ ] **Step 2: Instalar Jest y dependencias de testing**

```bash
npm install -D jest @types/jest jest-environment-jsdom ts-node
```

- [ ] **Step 3: Crear jest.config.ts** (si no existe ya)

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment:  'node',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
}

export default createJestConfig(config)
```

- [ ] **Step 4: Ejecutar el test para ver que falla**

```bash
npx jest __tests__/demo-data.test.ts
```

Expected: FAIL — "Cannot find module '@/lib/demo-data'"

- [ ] **Step 3: Crear lib/demo-data.ts**

```typescript
// ⚠️  Actualizar TEAM_MEMBERS con nombres y roles reales del equipo
export const TEAM_MEMBERS = [
  { initial: 'M', name: 'Matías',  role: 'Desarrollo & Arquitectura' },
  { initial: 'F', name: 'Felipe',  role: 'Automatización & IA' },
  { initial: 'C', name: 'Camila',  role: 'Comercial & Estrategia' },
]

// ⚠️  Actualizar con contacto real antes de publicar
export const CONTACT = {
  whatsapp: '+56900000000',
  email:    'contacto@helixteam.cl',
}

export const DASHBOARD_METRICS = {
  salesDay:          '$847.500',
  stockBreaks:       3,
  inventoryCapital:  '$2.340.000',
  ebit:              '$312.000',
}

export const WEEKLY_SALES = [
  { day: 'Lun', amount: 620000 },
  { day: 'Mar', amount: 785000 },
  { day: 'Mié', amount: 590000 },
  { day: 'Jue', amount: 910000 },
  { day: 'Vie', amount: 847500 },
  { day: 'Sáb', amount: 1120000 },
  { day: 'Dom', amount: 430000 },
]

export type ChatMessage = {
  id:       number
  type:     'out' | 'in' | 'alert'
  text:     string
  isImage?: boolean
  time:     string
  delay:    number
}

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: 1, type: 'out', isImage: true, text: 'factura_sodexo.jpg',                                                                                                          time: '10:42', delay: 400  },
  { id: 2, type: 'in',                 text: 'Procesando tu factura... 🔍',                                                                                                 time: '10:42', delay: 1600 },
  { id: 3, type: 'in',                 text: '✅ Factura registrada\n\nDetecté 12 productos nuevos:\n• Leche Larga Vida 1L — 24 un.\n• Arroz Grado 1 — 10 kg\n• Aceite Vegetal 900ml — 6 un.\n\n+ 9 más. Stock actualizado 🟢', time: '10:42', delay: 2800 },
  { id: 4, type: 'out',                text: '¿Cuánta leche larga vida me queda en total?',                                                                                  time: '10:45', delay: 4600 },
  { id: 5, type: 'in',                 text: '📦 Leche Larga Vida 1L\n\nStock actual: 38 unidades\nÚltimo ingreso: hace 3 min\n\n⚠️ Rotación alta — sugerido pedir en 4 días', time: '10:45', delay: 5600 },
  { id: 6, type: 'alert',              text: '🔔 Alerta automática\n\nAceite Vegetal 900ml — solo 2 unidades.\nNivel crítico de stock.',                                      time: '18:00', delay: 7400 },
]
```

- [ ] **Step 4: Configurar Jest para el proyecto**

Verificar que `package.json` tiene el script de test. Si no, agregar en `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

Y crear `jest.config.ts` si no existe:

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'node',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
}

export default createJestConfig(config)
```

- [ ] **Step 5: Ejecutar el test para ver que pasa**

```bash
npx jest __tests__/demo-data.test.ts
```

Expected: PASS — 5 tests passed.

- [ ] **Step 6: Commit**

```bash
git add lib/demo-data.ts __tests__/demo-data.test.ts jest.config.ts package.json package-lock.json
git commit -m "feat: agregar datos demo, jest config y tests de estructura"
```

---

## Task 4: Nav + layout.tsx

**Files:**
- Create: `components/Nav.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Crear components/Nav.tsx**

```tsx
export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-helix-bg/80 backdrop-blur-sm border-b border-helix-green/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-helix-green flex items-center justify-center">
            <span className="text-helix-bg font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-helix-text text-lg">Helix</span>
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
```

- [ ] **Step 2: Actualizar app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Helix — Gestión inteligente de minimarket con IA',
  description: 'Automatiza tu minimarket con inteligencia artificial desde WhatsApp. Sin apps nuevas. Por Helix Team.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Agregar Nav a page.tsx y verificar**

```tsx
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
    </main>
  )
}
```

Expected: Barra de navegación fija en el top con logo "H" verde, texto "Helix", y botón "Ver Demo".

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/layout.tsx app/page.tsx
git commit -m "feat: agregar Nav y configurar layout raíz"
```

---

## Task 5: Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Crear components/Hero.tsx**

```tsx
export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
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
        {/* Phone mockup */}
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
      {/* Notch */}
      <div className="h-8 bg-[#0b141a] flex justify-center items-end pb-1">
        <div className="w-16 h-1 bg-[#1e3a5f] rounded-full" />
      </div>
      {/* WA header */}
      <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-helix-green flex items-center justify-center text-helix-bg font-bold text-sm flex-shrink-0">H</div>
        <div>
          <div className="text-helix-text text-sm font-semibold">Helix Minimarket 🤖</div>
          <div className="text-helix-green text-xs">● en línea</div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 p-3 flex flex-col gap-2 bg-[#0b141a]">
        <div className="self-end bg-[#005c4b] text-helix-text text-xs px-3 py-2 rounded-lg rounded-br-sm max-w-[78%]">
          ¿Qué productos están por vencer?
          <div className="text-[10px] text-[#8696a0] text-right mt-1">14:30 ✓✓</div>
        </div>
        <div className="self-start bg-[#202c33] text-helix-text text-xs px-3 py-2 rounded-lg rounded-bl-sm max-w-[85%]">
          <span className="text-helix-green text-[10px] font-bold">IA </span>
          🕐 Por vencer esta semana:
          <br />• Yogur 200g — 3 días
          <br />• Pan Molde — 2 días
          <br />• Leche fresca 1L — 4 días
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
```

- [ ] **Step 2: Agregar Hero a page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verificar en browser**

Expected: Hero con headline "Automatiza tu minimarket con IA" a la izquierda, phone mockup con mensajes de WhatsApp a la derecha. En mobile los elementos se apilan (columna).

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: agregar sección Hero con phone mockup"
```

---

## Task 6: Problem + HowItWorks

**Files:**
- Create: `components/Problem.tsx`
- Create: `components/HowItWorks.tsx`

- [ ] **Step 1: Crear components/Problem.tsx**

```tsx
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
```

- [ ] **Step 2: Crear components/HowItWorks.tsx**

```tsx
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
    <section className="py-24 px-6">
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
```

- [ ] **Step 3: Agregar a page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
    </main>
  )
}
```

- [ ] **Step 4: Verificar en browser**

Expected: Scroll hacia abajo muestra sección de fondo azul más claro con 3 cards de problemas, luego sección oscura con 3 pasos numerados (01, 02, 03) en transparente de fondo.

- [ ] **Step 5: Commit**

```bash
git add components/Problem.tsx components/HowItWorks.tsx app/page.tsx
git commit -m "feat: agregar secciones Problem y HowItWorks"
```

---

## Task 7: ChatDemo — el corazón del demo

**Files:**
- Create: `components/ChatDemo.tsx`

- [ ] **Step 1: Crear components/ChatDemo.tsx**

```tsx
'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { CHAT_MESSAGES, type ChatMessage } from '@/lib/demo-data'

export default function ChatDemo() {
  const [visibleIds, setVisibleIds] = useState<number[]>([])
  const [playing, setPlaying]       = useState(false)
  const sectionRef                  = useRef<HTMLElement>(null)
  const timersRef                   = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const play = useCallback(() => {
    clearTimers()
    setVisibleIds([])
    setPlaying(true)
    CHAT_MESSAGES.forEach((msg) => {
      const t = setTimeout(() => {
        setVisibleIds((prev) => [...prev, msg.id])
      }, msg.delay)
      timersRef.current.push(t)
    })
    const lastDelay = CHAT_MESSAGES[CHAT_MESSAGES.length - 1].delay
    const done = setTimeout(() => setPlaying(false), lastDelay + 600)
    timersRef.current.push(done)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [play])

  return (
    <section id="demo" ref={sectionRef} className="py-24 px-6 bg-helix-bg2">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          Demo en vivo
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-4">
          Así se ve Helix en acción
        </h2>
        <p className="text-helix-muted text-center mb-12 max-w-xl mx-auto">
          Una conversación real: el dueño registra una factura y consulta su stock, todo desde WhatsApp.
        </p>
        <div className="flex flex-col items-center gap-6">
          {/* Teléfono */}
          <div className="w-[320px] bg-[#0b141a] rounded-[32px] border-4 border-[#1e3a5f] shadow-2xl overflow-hidden">
            <div className="h-7 bg-[#0b141a] flex justify-center items-end pb-1">
              <div className="w-14 h-1 bg-[#1e3a5f] rounded-full" />
            </div>
            {/* WA header */}
            <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-helix-green flex items-center justify-center text-helix-bg font-bold text-sm flex-shrink-0">
                H
              </div>
              <div>
                <div className="text-helix-text text-sm font-semibold">Helix Minimarket 🤖</div>
                <div className="text-helix-green text-xs">● en línea</div>
              </div>
            </div>
            {/* Chat */}
            <div className="p-3 flex flex-col gap-2 bg-[#0b141a] min-h-[440px]">
              <div className="text-center text-[#8696a0] text-[10px] py-1">hoy</div>
              {CHAT_MESSAGES.map((msg) =>
                visibleIds.includes(msg.id) ? <Bubble key={msg.id} msg={msg} /> : null
              )}
            </div>
          </div>
          {/* Botón replay */}
          <button
            onClick={play}
            disabled={playing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-helix-green/30 text-helix-green text-sm font-semibold hover:bg-helix-green/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {playing ? '⏳ Reproduciendo...' : '▶ Reproducir de nuevo'}
          </button>
        </div>
      </div>
    </section>
  )
}

function Bubble({ msg }: { msg: ChatMessage }) {
  if (msg.isImage) {
    return (
      <div className="self-end animate-fade-in-up">
        <div className="bg-[#005c4b] rounded-xl rounded-br-sm p-1.5">
          <div className="w-[180px] h-[90px] bg-[#1a3a2a] rounded-lg flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">🧾</span>
            <span className="text-helix-green text-[10px]">{msg.text}</span>
          </div>
          <div className="text-[10px] text-[#8696a0] text-right px-1 pt-1">{msg.time} ✓✓</div>
        </div>
      </div>
    )
  }
  if (msg.type === 'out') {
    return (
      <div className="self-end animate-fade-in-up max-w-[78%]">
        <div className="bg-[#005c4b] text-helix-text text-xs px-3 py-2 rounded-xl rounded-br-sm whitespace-pre-line">
          {msg.text}
          <div className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time} ✓✓</div>
        </div>
      </div>
    )
  }
  if (msg.type === 'alert') {
    return (
      <div className="self-start animate-fade-in-up max-w-[85%]">
        <div className="bg-[#202c33] border-l-2 border-amber-400 text-helix-text text-xs px-3 py-2 rounded-xl rounded-bl-sm whitespace-pre-line">
          {msg.text}
          <div className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time}</div>
        </div>
      </div>
    )
  }
  // type === 'in'
  return (
    <div className="self-start animate-fade-in-up max-w-[85%]">
      <div className="bg-[#202c33] text-helix-text text-xs px-3 py-2 rounded-xl rounded-bl-sm whitespace-pre-line">
        <span className="text-helix-green text-[10px] font-bold">IA </span>
        {msg.text}
        <div className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Agregar ChatDemo a page.tsx**

```tsx
import Nav        from '@/components/Nav'
import Hero       from '@/components/Hero'
import Problem    from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import ChatDemo   from '@/components/ChatDemo'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <ChatDemo />
    </main>
  )
}
```

- [ ] **Step 3: Verificar la animación**

Hacer scroll hasta la sección "Demo en vivo". Expected:
- Los mensajes aparecen uno por uno con fade-in-up
- Primero la foto de factura, luego el procesamiento, luego el stock actualizado, luego la consulta de leche, la respuesta y la alerta
- El botón dice "⏳ Reproduciendo..." mientras se ejecuta
- Botón "▶ Reproducir de nuevo" funciona al hacer clic

- [ ] **Step 4: Commit**

```bash
git add components/ChatDemo.tsx app/page.tsx
git commit -m "feat: agregar demo interactivo de chat WhatsApp con animación"
```

---

## Task 8: Dashboard con gráfico Recharts

**Files:**
- Create: `components/Dashboard.tsx`

- [ ] **Step 1: Crear components/Dashboard.tsx**

```tsx
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { DASHBOARD_METRICS, WEEKLY_SALES } from '@/lib/demo-data'

const METRICS = [
  { label: 'Ventas del día',       value: DASHBOARD_METRICS.salesDay,         icon: '💰', trend: '+12% vs ayer',   warn: false },
  { label: 'Quiebres de stock',    value: String(DASHBOARD_METRICS.stockBreaks), icon: '⚠️', trend: 'productos',     warn: true  },
  { label: 'Capital inventario',   value: DASHBOARD_METRICS.inventoryCapital,  icon: '📦', trend: 'en bodega',      warn: false },
  { label: 'Resultado del mes',    value: DASHBOARD_METRICS.ebit,              icon: '📊', trend: 'EBIT acumulado', warn: false },
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
          {/* Header del panel */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-helix-green flex items-center justify-center">
                <span className="text-helix-bg font-bold text-sm">H</span>
              </div>
              <span className="text-helix-text font-semibold">Helix Dashboard</span>
            </div>
            <span className="text-helix-dim text-xs">Sábado 7 Jun · 18:43</span>
          </div>
          {/* Métricas */}
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
          {/* Gráfico */}
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
```

- [ ] **Step 2: Agregar Dashboard a page.tsx**

```tsx
import Nav        from '@/components/Nav'
import Hero       from '@/components/Hero'
import Problem    from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import ChatDemo   from '@/components/ChatDemo'
import Dashboard  from '@/components/Dashboard'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <ChatDemo />
      <Dashboard />
    </main>
  )
}
```

- [ ] **Step 3: Verificar gráfico**

Expected: Panel con 4 métricas (ventas, quiebres en naranja, capital, EBIT) y gráfico de barras verdes con datos de la semana. Tooltip muestra precio en CLP al hover.

- [ ] **Step 4: Commit**

```bash
git add components/Dashboard.tsx app/page.tsx
git commit -m "feat: agregar dashboard de métricas con gráfico Recharts"
```

---

## Task 9: Features + Team + CTA + ensamblado final

**Files:**
- Create: `components/Features.tsx`
- Create: `components/Team.tsx`
- Create: `components/CTA.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Crear components/Features.tsx**

```tsx
const FEATURES = [
  { icon: '🧾', title: 'Registra tus facturas solo con una foto',   desc: 'Manda la foto y Helix detecta todos los productos automáticamente. Tu stock se actualiza solo.' },
  { icon: '💬', title: 'Responde tus preguntas de stock al instante', desc: 'Escribe tu consulta en WhatsApp como le preguntarías a un empleado. Respuesta en segundos.' },
  { icon: '🔔', title: 'Te avisa antes de quedarte sin producto',    desc: 'Alertas automáticas de quiebre de stock, productos por vencer y baja rotación.' },
  { icon: '📉', title: 'Controla tus mermas y productos dañados',   desc: 'Registra mermas desde el chat y mantén tu inventario exacto sin planillas.' },
  { icon: '📊', title: 'Ve tus números en tiempo real',             desc: 'Ventas, capital, resultado del mes. Todo en un panel claro y siempre actualizado.' },
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
```

- [ ] **Step 2: Crear components/Team.tsx**

```tsx
import { TEAM_MEMBERS } from '@/lib/demo-data'

export default function Team() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          El equipo
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-4">Helix Team</h2>
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
```

- [ ] **Step 3: Crear components/CTA.tsx**

```tsx
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
```

- [ ] **Step 4: Ensamblar app/page.tsx completo**

```tsx
import Nav        from '@/components/Nav'
import Hero       from '@/components/Hero'
import Problem    from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import ChatDemo   from '@/components/ChatDemo'
import Dashboard  from '@/components/Dashboard'
import Features   from '@/components/Features'
import Team       from '@/components/Team'
import CTA        from '@/components/CTA'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <ChatDemo />
      <Dashboard />
      <Features />
      <Team />
      <CTA />
    </main>
  )
}
```

- [ ] **Step 5: Scroll completo de verificación**

Hacer scroll desde top hasta el final. Verificar:
1. Nav fija y visible en todo momento
2. Hero: headline + phone mockup
3. Problem: 3 cards en fondo azul
4. HowItWorks: 3 pasos numerados
5. ChatDemo: animación se dispara al entrar en viewport
6. Dashboard: 4 métricas + gráfico de barras
7. Features: 5 cards en fondo azul
8. Team: 3 avatares con iniciales verdes
9. CTA: headline + 2 botones de contacto

- [ ] **Step 6: Commit**

```bash
git add components/Features.tsx components/Team.tsx components/CTA.tsx app/page.tsx
git commit -m "feat: agregar secciones Features, Team y CTA — página completa"
```

---

## Task 10: Datos reales del equipo + verificación mobile

**Files:**
- Modify: `lib/demo-data.ts`

- [ ] **Step 1: Actualizar TEAM_MEMBERS con nombres y contacto reales**

En `lib/demo-data.ts`, reemplazar los valores placeholder:

```typescript
// ⚠️  Reemplazar con nombres reales del equipo
export const TEAM_MEMBERS = [
  { initial: 'M', name: 'Matías R.', role: 'Desarrollo & Arquitectura' },
  { initial: 'X', name: 'Nombre 2',  role: 'Automatización & IA' },
  { initial: 'Y', name: 'Nombre 3',  role: 'Comercial & Estrategia' },
]

// ⚠️  Reemplazar con contacto real
export const CONTACT = {
  whatsapp: '+56900000000',
  email:    'contacto@helixteam.cl',
}
```

- [ ] **Step 2: Verificar mobile (320px)**

En DevTools del browser (F12), cambiar viewport a 375px (iPhone). Verificar:
- Nav: logo y botón visibles, "por Helix Team" se oculta correctamente
- Hero: teléfono se apila debajo del texto
- Problem, Features: columna única
- Team: tarjetas centradas
- CTA: botones en columna

Si alguna sección se rompe visualmente, ajustar las clases responsive necesarias.

- [ ] **Step 3: Ejecutar tests**

```bash
npx jest
```

Expected: PASS — todos los tests de demo-data pasan.

- [ ] **Step 4: Build de producción**

```bash
npm run build
```

Expected: Build completado sin errores. Ignorar advertencias de ESLint sobre `any` en Recharts si aparecen — son del tipo de la librería, no del código propio.

- [ ] **Step 5: Commit final**

```bash
git add lib/demo-data.ts
git commit -m "feat: actualizar datos reales del equipo y verificar build de producción"
```

---

## Task 11: Deploy a Vercel

- [ ] **Step 1: Crear cuenta en Vercel si no existe**

Ir a https://vercel.com y crear cuenta gratuita con GitHub.

- [ ] **Step 2: Push del repositorio a GitHub**

```bash
gh repo create helix-demo --public --source=. --remote=origin --push
```

Si no tienes `gh` CLI o prefieres hacerlo manual: crear repo en github.com y hacer push.

- [ ] **Step 3: Importar proyecto en Vercel**

En vercel.com → "Add New Project" → seleccionar el repo `helix-demo`. Vercel detecta Next.js automáticamente. Click "Deploy".

- [ ] **Step 4: Verificar URL de producción**

Expected: URL tipo `https://helix-demo-[hash].vercel.app` disponible. Verificar que el chat animado funciona en producción. Verificar en mobile real si es posible.

- [ ] **Step 5: (Opcional) Dominio personalizado**

En Vercel → Settings → Domains → agregar `helix-team.vercel.app` como alias si está disponible.

- [ ] **Step 6: Commit con URL del deploy**

```bash
git commit --allow-empty -m "deploy: sitio publicado en Vercel — listo para mostrar a Jocelyn"
```

---

## Notas para v2 (backend)

Cuando se implemente el backend real:
- Reemplazar `DASHBOARD_METRICS` y `WEEKLY_SALES` en `lib/demo-data.ts` por llamadas a API
- Reemplazar `CHAT_MESSAGES` por un WebSocket o polling real al sistema n8n
- El componente `Dashboard.tsx` ya está marcado como `'use client'` y listo para recibir props dinámicos
- `ChatDemo.tsx` puede ser refactorizado para recibir mensajes via props en lugar de importarlos

La separación de datos (`lib/demo-data.ts`) vs UI (components) fue diseñada exactamente para facilitar esta migración.
