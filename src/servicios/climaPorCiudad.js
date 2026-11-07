/**
 * El clima por ciudad se pide al backend, que es quien guarda la llave de WeatherAPI:
 * lo que usa el navegador termina dentro del JavaScript público.
 * REACT_APP_BACKEND_URL permite apuntar a un backend local (http://localhost:4000).
 */
const BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://clima-app-server.vercel.app'

export const urlClimaPorCiudad = (ciudad) =>
  `${BACKEND}/api/v1/wheater/city?q=${encodeURIComponent(ciudad)}`
