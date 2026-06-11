# Adaptación de Estilos Globales CSS a Lightning

## 📌 Resumen: Qué aplica y qué no en Lightning

Lightning es un motor de renderizado nativo para Smart TVs que **no usa CSS tradicional**. A continuación se explica cómo adaptar los estilos globales:

---

## ✅ Qué SÍ aplica en Lightning

### 1. **Paleta de Colores**
**CSS Original:**
```css
:root {
    --bg-black: #000;
    --bg-dark: #111;
    --bg-panel: #222;
    --text-white: #fff;
    --accent-blue: #38B6FF;
}
```

**Adaptación a Lightning:**
→ Archivo `/src/constants/colors.js` con constantes exportadas:
```javascript
export const COLORS = {
    BG_BLACK: 0xff000000,
    BG_DARK: 0xff111111,
    BG_PANEL: 0xff222222,
    TEXT_WHITE: 0xffffffff,
    ACCENT_BLUE: 0xff38b6ff,
};
```
**Uso en componentes:**
```javascript
color: COLORS.BG_PANEL,
text: { textColor: COLORS.TEXT_WHITE }
```

---

### 2. **Focus / Outline (Navegación con D-PAD)**
**CSS Original:**
```css
*:focus {
    outline: 6px solid var(--accent-blue) !important;
    box-shadow: 0 0 25px var(--accent-blue) !important;
}
```

**Adaptación a Lightning:**
Cada componente implementa `_focus()` y `_unfocus()`:
```javascript
_focus() {
    this.patch({
        color: COLORS.ACCENT_BLUE,
        smooth: { scale: 1.05 }
    });
}

_unfocus() {
    this.patch({
        color: COLORS.BG_PANEL,
        smooth: { scale: 1.0 }
    });
}
```

---

### 3. **Border Radius**
**CSS Original:**
```css
border-radius: 8px;
border-radius: 50%; /* círculo */
```

**Adaptación a Lightning:**
```javascript
shader: { type: Lightning.shaders.RoundedRectangle, radius: 8 }
shader: { type: Lightning.shaders.RoundedRectangle, radius: 50 } // círculo
```

---

### 4. **Transiciones y Animaciones**
**CSS Original:**
```css
transition: all 0.2s ease;
transform: scale(1.05);
```

**Adaptación a Lightning:**
```javascript
smooth: { 
    scale: 1.05,      // animación suave de escala
    x: 100,           // animación suave de posición
    duration: 0.2     // duración en segundos
}
```

---

### 5. **Scroll Arrows (Flechas de navegación)**
**CSS Original:**
```css
.scroll-arrow { ... }
.scroll-wrapper:hover .scroll-arrow { opacity: 1; }
```

**Adaptación a Lightning:**
→ Componente `ScrollArrow.js` que maneja:
- Estados focus/unfocus
- Deshabilitado (`.disabled`)
- Escala y transformaciones

**Uso:**
```javascript
{
    type: ScrollArrow,
    x: 10, y: 100,
    direction: 'left',
    isDisabled: false,
    onPress: () => this.scrollLeft()
}
```

---

## ❌ Qué NO aplica en Lightning

### 1. **Box-sizing, Margin, Padding (CSS Box Model)**
Lightning usa un sistema diferente basado en posicionamiento absoluto y propiedades `x`, `y`, `w`, `h`.

**En CSS:**
```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

**En Lightning:**
→ Se maneja con `x`, `y`, `w`, `h` y `mount`:
```javascript
{
    x: 10,           // posición X
    y: 20,           // posición Y
    w: 100,          // ancho
    h: 50,           // alto
    mount: 0.5       // punto de anclaje (0-1)
}
```

---

### 2. **Scrollbars y Overflow**
**En CSS:**
```css
scrollbar-width: none;
::-webkit-scrollbar { display: none; }
```

**En Lightning:**
→ Usamos `clipping: true` para recortar contenido fuera de límites:
```javascript
{
    x: 0, y: 0, w: 1920, h: 800,
    clipping: true,  // recorta lo que sobresale
    Slider: { ... }
}
```

---

### 3. **Media Queries**
**En CSS:**
```css
@media (hover: none) and (pointer: coarse) {
    .scroll-arrow { ... }
}
```

**En Lightning:**
→ Lightning detecta el tipo de dispositivo en tiempo de ejecución:
```javascript
const isSmartTV = !Utils.isMobile(); // Lightning API
if (isSmartTV) {
    // Mostrar siempre arrows
} else {
    // Comportamiento para móviles
}
```

---

### 4. **Font Family del Sitio**
**En CSS:**
```css
html, body {
    font-family: 'Segoe UI', Tahoma, Geneva, ...;
}
```

**En Lightning:**
→ Las fuentes deben estar registradas en el gestor de recursos:
```javascript
// En App.js o Config
ResourceManager.addFont('Regular', '/fonts/SegoeUI.ttf');
```

Luego usarlas en textos:
```javascript
text: {
    fontFace: 'Regular',
    text: 'Hola',
    textColor: COLORS.TEXT_WHITE
}
```

---

### 5. **User-Select, Tap Highlight, etc.**
**En CSS:**
```css
user-select: none;
-webkit-tap-highlight-color: transparent;
```

**En Lightning:**
→ **No aplica** (Lightning no tiene estos conceptos). 
- No hay selección de texto en Smart TVs
- El tap-highlight no existe en navegación por D-PAD

---

## 📝 Checklist para adaptar estilos globales

- [x] **Paleta de colores** → `colors.js`
- [x] **Focus/Outline** → Métodos `_focus()/_unfocus()` en componentes
- [x] **Border Radius** → `shader: { type: Lightning.shaders.RoundedRectangle }`
- [x] **Transiciones** → `smooth: { ... }` en `.patch()`
- [x] **Scroll Arrows** → Componente `ScrollArrow.js`
- [x] **Clipping/Overflow** → Usar `clipping: true` en contenedores
- ⚠️ **Media Queries** → Detectar en runtime si es necesario
- ⚠️ **Font Family** → Registrar en ResourceManager
- ❌ **Box Model (margin/padding)** → Usar `x`, `y`, `w`, `h` directamente
- ❌ **Scrollbars** → Lightning los oculta automáticamente

---

## 🎯 Próximos pasos

1. **Importar COLORS en componentes:**
   ```javascript
   import { COLORS } from '../constants/colors.js';
   ```

2. **Usar ScrollArrow en componentes con scroll:**
   ```javascript
   import ScrollArrow from './ScrollArrow.js';
   ```

3. **Implementar focus/unfocus en todos los componentes focusables**

4. **Probar en Smart TV o emulador Lightning**
