/**
 * Ubicación aproximada del usuario para pedir el clima.
 *
 * La app no necesita la ubicación exacta: con unos kilómetros de precisión el clima es el mismo. Por eso:
 * - Se redondea a 2 decimales (~1 km). Así no se guarda ni se envía la ubicación exacta de nadie.
 * - Se recuerda en localStorage entre visitas: al abrir la app se pide el clima de inmediato con la
 *   última ubicación conocida, sin esperar al navegador, y la ubicación nueva se consulta en paralelo.
 * - Solo vale la pena volver a pedir el clima si la persona se movió más de DISTANCIA_MINIMA_KM.
 */
const CLAVE = 'ubicacionAproximada'

/** Distancia a partir de la cual el clima puede cambiar lo suficiente para volver a consultarlo. */
export const DISTANCIA_MINIMA_KM = 5

/** Cuánto puede tener la ubicación que el navegador ya tiene en memoria (1 hora). */
export const EDAD_MAXIMA_UBICACION_MS = 60 * 60 * 1000

const redondear = (valor) => Math.round(Number(valor) * 100) / 100

/** { lat, lon } redondeados a ~1 km. */
export const aproximar = (lat, lon) => ({ lat: redondear(lat), lon: redondear(lon) })

/** Última ubicación guardada, o null si no hay (o si el navegador bloquea localStorage). */
export const leerUbicacion = () => {
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE))
    return Number.isFinite(guardada?.lat) && Number.isFinite(guardada?.lon) ? guardada : null
  } catch {
    return null
  }
}

export const guardarUbicacion = (ubicacion) => {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(ubicacion))
  } catch {
    // Sin localStorage (navegación privada estricta) la app funciona igual, solo no recuerda
  }
}

/** Distancia en km entre dos puntos (fórmula del haversine). */
export const distanciaKm = (a, b) => {
  const rad = (g) => (g * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLon = rad(b.lon - a.lon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}
