import {
  franjasMedidor,
  limiteMedidor,
  opcionesMedidor,
  pasoEscala,
  rangoMedidor,
  tramosArco,
} from '../medidorEcharts'

const temperatura = { type: 'Temperatura', min: -50, max: 70, data: 23, color: '#FB8C00', recomendedLimit: 37 }
const uv = { type: 'Radiacion UV', titulo: 'Radiación UV', min: 0, max: 20, data: 7, color: '#E53935', recomendedLimit: 6 }

describe('reglas copiadas del indicador de Plotly', () => {
  it('rango: la temperatura siempre va de -50 a 100; el resto usa min y max', () => {
    expect(rangoMedidor(temperatura)).toEqual([-50, 100])
    expect(rangoMedidor(uv)).toEqual([0, 20])
  })

  it('línea roja: 37 °C (o -5 °C bajo cero) y el límite recomendado para lo demás', () => {
    expect(limiteMedidor(temperatura)).toBe(37)
    expect(limiteMedidor({ ...temperatura, data: -8 })).toBe(-5)
    expect(limiteMedidor(uv)).toBe(6)
  })

  it('franjas de fondo iguales a gauge.steps de Plotly', () => {
    expect(franjasMedidor(temperatura)).toEqual([
      [-50, -5, '#E3F2FD'],
      [-5, 36, '#BBDEFB'],
    ])
  })
})

describe('pasoEscala', () => {
  it('elige pasos redondos como Plotly (sin marcas como 3,333)', () => {
    expect(pasoEscala(-50, 100)).toBe(50)
    expect(pasoEscala(0, 20)).toBe(5)
    expect(pasoEscala(0, 100)).toBe(20)
  })
})

describe('tramosArco', () => {
  it('cubre todo el arco con tramos acumulados que terminan en 1', () => {
    const tramos = tramosArco([-50, 100], franjasMedidor(temperatura))
    expect(tramos.at(-1)[0]).toBe(1)
    const fracciones = tramos.map(([f]) => f)
    expect([...fracciones].sort((a, b) => a - b)).toEqual(fracciones)
  })

  it('una franja al revés (como la segunda de UV: de 6 a 0) se normaliza', () => {
    const tramos = tramosArco([0, 20], franjasMedidor(uv))
    // De 0 a 6 queda pintado (la segunda franja gana sobre la primera, como en Plotly)
    expect(tramos[0]).toEqual([0.3, '#BBDEFB'])
  })
})

describe('opcionesMedidor', () => {
  it('usa el título visible si viene y si no el type', () => {
    expect(opcionesMedidor(uv, false).title.text).toBe('Radiación UV')
    expect(opcionesMedidor(temperatura, false).title.text).toBe('Temperatura')
  })

  it('pone el valor en la barra y la línea roja en el límite', () => {
    const { series } = opcionesMedidor(temperatura, false)
    const [, , principal, limite] = series
    expect(principal.data[0].value).toBe(23)
    expect(limite.data[0].value).toBe(37)
  })

  it('de noche los textos van en blanco', () => {
    expect(opcionesMedidor(temperatura, true).title.textStyle.color).toBe('white')
    expect(opcionesMedidor(temperatura, false).title.textStyle.color).toBe('black')
  })
})
