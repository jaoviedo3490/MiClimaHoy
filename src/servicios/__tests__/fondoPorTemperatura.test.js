import { categoriaFondo, elegirFondo } from '../fondoPorTemperatura'

describe('categoriaFondo', () => {
  it.each([
    [-12, 'low_temp_fatal'],
    [-5, 'low_temp_fatal'],
    [-4.9, 'low_temp_non_fatal'],
    [0, 'low_temp'],
    [20, 'low_temp'],
    [20.3, 'normal_temp'],
    [30, 'normal_temp'],
    [33, 'hight_temp_non_fatal'],
    [36, 'hight_temp_non_fatal'],
    [41, 'hight_temp_fatal'],
  ])('%p °C → %s (mismos rangos y orden que los seis if de antes)', (temperatura, categoria) => {
    expect(categoriaFondo(temperatura)).toBe(categoria)
  })

  it('acepta la temperatura como texto, como llega del backend', () => {
    expect(categoriaFondo('25')).toBe('normal_temp')
  })

  it('sin dato no elige fondo (antes "" contaba como 0 y salía un fondo frío)', () => {
    expect(categoriaFondo('')).toBeNull()
    expect(categoriaFondo(null)).toBeNull()
    expect(categoriaFondo(undefined)).toBeNull()
    expect(categoriaFondo('abc')).toBeNull()
  })
})

describe('elegirFondo', () => {
  const catalogo = { low_temp: ['a.webp', 'b.webp', 'c.webp'] }

  it('elige una imagen de la categoría según el número aleatorio', () => {
    expect(elegirFondo('low_temp', catalogo, () => 0)).toBe('a.webp')
    expect(elegirFondo('low_temp', catalogo, () => 0.99)).toBe('c.webp')
  })

  it('devuelve null si la categoría no existe o está vacía', () => {
    expect(elegirFondo('normal_temp', catalogo)).toBeNull()
    expect(elegirFondo('low_temp', {})).toBeNull()
  })
})
