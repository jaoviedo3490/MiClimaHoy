/**
 * Países y ciudades para la localización personalizada.
 *
 * Los datos están en public/datos/ (los genera scripts/dividir-paises-ciudades.js) y se piden con fetch
 * solo cuando se necesitan: la lista de países al abrir el selector y las ciudades de un país cuando se
 * escoge. Antes se importaba un JSON de 28 MB con todo el mundo dentro del JavaScript de la app.
 *
 * Cada archivo se descarga una sola vez: las respuestas quedan en memoria mientras la página esté abierta.
 */
const BASE = `${process.env.PUBLIC_URL}/datos`

let paises = null
const ciudadesPorPais = new Map()

const pedirJson = async (url) => {
  const respuesta = await fetch(url)
  if (!respuesta.ok) throw new Error(`No se pudo cargar ${url} (HTTP ${respuesta.status})`)
  return respuesta.json()
}

/** [{ id, name }] ordenados por nombre. */
export const obtenerPaises = () => {
  // Si falla se olvida la promesa, para poder reintentar al volver a abrir el selector
  paises ??= pedirJson(`${BASE}/paises.json`).catch((error) => {
    paises = null
    throw error
  })
  return paises
}

/** Ciudades del país con la forma que usa el selector: [{ value, latitude, longitude }]. */
export const obtenerCiudades = (idPais) => {
  if (!ciudadesPorPais.has(idPais)) {
    const promesa = pedirJson(`${BASE}/ciudades/${idPais}.json`)
      .then((ciudades) =>
        ciudades.map((c) => ({ value: c.name, latitude: c.latitude, longitude: c.longitude })),
      )
      .catch((error) => {
        ciudadesPorPais.delete(idPais)
        throw error
      })
    ciudadesPorPais.set(idPais, promesa)
  }
  return ciudadesPorPais.get(idPais)
}
