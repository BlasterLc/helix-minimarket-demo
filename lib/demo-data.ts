export const TEAM_MEMBERS = [
  { initial: 'M', name: 'Matías',  role: 'Desarrollo & Arquitectura' },
  { initial: 'A', name: 'Augusto',  role: 'Automatización & IA' },
  { initial: 'V', name: 'Vicente',  role: 'Comercial & Estrategia' },
]


export const CONTACT = {
  whatsapp: '+569 1234 5678',
  email:    'helixcontacto@gmail.com',
}

export const DASHBOARD_METRICS = {
  salesDay:         '$847.500',
  stockBreaks:      3,
  inventoryCapital: '$2.340.000',
  ebit:             '$312.000',
}

export const WEEKLY_SALES = [
  { day: 'Lun', amount: 620000  },
  { day: 'Mar', amount: 785000  },
  { day: 'Mié', amount: 590000  },
  { day: 'Jue', amount: 910000  },
  { day: 'Vie', amount: 847500  },
  { day: 'Sáb', amount: 1120000 },
  { day: 'Dom', amount: 430000  },
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
  { id: 1, type: 'out', isImage: true, text: 'factura_sodexo.jpg',                                                                                                                                                              time: '10:42', delay: 400  },
  { id: 2, type: 'in',                 text: 'Procesando tu factura... 🔍',                                                                                                                                                     time: '10:42', delay: 1600 },
  { id: 3, type: 'in',                 text: '✅ Factura registrada\n\nDetecté 12 productos nuevos:\n• Leche Larga Vida 1L — 24 un.\n• Arroz Grado 1 — 10 kg\n• Aceite Vegetal 900ml — 6 un.\n\n+ 9 más. Stock actualizado 🟢', time: '10:42', delay: 2800 },
  { id: 4, type: 'out',                text: '¿Cuánta leche larga vida me queda en total?',                                                                                                                                     time: '10:45', delay: 4600 },
  { id: 5, type: 'in',                 text: '📦 Leche Larga Vida 1L\n\nStock actual: 38 unidades\nÚltimo ingreso: hace 3 min\n\n⚠️ Rotación alta — sugerido pedir en 4 días',                                                time: '10:45', delay: 5600 },
  { id: 6, type: 'alert',              text: '🔔 Alerta automática\n\nAceite Vegetal 900ml — solo 2 unidades.\nNivel crítico de stock.',                                                                                        time: '18:00', delay: 7400 },
]
