/**
 * Fondo de pantalla según la temperatura actual.
 *
 * Mismos rangos y mismo orden que tenía MainMenu (el primero que se cumple gana):
 *   ≤ -5 °C          → low_temp_fatal
 *   -5 a 0 °C        → low_temp_non_fatal
 *   0 a 20 °C        → low_temp
 *   20 a 30 °C       → normal_temp
 *   30 a 36 °C       → hight_temp_non_fatal
 *   ≥ 36 °C          → hight_temp_fatal
 * Los nombres de categoría son las claves de dataJson/wallpaper.json.
 */
const RANGOS = [
  [(t) => t <= -5, 'low_temp_fatal'],
  [(t) => t < 0, 'low_temp_non_fatal'],
  [(t) => t <= 20, 'low_temp'],
  [(t) => t <= 30, 'normal_temp'],
  [(t) => t <= 36, 'hight_temp_non_fatal'],
  [() => true, 'hight_temp_fatal'],
]

/**
 * Categoría de fondo para una temperatura, o null si todavía no hay dato.
 * Antes, mientras no llegaba la temperatura, "" se tomaba como 0 y aparecía un fondo frío un instante.
 */
export const categoriaFondo = (temperatura) => {
  if (temperatura === '' || temperatura === null || temperatura === undefined) return null
  const t = Number(temperatura)
  if (!Number.isFinite(t)) return null
  return RANGOS.find(([cumple]) => cumple(t))[1]
}

/** Una imagen al azar de la categoría (aleatorio se puede reemplazar en las pruebas). */
export const elegirFondo = (categoria, catalogo, aleatorio = Math.random) => {
  const opciones = catalogo?.[categoria] ?? []
  return opciones.length ? opciones[Math.floor(aleatorio() * opciones.length)] : null
}
