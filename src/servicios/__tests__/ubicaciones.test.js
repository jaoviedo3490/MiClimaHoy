// El módulo guarda en memoria lo que descarga: cada prueba lo carga de nuevo para empezar limpia.
const cargarModulo = () => {
  let modulo
  jest.isolateModules(() => {
    modulo = require('../ubicaciones')
  })
  return modulo
}

const respuesta = (cuerpo, ok = true, status = 200) =>
  Promise.resolve({ ok, status, json: () => Promise.resolve(cuerpo) })

afterEach(() => {
  delete global.fetch
})

describe('obtenerPaises', () => {
  it('descarga la lista una sola vez aunque se pida varias veces', async () => {
    global.fetch = jest.fn(() => respuesta([{ id: 48, name: 'Colombia' }]))
    const { obtenerPaises } = cargarModulo()

    await obtenerPaises()
    const paises = await obtenerPaises()

    expect(paises).toEqual([{ id: 48, name: 'Colombia' }])
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch.mock.calls[0][0]).toMatch(/\/datos\/paises\.json$/)
  })

  it('si la descarga falla permite reintentar', async () => {
    global.fetch = jest
      .fn()
      .mockReturnValueOnce(respuesta(null, false, 500))
      .mockReturnValueOnce(respuesta([{ id: 48, name: 'Colombia' }]))
    const { obtenerPaises } = cargarModulo()

    await expect(obtenerPaises()).rejects.toThrow('HTTP 500')
    await expect(obtenerPaises()).resolves.toHaveLength(1)
  })
})

describe('obtenerCiudades', () => {
  it('pide solo el archivo del país y lo convierte a la forma del selector', async () => {
    global.fetch = jest.fn(() => respuesta([{ name: 'Cali', latitude: 3.4372, longitude: -76.5225 }]))
    const { obtenerCiudades } = cargarModulo()

    const ciudades = await obtenerCiudades(48)

    expect(global.fetch.mock.calls[0][0]).toMatch(/\/datos\/ciudades\/48\.json$/)
    expect(ciudades).toEqual([{ value: 'Cali', latitude: 3.4372, longitude: -76.5225 }])
  })

  it('no vuelve a descargar un país que ya se pidió', async () => {
    global.fetch = jest.fn(() => respuesta([]))
    const { obtenerCiudades } = cargarModulo()

    await obtenerCiudades(48)
    await obtenerCiudades(48)
    await obtenerCiudades(232)

    expect(global.fetch).toHaveBeenCalledTimes(2)
  })
})
