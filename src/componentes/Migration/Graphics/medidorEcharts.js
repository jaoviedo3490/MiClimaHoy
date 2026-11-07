/**
 * Opciones de ECharts para el medidor (gauge) de Temperatura y Radiación UV.
 *
 * Reproduce el indicador de Plotly que se usaba antes (mode "gauge+number+delta"), con las mismas reglas:
 * rango, dos franjas de fondo, barra del color que manda el backend, línea roja en el límite
 * recomendado, valor grande en el centro y la diferencia contra 0 debajo. Plotly pesaba 1,3 MB
 * comprimido solo para estos dos medidores; ECharts ya está en la app para los detalles y el árbol.
 *
 * Es una función pura (sin React) para poder probarla y reutilizarla.
 */

// Medidas en px para la caja de 220 × 150 del componente (las mismas proporciones del indicador de Plotly)
const RADIO = 66 // radio exterior del arco
const GROSOR = 22 // grosor del arco
const AZUL_DELTA = '#0077B6' // color de la diferencia cuando sube (delta.increasing de Plotly)
const AZUL_DELTA_NOCHE = '#4FC3F7' // el azul oscuro casi no se lee sobre el fondo de noche
const ROJO_DELTA = '#FF4136' // color por defecto de Plotly cuando baja
const ROJO_LIMITE = '#D32F2F'
const BORDE = '#E0E0E0'
const SIN_FRANJA = 'rgba(0, 0, 0, 0)' // la parte del arco sin franja deja ver el fondo, como en Plotly

const esTemperatura = (p) => p.type === 'Temperatura'

/** [mínimo, máximo] de la escala, igual que gauge.axis.range de Plotly. */
export const rangoMedidor = (p) => (esTemperatura(p) ? [-50, 100] : [p.min, p.max])

/** Franjas de fondo [desde, hasta, color], iguales a gauge.steps de Plotly. */
export const franjasMedidor = (p) => [
  [p.min, esTemperatura(p) ? -5 : 4, '#E3F2FD'],
  [esTemperatura(p) ? -5 : p.recomendedLimit, esTemperatura(p) ? 36 : 0, '#BBDEFB'],
]

/** Valor de la línea roja, igual que gauge.threshold.value de Plotly. */
export const limiteMedidor = (p) =>
  esTemperatura(p) ? (Number(p.data) < 0 ? -5 : 37) : p.recomendedLimit

/**
 * Convierte las franjas al formato de axisLine de ECharts: tramos acumulados [fracción hasta, color]
 * que cubren todo el arco. Donde no hay franja queda el fondo; si dos se cruzan gana la última,
 * como Plotly, que las pinta en orden.
 */
export const tramosArco = ([min, max], franjas) => {
  const fraccion = (v) => (Math.min(Math.max(v, min), max) - min) / (max - min)
  const normalizadas = franjas.map(([a, b, color]) => [Math.min(a, b), Math.max(a, b), color])
  const cortes = [...new Set([min, max, ...normalizadas.flatMap(([a, b]) => [a, b])])]
    .filter((v) => v >= min && v <= max)
    .sort((a, b) => a - b)

  const tramos = []
  for (let i = 1; i < cortes.length; i++) {
    const medio = (cortes[i - 1] + cortes[i]) / 2
    const franja = [...normalizadas].reverse().find(([a, b]) => medio >= a && medio <= b)
    const color = franja ? franja[2] : SIN_FRANJA
    const ultimo = tramos[tramos.length - 1]
    if (ultimo && ultimo[1] === color) ultimo[0] = fraccion(cortes[i])
    else tramos.push([fraccion(cortes[i]), color])
  }
  return tramos
}

/**
 * Paso "redondo" de la escala (1, 2 o 5 por una potencia de 10) para unas 4 divisiones, como hace Plotly:
 * -50…100 → cada 50; 0…20 → cada 5. Así no salen marcas como 3,333.
 */
export const pasoEscala = (min, max) => {
  const crudo = (max - min) / 4
  const potencia = 10 ** Math.floor(Math.log10(crudo))
  const normal = crudo / potencia
  const factor = normal < 1.5 ? 1 : normal < 3 ? 2 : normal < 7 ? 5 : 10
  return factor * potencia
}

const formatoNumero = (v) => {
  const n = Number(v) || 0
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}

/**
 * Opciones completas del medidor.
 * @param p props del componente: type, data, min, max, color, recomendedLimit
 * @param esDeNoche true cuando el fondo es oscuro (isDay_global): textos en blanco
 */
export const opcionesMedidor = (p, esDeNoche) => {
  const [min, max] = rangoMedidor(p)
  const valor = Number(p.data) || 0
  const colorTexto = esDeNoche ? 'white' : 'black'
  const delta = valor // Plotly compara contra reference: 0
  const paso = pasoEscala(min, max)
  const comun = {
    type: 'gauge',
    startAngle: 180,
    endAngle: 0,
    min,
    max,
    center: ['50%', '92%'],
    radius: RADIO,
    splitNumber: Math.round((max - min) / paso),
  }
  const soloLinea = {
    silent: true,
    pointer: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
    detail: { show: false },
    title: { show: false },
    data: [],
  }

  return {
    animationDuration: 600,
    title: {
      text: p.titulo ?? p.type, // titulo: texto visible; type: clave de los datos
      left: 'center',
      top: 2,
      textStyle: { fontSize: 20, fontWeight: 'normal', color: colorTexto, fontFamily: 'Inter, sans-serif' },
    },
    series: [
      // Borde del arco (bordercolor de Plotly): una línea fina por fuera y otra por dentro
      { ...comun, ...soloLinea, axisLine: { lineStyle: { width: 2, color: [[1, BORDE]] } } },
      {
        ...comun,
        ...soloLinea,
        radius: RADIO - GROSOR + 2,
        axisLine: { lineStyle: { width: 2, color: [[1, BORDE]] } },
      },
      // Franjas, barra del valor, escala y número
      {
        ...comun,
        axisLine: { lineStyle: { width: GROSOR, color: tramosArco([min, max], franjasMedidor(p)) } },
        progress: { show: true, overlap: true, width: GROSOR * 0.5, itemStyle: { color: p.color || '#1f77b4' } },
        pointer: { show: false },
        axisTick: { show: false },
        // Una marca corta por fuera del arco en cada número de la escala, como Plotly
        splitLine: { distance: -GROSOR - 5, length: 5, lineStyle: { color: '#A0A0A0', width: 1.5 } },
        axisLabel: {
          // Negativo = por fuera del arco, medido desde su borde externo
          distance: -12,
          color: colorTexto,
          fontSize: 11,
          formatter: (v) => formatoNumero(v),
        },
        title: { show: false },
        detail: {
          offsetCenter: [0, '-20%'],
          valueAnimation: true,
          formatter: () =>
            `{valor|${formatoNumero(valor)}}\n{${delta >= 0 ? 'sube' : 'baja'}|${delta >= 0 ? '▲' : '▼'}${formatoNumero(delta).replace('-', '−')}}`,
          rich: {
            valor: { fontSize: 28, color: colorTexto, fontFamily: 'Inter, sans-serif', lineHeight: 30 },
            sube: { fontSize: 13, color: esDeNoche ? AZUL_DELTA_NOCHE : AZUL_DELTA, fontFamily: 'Inter, sans-serif' },
            baja: { fontSize: 13, color: ROJO_DELTA, fontFamily: 'Inter, sans-serif' },
          },
        },
        data: [{ value: valor }],
      },
      // Línea roja del límite recomendado (threshold de Plotly): una aguja corta sobre el arco
      {
        ...comun,
        silent: true,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: { show: false },
        title: { show: false },
        pointer: {
          show: true,
          icon: 'rect',
          width: 4,
          length: GROSOR * 0.75,
          // Arranca a 7/8 del grosor hacia adentro y mide 3/4 del grosor (thickness: 0.75 de Plotly)
          offsetCenter: [0, `-${100 - (GROSOR * 0.875 * 100) / RADIO}%`],
          itemStyle: { color: ROJO_LIMITE },
        },
        anchor: { show: false },
        data: [{ value: limiteMedidor(p) }],
      },
    ],
  }
}
