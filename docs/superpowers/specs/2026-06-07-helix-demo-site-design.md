# Helix Demo Site — Diseño

**Fecha:** 2026-06-07  
**Proyecto:** helix_levantar  
**Objetivo:** Demo interactivo de credibilidad para mostrar a Jocelyn (cliente potencial de proyecto externo) la calidad de trabajo del Helix Team. No es una landing page de venta — es "mira lo que ya construimos".

---

## Contexto

El Helix Team (2 informáticos + 1 comercial) construyó un sistema de gestión de minimarket operado por WhatsApp con IA. El sistema tiene 10 workflows de n8n encadenados. Necesitan mostrárselo a Jocelyn, quien los está evaluando para un proyecto distinto. La audiencia no es técnica — es un dueño de minimarket o un ejecutivo de negocios.

---

## Lo que se construyó (base del demo)

El sistema Helix permite al dueño de un minimarket gestionar todo desde WhatsApp:
- **Ingreso de facturas por foto**: manda una foto de la factura, el sistema extrae los productos con IA (Gemini) y actualiza el inventario automáticamente.
- **Consultas en lenguaje natural**: pregunta "¿cuánta leche me queda?" y el AI Agent consulta la base de datos y responde.
- **Registro de mermas**: reporta productos dañados o vencidos desde el chat.
- **Alertas automáticas programadas**: quiebres de stock, productos por vencer, baja rotación, capital estancado, inflación de proveedores.
- **Análisis financiero**: EBIT y métricas de caja on-demand desde WhatsApp.
- **Memoria conversacional**: el sistema recuerda el contexto de la conversación.

---

## Decisiones de diseño

| Decisión | Elección | Razón |
|---|---|---|
| Tipo de sitio | Demo interactivo | El cliente ve el sistema "viviendo", no solo lee sobre él |
| Estilo visual | Dark Green Premium (#0a1628 + #00d084) | Impacto tech + evoca dinero/crecimiento, estilo Vercel/Linear |
| Lenguaje | Sin tecnicismos | Audiencia = dueños de negocio, no desarrolladores |
| Stack tecnológico | No se muestra | Irrelevante para la audiencia objetivo |
| Equipo | Avatares con iniciales | No hay fotos disponibles |
| Nombre equipo | Helix Team | |

---

## Estructura de la página (9 secciones)

### 01 — NAV
- Logo "H" verde + texto "Helix" + "Helix Team"
- Botón CTA "Ver Demo" que hace scroll a la sección del chat

### 02 — HERO ★
- Headline: **"Automatiza tu minimarket con IA"**
- Subtítulo orientado al beneficio del negocio (sin mención de tecnología)
- Mockup de teléfono mostrando un mensaje de WhatsApp
- Estilo: texto grande a la izquierda, teléfono a la derecha

### 03 — EL PROBLEMA
- 3 pain points reales del dueño de minimarket:
  1. "El inventario siempre está desactualizado"
  2. "No sé qué productos me están dando más plata"
  3. "Las facturas se acumulan y llevarlas al sistema me quita tiempo"
- Layout: 3 cards con ícono + texto corto

### 04 — ¿CÓMO FUNCIONA?
- 3 pasos simples, sin jerga técnica:
  1. 📸 **Fotea la factura** → el sistema la lee y actualiza el stock solo
  2. 💬 **Pregunta lo que necesitas** → responde al instante en WhatsApp
  3. 🔔 **Recibe alertas automáticas** → te avisa antes de quedarte sin stock
- Énfasis: "Sin apps nuevas. Todo por WhatsApp."

### 05 — DEMO: CHAT WHATSAPP ★ (el centro del demo)
Chat animado que se reproduce automáticamente (y con botón "▶ Reproducir"). Flujo:
1. Dueño envía foto de factura (`factura_sodexo.jpg`)
2. Sistema: "Procesando tu factura... 🔍"
3. Sistema: "✅ Factura registrada. Detecté 12 productos. Stock actualizado."
4. Dueño: "¿Cuánta leche larga vida me queda en total?"
5. Sistema responde con stock exacto + sugerencia de reposición
6. (Separado en el tiempo) Alerta automática nocturna de stock crítico

Mockup visual: teléfono Android con interfaz WhatsApp auténtica (fondo #0b141a, burbujas verde y gris).

### 06 — DASHBOARD DE MÉTRICAS
Mockup del panel de control con datos demo realistas:
- Ventas del día: $847.500
- Productos con quiebre de stock: 3
- Capital en inventario: $2.340.000
- Resultado del mes (EBIT): $312.000
- Mini gráfico de ventas semanales

### 07 — LO QUE HACE POR TI
5 cards en lenguaje de usuario:
1. 🧾 "Registra tus facturas solo con una foto"
2. 💬 "Responde tus preguntas de stock al instante"
3. 🔔 "Te avisa antes de quedarte sin producto"
4. 📉 "Controla tus mermas y productos dañados"
5. 📊 "Ve tus números en tiempo real"

### 08 — EL EQUIPO — Helix Team
3 tarjetas con:
- Avatar circular con inicial (color #00d084)
- Nombre
- Rol (ej: "Desarrollo", "Automatización & IA", "Comercial & Estrategia")

### 09 — CTA FINAL
- Headline: "¿Quieres algo así para tu negocio?"
- Botón de contacto (WhatsApp o email)
- Fondo con efecto sutil de gradiente verde

---

## Stack para construir el demo

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Animaciones**: CSS keyframes + Intersection Observer para activar al hacer scroll
- **Gráficos dashboard**: Recharts o Chart.js (ligero)
- **Deploy**: Vercel (gratis, dominio `helix-team.vercel.app` o similar)

---

## Criterios de éxito

- Jocelyn puede entender qué hace Helix en menos de 2 minutos de scroll
- El chat animado se reproduce solo y muestra la consulta de stock real
- No hay ningún término técnico visible (sin "n8n", "Supabase", "PostgreSQL", etc.)
- El sitio carga rápido y se ve bien en móvil

---

## Fuera de alcance (v1)

- Backend real conectado — todos los datos son demo/estáticos
- Login o autenticación
- Integración real con WhatsApp
- Internacionalización (solo español)

## Fase futura (v2)

- Backend simple (Node.js + Supabase) para conectar datos reales al dashboard
- Chat de WhatsApp funcional para pruebas en vivo con clientes
- El diseño actual debe facilitar esta migración: componentes de datos separados de la UI
