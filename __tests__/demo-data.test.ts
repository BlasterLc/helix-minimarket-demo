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
