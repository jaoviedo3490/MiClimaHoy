/**
 * Divide datos-fuente/countries_cities.json (28 MB: 250 países y ~150.000 ciudades con zonas horarias,
 * traducciones, moneda, etc.) en archivos pequeños que el navegador pide solo cuando los necesita:
 *
 *   public/datos/paises.json            → [{ id, name }]                      (lista del primer selector)
 *   public/datos/ciudades/<id>.json     → [{ name, latitude, longitude }]     (un archivo por país)
 *
 * La app solo usa esos campos. Las coordenadas se redondean a 4 decimales (~11 m), de sobra para pedir
 * el clima de una ciudad.
 *
 * Uso (solo cuando cambie el archivo fuente):  node scripts/dividir-paises-ciudades.js
 */
const fs = require('fs')
const path = require('path')

const RAIZ = path.join(__dirname, '..')
const FUENTE = path.join(RAIZ, 'datos-fuente', 'countries_cities.json')
const DESTINO = path.join(RAIZ, 'public', 'datos')
const DESTINO_CIUDADES = path.join(DESTINO, 'ciudades')

const coordenada = (valor) => Math.round(Number(valor) * 10000) / 10000

const paises = JSON.parse(fs.readFileSync(FUENTE, 'utf8'))

fs.rmSync(DESTINO, { recursive: true, force: true })
fs.mkdirSync(DESTINO_CIUDADES, { recursive: true })

const lista = paises
  .map((pais) => ({ id: pais.id, name: pais.name }))
  .sort((a, b) => a.name.localeCompare(b.name))
fs.writeFileSync(path.join(DESTINO, 'paises.json'), JSON.stringify(lista))

let totalCiudades = 0
let mayor = { nombre: '', bytes: 0 }
for (const pais of paises) {
  const ciudades = (pais.cities ?? []).map((ciudad) => ({
    name: ciudad.name,
    latitude: coordenada(ciudad.latitude),
    longitude: coordenada(ciudad.longitude),
  }))
  const contenido = JSON.stringify(ciudades)
  fs.writeFileSync(path.join(DESTINO_CIUDADES, `${pais.id}.json`), contenido)
  totalCiudades += ciudades.length
  if (contenido.length > mayor.bytes) mayor = { nombre: pais.name, bytes: contenido.length }
}

console.log(`${lista.length} países y ${totalCiudades} ciudades escritos en public/datos/`)
console.log(`Archivo de ciudades más grande: ${mayor.nombre} (${(mayor.bytes / 1024).toFixed(0)} KB)`)
