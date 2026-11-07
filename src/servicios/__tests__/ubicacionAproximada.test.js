import {
  aproximar,
  distanciaKm,
  guardarUbicacion,
  leerUbicacion,
  DISTANCIA_MINIMA_KM,
} from '../ubicacionAproximada'

describe('aproximar', () => {
  it('redondea a 2 decimales (~1 km) para no guardar ni enviar la ubicación exacta', () => {
    expect(aproximar(3.451647, -76.532013)).toEqual({ lat: 3.45, lon: -76.53 })
  })
})

describe('distanciaKm', () => {
  const caliCentro = { lat: 3.45, lon: -76.53 }

  it('es 0 para el mismo punto', () => {
    expect(distanciaKm(caliCentro, caliCentro)).toBe(0)
  })

  it('dentro de la misma ciudad queda por debajo del umbral para volver a pedir el clima', () => {
    expect(distanciaKm(caliCentro, { lat: 3.44, lon: -76.52 })).toBeLessThan(DISTANCIA_MINIMA_KM)
  })

  it('Cali → Palmira (~27 km) supera el umbral', () => {
    const km = distanciaKm(caliCentro, { lat: 3.54, lon: -76.3 })
    expect(km).toBeGreaterThan(25)
    expect(km).toBeLessThan(30)
  })
})

describe('guardar y leer la ubicación', () => {
  beforeEach(() => localStorage.clear())

  it('recuerda la última ubicación entre visitas', () => {
    guardarUbicacion({ lat: 3.45, lon: -76.53 })
    expect(leerUbicacion()).toEqual({ lat: 3.45, lon: -76.53 })
  })

  it('sin nada guardado, o con un valor dañado, devuelve null en vez de fallar', () => {
    expect(leerUbicacion()).toBeNull()
    localStorage.setItem('ubicacionAproximada', '{no es json')
    expect(leerUbicacion()).toBeNull()
    localStorage.setItem('ubicacionAproximada', JSON.stringify({ lat: 'x', lon: 2 }))
    expect(leerUbicacion()).toBeNull()
  })
})
