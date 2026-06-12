import { Launch } from '@lightningjs/sdk'
import App from './App.js'

export default function () {
  // --- AJUSTE UNIVERSAL PARA CUALQUIER SMART TV ---
  // Inyectamos CSS global para garantizar que el canvas de Lightning
  // se adapte siempre al 100% de la pantalla sin importar el SO 
  // (WebOS, Tizen, Android TV, Roku, etc.) y sin usar setTimeouts.
  const style = document.createElement('style')
  style.innerHTML = `
    html, body {
      margin: 0; padding: 0;
      width: 100%; height: 100%;
      overflow: hidden; background-color: #000;
    }
    canvas {
      width: 100% !important; height: 100% !important;
      position: absolute !important; top: 0; left: 0;
      z-index: 1 !important;
    }
  `
  document.head.appendChild(style)

  return Launch(App, ...arguments)
}
