const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const buildJsDir = path.join(__dirname, 'build', 'static', 'js');

if (!fs.existsSync(buildJsDir)) {
  console.error('No se encontró la carpeta build/static/js. Asegúrate de haber ejecutado "npm run build" antes.');
  process.exit(1);
}

const files = fs.readdirSync(buildJsDir);

files.forEach((file) => {
  if (!file.endsWith('.js')) return;

  const filePath = path.join(buildJsDir, file);
  const code = fs.readFileSync(filePath, 'utf8');

  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    deadCodeInjection: true,
    stringArray: true,
    stringArrayThreshold: 1,
  });

  let obfuscatedCode;

  // Caso 1: versión clásica -> objeto con getCode()
  if (obfuscationResult && typeof obfuscationResult.getCode === 'function') {
    obfuscatedCode = obfuscationResult.getCode();

  // Caso 2: te devolviera directamente un string (raro, pero lo contemplamos)
  } else if (typeof obfuscationResult === 'string') {
    obfuscatedCode = obfuscationResult;

  // Caso 3: venga envuelto en { code: '...' }
  } else if (
    obfuscationResult &&
    typeof obfuscationResult === 'object' &&
    typeof obfuscationResult.code === 'string'
  ) {
    obfuscatedCode = obfuscationResult.code;

  // Caso 4: array de resultados (no debería pasar en frontend simple, pero por si acaso)
  } else if (Array.isArray(obfuscationResult) && obfuscationResult.length > 0) {
    const first = obfuscationResult[0];
    if (first && typeof first.getCode === 'function') {
      obfuscatedCode = first.getCode();
    } else if (typeof first === 'string') {
      obfuscatedCode = first;
    } else if (first && typeof first.code === 'string') {
      obfuscatedCode = first.code;
    }
  }

  if (!obfuscatedCode) {
    console.error(
      '❌ No se pudo obtener el código ofuscado para el archivo:',
      file,
      ' - estructura inesperada:',
      obfuscationResult
    );
    process.exit(1);
  }

  fs.writeFileSync(filePath, obfuscatedCode, 'utf8');
  console.log(`✅ Ofuscado: ${file}`);
});

console.log('🎉 Ofuscación terminada.');
