# Helix Minimarket Demo

Sitio demo interactivo que muestra el sistema Helix: gestión inteligente de minimarket operada desde WhatsApp con inteligencia artificial.

🔗 **Demo en vivo:** https://helix-minimarket.vercel.app

---

## ¿Qué es esto?

Helix es un sistema que permite al dueño de un minimarket gestionar su negocio completo desde WhatsApp, sin aprender ninguna app nueva:

- 📸 **Registro de facturas por foto** — manda una foto y el sistema detecta los productos automáticamente
- 💬 **Consultas en lenguaje natural** — pregunta "¿cuánta leche me queda?" y responde al instante
- 🔔 **Alertas automáticas** — quiebres de stock, productos por vencer, baja rotación
- 📉 **Control de mermas** — registro de productos dañados o vencidos desde el chat
- 📊 **Panel de métricas** — ventas, capital en inventario y resultado del mes en tiempo real

Este repositorio contiene el sitio demo estático (v1). Los datos son de ejemplo — la v2 conectará con el backend real.

---

## Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS** — tokens de diseño personalizados
- **Recharts** — gráfico de ventas semanales
- **Vercel** — deploy y hosting

---

## Correr localmente

```bash
git clone https://github.com/BlasterLc/helix-minimarket-demo.git
cd helix-minimarket-demo
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Estructura

```
├── app/                  # Layout y página principal
├── components/           # Secciones del sitio
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── HowItWorks.tsx
│   ├── ChatDemo.tsx      # Chat animado (cliente)
│   ├── Dashboard.tsx     # Panel de métricas (cliente)
│   ├── Features.tsx
│   ├── Team.tsx
│   └── CTA.tsx
└── lib/
    └── demo-data.ts      # Datos configurables del demo
```

---

## Deploy

El sitio se despliega automáticamente en Vercel al hacer push a `main`.

Para deployar en tu propia cuenta:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BlasterLc/helix-minimarket-demo)

---

## Equipo

**Helix Team** — Matías, Augusto y Vicente

Construimos tecnología que funciona para negocios reales.
