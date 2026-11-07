import { urlClimaPorCiudad } from '../climaPorCiudad'

describe('urlClimaPorCiudad', () => {
  it('pide el clima al backend, sin llave de WeatherAPI', () => {
    const url = urlClimaPorCiudad('Cali')

    expect(url).toBe('https://clima-app-server.vercel.app/api/v1/wheater/city?q=Cali')
    expect(url).not.toContain('weatherapi.com')
    expect(url).not.toContain('key=')
  })

  it('codifica los nombres con espacios o tildes', () => {
    expect(urlClimaPorCiudad('San José')).toContain('q=San%20Jos%C3%A9')
  })
})
