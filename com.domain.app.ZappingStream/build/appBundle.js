/**
 * App version: 1.0.0
 * SDK version: 5.5.7
 * CLI version: 2.14.2
 * 
 * Generated: Thu, 11 Jun 2026 23:20:01 GMT
 */

var APP_com_domain_app_ZappingStream = (function () {
  'use strict';

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const settings = {};
  const subscribers = {};
  const initSettings = (appSettings, platformSettings) => {
    settings['app'] = appSettings;
    settings['platform'] = platformSettings;
    settings['user'] = {};
  };
  const publish = (key, value) => {
    subscribers[key] && subscribers[key].forEach(subscriber => subscriber(value));
  };
  const dotGrab = function () {
    let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let key = arguments.length > 1 ? arguments[1] : undefined;
    if (obj === null) return undefined;
    const keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
      obj = obj[keys[i]] = obj[keys[i]] !== undefined ? obj[keys[i]] : {};
    }
    return typeof obj === 'object' && obj !== null ? Object.keys(obj).length ? obj : undefined : obj;
  };
  var Settings$1 = {
    get(type, key) {
      let fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      const val = dotGrab(settings[type], key);
      return val !== undefined ? val : fallback;
    },
    has(type, key) {
      return !!this.get(type, key);
    },
    set(key, value) {
      settings['user'][key] = value;
      publish(key, value);
    },
    subscribe(key, callback) {
      subscribers[key] = subscribers[key] || [];
      subscribers[key].push(callback);
    },
    unsubscribe(key, callback) {
      if (callback) {
        const index = subscribers[key] && subscribers[key].findIndex(cb => cb === callback);
        index > -1 && subscribers[key].splice(index, 1);
      } else {
        if (key in subscribers) {
          subscribers[key] = [];
        }
      }
    },
    clearSubscribers() {
      for (const key of Object.getOwnPropertyNames(subscribers)) {
        delete subscribers[key];
      }
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const prepLog = (type, args) => {
    const colors = {
      Info: 'green',
      Debug: 'gray',
      Warn: 'orange',
      Error: 'red'
    };
    args = Array.from(args);
    return ['%c' + (args.length > 1 && typeof args[0] === 'string' ? args.shift() : type), 'background-color: ' + colors[type] + '; color: white; padding: 2px 4px; border-radius: 2px', args];
  };
  var Log$1 = {
    info() {
      Settings$1.get('platform', 'log') && console.log.apply(console, prepLog('Info', arguments));
    },
    debug() {
      Settings$1.get('platform', 'log') && console.debug.apply(console, prepLog('Debug', arguments));
    },
    error() {
      Settings$1.get('platform', 'log') && console.error.apply(console, prepLog('Error', arguments));
    },
    warn() {
      Settings$1.get('platform', 'log') && console.warn.apply(console, prepLog('Warn', arguments));
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var Lightning$1 = window.lng;

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class ColorShift extends Lightning$1.shaders.WebGLDefaultShader {
    set brightness(v) {
      this._brightness = (v - 50) / 100;
      this.redraw();
    }
    set contrast(v) {
      this._contrast = (v + 50) / 100;
      this.redraw();
    }
    set gamma(v) {
      this._gamma = (v + 50) / 100;
      this.redraw();
    }
    setupUniforms(operation) {
      super.setupUniforms(operation);
      const gl = this.gl;
      this._setUniform('colorAdjust', [this._brightness || 0.0, this._contrast || 1.0, this._gamma || 1.0], gl.uniform3fv);
    }
  }
  ColorShift.before = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n        \n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform vec3 colorAdjust;\n    \n    const mat3 RGBtoOpponentMat = mat3(0.2814, -0.0971, -0.0930, 0.6938, 0.1458,-0.2529, 0.0638, -0.0250, 0.4665);\n    const mat3 OpponentToRGBMat = mat3(1.1677, 0.9014, 0.7214, -6.4315, 2.5970, 0.1257, -0.5044, 0.0159, 2.0517);    \n";
  ColorShift.after = "    \n    vec3 brightnessContrast(vec3 value, float brightness, float contrast)\n    {\n        return (value - 0.5) * contrast + 0.5 + brightness;\n    }   \n    \n    vec3 updateGamma(vec3 value, float param)\n    {\n        return vec3(pow(abs(value.r), param),pow(abs(value.g), param),pow(abs(value.b), param));\n    } \n       \n    void main(void){\n        vec4 fragColor = texture2D(uSampler, vTextureCoord);        \n        vec4 color = filter(fragColor) * vColor;       \n        \n        vec3 bc = brightnessContrast(color.rgb,colorAdjust[0],colorAdjust[1]);        \n        vec3 ga = updateGamma(bc.rgb, colorAdjust[2]);  \n              \n        gl_FragColor = vec4(ga.rgb, color.a);          \n    }    \n";

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class ProtanopiaShader extends ColorShift {}
  ProtanopiaShader.fragmentShaderSource = "\n    ".concat(ColorShift.before, "    \n    vec4 vision(vec4 color)\n    {\n        vec4 r = vec4( 0.20,  0.99, -0.19, 0.0);\n        vec4 g = vec4( 0.16,  0.79,  0.04, 0.0);\n        vec4 b = vec4( 0.01, -0.01,  1.00, 0.0);\n       \n        return vec4(dot(color, r), dot(color, g), dot(color, b), color.a);\t\n    }\n    \n    vec4 filter( vec4 color )\n    {   \n        vec3 opponentColor = RGBtoOpponentMat * vec3(color.r, color.g, color.b);\n        opponentColor.x -= opponentColor.y * 1.5; \n        vec3 rgbColor = OpponentToRGBMat * opponentColor;\n        return vision(vec4(rgbColor.r, rgbColor.g, rgbColor.b, color.a));      \n    }    \n    ").concat(ColorShift.after, " \n");

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class DeuteranopiaShader extends ColorShift {}
  DeuteranopiaShader.fragmentShaderSource = "\n    ".concat(ColorShift.before, "\n    vec4 vision(vec4 color)\n    {\n        vec4 r = vec4( 0.43,  0.72, -0.15, 0.0 );\n        vec4 g = vec4( 0.34,  0.57,  0.09, 0.0 );\n        vec4 b = vec4(-0.02,  0.03,  1.00, 0.0 );\n       \n        return vec4(dot(color, r), dot(color, g), dot(color, b), color.a);\t\n    }\n       \n    vec4 filter( vec4 color )\n    {   \n        vec3 opponentColor = RGBtoOpponentMat * vec3(color.r, color.g, color.b);\n        opponentColor.x -= opponentColor.y * 1.5; \n        vec3 rgbColor = OpponentToRGBMat * opponentColor;\n        return vision(vec4(rgbColor.r, rgbColor.g, rgbColor.b, color.a));    \n    }\n    ").concat(ColorShift.after, "    \n");

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class TritanopiaShader extends ColorShift {}
  TritanopiaShader.fragmentShaderSource = "\n    ".concat(ColorShift.before, "    \n    vec4 vision(vec4 color)\n    {\n        vec4 r = vec4( 0.97,  0.11, -0.08, 0.0 );\n        vec4 g = vec4( 0.02,  0.82,  0.16, 0.0 );\n        vec4 b = vec4(-0.06,  0.88,  0.18, 0.0 );\n       \n        return vec4(dot(color, r), dot(color, g), dot(color, b), color.a);\t\n    }   \n    \n    vec4 filter( vec4 color )\n    {   \n        vec3 opponentColor = RGBtoOpponentMat * vec3(color.r, color.g, color.b);\n        opponentColor.x -= ((3.0 * opponentColor.z) - opponentColor.y) * 0.25;\n        vec3 rgbColor = OpponentToRGBMat * opponentColor;\n        return vision(vec4(rgbColor.r, rgbColor.g, rgbColor.b, color.a));\n    }   \n    ").concat(ColorShift.after, " \n");

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class NeutralShader extends ColorShift {}
  NeutralShader.fragmentShaderSource = "\n    ".concat(ColorShift.before, "\n    vec4 filter( vec4 color )\n    {\n        return color;\n    }\n    ").concat(ColorShift.after, "\n");

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class MonochromacyShader extends ColorShift {}
  MonochromacyShader.fragmentShaderSource = "\n    ".concat(ColorShift.before, "\n    vec4 filter( vec4 color )\n    {   \n        float grey = dot(color.rgb, vec3(0.299, 0.587, 0.114));\n        return vec4(vec3(grey, grey, grey), 1.0 ); \n    }\n    ").concat(ColorShift.after, "\n");

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const colorshiftShader = type => {
    const shadersMap = {
      normal: NeutralShader,
      monochromacy: MonochromacyShader,
      deuteranopia: DeuteranopiaShader,
      tritanopia: TritanopiaShader,
      protanopia: ProtanopiaShader
    };
    type = typeof type === 'string' && type.toLowerCase() || null;
    return Object.keys(shadersMap).indexOf(type) > -1 ? shadersMap[type] : false;
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* global SpeechSynthesisErrorEvent */
  function flattenStrings() {
    let series = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const flattenedSeries = [];
    for (var i = 0; i < series.length; i++) {
      if (typeof series[i] === 'string' && !series[i].includes('PAUSE-')) {
        flattenedSeries.push(series[i]);
      } else {
        break;
      }
    }
    // add a "word boundary" to ensure the Announcer doesn't automatically try to
    // interpret strings that look like dates but are not actually dates
    // for example, if "Rising Sun" and "1993" are meant to be two separate lines,
    // when read together, "Sun 1993" is interpretted as "Sunday 1993"
    return [flattenedSeries.join(',\b ')].concat(series.slice(i));
  }
  function delay(pause) {
    return new Promise(resolve => {
      setTimeout(resolve, pause);
    });
  }

  /**
   * Speak a string
   *
   * @param {string} phrase Phrase to speak
   * @param {SpeechSynthesisUtterance[]} utterances An array which the new SpeechSynthesisUtterance instance representing this utterance will be appended
   * @return {Promise<void>} Promise resolved when the utterance has finished speaking, and rejected if there's an error
   */
  function speak(phrase, utterances) {
    let lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en-US';
    const synth = window.speechSynthesis;
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = lang;
      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = e => {
        reject(e);
      };
      utterances.push(utterance);
      synth.speak(utterance);
    });
  }
  function speakSeries(series, lang) {
    let root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const synth = window.speechSynthesis;
    const remainingPhrases = flattenStrings(Array.isArray(series) ? series : [series]);
    const nestedSeriesResults = [];
    /*
      We hold this array of SpeechSynthesisUtterances in order to prevent them from being
      garbage collected prematurely on STB hardware which can cause the 'onend' events of
      utterances to not fire consistently.
    */
    const utterances = [];
    let active = true;
    const seriesChain = (async () => {
      try {
        while (active && remainingPhrases.length) {
          const phrase = await Promise.resolve(remainingPhrases.shift());
          if (!active) {
            // Exit
            // Need to check this after the await in case it was cancelled in between
            break;
          } else if (typeof phrase === 'string' && phrase.includes('PAUSE-')) {
            // Pause it
            let pause = phrase.split('PAUSE-')[1] * 1000;
            if (isNaN(pause)) {
              pause = 0;
            }
            await delay(pause);
          } else if (typeof phrase === 'string' && phrase.length) {
            // Speak it
            const totalRetries = 3;
            let retriesLeft = totalRetries;
            while (active && retriesLeft > 0) {
              try {
                await speak(phrase, utterances, lang);
                retriesLeft = 0;
              } catch (e) {
                // eslint-disable-next-line no-undef
                if (e instanceof SpeechSynthesisErrorEvent) {
                  if (e.error === 'network') {
                    retriesLeft--;
                    console.warn("Speech synthesis network error. Retries left: ".concat(retriesLeft));
                    await delay(500 * (totalRetries - retriesLeft));
                  } else if (e.error === 'canceled' || e.error === 'interrupted') {
                    // Cancel or interrupt error (ignore)
                    retriesLeft = 0;
                  } else {
                    throw new Error("SpeechSynthesisErrorEvent: ".concat(e.error));
                  }
                } else {
                  throw e;
                }
              }
            }
          } else if (typeof phrase === 'function') {
            const seriesResult = speakSeries(phrase(), lang, false);
            nestedSeriesResults.push(seriesResult);
            await seriesResult.series;
          } else if (Array.isArray(phrase)) {
            // Speak it (recursively)
            const seriesResult = speakSeries(phrase, lang, false);
            nestedSeriesResults.push(seriesResult);
            await seriesResult.series;
          }
        }
      } finally {
        active = false;
      }
    })();
    return {
      series: seriesChain,
      get active() {
        return active;
      },
      append: toSpeak => {
        remainingPhrases.push(toSpeak);
      },
      cancel: () => {
        if (!active) {
          return;
        }
        if (root) {
          synth.cancel();
        }
        nestedSeriesResults.forEach(nestedSeriesResults => {
          nestedSeriesResults.cancel();
        });
        active = false;
      }
    };
  }
  let currentSeries;
  function SpeechEngine (toSpeak, lang) {
    currentSeries && currentSeries.cancel();
    currentSeries = speakSeries(toSpeak, lang);
    return currentSeries;
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * Code from: https://github.com/jashkenas/underscore is
   * Copyright (c) 2009-2022 Jeremy Ashkenas, Julian Gonggrijp, and DocumentCloud and Investigative Reporters & Editors
   * Licensed under the MIT License based off:
   * http://unscriptable.com/2009/03/20/debouncing-javascript-methods/ which is:
   * Copyright (c) 2007-2009 unscriptable.com and John M. Hann
   * Licensed under the MIT License (with X11 advertising exception)
   */

  function getElmName(elm) {
    return elm.ref || elm.constructor.name;
  }

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing. The function also has a property 'clear'
   * that is a function which will clear the timer to prevent previously scheduled executions.
   *
   * @source underscore.js
   * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
   * @param {Function} function to wrap
   * @param {Number} timeout in ms (`100`)
   * @param {Boolean} whether to execute at the beginning (`false`)
   * @api public
   */
  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    if (null == wait) wait = 100;
    function later() {
      var last = Date.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    }
    var debounced = function () {
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
    debounced.clear = function () {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
    debounced.flush = function () {
      if (timeout) {
        result = func.apply(context, args);
        context = args = null;
        clearTimeout(timeout);
        timeout = null;
      }
    };
    return debounced;
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let resetFocusPathTimer;
  let prevFocusPath = [];
  let currentlySpeaking;
  let voiceOutDisabled = false;
  const fiveMinutes = 300000;
  function onFocusChangeCore() {
    let focusPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (!Announcer.enabled) {
      return;
    }
    const loaded = focusPath.every(elm => !elm.loading);
    const focusDiff = focusPath.filter(elm => !prevFocusPath.includes(elm));
    resetFocusPathTimer();
    if (!loaded) {
      Announcer.onFocusChange();
      return;
    }
    prevFocusPath = focusPath.slice(0);
    let toAnnounceText = [];
    let toAnnounce = focusDiff.reduce((acc, elm) => {
      if (elm.announce) {
        acc.push([getElmName(elm), 'Announce', elm.announce]);
        toAnnounceText.push(elm.announce);
      } else if (elm.title) {
        acc.push([getElmName(elm), 'Title', elm.title]);
        toAnnounceText.push(elm.title);
      }
      return acc;
    }, []);
    focusDiff.reverse().reduce((acc, elm) => {
      if (elm.announceContext) {
        acc.push([getElmName(elm), 'Context', elm.announceContext]);
        toAnnounceText.push(elm.announceContext);
      } else {
        acc.push([getElmName(elm), 'No Context', '']);
      }
      return acc;
    }, toAnnounce);
    if (Announcer.debug) {
      console.table(toAnnounce);
    }
    if (toAnnounceText.length) {
      return Announcer.speak(toAnnounceText.reduce((acc, val) => acc.concat(val), []));
    }
  }
  function textToSpeech(toSpeak) {
    if (voiceOutDisabled) {
      return;
    }
    return currentlySpeaking = SpeechEngine(toSpeak);
  }
  const Announcer = {
    enabled: true,
    debug: false,
    cancel: function () {
      currentlySpeaking && currentlySpeaking.cancel();
    },
    clearPrevFocus: function () {
      let depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      prevFocusPath = prevFocusPath.slice(0, depth);
      resetFocusPathTimer();
    },
    speak: function (text) {
      let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$append = _ref.append,
        append = _ref$append === void 0 ? false : _ref$append,
        _ref$notification = _ref.notification,
        notification = _ref$notification === void 0 ? false : _ref$notification;
      if (Announcer.enabled) {
        Announcer.onFocusChange.flush();
        if (append && currentlySpeaking && currentlySpeaking.active) {
          currentlySpeaking.append(text);
        } else {
          Announcer.cancel();
          textToSpeech(text);
        }
        if (notification) {
          voiceOutDisabled = true;
          currentlySpeaking.series.finally(() => {
            voiceOutDisabled = false;
            Announcer.refresh();
          });
        }
      }
      return currentlySpeaking;
    },
    setupTimers: function () {
      let _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$focusDebounce = _ref2.focusDebounce,
        focusDebounce = _ref2$focusDebounce === void 0 ? 400 : _ref2$focusDebounce,
        _ref2$focusChangeTime = _ref2.focusChangeTimeout,
        focusChangeTimeout = _ref2$focusChangeTime === void 0 ? fiveMinutes : _ref2$focusChangeTime;
      Announcer.onFocusChange = debounce(onFocusChangeCore, focusDebounce);
      resetFocusPathTimer = debounce(() => {
        // Reset focus path for full announce
        prevFocusPath = [];
      }, focusChangeTimeout);
    }
  };
  Announcer.setupTimers();

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var Accessibility = {
    Announcer,
    colorshift(component) {
      let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        brightness: 50,
        contrast: 50,
        gamma: 50
      };
      config = {
        ...{
          brightness: 50,
          contrast: 50,
          gamma: 50
        },
        ...config
      };
      const shader = type && colorshiftShader(type);
      if (shader) {
        Log$1.info('Accessibility Colorshift', type, config);
        component.rtt = true;
        component.shader = {
          type: shader,
          ...config
        };
      } else {
        Log$1.info('Accessibility Colorshift', 'Disabled');
        component.rtt = false;
        component.shader = null;
      }
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  let Log;
  let Settings;
  let ApplicationInstance$1;
  let Ads$1;
  let Lightning;
  const initLightningSdkPlugin = {
    set log(v) {
      Log = v;
    },
    set settings(v) {
      Settings = v;
    },
    set ads(v) {
      Ads$1 = v;
    },
    set lightning(v) {
      Lightning = v;
    },
    set appInstance(v) {
      ApplicationInstance$1 = v;
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const initMetrics = config => {
    sendMetric = config.sendMetric;
  };
  let sendMetric = (type, event, params) => {
    Log.info('Sending metric', type, event, params);
  };

  // available metric per category
  const metrics$1 = {
    app: ['launch', 'loaded', 'ready', 'close'],
    page: ['view', 'leave'],
    user: ['click', 'input'],
    media: ['abort', 'canplay', 'ended', 'pause', 'play',
    // with some videos there occur almost constant suspend events ... should investigate
    // 'suspend',
    'volumechange', 'waiting', 'seeking', 'seeked']
  };

  // error metric function (added to each category)
  const errorMetric = function (type, message, code, visible) {
    let params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    params = {
      params,
      ...{
        message,
        code,
        visible
      }
    };
    sendMetric(type, 'error', params);
  };
  const Metric = function (type, events) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return events.reduce((obj, event) => {
      obj[event] = function (name) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        params = {
          ...options,
          ...(name ? {
            name
          } : {}),
          ...params
        };
        sendMetric(type, event, params);
      };
      return obj;
    }, {
      error(message, code, params) {
        errorMetric(type, message, code, params);
      },
      event(name, params) {
        sendMetric(type, name, params);
      }
    });
  };
  const Metrics = types => {
    return Object.keys(types).reduce((obj, type) => {
      // media metric works a bit different!
      // it's a function that accepts a url and returns an object with the available metrics
      // url is automatically passed as a param in every metric
      type === 'media' ? obj[type] = url => Metric(type, types[type], {
        url
      }) : obj[type] = Metric(type, types[type]);
      return obj;
    }, {
      error: errorMetric,
      event: sendMetric
    });
  };
  var Metrics$1 = Metrics(metrics$1);

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const formatLocale = locale => {
    if (locale && locale.length === 2) {
      return "".concat(locale.toLowerCase(), "-").concat(locale.toUpperCase());
    } else {
      return locale;
    }
  };
  const getLocale = defaultValue => {
    if ('language' in navigator) {
      const locale = formatLocale(navigator.language);
      return Promise.resolve(locale);
    } else {
      return Promise.resolve(defaultValue);
    }
  };
  const getLanguage = defaultValue => {
    if ('language' in navigator) {
      const language = formatLocale(navigator.language).slice(0, 2);
      return Promise.resolve(language);
    } else {
      return Promise.resolve(defaultValue);
    }
  };
  const getCountryCode = defaultValue => {
    if ('language' in navigator) {
      const countryCode = formatLocale(navigator.language).slice(3, 5);
      return Promise.resolve(countryCode);
    } else {
      return Promise.resolve(defaultValue);
    }
  };
  const hasOrAskForGeoLocationPermission = () => {
    return new Promise(resolve => {
      // force to prompt for location permission
      if (Settings.get('platform', 'forceBrowserGeolocation') === true) resolve(true);
      if ('permissions' in navigator && typeof navigator.permissions.query === 'function') {
        navigator.permissions.query({
          name: 'geolocation'
        }).then(status => {
          resolve(status.state === 'granted' || status.status === 'granted');
        });
      } else {
        resolve(false);
      }
    });
  };
  const getLatLon = defaultValue => {
    return new Promise(resolve => {
      hasOrAskForGeoLocationPermission().then(granted => {
        if (granted === true) {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
            // success
            result => result && result.coords && resolve([result.coords.latitude, result.coords.longitude]),
            // error
            () => resolve(defaultValue),
            // options
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            });
          } else {
            return queryForLatLon().then(result => resolve(result || defaultValue));
          }
        } else {
          return queryForLatLon().then(result => resolve(result || defaultValue));
        }
      });
    });
  };
  const queryForLatLon = () => {
    return new Promise(resolve => {
      fetch('https://geolocation-db.com/json/').then(response => response.json()).then(_ref => {
        let latitude = _ref.latitude,
          longitude = _ref.longitude;
        return latitude && longitude ? resolve([latitude, longitude]) : resolve(false);
      }).catch(() => resolve(false));
    });
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const defaultProfile = {
    ageRating: 'adult',
    city: 'New York',
    zipCode: '27505',
    countryCode: () => getCountryCode('US'),
    ip: '127.0.0.1',
    household: 'b2244e9d4c04826ccd5a7b2c2a50e7d4',
    language: () => getLanguage('en'),
    latlon: () => getLatLon([40.7128, 74.006]),
    locale: () => getLocale('en-US'),
    mac: '00:00:00:00:00:00',
    operator: 'metrological',
    platform: 'metrological',
    packages: [],
    uid: 'ee6723b8-7ab3-462c-8d93-dbf61227998e',
    stbType: 'metrological'
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let getInfo = key => {
    const profile = {
      ...defaultProfile,
      ...Settings.get('platform', 'profile')
    };
    return Promise.resolve(typeof profile[key] === 'function' ? profile[key]() : profile[key]);
  };
  let setInfo = (key, params) => {
    if (key in defaultProfile) return defaultProfile[key] = params;
  };
  const initProfile = config => {
    getInfo = config.getInfo ? config.getInfo : getInfo;
    setInfo = config.setInfo ? config.setInfo : setInfo;
  };

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  const initPurchase = config => {
    if (config.billingUrl) config.billingUrl;
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const defaultChannels = [{
    number: 1,
    name: 'Metro News 1',
    description: 'New York Cable News Channel',
    entitled: true,
    program: {
      title: 'The Morning Show',
      description: "New York's best morning show",
      startTime: new Date(new Date() - 60 * 5 * 1000).toUTCString(),
      // started 5 minutes ago
      duration: 60 * 30,
      // 30 minutes
      ageRating: 0
    }
  }, {
    number: 2,
    name: 'MTV',
    description: 'Music Television',
    entitled: true,
    program: {
      title: 'Beavis and Butthead',
      description: 'American adult animated sitcom created by Mike Judge',
      startTime: new Date(new Date() - 60 * 20 * 1000).toUTCString(),
      // started 20 minutes ago
      duration: 60 * 45,
      // 45 minutes
      ageRating: 18
    }
  }, {
    number: 3,
    name: 'NBC',
    description: 'NBC TV Network',
    entitled: false,
    program: {
      title: 'The Tonight Show Starring Jimmy Fallon',
      description: 'Late-night talk show hosted by Jimmy Fallon on NBC',
      startTime: new Date(new Date() - 60 * 10 * 1000).toUTCString(),
      // started 10 minutes ago
      duration: 60 * 60,
      // 1 hour
      ageRating: 10
    }
  }];
  const channels = () => Settings.get('platform', 'tv', defaultChannels);
  const randomChannel = () => channels()[~~(channels.length * Math.random())];

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let currentChannel;
  const callbacks = {};
  const emit$1 = function (event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    callbacks[event] && callbacks[event].forEach(cb => {
      cb.apply(null, args);
    });
  };

  // local mock methods
  let methods = {
    getChannel() {
      if (!currentChannel) currentChannel = randomChannel();
      return new Promise((resolve, reject) => {
        if (currentChannel) {
          const channel = {
            ...currentChannel
          };
          delete channel.program;
          resolve(channel);
        } else {
          reject('No channel found');
        }
      });
    },
    getProgram() {
      if (!currentChannel) currentChannel = randomChannel();
      return new Promise((resolve, reject) => {
        currentChannel.program ? resolve(currentChannel.program) : reject('No program found');
      });
    },
    setChannel(number) {
      return new Promise((resolve, reject) => {
        if (number) {
          const newChannel = channels().find(c => c.number === number);
          if (newChannel) {
            currentChannel = newChannel;
            const channel = {
              ...currentChannel
            };
            delete channel.program;
            emit$1('channelChange', channel);
            resolve(channel);
          } else {
            reject('Channel not found');
          }
        } else {
          reject('No channel number supplied');
        }
      });
    }
  };
  const initTV = config => {
    methods = {};
    if (config.getChannel && typeof config.getChannel === 'function') {
      methods.getChannel = config.getChannel;
    }
    if (config.getProgram && typeof config.getProgram === 'function') {
      methods.getProgram = config.getProgram;
    }
    if (config.setChannel && typeof config.setChannel === 'function') {
      methods.setChannel = config.setChannel;
    }
    if (config.emit && typeof config.emit === 'function') {
      config.emit(emit$1);
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const initPin = config => {
    if (config.submit && typeof config.submit === 'function') {
      config.submit;
    }
    if (config.check && typeof config.check === 'function') {
      config.check;
    }
  };

  var executeAsPromise = (function (method) {
    let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    let result;
    if (method && typeof method === 'function') {
      try {
        result = method.apply(context, args);
      } catch (e) {
        result = e;
      }
    } else {
      result = method;
    }

    // if it looks like a duck .. ehm ... promise and talks like a promise, let's assume it's a promise
    if (result !== null && typeof result === 'object' && result.then && typeof result.then === 'function') {
      return result;
    }
    // otherwise make it into a promise
    else {
      return new Promise((resolve, reject) => {
        if (result instanceof Error) {
          reject(result);
        } else {
          resolve(result);
        }
      });
    }
  });

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var events$1 = {
    abort: 'Abort',
    canplay: 'CanPlay',
    canplaythrough: 'CanPlayThrough',
    durationchange: 'DurationChange',
    emptied: 'Emptied',
    encrypted: 'Encrypted',
    ended: 'Ended',
    error: 'Error',
    interruptbegin: 'InterruptBegin',
    interruptend: 'InterruptEnd',
    loadeddata: 'LoadedData',
    loadedmetadata: 'LoadedMetadata',
    loadstart: 'LoadStart',
    pause: 'Pause',
    play: 'Play',
    playing: 'Playing',
    progress: 'Progress',
    ratechange: 'Ratechange',
    seeked: 'Seeked',
    seeking: 'Seeking',
    stalled: 'Stalled',
    // suspend: 'Suspend', // this one is called a looooot for some videos
    timeupdate: 'TimeUpdate',
    volumechange: 'VolumeChange',
    waiting: 'Waiting'
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var autoSetupMixin = (function (sourceObject) {
    let setup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
    let ready = false;
    const doSetup = () => {
      if (ready === false) {
        setup();
        ready = true;
      }
    };
    return Object.keys(sourceObject).reduce((obj, key) => {
      if (typeof sourceObject[key] === 'function') {
        obj[key] = function () {
          doSetup();
          return sourceObject[key].apply(sourceObject, arguments);
        };
      } else if (typeof Object.getOwnPropertyDescriptor(sourceObject, key).get === 'function') {
        obj.__defineGetter__(key, function () {
          doSetup();
          return Object.getOwnPropertyDescriptor(sourceObject, key).get.apply(sourceObject);
        });
      } else if (typeof Object.getOwnPropertyDescriptor(sourceObject, key).set === 'function') {
        obj.__defineSetter__(key, function () {
          doSetup();
          return Object.getOwnPropertyDescriptor(sourceObject, key).set.sourceObject[key].apply(sourceObject, arguments);
        });
      } else {
        obj[key] = sourceObject[key];
      }
      return obj;
    }, {});
  });

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  let timeout = null;
  var easeExecution = (cb, delay) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb();
    }, delay);
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var VideoTexture = () => {
    return class VideoTexture extends Lightning.Component {
      static _template() {
        return {
          Video: {
            alpha: 1,
            visible: false,
            pivot: 0.5,
            texture: {
              type: Lightning.textures.StaticTexture,
              options: {}
            }
          }
        };
      }
      set videoEl(v) {
        this._videoEl = v;
      }
      get videoEl() {
        return this._videoEl;
      }
      get videoView() {
        return this.tag('Video');
      }
      get videoTexture() {
        return this.videoView.texture;
      }
      get isVisible() {
        return this.videoView.alpha === 1 && this.videoView.visible === true;
      }
      _init() {
        this._createVideoTexture();
      }
      _createVideoTexture() {
        const stage = this.stage;
        const gl = stage.gl;
        const glTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.videoTexture.options = {
          source: glTexture,
          w: this.videoEl.width,
          h: this.videoEl.height
        };
        this.videoView.w = this.videoEl.width / this.stage.getRenderPrecision();
        this.videoView.h = this.videoEl.height / this.stage.getRenderPrecision();
      }
      start() {
        const stage = this.stage;
        this._lastTime = 0;
        if (!this._updateVideoTexture) {
          this._updateVideoTexture = () => {
            if (this.videoTexture.options.source && this.videoEl.videoWidth && this.active) {
              const gl = stage.gl;
              const currentTime = new Date().getTime();
              const getVideoPlaybackQuality = this.videoEl.getVideoPlaybackQuality();

              // When BR2_PACKAGE_GST1_PLUGINS_BAD_PLUGIN_DEBUGUTILS is not set in WPE, webkitDecodedFrameCount will not be available.
              // We'll fallback to fixed 30fps in this case.
              // As 'webkitDecodedFrameCount' is about to deprecate, check for the 'totalVideoFrames'
              const frameCount = getVideoPlaybackQuality ? getVideoPlaybackQuality.totalVideoFrames : this.videoEl.webkitDecodedFrameCount;
              const mustUpdate = frameCount ? this._lastFrame !== frameCount : this._lastTime < currentTime - 30;
              if (mustUpdate) {
                this._lastTime = currentTime;
                this._lastFrame = frameCount;
                try {
                  gl.bindTexture(gl.TEXTURE_2D, this.videoTexture.options.source);
                  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.videoEl);
                  this._lastFrame = this.videoEl.webkitDecodedFrameCount;
                  this.videoView.visible = true;
                  this.videoTexture.options.w = this.videoEl.width;
                  this.videoTexture.options.h = this.videoEl.height;
                  const expectedAspectRatio = this.videoView.w / this.videoView.h;
                  const realAspectRatio = this.videoEl.width / this.videoEl.height;
                  if (expectedAspectRatio > realAspectRatio) {
                    this.videoView.scaleX = realAspectRatio / expectedAspectRatio;
                    this.videoView.scaleY = 1;
                  } else {
                    this.videoView.scaleY = expectedAspectRatio / realAspectRatio;
                    this.videoView.scaleX = 1;
                  }
                } catch (e) {
                  Log.error('texImage2d video', e);
                  this.stop();
                }
                this.videoTexture.source.forceRenderUpdate();
              }
            }
          };
        }
        if (!this._updatingVideoTexture) {
          stage.on('frameStart', this._updateVideoTexture);
          this._updatingVideoTexture = true;
        }
      }
      stop() {
        const stage = this.stage;
        stage.removeListener('frameStart', this._updateVideoTexture);
        this._updatingVideoTexture = false;
        this.videoView.visible = false;
        if (this.videoTexture.options.source) {
          const gl = stage.gl;
          gl.bindTexture(gl.TEXTURE_2D, this.videoTexture.options.source);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
      }
      position(top, left) {
        this.videoView.patch({
          x: left,
          y: top
        });
      }
      size(width, height) {
        this.videoView.patch({
          w: width,
          h: height
        });
      }
      show() {
        this.videoView.alpha = 1;
      }
      hide() {
        this.videoView.alpha = 0;
      }
    };
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let mediaUrl$1 = url => url;
  let videoEl;
  let videoTexture;
  let metrics;
  let consumer$1;
  let precision = 1;
  let textureMode = false;
  const initVideoPlayer = config => {
    if (config.mediaUrl) {
      mediaUrl$1 = config.mediaUrl;
    }
  };
  // todo: add this in a 'Registry' plugin
  // to be able to always clean this up on app close
  let eventHandlers = {};
  const state$1 = {
    adsEnabled: false,
    playing: false,
    _playingAds: false,
    get playingAds() {
      return this._playingAds;
    },
    set playingAds(val) {
      if (this._playingAds !== val) {
        this._playingAds = val;
        fireOnConsumer$1(val === true ? 'AdStart' : 'AdEnd');
      }
    },
    skipTime: false,
    playAfterSeek: null
  };
  const hooks = {
    play() {
      state$1.playing = true;
    },
    pause() {
      state$1.playing = false;
    },
    seeked() {
      state$1.playAfterSeek === true && videoPlayerPlugin.play();
      state$1.playAfterSeek = null;
    },
    abort() {
      deregisterEventListeners();
    }
  };
  const withPrecision = val => Math.round(precision * val) + 'px';
  const fireOnConsumer$1 = (event, args) => {
    if (consumer$1) {
      consumer$1.fire('$videoPlayer' + event, args, videoEl.currentTime);
      consumer$1.fire('$videoPlayerEvent', event, args, videoEl.currentTime);
    }
  };
  const fireHook = (event, args) => {
    hooks[event] && typeof hooks[event] === 'function' && hooks[event].call(null, event, args);
  };
  let customLoader = null;
  let customUnloader = null;
  const loader$1 = (url, videoEl, config) => {
    return customLoader && typeof customLoader === 'function' ? customLoader(url, videoEl, config) : new Promise(resolve => {
      url = mediaUrl$1(url);
      videoEl.setAttribute('src', url);
      videoEl.load();
      resolve();
    });
  };
  const unloader = videoEl => {
    return customUnloader && typeof customUnloader === 'function' ? customUnloader(videoEl) : new Promise(resolve => {
      videoEl.removeAttribute('src');
      videoEl.load();
      resolve();
    });
  };
  const setupVideoTag = () => {
    const videoEls = document.getElementsByTagName('video');
    if (videoEls && videoEls.length) {
      return videoEls[0];
    } else {
      const videoEl = document.createElement('video');
      const platformSettingsWidth = Settings.get('platform', 'width') ? Settings.get('platform', 'width') : 1920;
      const platformSettingsHeight = Settings.get('platform', 'height') ? Settings.get('platform', 'height') : 1080;
      videoEl.setAttribute('id', 'video-player');
      videoEl.setAttribute('width', withPrecision(platformSettingsWidth));
      videoEl.setAttribute('height', withPrecision(platformSettingsHeight));
      videoEl.style.position = 'absolute';
      videoEl.style.zIndex = '1';
      videoEl.style.display = 'none';
      videoEl.style.visibility = 'hidden';
      videoEl.style.top = withPrecision(0);
      videoEl.style.left = withPrecision(0);
      videoEl.style.width = withPrecision(platformSettingsWidth);
      videoEl.style.height = withPrecision(platformSettingsHeight);
      document.body.appendChild(videoEl);
      return videoEl;
    }
  };
  const setUpVideoTexture = () => {
    if (!ApplicationInstance$1.tag('VideoTexture')) {
      const el = ApplicationInstance$1.stage.c({
        type: VideoTexture(),
        ref: 'VideoTexture',
        zIndex: 0,
        videoEl
      });
      ApplicationInstance$1.childList.addAt(el, 0);
    }
    return ApplicationInstance$1.tag('VideoTexture');
  };
  const registerEventListeners = () => {
    Log.info('VideoPlayer', 'Registering event listeners');
    Object.keys(events$1).forEach(event => {
      const handler = e => {
        // Fire a metric for each event (if it exists on the metrics object)
        if (metrics && metrics[event] && typeof metrics[event] === 'function') {
          metrics[event]({
            currentTime: videoEl.currentTime
          });
        }
        // fire an internal hook
        fireHook(event, {
          videoElement: videoEl,
          event: e
        });

        // fire the event (with human friendly event name) to the consumer of the VideoPlayer
        fireOnConsumer$1(events$1[event], {
          videoElement: videoEl,
          event: e
        });
      };
      eventHandlers[event] = handler;
      videoEl.addEventListener(event, handler);
    });
  };
  const deregisterEventListeners = () => {
    Log.info('VideoPlayer', 'Deregistering event listeners');
    Object.keys(eventHandlers).forEach(event => {
      videoEl.removeEventListener(event, eventHandlers[event]);
    });
    eventHandlers = {};
  };
  const videoPlayerPlugin = {
    consumer(component) {
      consumer$1 = component;
    },
    loader(loaderFn) {
      customLoader = loaderFn;
    },
    unloader(unloaderFn) {
      customUnloader = unloaderFn;
    },
    position() {
      let top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      let left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      videoEl.style.left = withPrecision(left);
      videoEl.style.top = withPrecision(top);
      if (textureMode === true) {
        videoTexture.position(top, left);
      }
    },
    size() {
      let width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1920;
      let height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1080;
      videoEl.style.width = withPrecision(width);
      videoEl.style.height = withPrecision(height);
      videoEl.width = parseFloat(videoEl.style.width);
      videoEl.height = parseFloat(videoEl.style.height);
      if (textureMode === true) {
        videoTexture.size(width, height);
      }
    },
    area() {
      let top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      let right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1920;
      let bottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1080;
      let left = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      this.position(top, left);
      this.size(right - left, bottom - top);
    },
    open(url) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.canInteract) return;
      metrics = Metrics$1.media(url);
      this.hide();
      deregisterEventListeners();
      if (this.src == url) {
        this.clear().then(this.open(url, config));
      } else {
        const adConfig = {
          enabled: state$1.adsEnabled,
          duration: 300
        };
        if (config.videoId) {
          adConfig.caid = config.videoId;
        }
        Ads$1.get(adConfig, consumer$1).then(ads => {
          state$1.playingAds = true;
          ads.prerolls().then(() => {
            state$1.playingAds = false;
            loader$1(url, videoEl, config).then(() => {
              registerEventListeners();
              this.show();
              this.play();
            }).catch(e => {
              fireOnConsumer$1('Error', {
                videoElement: videoEl,
                event: e
              });

              // This is not API-compliant, as it results in firing "$videoPlayererror" rather than "$videoPlayerError".
              // See docs here for API-compliant events -> https://github.com/Metrological/metrological-sdk/blob/master/docs/plugins/videoplayer.md#event-overview
              // It has been kept for backwards compatability for library consumers who may have already written handler functions to match it.
              fireOnConsumer$1('error', {
                videoElement: videoEl,
                event: e
              });
            });
          });
        });
      }
    },
    reload() {
      if (!this.canInteract) return;
      const url = videoEl.getAttribute('src');
      this.close();
      this.open(url);
    },
    close() {
      Ads$1.cancel();
      if (state$1.playingAds) {
        state$1.playingAds = false;
        Ads$1.stop();
        // call self in next tick
        setTimeout(() => {
          this.close();
        });
      }
      if (!this.canInteract) return;
      this.clear();
      this.hide();
      deregisterEventListeners();
    },
    clear() {
      if (!this.canInteract) return;
      // pause the video first to disable sound
      this.pause();
      if (textureMode === true) videoTexture.stop();
      return unloader(videoEl).then(() => {
        fireOnConsumer$1('Clear', {
          videoElement: videoEl
        });
      });
    },
    play() {
      if (!this.canInteract) return;
      if (textureMode === true) videoTexture.start();
      executeAsPromise(videoEl.play, null, videoEl).catch(e => {
        fireOnConsumer$1('Error', {
          videoElement: videoEl,
          event: e
        });

        // This is not API-compliant, as it results in firing "$videoPlayererror" rather than "$videoPlayerError".
        // See docs here for API-compliant events -> https://github.com/Metrological/metrological-sdk/blob/master/docs/plugins/videoplayer.md#event-overview
        // It has been kept for backwards compatability for library consumers who may have already written handler functions to match it.
        fireOnConsumer$1('error', {
          videoElement: videoEl,
          event: e
        });
      });
    },
    pause() {
      if (!this.canInteract) return;
      videoEl.pause();
    },
    playPause() {
      if (!this.canInteract) return;
      this.playing === true ? this.pause() : this.play();
    },
    mute() {
      let muted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.canInteract) return;
      videoEl.muted = muted;
    },
    loop() {
      let looped = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      videoEl.loop = looped;
    },
    seek(time) {
      if (!this.canInteract) return;
      if (!this.src) return;
      // define whether should continue to play after seek is complete (in seeked hook)
      if (state$1.playAfterSeek === null) {
        state$1.playAfterSeek = !!state$1.playing;
      }
      // pause before actually seeking
      this.pause();
      // currentTime always between 0 and the duration of the video (minus 0.1s to not set to the final frame and stall the video)
      videoEl.currentTime = Math.max(0, Math.min(time, this.duration - 0.1));
    },
    skip(seconds) {
      if (!this.canInteract) return;
      if (!this.src) return;
      state$1.skipTime = (state$1.skipTime || videoEl.currentTime) + seconds;
      easeExecution(() => {
        this.seek(state$1.skipTime);
        state$1.skipTime = false;
      }, 300);
    },
    show() {
      if (!this.canInteract) return;
      if (textureMode === true) {
        videoTexture.show();
      } else {
        videoEl.style.display = 'block';
        videoEl.style.visibility = 'visible';
      }
    },
    hide() {
      if (!this.canInteract) return;
      if (textureMode === true) {
        videoTexture.hide();
      } else {
        videoEl.style.display = 'none';
        videoEl.style.visibility = 'hidden';
      }
    },
    enableAds() {
      let enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      state$1.adsEnabled = enabled;
    },
    /* Public getters */
    get duration() {
      return videoEl && (isNaN(videoEl.duration) ? Infinity : videoEl.duration);
    },
    get currentTime() {
      return videoEl && videoEl.currentTime;
    },
    get muted() {
      return videoEl && videoEl.muted;
    },
    get looped() {
      return videoEl && videoEl.loop;
    },
    get src() {
      return videoEl && videoEl.getAttribute('src');
    },
    get playing() {
      return state$1.playing;
    },
    get playingAds() {
      return state$1.playingAds;
    },
    get canInteract() {
      // todo: perhaps add an extra flag wether we allow interactions (i.e. pauze, mute, etc.) during ad playback
      return state$1.playingAds === false;
    },
    get top() {
      return videoEl && parseFloat(videoEl.style.top);
    },
    get left() {
      return videoEl && parseFloat(videoEl.style.left);
    },
    get bottom() {
      return videoEl && parseFloat(videoEl.style.top - videoEl.style.height);
    },
    get right() {
      return videoEl && parseFloat(videoEl.style.left - videoEl.style.width);
    },
    get width() {
      return videoEl && parseFloat(videoEl.style.width);
    },
    get height() {
      return videoEl && parseFloat(videoEl.style.height);
    },
    get visible() {
      if (textureMode === true) {
        return videoTexture.isVisible;
      } else {
        return videoEl && videoEl.style.display === 'block';
      }
    },
    get adsEnabled() {
      return state$1.adsEnabled;
    },
    // prefixed with underscore to indicate 'semi-private'
    // because it's not recommended to interact directly with the video element
    get _videoEl() {
      return videoEl;
    },
    get _consumer() {
      return consumer$1;
    }
  };
  autoSetupMixin(videoPlayerPlugin, () => {
    precision = ApplicationInstance$1 && ApplicationInstance$1.stage && ApplicationInstance$1.stage.getRenderPrecision() || precision;
    videoEl = setupVideoTag();
    textureMode = Settings.get('platform', 'textureMode', false);
    if (textureMode === true) {
      videoEl.setAttribute('crossorigin', 'anonymous');
      videoTexture = setUpVideoTexture();
    }
  });

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let consumer;
  let getAds = () => {
    // todo: enable some default ads during development, maybe from the settings.json
    return Promise.resolve({
      prerolls: [],
      midrolls: [],
      postrolls: []
    });
  };
  const initAds = config => {
    if (config.getAds) {
      getAds = config.getAds;
    }
  };
  const state = {
    active: false
  };
  const playSlot = function () {
    let slot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return slot.reduce((promise, ad) => {
      return promise.then(() => {
        return playAd(ad);
      });
    }, Promise.resolve(null));
  };
  const playAd = ad => {
    return new Promise(resolve => {
      if (state.active === false) {
        Log$1.info('Ad', 'Skipping add due to inactive state');
        return resolve();
      }
      // is it safe to rely on videoplayer plugin already created the video tag?
      const videoEl = document.getElementsByTagName('video')[0];
      videoEl.style.display = 'block';
      videoEl.style.visibility = 'visible';
      videoEl.src = mediaUrl$1(ad.url);
      videoEl.load();
      let timeEvents = null;
      let timeout;
      const cleanup = () => {
        // remove all listeners
        Object.keys(handlers).forEach(handler => videoEl.removeEventListener(handler, handlers[handler]));
        resolve();
      };
      const handlers = {
        play() {
          Log$1.info('Ad', 'Play ad', ad.url);
          fireOnConsumer('Play', ad);
          sendBeacon(ad.callbacks, 'defaultImpression');
        },
        ended() {
          fireOnConsumer('Ended', ad);
          sendBeacon(ad.callbacks, 'complete');
          cleanup();
        },
        timeupdate() {
          if (!timeEvents && videoEl.duration) {
            // calculate when to fire the time based events (now that duration is known)
            timeEvents = {
              firstQuartile: videoEl.duration / 4,
              midPoint: videoEl.duration / 2,
              thirdQuartile: videoEl.duration / 4 * 3
            };
            Log$1.info('Ad', 'Calculated quartiles times', {
              timeEvents
            });
          }
          if (timeEvents && timeEvents.firstQuartile && videoEl.currentTime >= timeEvents.firstQuartile) {
            fireOnConsumer('FirstQuartile', ad);
            delete timeEvents.firstQuartile;
            sendBeacon(ad.callbacks, 'firstQuartile');
          }
          if (timeEvents && timeEvents.midPoint && videoEl.currentTime >= timeEvents.midPoint) {
            fireOnConsumer('MidPoint', ad);
            delete timeEvents.midPoint;
            sendBeacon(ad.callbacks, 'midPoint');
          }
          if (timeEvents && timeEvents.thirdQuartile && videoEl.currentTime >= timeEvents.thirdQuartile) {
            fireOnConsumer('ThirdQuartile', ad);
            delete timeEvents.thirdQuartile;
            sendBeacon(ad.callbacks, 'thirdQuartile');
          }
        },
        stalled() {
          fireOnConsumer('Stalled', ad);
          timeout = setTimeout(() => {
            cleanup();
          }, 5000); // make timeout configurable
        },
        canplay() {
          timeout && clearTimeout(timeout);
        },
        error() {
          fireOnConsumer('Error', ad);
          cleanup();
        },
        // this doesn't work reliably on sky box, moved logic to timeUpdate event
        // loadedmetadata() {
        //   // calculate when to fire the time based events (now that duration is known)
        //   timeEvents = {
        //     firstQuartile: videoEl.duration / 4,
        //     midPoint: videoEl.duration / 2,
        //     thirdQuartile: (videoEl.duration / 4) * 3,
        //   }
        // },
        abort() {
          cleanup();
        }
        // todo: pause, resume, mute, unmute beacons
      };
      // add all listeners
      Object.keys(handlers).forEach(handler => videoEl.addEventListener(handler, handlers[handler]));
      videoEl.play();
    });
  };
  const sendBeacon = (callbacks, event) => {
    if (callbacks && callbacks[event]) {
      Log$1.info('Ad', 'Sending beacon', event, callbacks[event]);
      return callbacks[event].reduce((promise, url) => {
        return promise.then(() => fetch(url)
        // always resolve, also in case of a fetch error (so we don't block firing the rest of the beacons for this event)
        // note: for fetch failed http responses don't throw an Error :)
        .then(response => {
          if (response.status === 200) {
            fireOnConsumer('Beacon' + event + 'Sent');
          } else {
            fireOnConsumer('Beacon' + event + 'Failed' + response.status);
          }
          Promise.resolve(null);
        }).catch(() => {
          Promise.resolve(null);
        }));
      }, Promise.resolve(null));
    } else {
      Log$1.info('Ad', 'No callback found for ' + event);
    }
  };
  const fireOnConsumer = (event, args) => {
    if (consumer) {
      consumer.fire('$ad' + event, args);
      consumer.fire('$adEvent', event, args);
    }
  };
  var Ads = {
    get(config, videoPlayerConsumer) {
      if (config.enabled === false) {
        return Promise.resolve({
          prerolls() {
            return Promise.resolve();
          }
        });
      }
      consumer = videoPlayerConsumer;
      return new Promise(resolve => {
        Log$1.info('Ad', 'Starting session');
        getAds(config).then(ads => {
          Log$1.info('Ad', 'API result', ads);
          resolve({
            prerolls() {
              if (ads.preroll) {
                state.active = true;
                fireOnConsumer('PrerollSlotImpression', ads);
                sendBeacon(ads.preroll.callbacks, 'slotImpression');
                return playSlot(ads.preroll.ads).then(() => {
                  fireOnConsumer('PrerollSlotEnd', ads);
                  sendBeacon(ads.preroll.callbacks, 'slotEnd');
                  state.active = false;
                });
              }
              return Promise.resolve();
            },
            midrolls() {
              return Promise.resolve();
            },
            postrolls() {
              return Promise.resolve();
            }
          });
        });
      });
    },
    cancel() {
      Log$1.info('Ad', 'Cancel Ad');
      state.active = false;
    },
    stop() {
      Log$1.info('Ad', 'Stop Ad');
      state.active = false;
      // fixme: duplication
      const videoEl = document.getElementsByTagName('video')[0];
      videoEl.pause();
      videoEl.removeAttribute('src');
    }
  };

  var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };
  function isNonNullObject(value) {
    return !!value && typeof value === 'object';
  }
  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
  }
  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }
  function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
  }
  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function (element) {
      return cloneUnlessOtherwiseSpecified(element, options);
    });
  }
  function getMergeFunction(key, options) {
    if (!options.customMerge) {
      return deepmerge;
    }
    var customMerge = options.customMerge(key);
    return typeof customMerge === 'function' ? customMerge : deepmerge;
  }
  function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
      return Object.propertyIsEnumerable.call(target, symbol);
    }) : [];
  }
  function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
  }
  function propertyIsOnObject(object, property) {
    try {
      return property in object;
    } catch (_) {
      return false;
    }
  }

  // Protects from prototype poisoning and unexpected merging up the prototype chain.
  function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
    && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
    && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
  }
  function mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) {
      getKeys(target).forEach(function (key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
      });
    }
    getKeys(source).forEach(function (key) {
      if (propertyIsUnsafe(target, key)) {
        return;
      }
      if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
        destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
      } else {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
      }
    });
    return destination;
  }
  function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options);
    } else {
      return mergeObject(target, source, options);
    }
  }
  deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) {
      throw new Error('first argument should be an array');
    }
    return array.reduce(function (prev, next) {
      return deepmerge(prev, next, options);
    }, {});
  };
  var deepmerge_1 = deepmerge;
  var cjs = deepmerge_1;

  /*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */

  function isObject$2(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
  }

  function isPlainObject(o) {
    var ctor,prot;

    if (isObject$2(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (ctor === undefined) return true;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObject$2(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
      return false;
    }

    // Most likely a plain Object
    return true;
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let warned = false;
  const deprecated = function () {
    let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (force === true || warned === false) {
      console.warn(["The 'Locale'-plugin in the Lightning-SDK is deprecated and will be removed in future releases.", "Please consider using the new 'Language'-plugin instead.", 'https://rdkcentral.github.io/Lightning-SDK/#/plugins/language'].join('\n\n'));
    }
    warned = true;
  };
  class Locale {
    constructor() {
      this.__enabled = false;
    }

    /**
     * Loads translation object from external json file.
     *
     * @param {String} path Path to resource.
     * @return {Promise}
     */
    async load(path) {
      if (!this.__enabled) {
        return;
      }
      await fetch(path).then(resp => resp.json()).then(resp => {
        this.loadFromObject(resp);
      });
    }

    /**
     * Sets language used by module.
     *
     * @param {String} lang
     */
    setLanguage(lang) {
      deprecated();
      this.__enabled = true;
      this.language = lang;
    }

    /**
     * Returns reference to translation object for current language.
     *
     * @return {Object}
     */
    get tr() {
      deprecated(true);
      return this.__trObj[this.language];
    }

    /**
     * Loads translation object from existing object (binds existing object).
     *
     * @param {Object} trObj
     */
    loadFromObject(trObj) {
      deprecated();
      const fallbackLanguage = 'en';
      if (Object.keys(trObj).indexOf(this.language) === -1) {
        Log$1.warn('No translations found for: ' + this.language);
        if (Object.keys(trObj).indexOf(fallbackLanguage) > -1) {
          Log$1.warn('Using fallback language: ' + fallbackLanguage);
          this.language = fallbackLanguage;
        } else {
          const error = 'No translations found for fallback language: ' + fallbackLanguage;
          Log$1.error(error);
          throw Error(error);
        }
      }
      this.__trObj = trObj;
      for (const lang of Object.values(this.__trObj)) {
        for (const str of Object.keys(lang)) {
          lang[str] = new LocalizedString(lang[str]);
        }
      }
    }
  }

  /**
   * Extended string class used for localization.
   */
  class LocalizedString extends String {
    /**
     * Returns formatted LocalizedString.
     * Replaces each placeholder value (e.g. {0}, {1}) with corresponding argument.
     *
     * E.g.:
     * > new LocalizedString('{0} and {1} and {0}').format('A', 'B');
     * A and B and A
     *
     * @param  {...any} args List of arguments for placeholders.
     */
    format() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const sub = args.reduce((string, arg, index) => string.split("{".concat(index, "}")).join(arg), this);
      return new LocalizedString(sub);
    }
  }
  var Locale$1 = new Locale();

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class VersionLabel extends Lightning$1.Component {
    static _template() {
      return {
        rect: true,
        color: 0xbb0078ac,
        h: 40,
        w: 100,
        x: w => w - 50,
        y: h => h - 50,
        mount: 1,
        Text: {
          w: w => w,
          h: h => h,
          y: 5,
          x: 20,
          text: {
            fontSize: 22,
            lineHeight: 26
          }
        }
      };
    }
    _firstActive() {
      this.tag('Text').text = "APP - v".concat(this.version, "\nSDK - v").concat(this.sdkVersion);
      this.tag('Text').loadTexture();
      this.w = this.tag('Text').renderWidth + 40;
      this.h = this.tag('Text').renderHeight + 5;
    }
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class FpsIndicator extends Lightning$1.Component {
    static _template() {
      return {
        rect: true,
        color: 0xffffffff,
        texture: Lightning$1.Tools.getRoundRect(80, 80, 40),
        h: 80,
        w: 80,
        x: 100,
        y: 100,
        mount: 1,
        Background: {
          x: 3,
          y: 3,
          texture: Lightning$1.Tools.getRoundRect(72, 72, 36),
          color: 0xff008000
        },
        Counter: {
          w: w => w,
          h: h => h,
          y: 10,
          text: {
            fontSize: 32,
            textAlign: 'center'
          }
        },
        Text: {
          w: w => w,
          h: h => h,
          y: 48,
          text: {
            fontSize: 15,
            textAlign: 'center',
            text: 'FPS'
          }
        }
      };
    }
    _setup() {
      this.config = {
        ...{
          log: false,
          interval: 500,
          threshold: 1
        },
        ...Settings$1.get('platform', 'showFps')
      };
      this.fps = 0;
      this.lastFps = this.fps - this.config.threshold;
      const fpsCalculator = () => {
        this.fps = ~~(1 / this.stage.dt);
      };
      this.stage.on('frameStart', fpsCalculator);
      this.stage.off('framestart', fpsCalculator);
      this.interval = setInterval(this.showFps.bind(this), this.config.interval);
    }
    _firstActive() {
      this.showFps();
    }
    _detach() {
      clearInterval(this.interval);
    }
    showFps() {
      if (Math.abs(this.lastFps - this.fps) <= this.config.threshold) return;
      this.lastFps = this.fps;
      // green
      let bgColor = 0xff008000;
      // orange
      if (this.fps <= 40 && this.fps > 20) bgColor = 0xffffa500;
      // red
      else if (this.fps <= 20) bgColor = 0xffff0000;
      this.tag('Background').setSmooth('color', bgColor);
      this.tag('Counter').text = "".concat(this.fps);
      this.config.log && Log$1.info('FPS', this.fps);
    }
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var fetchJson = file => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          // file protocol returns 0
          // http(s) protocol returns 200
          if (xhr.status === 0 || xhr.status === 200) resolve(JSON.parse(xhr.responseText));else reject(xhr.statusText);
        }
      };
      xhr.open('GET', file);
      xhr.send(null);
    });
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  let basePath;
  let proxyUrl;
  const initUtils = config => {
    basePath = ensureUrlWithProtocol(makeFullStaticPath(window.location.pathname, config.path || '/'));
    if (config.proxyUrl) {
      proxyUrl = ensureUrlWithProtocol(config.proxyUrl);
    }
  };
  var Utils = {
    asset(relPath) {
      return basePath + relPath;
    },
    proxyUrl(url) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return proxyUrl ? proxyUrl + '?' + makeQueryString(url, options) : url;
    },
    makeQueryString() {
      return makeQueryString(...arguments);
    },
    // since imageworkers don't work without protocol
    ensureUrlWithProtocol() {
      return ensureUrlWithProtocol(...arguments);
    }
  };
  const ensureUrlWithProtocol = url => {
    if (/^\/[^/]/i.test(url) && /^(?:file:)/i.test(window.location.protocol)) {
      return window.location.protocol + '//' + url;
    }
    if (/^\/\//.test(url)) {
      return window.location.protocol + url;
    }
    if (!/^(?:https?:)/i.test(url)) {
      return window.location.origin + url;
    }
    return url;
  };
  const makeFullStaticPath = function () {
    let pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    let path = arguments.length > 1 ? arguments[1] : undefined;
    // ensure path has traling slash
    path = path.charAt(path.length - 1) !== '/' ? path + '/' : path;

    // if path is URL, we assume it's already the full static path, so we just return it
    if (/^(?:https?:)?(?:\/\/)/.test(path)) {
      return path;
    }
    if (path.charAt(0) === '/') {
      return path;
    } else {
      // cleanup the pathname (i.e. remove possible index.html)
      pathname = cleanUpPathName(pathname);

      // remove possible leading dot from path
      path = path.charAt(0) === '.' ? path.substr(1) : path;
      // ensure path has leading slash
      path = path.charAt(0) !== '/' ? '/' + path : path;
      return pathname + path;
    }
  };
  const cleanUpPathName = pathname => {
    if (pathname.slice(-1) === '/') return pathname.slice(0, -1);
    const parts = pathname.split('/');
    if (parts[parts.length - 1].indexOf('.') > -1) parts.pop();
    return parts.join('/');
  };
  const makeQueryString = function (url) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'url';
    // add operator as an option
    options.operator = 'metrological'; // Todo: make this configurable (via url?)
    // add type (= url or qr) as an option, with url as the value
    options[type] = url;
    return Object.keys(options).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent('' + options[key]);
    }).join('&');
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let meta = {};
  let translations = {};
  let language = null;
  const initLanguage = function (file) {
    let language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return new Promise((resolve, reject) => {
      fetchJson(file).then(json => {
        setTranslations(json);
        // set language (directly or in a promise)
        typeof language === 'object' && 'then' in language && typeof language.then === 'function' ? language.then(lang => setLanguage(lang).then(resolve).catch(reject)).catch(e => {
          Log$1.error(e);
          reject(e);
        }) : setLanguage(language).then(resolve).catch(reject);
      }).catch(() => {
        const error = 'Language file ' + file + ' not found';
        Log$1.error(error);
        reject(error);
      });
    });
  };
  const setTranslations = obj => {
    if ('meta' in obj) {
      meta = {
        ...obj.meta
      };
      delete obj.meta;
    }
    translations = obj;
  };
  const setLanguage = lng => {
    language = null;
    return new Promise((resolve, reject) => {
      if (lng in translations) {
        language = lng;
      } else {
        if ('map' in meta && lng in meta.map && meta.map[lng] in translations) {
          language = meta.map[lng];
        } else if ('default' in meta && meta.default in translations) {
          const error = 'Translations for Language ' + language + ' not found. Using default language ' + meta.default;
          Log$1.warn(error);
          language = meta.default;
        } else {
          const error = 'Translations for Language ' + language + ' not found.';
          Log$1.error(error);
          reject(error);
        }
      }
      if (language) {
        Log$1.info('Setting language to', language);
        const translationsObj = translations[language];
        if (typeof translationsObj === 'object') {
          resolve();
        } else if (typeof translationsObj === 'string') {
          const url = Utils.asset(translationsObj);
          fetchJson(url).then(json => {
            // save the translations for this language (to prevent loading twice)
            translations[language] = json;
            resolve();
          }).catch(e => {
            const error = 'Error while fetching ' + url;
            Log$1.error(error, e);
            reject(error);
          });
        }
      }
    });
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const registry = {
    eventListeners: [],
    timeouts: [],
    intervals: [],
    targets: []
  };
  var Registry = {
    // Timeouts
    setTimeout(cb, timeout) {
      for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
      }
      const timeoutId = setTimeout(() => {
        registry.timeouts = registry.timeouts.filter(id => id !== timeoutId);
        cb.apply(null, params);
      }, timeout, params);
      Log$1.info('Set Timeout', 'ID: ' + timeoutId);
      registry.timeouts.push(timeoutId);
      return timeoutId;
    },
    clearTimeout(timeoutId) {
      if (registry.timeouts.indexOf(timeoutId) > -1) {
        registry.timeouts = registry.timeouts.filter(id => id !== timeoutId);
        Log$1.info('Clear Timeout', 'ID: ' + timeoutId);
        clearTimeout(timeoutId);
      } else {
        Log$1.error('Clear Timeout', 'ID ' + timeoutId + ' not found');
      }
    },
    clearTimeouts() {
      registry.timeouts.forEach(timeoutId => {
        this.clearTimeout(timeoutId);
      });
    },
    // Intervals
    setInterval(cb, interval) {
      for (var _len2 = arguments.length, params = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        params[_key2 - 2] = arguments[_key2];
      }
      const intervalId = setInterval(() => {
        registry.intervals.filter(id => id !== intervalId);
        cb.apply(null, params);
      }, interval, params);
      Log$1.info('Set Interval', 'ID: ' + intervalId);
      registry.intervals.push(intervalId);
      return intervalId;
    },
    clearInterval(intervalId) {
      if (registry.intervals.indexOf(intervalId) > -1) {
        registry.intervals = registry.intervals.filter(id => id !== intervalId);
        Log$1.info('Clear Interval', 'ID: ' + intervalId);
        clearInterval(intervalId);
      } else {
        Log$1.error('Clear Interval', 'ID ' + intervalId + ' not found');
      }
    },
    clearIntervals() {
      registry.intervals.forEach(intervalId => {
        this.clearInterval(intervalId);
      });
    },
    // Event listeners
    addEventListener(target, event, handler) {
      target.addEventListener(event, handler);
      const targetIndex = registry.targets.indexOf(target) > -1 ? registry.targets.indexOf(target) : registry.targets.push(target) - 1;
      registry.eventListeners[targetIndex] = registry.eventListeners[targetIndex] || {};
      registry.eventListeners[targetIndex][event] = registry.eventListeners[targetIndex][event] || [];
      registry.eventListeners[targetIndex][event].push(handler);
      Log$1.info('Add eventListener', 'Target:', target, 'Event: ' + event, 'Handler:', handler.toString());
    },
    removeEventListener(target, event, handler) {
      const targetIndex = registry.targets.indexOf(target);
      if (targetIndex > -1 && registry.eventListeners[targetIndex] && registry.eventListeners[targetIndex][event] && registry.eventListeners[targetIndex][event].indexOf(handler) > -1) {
        registry.eventListeners[targetIndex][event] = registry.eventListeners[targetIndex][event].filter(fn => fn !== handler);
        Log$1.info('Remove eventListener', 'Target:', target, 'Event: ' + event, 'Handler:', handler.toString());
        target.removeEventListener(event, handler);
        // remove key from event listeners object when no events are registered for that event
        Object.keys(registry.eventListeners[targetIndex]).forEach(event => {
          if (registry.eventListeners[targetIndex][event].length === 0) {
            delete registry.eventListeners[targetIndex][event];
          }
        });
        // remove reference to the target when target has no event listeners registered
        if (Object.keys(registry.eventListeners[targetIndex]).length === 0) {
          registry.targets.splice(targetIndex, 1);
          registry.eventListeners.splice(targetIndex, 1);
        }
      } else {
        Log$1.error('Remove eventListener', 'Not found', 'Target', target, 'Event: ' + event, 'Handler', handler.toString());
      }
    },
    // if `event` is omitted, removes all registered event listeners for target
    // if `target` is also omitted, removes all registered event listeners
    removeEventListeners(target, event) {
      if (target && event) {
        const targetIndex = registry.targets.indexOf(target);
        if (targetIndex > -1) {
          registry.eventListeners[targetIndex][event].forEach(handler => {
            this.removeEventListener(target, event, handler);
          });
        }
      } else if (target) {
        const targetIndex = registry.targets.indexOf(target);
        if (targetIndex > -1) {
          Object.keys(registry.eventListeners[targetIndex]).forEach(_event => {
            this.removeEventListeners(target, _event);
          });
        }
      } else {
        Object.keys(registry.eventListeners).forEach(targetIndex => {
          this.removeEventListeners(registry.targets[targetIndex]);
        });
      }
    },
    // Clear everything (to be called upon app close for proper cleanup)
    clear() {
      this.clearTimeouts();
      this.clearIntervals();
      this.removeEventListeners();
      registry.eventListeners = [];
      registry.timeouts = [];
      registry.intervals = [];
      registry.targets = [];
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const isObject$1 = v => {
    return typeof v === 'object' && v !== null;
  };
  const isString$1 = v => {
    return typeof v === 'string';
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let colors = {
    white: '#ffffff',
    black: '#000000',
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#feff00',
    cyan: '#00feff',
    magenta: '#ff00ff'
  };
  const normalizedColors = {
    //store for normalized colors
  };
  const addColors = (colorsToAdd, value) => {
    if (isObject$1(colorsToAdd)) {
      // clean up normalizedColors if they exist in the to be added colors
      Object.keys(colorsToAdd).forEach(color => cleanUpNormalizedColors(color));
      colors = Object.assign({}, colors, colorsToAdd);
    } else if (isString$1(colorsToAdd) && value) {
      cleanUpNormalizedColors(colorsToAdd);
      colors[colorsToAdd] = value;
    }
  };
  const cleanUpNormalizedColors = color => {
    for (let c in normalizedColors) {
      if (c.indexOf(color) > -1) {
        delete normalizedColors[c];
      }
    }
  };
  const initColors = file => {
    return new Promise((resolve, reject) => {
      if (typeof file === 'object') {
        addColors(file);
        return resolve();
      }
      fetchJson(file).then(json => {
        addColors(json);
        return resolve();
      }).catch(() => {
        const error = 'Colors file ' + file + ' not found';
        Log$1.error(error);
        return reject(error);
      });
    });
  };

  var name = "@lightningjs/sdk";
  var version = "5.5.7";
  var license = "Apache-2.0";
  var types = "index.d.ts";
  var scripts = {
  	postinstall: "node ./scripts/postinstall.js",
  	lint: "eslint '**/*.js'",
  	release: "npm publish --access public",
  	typedoc: "typedoc --tsconfig tsconfig.typedoc.json",
  	tsd: "tsd"
  };
  var husky = {
  	hooks: {
  		"pre-commit": "lint-staged"
  	}
  };
  var dependencies = {
  	"@babel/polyfill": "^7.11.5",
  	"@lightningjs/core": "^2.20.1",
  	"@metrological/sdk": "^1.0.2",
  	"@michieljs/execute-as-promise": "^1.0.0",
  	deepmerge: "^4.2.2",
  	"is-plain-object": "^5.0.0",
  	localcookies: "^2.0.0",
  	shelljs: "^0.8.5",
  	"url-polyfill": "^1.1.10",
  	"whatwg-fetch": "^3.0.0"
  };
  var devDependencies = {
  	"@babel/core": "^7.11.6",
  	"@babel/plugin-transform-parameters": "^7.10.5 ",
  	"@babel/plugin-transform-spread": "^7.11.0",
  	"@babel/preset-env": "^7.11.5",
  	"babel-eslint": "^10.1.0",
  	eslint: "^7.10.0",
  	"eslint-config-prettier": "^6.12.0",
  	"eslint-plugin-prettier": "^3.1.4",
  	husky: "^4.3.0",
  	"lint-staged": "^10.4.0",
  	prettier: "^1.19.1",
  	rollup: "^1.32.1",
  	"rollup-plugin-babel": "^4.4.0",
  	tsd: "^0.22.0",
  	typedoc: "^0.23.9"
  };
  var repository = {
  	type: "git",
  	url: "git@github.com:rdkcentral/Lightning-SDK.git"
  };
  var bugs = {
  	url: "https://github.com/rdkcentral/Lightning-SDK/issues"
  };
  var packageInfo = {
  	name: name,
  	version: version,
  	license: license,
  	types: types,
  	scripts: scripts,
  	"lint-staged": {
  	"*.js": [
  		"eslint --fix"
  	],
  	"src/startApp.js": [
  		"rollup -c ./rollup.config.js"
  	]
  },
  	husky: husky,
  	dependencies: dependencies,
  	devDependencies: devDependencies,
  	repository: repository,
  	bugs: bugs
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let AppInstance;
  const defaultOptions = {
    stage: {
      w: 1920,
      h: 1080,
      precision: 1,
      clearColor: 0x00000000,
      canvas2d: false
    },
    debug: false,
    defaultFontFace: 'RobotoRegular',
    keys: {
      8: 'Back',
      13: 'Enter',
      27: 'Menu',
      37: 'Left',
      38: 'Up',
      39: 'Right',
      40: 'Down',
      174: 'ChannelDown',
      175: 'ChannelUp',
      178: 'Stop',
      250: 'PlayPause',
      191: 'Search',
      // Use "/" for keyboard
      409: 'Search'
    }
  };
  const customFontFaces = [];
  const fontLoader = (fonts, store) => new Promise((resolve, reject) => {
    fonts.map(_ref => {
      let family = _ref.family,
        url = _ref.url,
        urls = _ref.urls,
        descriptors = _ref.descriptors;
      return () => {
        const src = urls ? urls.map(url => {
          return 'url(' + url + ')';
        }) : 'url(' + url + ')';
        const fontFace = new FontFace(family, src, descriptors || {});
        store.push(fontFace);
        Log$1.info('Loading font', family);
        document.fonts.add(fontFace);
        return fontFace.load();
      };
    }).reduce((promise, method) => {
      return promise.then(() => method());
    }, Promise.resolve(null)).then(resolve).catch(reject);
  });
  function Application (App, appData, platformSettings) {
    const width = platformSettings.width,
      height = platformSettings.height;
    if (width && height) {
      defaultOptions.stage['w'] = width;
      defaultOptions.stage['h'] = height;
      defaultOptions.stage['precision'] = width / 1920;
    }

    // support for 720p browser
    if (!width && !height && window.innerHeight === 720) {
      defaultOptions.stage['w'] = 1280;
      defaultOptions.stage['h'] = 720;
      defaultOptions.stage['precision'] = 1280 / 1920;
    }
    return class Application extends Lightning$1.Application {
      constructor(options) {
        const config = cjs(defaultOptions, options, {
          isMergeableObject: isPlainObject
        });
        super(config);
        this.config = config;
      }
      static _template() {
        return {
          w: 1920,
          h: 1080
        };
      }
      colorshift() {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        Accessibility.colorshift(this, type, config);
      }
      get keymapping() {
        return this.stage.application.config.keys;
      }

      /**
       * This function overrides the default keymap with the latest keymap.
       * @param customKeyMap
       * @param keepDuplicates
       */
      overrideKeyMap(customKeyMap) {
        let keepDuplicates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        const baseKeyMap = this.stage.application.config.keys;
        Object.keys(customKeyMap).reduce((keymapping, key) => {
          // prevent duplicate values to exist in final keymapping (i.e. 2 keys triggering 'Back')
          if (!keepDuplicates) {
            Object.keys(baseKeyMap).forEach(baseKey => {
              if (baseKey != key && baseKeyMap[baseKey] == customKeyMap[key]) {
                delete keymapping[baseKey];
              }
            });
          }
          keymapping[key] = customKeyMap[key];
          return keymapping;
        }, baseKeyMap);
        return baseKeyMap;
      }
      _setup() {
        Promise.all([this.loadFonts(App.config && App.config.fonts || App.getFonts && App.getFonts() || []),
        // to be deprecated
        Locale$1.load(App.config && App.config.locale || App.getLocale && App.getLocale()), App.language && this.loadLanguage(App.language()), App.colors && this.loadColors(App.colors())]).then(() => {
          Metrics$1.app.loaded();
          this.w = this.config.stage.w / this.config.stage.precision;
          this.h = this.config.stage.h / this.config.stage.precision;
          AppInstance = this.stage.c({
            ref: 'App',
            type: App,
            zIndex: 1,
            forceZIndexContext: !!platformSettings.showVersion || !!platformSettings.showFps
          });
          this.childList.a(AppInstance);
          this._refocus();
          Log$1.info('App version', this.config.version);
          Log$1.info('SDK version', packageInfo.version);
          if (platformSettings.showVersion) {
            this.childList.a({
              ref: 'VersionLabel',
              type: VersionLabel,
              version: this.config.version,
              sdkVersion: packageInfo.version,
              zIndex: 1
            });
          }
          if (platformSettings.showFps) {
            this.childList.a({
              ref: 'FpsCounter',
              type: FpsIndicator,
              zIndex: 1
            });
          }
          super._setup();
        }).catch(console.error);
      }
      _handleBack() {
        this.closeApp();
      }
      _handleExit() {
        this.closeApp();
      }
      closeApp() {
        Log$1.info('Signaling App Close');
        if (platformSettings.onClose && typeof platformSettings.onClose === 'function') {
          platformSettings.onClose(...arguments);
        } else {
          this.close();
        }
      }
      close() {
        Log$1.info('Closing App');
        Settings$1.clearSubscribers();
        Registry.clear();
        this.childList.remove(this.tag('App'));
        this.cleanupFonts();
        // force texture garbage collect
        this.stage.gc();
        this.destroy();
      }
      loadFonts(fonts) {
        return platformSettings.fontLoader && typeof platformSettings.fontLoader === 'function' ? platformSettings.fontLoader(fonts, customFontFaces) : fontLoader(fonts, customFontFaces);
      }
      cleanupFonts() {
        if ('delete' in document.fonts) {
          customFontFaces.forEach(fontFace => {
            Log$1.info('Removing font', fontFace.family);
            document.fonts.delete(fontFace);
          });
        } else {
          Log$1.info('No support for removing manually-added fonts');
        }
      }
      loadLanguage(config) {
        let file = Utils.asset('translations.json');
        let language = config;
        if (typeof language === 'object') {
          language = config.language || null;
          file = config.file || file;
        }
        return initLanguage(file, language);
      }
      loadColors(config) {
        let file = Utils.asset('colors.json');
        if (config && (typeof config === 'string' || typeof config === 'object')) {
          file = config;
        }
        return initColors(file);
      }
      set focus(v) {
        this._focussed = v;
        this._refocus();
      }
      _getFocused() {
        return this._focussed || this.tag('App');
      }
    };
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class ScaledImageTexture extends Lightning$1.textures.ImageTexture {
    constructor(stage) {
      super(stage);
      this._scalingOptions = undefined;
    }
    set options(options) {
      this.resizeMode = this._scalingOptions = options;
    }
    _getLookupId() {
      return "".concat(this._src, "-").concat(this._scalingOptions.type, "-").concat(this._scalingOptions.w, "-").concat(this._scalingOptions.h);
    }
    getNonDefaults() {
      const obj = super.getNonDefaults();
      if (this._src) {
        obj.src = this._src;
      }
      return obj;
    }
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const events = ['timeupdate', 'error', 'ended', 'loadeddata', 'canplay', 'play', 'playing', 'pause', 'loadstart', 'seeking', 'seeked', 'encrypted'];
  let mediaUrl = url => url;
  const initMediaPlayer = config => {
    if (config.mediaUrl) {
      mediaUrl = config.mediaUrl;
    }
  };
  class Mediaplayer extends Lightning$1.Component {
    _construct() {
      this._skipRenderToTexture = false;
      this._metrics = null;
      this._textureMode = Settings$1.get('platform', 'textureMode') || false;
      Log$1.info('Texture mode: ' + this._textureMode);
      console.warn(["The 'MediaPlayer'-plugin in the Lightning-SDK is deprecated and will be removed in future releases.", "Please consider using the new 'VideoPlayer'-plugin instead.", 'https://rdkcentral.github.io/Lightning-SDK/#/plugins/videoplayer'].join('\n\n'));
    }
    static _template() {
      return {
        Video: {
          VideoWrap: {
            VideoTexture: {
              visible: false,
              pivot: 0.5,
              texture: {
                type: Lightning$1.textures.StaticTexture,
                options: {}
              }
            }
          }
        }
      };
    }
    set skipRenderToTexture(v) {
      this._skipRenderToTexture = v;
    }
    get textureMode() {
      return this._textureMode;
    }
    get videoView() {
      return this.tag('Video');
    }
    _init() {
      //re-use videotag if already there
      const videoEls = document.getElementsByTagName('video');
      if (videoEls && videoEls.length > 0) this.videoEl = videoEls[0];else {
        this.videoEl = document.createElement('video');
        this.videoEl.setAttribute('id', 'video-player');
        this.videoEl.style.position = 'absolute';
        this.videoEl.style.zIndex = '1';
        this.videoEl.style.display = 'none';
        this.videoEl.setAttribute('width', '100%');
        this.videoEl.setAttribute('height', '100%');
        this.videoEl.style.visibility = this.textureMode ? 'hidden' : 'visible';
        document.body.appendChild(this.videoEl);
      }
      if (this.textureMode && !this._skipRenderToTexture) {
        this._createVideoTexture();
      }
      this.eventHandlers = [];
    }
    _registerListeners() {
      events.forEach(event => {
        const handler = e => {
          if (this._metrics && this._metrics[event] && typeof this._metrics[event] === 'function') {
            this._metrics[event]({
              currentTime: this.videoEl.currentTime
            });
          }
          this.fire(event, {
            videoElement: this.videoEl,
            event: e
          });
        };
        this.eventHandlers.push(handler);
        this.videoEl.addEventListener(event, handler);
      });
    }
    _deregisterListeners() {
      Log$1.info('Deregistering event listeners MediaPlayer');
      events.forEach((event, index) => {
        this.videoEl.removeEventListener(event, this.eventHandlers[index]);
      });
      this.eventHandlers = [];
    }
    _attach() {
      this._registerListeners();
    }
    _detach() {
      this._deregisterListeners();
      this.close();
    }
    _createVideoTexture() {
      const stage = this.stage;
      const gl = stage.gl;
      const glTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      this.videoTexture.options = {
        source: glTexture,
        w: this.videoEl.width,
        h: this.videoEl.height
      };
    }
    _startUpdatingVideoTexture() {
      if (this.textureMode && !this._skipRenderToTexture) {
        const stage = this.stage;
        if (!this._updateVideoTexture) {
          this._updateVideoTexture = () => {
            if (this.videoTexture.options.source && this.videoEl.videoWidth && this.active) {
              const gl = stage.gl;
              const currentTime = new Date().getTime();

              // When BR2_PACKAGE_GST1_PLUGINS_BAD_PLUGIN_DEBUGUTILS is not set in WPE, webkitDecodedFrameCount will not be available.
              // We'll fallback to fixed 30fps in this case.
              const frameCount = this.videoEl.webkitDecodedFrameCount;
              const mustUpdate = frameCount ? this._lastFrame !== frameCount : this._lastTime < currentTime - 30;
              if (mustUpdate) {
                this._lastTime = currentTime;
                this._lastFrame = frameCount;
                try {
                  gl.bindTexture(gl.TEXTURE_2D, this.videoTexture.options.source);
                  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.videoEl);
                  this._lastFrame = this.videoEl.webkitDecodedFrameCount;
                  this.videoTextureView.visible = true;
                  this.videoTexture.options.w = this.videoEl.videoWidth;
                  this.videoTexture.options.h = this.videoEl.videoHeight;
                  const expectedAspectRatio = this.videoTextureView.w / this.videoTextureView.h;
                  const realAspectRatio = this.videoEl.videoWidth / this.videoEl.videoHeight;
                  if (expectedAspectRatio > realAspectRatio) {
                    this.videoTextureView.scaleX = realAspectRatio / expectedAspectRatio;
                    this.videoTextureView.scaleY = 1;
                  } else {
                    this.videoTextureView.scaleY = expectedAspectRatio / realAspectRatio;
                    this.videoTextureView.scaleX = 1;
                  }
                } catch (e) {
                  Log$1.error('texImage2d video', e);
                  this._stopUpdatingVideoTexture();
                  this.videoTextureView.visible = false;
                }
                this.videoTexture.source.forceRenderUpdate();
              }
            }
          };
        }
        if (!this._updatingVideoTexture) {
          stage.on('frameStart', this._updateVideoTexture);
          this._updatingVideoTexture = true;
        }
      }
    }
    _stopUpdatingVideoTexture() {
      if (this.textureMode) {
        const stage = this.stage;
        stage.removeListener('frameStart', this._updateVideoTexture);
        this._updatingVideoTexture = false;
        this.videoTextureView.visible = false;
        if (this.videoTexture.options.source) {
          const gl = stage.gl;
          gl.bindTexture(gl.TEXTURE_2D, this.videoTexture.options.source);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
      }
    }
    updateSettings() {
      let settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // The Component that 'consumes' the media player.
      this._consumer = settings.consumer;
      if (this._consumer && this._consumer.getMediaplayerSettings) {
        // Allow consumer to add settings.
        settings = Object.assign(settings, this._consumer.getMediaplayerSettings());
      }
      if (!Lightning$1.Utils.equalValues(this._stream, settings.stream)) {
        if (settings.stream && settings.stream.keySystem) {
          navigator.requestMediaKeySystemAccess(settings.stream.keySystem.id, settings.stream.keySystem.config).then(keySystemAccess => {
            return keySystemAccess.createMediaKeys();
          }).then(createdMediaKeys => {
            return this.videoEl.setMediaKeys(createdMediaKeys);
          }).then(() => {
            if (settings.stream && settings.stream.src) this.open(settings.stream.src);
          }).catch(() => {
            console.error('Failed to set up MediaKeys');
          });
        } else if (settings.stream && settings.stream.src) {
          // This is here to be backwards compatible, will be removed
          // in future sdk release
          if (Settings$1.get('app', 'hls')) {
            if (!window.Hls) {
              window.Hls = class Hls {
                static isSupported() {
                  console.warn('hls-light not included');
                  return false;
                }
              };
            }
            if (window.Hls.isSupported()) {
              if (!this._hls) this._hls = new window.Hls({
                liveDurationInfinity: true
              });
              this._hls.loadSource(settings.stream.src);
              this._hls.attachMedia(this.videoEl);
              this.videoEl.style.display = 'block';
            }
          } else {
            this.open(settings.stream.src);
          }
        } else {
          this.close();
        }
        this._stream = settings.stream;
      }
      this._setHide(settings.hide);
      this._setVideoArea(settings.videoPos);
    }
    _setHide(hide) {
      if (this.textureMode) {
        this.tag('Video').setSmooth('alpha', hide ? 0 : 1);
      } else {
        this.videoEl.style.visibility = hide ? 'hidden' : 'visible';
      }
    }
    open(url) {
      let settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        hide: false,
        videoPosition: null
      };
      // prep the media url to play depending on platform (mediaPlayerplugin)
      url = mediaUrl(url);
      this._metrics = Metrics$1.media(url);
      Log$1.info('Playing stream', url);
      if (this.application.noVideo) {
        Log$1.info('noVideo option set, so ignoring: ' + url);
        return;
      }
      // close the video when opening same url as current (effectively reloading)
      if (this.videoEl.getAttribute('src') === url) {
        this.close();
      }
      this.videoEl.setAttribute('src', url);

      // force hide, then force show (in next tick!)
      // (fixes comcast playback rollover issue)
      this.videoEl.style.visibility = 'hidden';
      this.videoEl.style.display = 'none';
      setTimeout(() => {
        this.videoEl.style.display = 'block';
        this.videoEl.style.visibility = 'visible';
      });
      this._setHide(settings.hide);
      this._setVideoArea(settings.videoPosition || [0, 0, 1920, 1080]);
    }
    close() {
      // We need to pause first in order to stop sound.
      this.videoEl.pause();
      this.videoEl.removeAttribute('src');

      // force load to reset everything without errors
      this.videoEl.load();
      this._clearSrc();
      this.videoEl.style.display = 'none';
    }
    playPause() {
      if (this.isPlaying()) {
        this.doPause();
      } else {
        this.doPlay();
      }
    }
    get muted() {
      return this.videoEl.muted;
    }
    set muted(v) {
      this.videoEl.muted = v;
    }
    get loop() {
      return this.videoEl.loop;
    }
    set loop(v) {
      this.videoEl.loop = v;
    }
    isPlaying() {
      return this._getState() === 'Playing';
    }
    doPlay() {
      this.videoEl.play();
    }
    doPause() {
      this.videoEl.pause();
    }
    reload() {
      var url = this.videoEl.getAttribute('src');
      this.close();
      this.videoEl.src = url;
    }
    getPosition() {
      return Promise.resolve(this.videoEl.currentTime);
    }
    setPosition(pos) {
      this.videoEl.currentTime = pos;
    }
    getDuration() {
      return Promise.resolve(this.videoEl.duration);
    }
    seek(time) {
      let absolute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (absolute) {
        this.videoEl.currentTime = time;
      } else {
        this.videoEl.currentTime += time;
      }
    }
    get videoTextureView() {
      return this.tag('Video').tag('VideoTexture');
    }
    get videoTexture() {
      return this.videoTextureView.texture;
    }
    _setVideoArea(videoPos) {
      if (Lightning$1.Utils.equalValues(this._videoPos, videoPos)) {
        return;
      }
      this._videoPos = videoPos;
      if (this.textureMode) {
        this.videoTextureView.patch({
          smooth: {
            x: videoPos[0],
            y: videoPos[1],
            w: videoPos[2] - videoPos[0],
            h: videoPos[3] - videoPos[1]
          }
        });
      } else {
        const precision = this.stage.getRenderPrecision();
        this.videoEl.style.left = Math.round(videoPos[0] * precision) + 'px';
        this.videoEl.style.top = Math.round(videoPos[1] * precision) + 'px';
        this.videoEl.style.width = Math.round((videoPos[2] - videoPos[0]) * precision) + 'px';
        this.videoEl.style.height = Math.round((videoPos[3] - videoPos[1]) * precision) + 'px';
      }
    }
    _fireConsumer(event, args) {
      if (this._consumer) {
        this._consumer.fire(event, args);
      }
    }
    _equalInitData(buf1, buf2) {
      if (!buf1 || !buf2) return false;
      if (buf1.byteLength != buf2.byteLength) return false;
      const dv1 = new Int8Array(buf1);
      const dv2 = new Int8Array(buf2);
      for (let i = 0; i != buf1.byteLength; i++) if (dv1[i] != dv2[i]) return false;
      return true;
    }
    error(args) {
      this._fireConsumer('$mediaplayerError', args);
      this._setState('');
      return '';
    }
    loadeddata(args) {
      this._fireConsumer('$mediaplayerLoadedData', args);
    }
    play(args) {
      this._fireConsumer('$mediaplayerPlay', args);
    }
    playing(args) {
      this._fireConsumer('$mediaplayerPlaying', args);
      this._setState('Playing');
    }
    canplay(args) {
      this.videoEl.play();
      this._fireConsumer('$mediaplayerStart', args);
    }
    loadstart(args) {
      this._fireConsumer('$mediaplayerLoad', args);
    }
    seeked() {
      this._fireConsumer('$mediaplayerSeeked', {
        currentTime: this.videoEl.currentTime,
        duration: this.videoEl.duration || 1
      });
    }
    seeking() {
      this._fireConsumer('$mediaplayerSeeking', {
        currentTime: this.videoEl.currentTime,
        duration: this.videoEl.duration || 1
      });
    }
    durationchange(args) {
      this._fireConsumer('$mediaplayerDurationChange', args);
    }
    encrypted(args) {
      const video = args.videoElement;
      const event = args.event;
      // FIXME: Double encrypted events need to be properly filtered by Gstreamer
      if (video.mediaKeys && !this._equalInitData(this._previousInitData, event.initData)) {
        this._previousInitData = event.initData;
        this._fireConsumer('$mediaplayerEncrypted', args);
      }
    }
    static _states() {
      return [class Playing extends this {
        $enter() {
          this._startUpdatingVideoTexture();
        }
        $exit() {
          this._stopUpdatingVideoTexture();
        }
        timeupdate() {
          this._fireConsumer('$mediaplayerProgress', {
            currentTime: this.videoEl.currentTime,
            duration: this.videoEl.duration || 1
          });
        }
        ended(args) {
          this._fireConsumer('$mediaplayerEnded', args);
          this._setState('');
        }
        pause(args) {
          this._fireConsumer('$mediaplayerPause', args);
          this._setState('Playing.Paused');
        }
        _clearSrc() {
          this._fireConsumer('$mediaplayerStop', {});
          this._setState('');
        }
        static _states() {
          return [class Paused extends this {}];
        }
      }];
    }
  }

  class localCookie {
    constructor(e) {
      return e = e || {}, this.forceCookies = e.forceCookies || !1, !0 === this._checkIfLocalStorageWorks() && !0 !== e.forceCookies ? {
        getItem: this._getItemLocalStorage,
        setItem: this._setItemLocalStorage,
        removeItem: this._removeItemLocalStorage,
        clear: this._clearLocalStorage,
        keys: this._getLocalStorageKeys
      } : {
        getItem: this._getItemCookie,
        setItem: this._setItemCookie,
        removeItem: this._removeItemCookie,
        clear: this._clearCookies,
        keys: this._getCookieKeys
      };
    }
    _checkIfLocalStorageWorks() {
      if ("undefined" == typeof localStorage) return !1;
      try {
        return localStorage.setItem("feature_test", "yes"), "yes" === localStorage.getItem("feature_test") && (localStorage.removeItem("feature_test"), !0);
      } catch (e) {
        return !1;
      }
    }
    _getItemLocalStorage(e) {
      return window.localStorage.getItem(e);
    }
    _setItemLocalStorage(e, t) {
      return window.localStorage.setItem(e, t);
    }
    _removeItemLocalStorage(e) {
      return window.localStorage.removeItem(e);
    }
    _clearLocalStorage() {
      return window.localStorage.clear();
    }
    _getLocalStorageKeys() {
      return Object.keys(window.localStorage);
    }
    _getItemCookie(e) {
      var t = document.cookie.match(RegExp("(?:^|;\\s*)" + function (e) {
        return e.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1");
      }(e) + "=([^;]*)"));
      return t && "" === t[1] && (t[1] = null), t ? t[1] : null;
    }
    _setItemCookie(e, t) {
      var o = new Date(),
        r = new Date(o.getTime() + 15768e7);
      document.cookie = "".concat(e, "=").concat(t, "; expires=").concat(r.toUTCString(), ";");
    }
    _removeItemCookie(e) {
      document.cookie = "".concat(e, "=;Max-Age=-99999999;");
    }
    _clearCookies() {
      document.cookie.split(";").forEach(e => {
        document.cookie = e.replace(/^ +/, "").replace(/=.*/, "=;expires=Max-Age=-99999999");
      });
    }
    _getCookieKeys() {
      return document.cookie.split(";").map(e => e.split("=")[0]);
    }
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const initStorage = () => {
    Settings$1.get('platform', 'id');
    // todo: pass options (for example to force the use of cookies)
    new localCookie();
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const hasRegex = /\{\/(.*?)\/([igm]{0,3})\}/g;
  const isWildcard = /^[!*$]$/;
  const hasLookupId = /\/:\w+?@@([0-9]+?)@@/;
  const isNamedGroup = /^\/:/;

  /**
   * Test if a route is part regular expressed
   * and replace it for a simple character
   * @param route
   * @returns {*}
   */
  const stripRegex = function (route) {
    let char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'R';
    // if route is part regular expressed we replace
    // the regular expression for a character to
    // simplify floor calculation and backtracking
    if (hasRegex.test(route)) {
      route = route.replace(hasRegex, char);
    }
    return route;
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Create a local request register
   * @param flags
   * @returns {Map<any, any>}
   */
  const createRegister = flags => {
    const reg = new Map()
    // store user defined and router
    // defined flags in register
  ;
    [...Object.keys(flags), ...Object.getOwnPropertySymbols(flags)].forEach(key => {
      reg.set(key, flags[key]);
    });
    return reg;
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class Request {
    constructor() {
      let hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      let navArgs = arguments.length > 1 ? arguments[1] : undefined;
      let storeCaller = arguments.length > 2 ? arguments[2] : undefined;
      /**
       * Hash we navigate to
       * @type {string}
       * @private
       */
      this._hash = hash;

      /**
       * Do we store previous hash in history
       * @type {boolean}
       * @private
       */
      this._storeCaller = storeCaller;

      /**
       * Request and navigate data
       * @type {Map}
       * @private
       */
      this._register = new Map();

      /**
       * Flag if the instance is created due to
       * this request
       * @type {boolean}
       * @private
       */
      this._isCreated = false;

      /**
       * Flag if the instance is shared between
       * previous and current request
       * @type {boolean}
       * @private
       */
      this._isSharedInstance = false;

      /**
       * Flag if the request has been cancelled
       * @type {boolean}
       * @private
       */
      this._cancelled = false;

      /**
       * if instance is shared between requests we copy state object
       * from instance before the new request overrides state
       * @type {null}
       * @private
       */
      this._copiedHistoryState = null;

      // if there are arguments attached to navigate()
      // we store them in new request
      if (isObject(navArgs)) {
        this._register = createRegister(navArgs);
      } else if (isBoolean(navArgs)) {
        // if second navigate() argument is explicitly
        // set to false we prevent the calling page
        // from ending up in history
        this._storeCaller = navArgs;
      }
      // @todo: remove because we can simply check
      // ._storeCaller property
      this._register.set(symbols.store, this._storeCaller);
    }
    cancel() {
      Log$1.debug('[router]:', "cancelled ".concat(this._hash));
      this._cancelled = true;
    }
    get url() {
      return this._hash;
    }
    get register() {
      return this._register;
    }
    get hash() {
      return this._hash;
    }
    set hash(args) {
      this._hash = args;
    }
    get route() {
      return this._route;
    }
    set route(args) {
      this._route = args;
    }
    get provider() {
      return this._provider;
    }
    set provider(args) {
      this._provider = args;
    }
    get providerType() {
      return this._providerType;
    }
    set providerType(args) {
      this._providerType = args;
    }
    set page(args) {
      this._page = args;
    }
    get page() {
      return this._page;
    }
    set isCreated(args) {
      this._isCreated = args;
    }
    get isCreated() {
      return this._isCreated;
    }
    get isSharedInstance() {
      return this._isSharedInstance;
    }
    set isSharedInstance(args) {
      this._isSharedInstance = args;
    }
    get isCancelled() {
      return this._cancelled;
    }
    set copiedHistoryState(v) {
      this._copiedHistoryState = v;
    }
    get copiedHistoryState() {
      return this._copiedHistoryState;
    }
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class Route {
    constructor() {
      let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // keep backwards compatible
      let type = ['on', 'before', 'after'].reduce((acc, type) => {
        return isFunction(config[type]) ? type : acc;
      }, undefined);
      this._cfg = config;
      if (type) {
        this._provider = {
          type,
          request: config[type]
        };
      }
    }
    get path() {
      return this._cfg.path;
    }
    get name() {
      return this._cfg.name;
    }
    get component() {
      return this._cfg.component;
    }
    get options() {
      return this._cfg.options;
    }
    get widgets() {
      return this._cfg.widgets;
    }
    get cache() {
      return this._cfg.cache;
    }
    get hook() {
      return this._cfg.hook;
    }
    get beforeNavigate() {
      return this._cfg.beforeNavigate;
    }
    get provider() {
      return this._provider;
    }
  }

  /**
   * Simple route length calculation
   * @param route {string}
   * @returns {number} - floor
   */
  const getFloor = route => {
    return stripRegex(route).split('/').length;
  };

  /**
   * return all stored routes that live on the same floor
   * @param floor
   * @returns {Array}
   */
  const getRoutesByFloor = floor => {
    const matches = [];
    // simple filter of level candidates
    for (let _ref of routes.entries()) {
      var _ref2 = _slicedToArray(_ref, 1);
      let route = _ref2[0];
      if (getFloor(route) === floor) {
        matches.push(route);
      }
    }
    return matches;
  };

  /**
   * return a matching route by provided hash
   * hash: home/browse/12 will match:
   * route: home/browse/:categoryId
   * @param hash {string}
   * @returns {boolean|{}} - route
   */
  const getRouteByHash = hash => {
    // @todo: clean up on handleHash
    hash = hash.replace(/^#/, '');
    const getUrlParts = /(\/?:?[^/]+)/g;
    // grab possible candidates from stored routes
    const candidates = getRoutesByFloor(getFloor(hash));
    // break hash down in chunks
    const hashParts = hash.match(getUrlParts) || [];

    // to simplify the route matching and prevent look around
    // in our getUrlParts regex we get the regex part from
    // route candidate and store them so that we can reference
    // them when we perform the actual regex against hash
    let regexStore = [];
    let matches = candidates.filter(route => {
      let isMatching = true;
      // replace regex in route with lookup id => @@{storeId}@@
      if (hasRegex.test(route)) {
        const regMatches = route.match(hasRegex);
        if (regMatches && regMatches.length) {
          route = regMatches.reduce((fullRoute, regex) => {
            const lookupId = regexStore.length;
            fullRoute = fullRoute.replace(regex, "@@".concat(lookupId, "@@"));
            regexStore.push(regex.substring(1, regex.length - 1));
            return fullRoute;
          }, route);
        }
      }
      const routeParts = route.match(getUrlParts) || [];
      for (let i = 0, j = routeParts.length; i < j; i++) {
        const routePart = routeParts[i];
        const hashPart = hashParts[i];

        // Since we support catch-all and regex driven name groups
        // we first test for regex lookup id and see if the regex
        // matches the value from the hash
        if (hasLookupId.test(routePart)) {
          const routeMatches = hasLookupId.exec(routePart);
          const storeId = routeMatches[1];
          const routeRegex = regexStore[storeId];

          // split regex and modifiers so we can use both
          // to create a new RegExp
          // eslint-disable-next-line
          const regMatches = /\/([^\/]+)\/([igm]{0,3})/.exec(routeRegex);
          if (regMatches && regMatches.length) {
            const expression = regMatches[1];
            const modifiers = regMatches[2];
            const regex = new RegExp("^/".concat(expression, "$"), modifiers);
            if (!regex.test(hashPart)) {
              isMatching = false;
            }
          }
        } else if (isNamedGroup.test(routePart)) {
          // we kindly skip namedGroups because this is dynamic
          // we only need to the static and regex drive parts
          continue;
        } else if (hashPart && routePart.toLowerCase() !== hashPart.toLowerCase()) {
          isMatching = false;
        }
      }
      return isMatching;
    });
    if (matches.length) {
      if (matches.indexOf(hash) !== -1) {
        const match = matches[matches.indexOf(hash)];
        return routes.get(match);
      } else {
        // we give prio to static routes over dynamic
        matches = matches.sort(a => {
          return isNamedGroup.test(a) ? -1 : 1;
        });
        // would be strange if this fails
        // but still we test
        if (routeExists(matches[0])) {
          return routes.get(matches[0]);
        }
      }
    }
    return false;
  };
  const getValuesFromHash = function () {
    let hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let path = arguments.length > 1 ? arguments[1] : undefined;
    // replace the regex definition from the route because
    // we already did the matching part
    path = stripRegex(path, '');
    const getUrlParts = /(\/?:?[\w%\s:.-]+)/g;
    const hashParts = hash.match(getUrlParts) || [];
    const routeParts = path.match(getUrlParts) || [];
    const getNamedGroup = /^\/:([\w-]+)\/?/;
    return routeParts.reduce((storage, value, index) => {
      const match = getNamedGroup.exec(value);
      if (match && match.length) {
        storage.set(match[1], decodeURIComponent(hashParts[index].replace(/^\//, '')));
      }
      return storage;
    }, new Map());
  };
  const getOption = (stack, prop) => {
    // eslint-disable-next-line
    if (stack && stack.hasOwnProperty(prop)) {
      return stack[prop];
    }
    // we explicitly return undefined since we're testing
    // for explicit test values
  };

  /**
   * create and return new Route instance
   * @param config
   */
  const createRoute = config => {
    // we need to provide a bit of additional logic
    // for the bootComponent
    if (config.path === '$') {
      let options = {
        preventStorage: true
      };
      if (isObject(config.options)) {
        options = {
          ...config.options,
          ...options
        };
      }
      config.options = options;
      // if configured add reference to bootRequest
      // as router after provider
      if (bootRequest) {
        config.after = bootRequest;
      }
    }
    return new Route(config);
  };

  /**
   * Create a new Router request object
   * @param url
   * @param args
   * @param store
   * @returns {*}
   */
  const createRequest = (url, args, store) => {
    return new Request(url, args, store);
  };
  const getHashByName = obj => {
    if (!obj.to && !obj.name) {
      return false;
    }
    const route = getRouteByName(obj.to || obj.name);
    const hasDynamicGroup = /\/:([\w-]+)\/?/;
    let hash = route;

    // if route contains dynamic group
    // we replace them with the provided params
    if (hasDynamicGroup.test(route)) {
      if (obj.params) {
        const keys = Object.keys(obj.params);
        hash = keys.reduce((acc, key) => {
          return acc.replace(":".concat(key), obj.params[key]);
        }, route);
      }
      if (obj.query) {
        return "".concat(hash).concat(objectToQueryString(obj.query));
      }
    }
    return hash;
  };
  const getRouteByName = name => {
    for (let _ref3 of routes.entries()) {
      var _ref4 = _slicedToArray(_ref3, 2);
      let path = _ref4[0];
      let route = _ref4[1];
      if (route.name === name) {
        return path;
      }
    }
    return false;
  };
  const keepActivePageAlive = (route, request) => {
    if (isString(route)) {
      const routes = getRoutes();
      if (routes.has(route)) {
        route = routes.get(route);
      } else {
        return false;
      }
    }
    const register = request.register;
    const routeOptions = route.options;
    if (register.has('keepAlive')) {
      return register.get('keepAlive');
    } else if (routeOptions && routeOptions.keepAlive) {
      return routeOptions.keepAlive;
    }
    return false;
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var emit = (function (page) {
    let events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!isArray(events)) {
      events = [events];
    }
    events.forEach(e => {
      const event = "_on".concat(ucfirst(e));
      if (isFunction(page[event])) {
        page[event](params);
      }
    });
  });

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let activeWidget = null;
  const getReferences = () => {
    if (!widgetsHost) {
      return;
    }
    return widgetsHost.get().reduce((storage, widget) => {
      const key = widget.ref.toLowerCase();
      storage[key] = widget;
      return storage;
    }, {});
  };

  /**
   * update the visibility of the available widgets
   * for the current page / route
   * @param page
   */
  const updateWidgets = (widgets, page) => {
    // force lowercase lookup
    const configured = (widgets || []).map(ref => ref.toLowerCase());
    widgetsHost.forEach(widget => {
      widget.visible = configured.indexOf(widget.ref.toLowerCase()) !== -1;
      if (widget.visible) {
        emit(widget, ['activated'], page);
      }
    });
    if (app.state === 'Widgets' && activeWidget && !activeWidget.visible) {
      app._setState('');
    }
  };
  const getWidgetByName = name => {
    name = ucfirst(name);
    return widgetsHost.getByRef(name) || false;
  };

  /**
   * delegate app focus to a on-screen widget
   * @param name - {string}
   */
  const focusWidget = name => {
    const widget = getWidgetByName(name);
    if (widget) {
      setActiveWidget(widget);

      // if app is already in 'Widgets' state we can assume that
      // focus has been delegated from one widget to another so
      // we need to set the new widget reference and trigger a
      // new focus calculation of Lightning's focuspath
      if (app.state === 'Widgets') {
        app.reload(activeWidget);
      } else {
        app._setState('Widgets', [activeWidget]);
      }
    }
  };
  const restoreFocus = () => {
    activeWidget = null;
    app._setState('');
  };
  const getActiveWidget = () => {
    return activeWidget;
  };
  const setActiveWidget = instance => {
    activeWidget = instance;
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const createComponent = (stage, type) => {
    return stage.c({
      type,
      visible: false,
      widgets: getReferences()
    });
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Simple flat array that holds the visited hashes + state Object
   * so the router can navigate back to them
   * @type {Array}
   */
  let history = [];
  const updateHistory = request => {
    const hash = getActiveHash();
    if (!hash) {
      return;
    }

    // navigate storage flag
    const register = request.register;
    const forceNavigateStore = register.get(symbols.store);

    // test preventStorage on route configuration
    const activeRoute = getRouteByHash(hash);
    const preventStorage = getOption(activeRoute.options, 'preventStorage');

    // we give prio to navigate storage flag
    let store = isBoolean(forceNavigateStore) ? forceNavigateStore : !preventStorage;
    if (store) {
      const toStore = hash.replace(/^\//, '');
      const location = locationInHistory(toStore);
      const stateObject = getStateObject(getActivePage(), request);
      const routerConfig = getRouterConfig();

      // store hash if it's not a part of history or flag for
      // storage of same hash is true
      if (location === -1 || routerConfig.get('storeSameHash')) {
        history.push({
          hash: toStore,
          state: stateObject
        });
      } else {
        // if we visit the same route we want to sync history
        const prev = history.splice(location, 1)[0];
        history.push({
          hash: prev.hash,
          state: stateObject
        });
      }
    }
  };
  const locationInHistory = hash => {
    for (let i = 0; i < history.length; i++) {
      if (history[i].hash === hash) {
        return i;
      }
    }
    return -1;
  };
  const getHistoryState = hash => {
    let state = null;
    if (history.length) {
      // if no hash is provided we get the last
      // pushed history record
      if (!hash) {
        const record = history[history.length - 1];
        // could be null
        state = record.state;
      } else {
        if (locationInHistory(hash) !== -1) {
          const record = history[locationInHistory(hash)];
          state = record.state;
        }
      }
    }
    return state;
  };
  const replaceHistoryState = function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let hash = arguments.length > 1 ? arguments[1] : undefined;
    if (!history.length) {
      return;
    }
    const location = hash ? locationInHistory(hash) : history.length - 1;
    if (location !== -1 && isObject(state)) {
      history[location].state = state;
    }
  };
  const getStateObject = (page, request) => {
    // if the new request shared instance with the
    // previous request we used the copied state object
    if (request.isSharedInstance) {
      if (request.copiedHistoryState) {
        return request.copiedHistoryState;
      }
    } else if (page && isFunction(page.historyState)) {
      return page.historyState();
    }
    return null;
  };
  const getHistory = () => {
    return history.slice(0);
  };
  const setHistory = function () {
    let arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (isArray(arr)) {
      history = arr;
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @type {Lightning.Application}
   */
  let application;

  /**
   * Actual instance of the app
   * @type {Lightning.Component}
   */
  let app;

  /**
   * Component that hosts all routed pages
   * @type {Lightning.Component}
   */
  let pagesHost;

  /**
   * @type {Lightning.Stage}
   */
  let stage;

  /**
   * Platform driven Router configuration
   * @type {Map<string>}
   */
  let routerConfig;

  /**
   * Component that hosts all attached widgets
   * @type {Lightning.Component}
   */
  let widgetsHost;

  /**
   * Hash we point the browser to when we boot the app
   * and there is no deep-link provided
   * @type {string|Function}
   */
  let rootHash;

  /**
   * Boot request will fire before app start
   * can be used to execute some global logic
   * and can be configured
   */
  let bootRequest;

  /**
   * Flag if we need to update the browser location hash.
   * Router can work without.
   * @type {boolean}
   */
  let updateHash = true;

  /**
   * Will be called before a route starts, can be overridden
   * via routes config
   * @param from - route we came from
   * @param to - route we navigate to
   * @returns {Promise<*>}
   */
  // eslint-disable-next-line
  let beforeEachRoute = async (from, to) => {
    return true;
  };

  /**
   *  * Will be called after a navigate successfully resolved,
   * can be overridden via routes config
   */
  let afterEachRoute = () => {};

  /**
   * All configured routes
   * @type {Map<string, object>}
   */
  let routes = new Map();

  /**
   * Store all page components per route
   * @type {Map<string, object>}
   */
  let components = new Map();

  /**
   * Flag if router has been initialised
   * @type {boolean}
   */
  let initialised = false;

  /**
   * Current page being rendered on screen
   * @type {null}
   */
  let activePage = null;
  let activeHash;
  let activeRoute;

  /**
   *  During the process of a navigation request a new
   *  request can start, to prevent unwanted behaviour
   *  the navigate()-method stores the last accepted hash
   *  so we can invalidate any prior requests
   */
  let lastAcceptedHash;

  /**
   * With on()-data providing behaviour the Router forced the App
   * in a Loading state. When the data-provider resolves we want to
   * change the state back to where we came from
   */
  let previousState;
  const mixin = app => {
    // by default the Router Baseclass provides the component
    // reference in which we store our pages
    if (app.pages) {
      pagesHost = app.pages.childList;
    }
    // if the app is using widgets we grab refs
    // and hide all the widgets
    if (app.widgets && app.widgets.children) {
      widgetsHost = app.widgets.childList;
      // hide all widgets on boot
      widgetsHost.forEach(w => w.visible = false);
    }
    app._handleBack = e => {
      step(-1);
      e.preventDefault();
    };
  };
  const bootRouter = (config, instance) => {
    let appInstance = config.appInstance,
      routes = config.routes;

    // if instance is provided and it's and Lightning Component instance
    if (instance && isPage(instance)) {
      app = instance;
    }
    if (!app) {
      app = appInstance || AppInstance;
    }
    application = app.application;
    pagesHost = application.childList;
    stage = app.stage;
    routerConfig = getConfigMap();
    mixin(app);
    if (isArray(routes)) {
      setup(config);
    } else if (isFunction(routes)) {
      console.warn('[Router]: Calling Router.route() directly is deprecated.');
      console.warn('Use object config: https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/configuration');
    }
  };
  const setup = config => {
    if (!initialised) {
      init(config);
    }
    config.routes.forEach(r => {
      const path = cleanHash(r.path);
      if (!routeExists(path)) {
        const route = createRoute(r);
        routes.set(path, route);
        // if route has a configured component property
        // we store it in a different map to simplify
        // the creating and destroying per route
        if (route.component) {
          let type = route.component;
          if (isComponentConstructor(type)) {
            if (!routerConfig.get('lazyCreate')) {
              type = createComponent(stage, type);
              pagesHost.a(type);
            }
          }
          components.set(path, type);
        }
      } else {
        console.error("".concat(path, " already exists in routes configuration"));
      }
    });
  };
  const init = config => {
    rootHash = config.root;
    if (isFunction(config.boot)) {
      bootRequest = config.boot;
    }
    if (isBoolean(config.updateHash)) {
      updateHash = config.updateHash;
    }
    if (isFunction(config.beforeEachRoute)) {
      beforeEachRoute = config.beforeEachRoute;
    }
    if (isFunction(config.afterEachRoute)) {
      afterEachRoute = config.afterEachRoute;
    }
    if (config.bootComponent) {
      console.warn('[Router]: Boot Component is now available as a special router: https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/configuration?id=special-routes');
      console.warn('[Router]: setting { bootComponent } property will be deprecated in a future release');
      if (isPage(config.bootComponent)) {
        config.routes.push({
          path: '$',
          component: config.bootComponent,
          // we try to assign the bootRequest as after data-provider
          // so it will behave as any other component
          after: bootRequest || null,
          options: {
            preventStorage: true
          }
        });
      } else {
        console.error("[Router]: ".concat(config.bootComponent, " is not a valid boot component"));
      }
    }
    config.routes.forEach(item => {
      // replacing regexes with 'R' to avoid issues with pattern matching below
      const strippedPath = stripRegex(item.path);

      // Pattern to identify the last path of the route
      // It should start with "/:" + any word  and ends with "?"
      // It should be the last path of the route
      // valid => /player/:asset/:assetId? (:assetId is optional)
      // invalid => /player/:asset/:assetId?/test (:assetId? is not an optional path)
      // invalid => /player/:asset?/:assetId? (second path is not considered as an optional path)
      const pattern = /.*\/:.*?\?$/u;
      if (pattern.test(strippedPath)) {
        const optionalPath = item.path.substring(0, item.path.lastIndexOf('/'));
        const originalPath = item.path.substring(0, item.path.lastIndexOf('?'));
        item.path = originalPath;
        //Create another entry with the optional path
        let optionalItem = {
          ...item
        };
        optionalItem.path = optionalPath;
        config.routes.push(optionalItem);
      }
    });
    initialised = true;
  };
  const storeComponent = (route, type) => {
    if (components.has(route)) {
      components.set(route, type);
    }
  };
  const getComponent = route => {
    if (components.has(route)) {
      return components.get(route);
    }
    return null;
  };

  // delete existing route instance from memory
  const deleteCurrentInstance = route => {
    if (components.has(route) && pagesHost.getIndex(components.get(route)) !== -1) {
      pagesHost.remove(components.get(route));
      storeComponent(route, components.get(route)._routedType || components.get(route).constructor);
    }
  };

  /**
   * Test if router needs to update browser location hash
   * @returns {boolean}
   */
  const mustUpdateLocationHash = () => {
    if (!routerConfig || !routerConfig.size) {
      return false;
    }
    // we need support to either turn change hash off
    // per platform or per app
    const updateConfig = routerConfig.get('updateHash');
    return !(isBoolean(updateConfig) && !updateConfig || isBoolean(updateHash) && !updateHash);
  };

  /**
   * Will be called when a new navigate() request has completed
   * and has not been expired due to it's async nature
   * @param request
   */
  const onRequestResolved = request => {
    const hash = request.hash;
    const route = request.route;
    const register = request.register;
    const page = request.page;

    // clean up history if modifier is set
    if (getOption(route.options, 'clearHistory')) {
      setHistory([]);
    } else if (hash && !isWildcard.test(route.path)) {
      updateHistory(request);
    }

    // we only update the stackLocation if a route
    // is not expired before it resolves
    storeComponent(route.path, page);
    if (request.isSharedInstance || !request.isCreated) {
      emit(page, 'changed');
    } else if (request.isCreated) {
      emit(page, 'mounted');
    }

    // only update widgets if we have a host
    if (widgetsHost) {
      updateWidgets(route.widgets, page);
    }

    // we want to clean up if there is an
    // active page that is not being shared
    // between current and previous route
    if (getActivePage() && !request.isSharedInstance) {
      cleanUp(activePage, request);
    }

    // provide history object to active page
    if (register.get(symbols.historyState) && isFunction(page.historyState)) {
      page.historyState(register.get(symbols.historyState));
    }
    setActivePage(page);
    activeHash = request.hash;
    activeRoute = route.path;

    // cleanup all cancelled requests
    for (let request of navigateQueue.values()) {
      if (request.isCancelled && request.hash) {
        navigateQueue.delete(request.hash);
      }
    }
    afterEachRoute(request);
    Log$1.info('[route]:', route.path);
    Log$1.info('[hash]:', hash);
  };
  const cleanUp = (page, request) => {
    const route = activeRoute;
    const register = request.register;
    const lazyDestroy = routerConfig.get('lazyDestroy');
    const destroyOnBack = routerConfig.get('destroyOnHistoryBack');
    const keepAlive = register.get('keepAlive');
    const isFromHistory = register.get(symbols.backtrack);
    let doCleanup = false;

    // if this request is executed due to a step back in history
    // and we have configured to destroy active page when we go back
    // in history or lazyDestory is enabled
    if (isFromHistory && (destroyOnBack || lazyDestroy)) {
      doCleanup = true;
    }

    // clean up if lazyDestroy is enabled and the keepAlive flag
    // in navigation register is false
    if (lazyDestroy && !keepAlive) {
      doCleanup = true;
    }

    // if the current and new request share the same route blueprint
    if (activeRoute === request.route.path) {
      doCleanup = true;
    }
    if (doCleanup) {
      // grab original class constructor if
      // statemachine routed else store constructor
      storeComponent(route, page._routedType || page.constructor);

      // actual remove of page from memory
      pagesHost.remove(page);

      // force texture gc() if configured
      // so we can cleanup textures in the same tick
      if (routerConfig.get('gcOnUnload')) {
        stage.gc();
      }
    } else {
      // If we're not removing the page we need to
      // reset it's properties
      page.patch({
        x: 0,
        y: 0,
        scale: 1,
        visible: false,
        alpha: 1
      });
    }
  };
  const getActiveHash = () => {
    return activeHash;
  };
  const setActivePage = page => {
    activePage = page;
  };
  const getActivePage = () => {
    return activePage;
  };
  const getActiveRoute = () => {
    return activeRoute;
  };
  const getLastHash = () => {
    return lastAcceptedHash;
  };
  const setLastHash = hash => {
    lastAcceptedHash = hash;
  };
  const setPreviousState = state => {
    previousState = state;
  };
  const getPreviousState = () => {
    return previousState;
  };
  const routeExists = key => {
    return routes.has(key);
  };
  const getRootHash = () => {
    return rootHash;
  };
  const getBootRequest = () => {
    return bootRequest;
  };
  const getRouterConfig = () => {
    return routerConfig;
  };
  const getRoutes = () => {
    return routes;
  };

  const isFunction = v => {
    return typeof v === 'function';
  };
  const isObject = v => {
    return typeof v === 'object' && v !== null;
  };
  const isBoolean = v => {
    return typeof v === 'boolean';
  };
  const isPage = v => {
    if (v instanceof Lightning$1.Element || isComponentConstructor(v)) {
      return true;
    }
    return false;
  };
  const isComponentConstructor = type => {
    return type.prototype && 'isComponent' in type.prototype;
  };
  const isArray = v => {
    return Array.isArray(v);
  };
  const ucfirst = v => {
    return "".concat(v.charAt(0).toUpperCase()).concat(v.slice(1));
  };
  const isString = v => {
    return typeof v === 'string';
  };
  const isPromise = method => {
    let result;
    if (isFunction(method)) {
      try {
        result = method.apply(null);
      } catch (e) {
        result = e;
      }
    } else {
      result = method;
    }
    return isObject(result) && isFunction(result.then);
  };
  const cleanHash = function () {
    let hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return hash.replace(/^#/, '').replace(/\/+$/, '');
  };
  const getConfigMap = () => {
    const routerSettings = Settings$1.get('platform', 'router');
    const isObj = isObject(routerSettings);
    return ['backtrack', 'gcOnUnload', 'destroyOnHistoryBack', 'lazyCreate', 'lazyDestroy', 'reuseInstance', 'autoRestoreRemote', 'numberNavigation', 'updateHash', 'storeSameHash'].reduce((config, key) => {
      config.set(key, isObj ? routerSettings[key] : Settings$1.get('platform', key));
      return config;
    }, new Map());
  };
  const getQueryStringParams = function () {
    let hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActiveHash();
    const resumeHash = getResumeHash();
    if ((hash === '$' || !hash) && resumeHash) {
      if (isString(resumeHash)) {
        hash = resumeHash;
      }
    }
    let parse = '';
    const getQuery = /([?&].*)/;
    const matches = getQuery.exec(hash);
    const params = {};
    if (document.location && document.location.search) {
      parse = document.location.search;
    }
    if (matches && matches.length) {
      let hashParams = matches[1];
      if (parse) {
        // if location.search is not empty we
        // remove the leading ? to create a
        // valid string
        hashParams = hashParams.replace(/^\?/, '');
        // we parse hash params last so they we can always
        // override search params with hash params
        parse = "".concat(parse, "&").concat(hashParams);
      } else {
        parse = hashParams;
      }
    }
    if (parse) {
      const urlParams = new URLSearchParams(parse);
      for (const _ref of urlParams.entries()) {
        var _ref2 = _slicedToArray(_ref, 2);
        const key = _ref2[0];
        const value = _ref2[1];
        params[key] = value;
      }
      return params;
    } else {
      return false;
    }
  };
  const objectToQueryString = obj => {
    if (!isObject(obj)) {
      return '';
    }
    return '?' + Object.keys(obj).map(key => {
      return "".concat(key, "=").concat(obj[key]);
    }).join('&');
  };
  const symbols = {
    route: Symbol('route'),
    hash: Symbol('hash'),
    store: Symbol('store'),
    fromHistory: Symbol('fromHistory'),
    expires: Symbol('expires'),
    resume: Symbol('resume'),
    backtrack: Symbol('backtrack'),
    historyState: Symbol('historyState'),
    queryParams: Symbol('queryParams')
  };

  const dataHooks = {
    on: request => {
      setPreviousState(app.state || '');
      app._setState('Loading');
      return execProvider(request);
    },
    before: request => {
      return execProvider(request);
    },
    after: request => {
      try {
        execProvider(request, true);
      } catch (e) {
        // for now we fail silently
      }
      return Promise.resolve();
    }
  };
  const execProvider = (request, emitProvided) => {
    const route = request.route;
    const provider = route.provider;
    const expires = route.cache ? route.cache * 1000 : 0;
    const params = addPersistData(request);
    return provider.request(request.page, {
      ...params
    }).then(() => {
      request.page[symbols.expires] = Date.now() + expires;
      if (emitProvided) {
        emit(request.page, 'dataProvided');
      }
    }).catch(e => {
      request.page[symbols.expires] = Date.now();
      throw e;
    });
  };
  const addPersistData = _ref => {
    let page = _ref.page,
      route = _ref.route,
      hash = _ref.hash,
      _ref$register = _ref.register,
      register = _ref$register === void 0 ? new Map() : _ref$register;
    const urlValues = getValuesFromHash(hash, route.path);
    const queryParams = getQueryStringParams(hash);
    const pageData = new Map([...urlValues, ...register]);
    const params = {};

    // make dynamic url data available to the page
    // as instance properties
    for (let _ref2 of pageData) {
      var _ref3 = _slicedToArray(_ref2, 2);
      let name = _ref3[0];
      let value = _ref3[1];
      params[name] = value;
    }
    if (queryParams) {
      params[symbols.queryParams] = queryParams;
    }

    // check navigation register for persistent data
    if (register.size) {
      const obj = {};
      for (let _ref4 of register) {
        var _ref5 = _slicedToArray(_ref4, 2);
        let k = _ref5[0];
        let v = _ref5[1];
        obj[k] = v;
      }
      page.persist = obj;
    }

    // make url data and persist data available
    // via params property
    page.params = params;
    emit(page, ['urlParams'], params);
    return params;
  };

  /**
   * Test if page passed cache-time
   * @param page
   * @returns {boolean}
   */
  const isPageExpired = page => {
    if (!page[symbols.expires]) {
      return false;
    }
    const expires = page[symbols.expires];
    const now = Date.now();
    return now >= expires;
  };
  const hasProvider = path => {
    if (routeExists(path)) {
      const record = routes.get(path);
      return !!record.provider;
    }
    return false;
  };
  const getProvider = route => {
    // @todo: fix, route already is passed in
    if (routeExists(route.path)) {
      const _routes$get = routes.get(route.path),
        provider = _routes$get.provider;
      return {
        type: provider.type,
        provider: provider.request
      };
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const fade = (i, o) => {
    return new Promise(resolve => {
      i.patch({
        alpha: 0,
        visible: true,
        smooth: {
          alpha: [1, {
            duration: 0.5,
            delay: 0.1
          }]
        }
      });
      // resolve on y finish
      i.transition('alpha').on('finish', () => {
        if (o) {
          o.visible = false;
        }
        resolve();
      });
    });
  };
  const crossFade = (i, o) => {
    return new Promise(resolve => {
      i.patch({
        alpha: 0,
        visible: true,
        smooth: {
          alpha: [1, {
            duration: 0.5,
            delay: 0.1
          }]
        }
      });
      if (o) {
        o.patch({
          smooth: {
            alpha: [0, {
              duration: 0.5,
              delay: 0.3
            }]
          }
        });
      }
      // resolve on y finish
      i.transition('alpha').on('finish', () => {
        resolve();
      });
    });
  };
  const moveOnAxes = (axis, direction, i, o) => {
    const bounds = axis === 'x' ? 1920 : 1080;
    return new Promise(resolve => {
      i.patch({
        ["".concat(axis)]: direction ? bounds * -1 : bounds,
        visible: true,
        smooth: {
          ["".concat(axis)]: [0, {
            duration: 0.4,
            delay: 0.2
          }]
        }
      });
      // out is optional
      if (o) {
        o.patch({
          ["".concat(axis)]: 0,
          smooth: {
            ["".concat(axis)]: [direction ? bounds : bounds * -1, {
              duration: 0.4,
              delay: 0.2
            }]
          }
        });
      }
      // resolve on y finish
      i.transition(axis).on('finish', () => {
        resolve();
      });
    });
  };
  const up = (i, o) => {
    return moveOnAxes('y', 0, i, o);
  };
  const down = (i, o) => {
    return moveOnAxes('y', 1, i, o);
  };
  const left = (i, o) => {
    return moveOnAxes('x', 0, i, o);
  };
  const right = (i, o) => {
    return moveOnAxes('x', 1, i, o);
  };
  var Transitions = {
    fade,
    crossFade,
    up,
    down,
    left,
    right
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * execute transition between new / old page and
   * toggle the defined widgets
   * @todo: platform override default transition
   * @param pageIn
   * @param pageOut
   */
  const executeTransition = function (pageIn) {
    let pageOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const transition = pageIn.pageTransition || pageIn.easing;
    const hasCustomTransitions = !!(pageIn.smoothIn || pageIn.smoothInOut || transition);
    const transitionsDisabled = getRouterConfig().get('disableTransitions');
    if (pageIn.easing) {
      console.warn('easing() method is deprecated and will be removed. Use pageTransition()');
    }

    // default behaviour is a visibility toggle
    if (!hasCustomTransitions || transitionsDisabled) {
      pageIn.visible = true;
      if (pageOut) {
        pageOut.visible = false;
      }
      return Promise.resolve();
    }
    if (transition) {
      let type;
      try {
        type = transition.call(pageIn, pageIn, pageOut);
      } catch (e) {
        type = 'crossFade';
      }
      if (isPromise(type)) {
        return type;
      }
      if (isString(type)) {
        const fn = Transitions[type];
        if (fn) {
          return fn(pageIn, pageOut);
        }
      }

      // keep backwards compatible for now
      if (pageIn.smoothIn) {
        // provide a smooth function that resolves itself
        // on transition finish
        const smooth = function (p, v) {
          let args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return new Promise(resolve => {
            pageIn.visible = true;
            pageIn.setSmooth(p, v, args);
            pageIn.transition(p).on('finish', () => {
              resolve();
            });
          });
        };
        return pageIn.smoothIn({
          pageIn,
          smooth
        });
      }
    }
    return Transitions.crossFade(pageIn, pageOut);
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * The actual loading of the component
   * */
  const load = async request => {
    let expired = false;
    try {
      request = await loader(request);
      if (request && !request.isCancelled) {
        // in case of on() providing we need to reset
        // app state;
        if (app.state === 'Loading') {
          if (getPreviousState() === 'Widgets') {
            app._setState('Widgets', [getActiveWidget()]);
          } else {
            app._setState('');
          }
        }
        // Do page transition if instance
        // is not shared between the routes
        if (!request.isSharedInstance && !request.isCancelled) {
          await executeTransition(request.page, getActivePage());
        }
      } else {
        expired = true;
      }
      // on expired we only cleanup
      if (expired || request.isCancelled) {
        Log$1.debug('[router]:', "Rejected ".concat(request.hash, " because route to ").concat(getLastHash(), " started"));
        if (request.isCreated && !request.isSharedInstance) {
          // remove from render-tree
          pagesHost.remove(request.page);
        }
      } else {
        onRequestResolved(request);
        // resolve promise
        return request.page;
      }
    } catch (request) {
      if (!request.route) {
        console.error(request);
      } else if (!expired) {
        // @todo: revisit
        const route = request.route;
        // clean up history if modifier is set
        if (getOption(route.options, 'clearHistory')) {
          setHistory([]);
        } else if (!isWildcard.test(route.path)) {
          updateHistory(request);
        }
        if (request.isCreated && !request.isSharedInstance) {
          // remove from render-tree
          pagesHost.remove(request.page);
        }
        handleError(request);
      }
    }
  };
  const loader = async request => {
    const route = request.route;
    const hash = request.hash;
    const register = request.register;

    // todo: grab from Route instance
    let type = getComponent(route.path);
    let isConstruct = isComponentConstructor(type);
    let provide = false;

    // if it's an instance bt we're not coming back from
    // history we test if we can re-use this instance
    if (!isConstruct && !register.get(symbols.backtrack)) {
      if (!mustReuse(route)) {
        type = type.constructor;
        isConstruct = true;
      }
    }

    // If page is Lightning Component instance
    if (!isConstruct) {
      request.page = type;
      // if we have have a data route for current page
      if (hasProvider(route.path)) {
        if (isPageExpired(type) || type[symbols.hash] !== hash) {
          provide = true;
        }
      }
      let currentRoute = getActivePage() && getActivePage()[symbols.route];
      // if the new route is equal to the current route it means that both
      // route share the Component instance and stack location / since this case
      // is conflicting with the way before() and after() loading works we flag it,
      // and check platform settings in we want to re-use instance
      if (route.path === currentRoute) {
        request.isSharedInstance = true;
        // since we're re-using the instance we must attach
        // historyState to the request to prevent it from
        // being overridden.
        if (isFunction(request.page.historyState)) {
          request.copiedHistoryState = request.page.historyState();
        }
      }
    } else {
      request.page = createComponent(stage, type);
      pagesHost.a(request.page);
      // test if need to request data provider
      if (hasProvider(route.path)) {
        provide = true;
      }
      request.isCreated = true;
    }

    // we store hash and route as properties on the page instance
    // that way we can easily calculate new behaviour on page reload
    request.page[symbols.hash] = hash;
    request.page[symbols.route] = route.path;
    try {
      if (provide) {
        // extract attached data-provider for route
        // we're processing
        const _getProvider = getProvider(route),
          loadType = _getProvider.type,
          provider = _getProvider.provider;

        // update running request
        request.provider = provider;
        request.providerType = loadType;
        await dataHooks[loadType](request);

        // we early exit if the current request is expired
        if (hash !== getLastHash()) {
          return false;
        } else {
          if (request.providerType !== 'after') {
            emit(request.page, 'dataProvided');
          }
          // resolve promise
          return request;
        }
      } else {
        addPersistData(request);
        return request;
      }
    } catch (e) {
      request.error = e;
      return Promise.reject(request);
    }
  };
  const handleError = request => {
    if (request && request.error) {
      console.error(request.error);
    } else if (request) {
      Log$1.error(request);
    }
    if (request.page && routeExists('!')) {
      navigate('!', {
        request
      }, false);
    }
  };
  const mustReuse = route => {
    const opt = getOption(route.options, 'reuseInstance');
    const config = routerConfig.get('reuseInstance');

    // route always has final decision
    if (isBoolean(opt)) {
      return opt;
    }
    return !(isBoolean(config) && config === false);
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class RoutedApp extends Lightning$1.Component {
    static _template() {
      return {
        Pages: {
          forceZIndexContext: true
        },
        /**
         * This is a default Loading page that will be made visible
         * during data-provider on() you CAN override in child-class
         */
        Loading: {
          rect: true,
          w: 1920,
          h: 1080,
          color: 0xff000000,
          visible: false,
          zIndex: 99,
          Label: {
            mount: 0.5,
            x: 960,
            y: 540,
            text: {
              text: 'Loading..'
            }
          }
        }
      };
    }
    static _states() {
      return [class Loading extends this {
        $enter() {
          this.tag('Loading').visible = true;
        }
        $exit() {
          this.tag('Loading').visible = false;
        }
      }, class Widgets extends this {
        $enter(args, widget) {
          // store widget reference
          this._widget = widget;

          // since it's possible that this behaviour
          // is non-remote driven we force a recalculation
          // of the focuspath
          this._refocus();
        }
        _getFocused() {
          // we delegate focus to selected widget
          // so it can consume remotecontrol presses
          return this._widget;
        }

        // if we want to widget to widget focus delegation
        reload(widget) {
          this._widget = widget;
          this._refocus();
        }
        _handleKey() {
          const restoreFocus = routerConfig.get('autoRestoreRemote');
          /**
           * The Router used to delegate focus back to the page instance on
           * every unhandled key. This is barely usefull in any situation
           * so for now we offer the option to explicity turn that behaviour off
           * so we don't don't introduce a breaking change.
           */
          if (!isBoolean(restoreFocus) || restoreFocus === true) {
            Router.focusPage();
          }
        }
      }];
    }

    /**
     * Return location where pages need to be stored
     */
    get pages() {
      return this.tag('Pages');
    }

    /**
     * Tell router where widgets are stored
     */
    get widgets() {
      return this.tag('Widgets');
    }

    /**
     * we MUST register _handleBack method so the Router
     * can override it
     * @private
     */
    _handleBack() {}

    /**
     * We MUST return Router.activePage() so the new Page
     * can listen to the remote-control.
     */
    _getFocused() {
      return Router.getActivePage();
    }
  }

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /*
  rouThor ==[x]
   */
  let navigateQueue = new Map();
  let forcedHash = '';
  let resumeHash = '';

  /**
   * Start routing the app
   * @param config - route config object
   * @param instance - instance of the app
   */
  const startRouter = (config, instance) => {
    bootRouter(config, instance);
    registerListener();
    start();
  };

  // start translating url
  const start = () => {
    let hash = (getHash() || '').replace(/^#/, '');
    const bootKey = '$';
    const params = getQueryStringParams(hash);
    const bootRequest = getBootRequest();
    const rootHash = getRootHash();
    const isDirectLoad = hash.indexOf(bootKey) !== -1;

    // prevent direct reload of wildcard routes
    // expect bootComponent
    if (isWildcard.test(hash) && hash !== bootKey) {
      hash = '';
    }

    // store resume point for manual resume
    resumeHash = isDirectLoad ? rootHash : hash || rootHash;
    const ready = () => {
      if (!hash && rootHash) {
        if (isString(rootHash)) {
          navigate(rootHash);
        } else if (isFunction(rootHash)) {
          rootHash().then(res => {
            if (isObject(res)) {
              navigate(res.path, res.params);
            } else {
              navigate(res);
            }
          });
        }
      } else {
        queue(hash);
        handleHashChange().then(() => {
          app._refocus();
        }).catch(e => {
          console.error(e);
        });
      }
    };
    if (routeExists(bootKey)) {
      if (hash && !isDirectLoad) {
        if (!getRouteByHash(hash)) {
          navigate('*', {
            failedHash: hash
          });
          return;
        }
      }
      navigate(bootKey, {
        resume: resumeHash,
        reload: bootKey === hash
      }, false);
    } else if (isFunction(bootRequest)) {
      bootRequest(params).then(() => {
        ready();
      }).catch(e => {
        handleBootError(e);
      });
    } else {
      ready();
    }
  };
  const handleBootError = e => {
    if (routeExists('!')) {
      navigate('!', {
        request: {
          error: e
        }
      });
    } else {
      console.error(e);
    }
  };

  /**
   * start a new request
   * @param url
   * @param args
   * @param store
   */
  const navigate = function (url) {
    let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let store = arguments.length > 2 ? arguments[2] : undefined;
    if (isObject(url)) {
      url = getHashByName(url);
      if (!url) {
        return;
      }
    }
    let hash = getHash();
    if (!mustUpdateLocationHash() && forcedHash) {
      hash = forcedHash;
    }
    if (hash.replace(/^#/, '') !== url) {
      // push request in the queue
      queue(url, args, store);
      if (mustUpdateLocationHash()) {
        setHash(url);
      } else {
        forcedHash = url;
        handleHashChange(url).then(() => {
          app._refocus();
        }).catch(e => {
          console.error(e);
        });
      }
    } else if (args.reload) {
      // push request in the queue
      queue(url, args, store);
      handleHashChange(url).then(() => {
        app._refocus();
      }).catch(e => {
        console.error(e);
      });
    }
  };
  const queue = function (hash) {
    let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let store = arguments.length > 2 ? arguments[2] : undefined;
    hash = cleanHash(hash);
    if (!navigateQueue.has(hash)) {
      for (let request of navigateQueue.values()) {
        request.cancel();
      }
      const request = createRequest(hash, args, store);
      navigateQueue.set(decodeURIComponent(hash), request);
      return request;
    }
    return false;
  };

  /**
   * Handle change of hash
   * @param override
   * @returns {Promise<void>}
   */
  const handleHashChange = async override => {
    const hash = cleanHash(override || getHash());
    const queueId = decodeURIComponent(hash);
    let request = navigateQueue.get(queueId);

    // handle hash updated manually
    if (!request && !navigateQueue.size) {
      request = queue(hash);
    }
    const route = getRouteByHash(hash);
    if (!route) {
      if (routeExists('*')) {
        navigate('*', {
          failedHash: hash
        });
      } else {
        console.error("Unable to navigate to: ".concat(hash));
      }
      return;
    }

    // update current processed request
    request.hash = hash;
    request.route = route;
    let result = await beforeEachRoute(getActiveHash(), request);

    // test if a local hook is configured for the route
    if (result && route.beforeNavigate) {
      result = await route.beforeNavigate(getActiveHash(), request);
    }
    if (isBoolean(result)) {
      // only if resolve value is explicitly true
      // we continue the current route request
      if (result) {
        return resolveHashChange(request);
      }
    } else {
      // if navigation guard didn't return true
      // we cancel the current request
      request.cancel();
      navigateQueue.delete(queueId);
      if (isString(result)) {
        navigate(result);
      } else if (isObject(result)) {
        let store = true;
        if (isBoolean(result.store)) {
          store = result.store;
        }
        navigate(result.path, result.params, store);
      }
    }
  };

  /**
   * Continue processing the hash change if not blocked
   * by global or local hook
   * @param request - {}
   */
  const resolveHashChange = request => {
    const hash = request.hash;
    const route = request.route;
    const queueId = decodeURIComponent(hash);
    // store last requested hash so we can
    // prevent a route that resolved later
    // from displaying itself
    setLastHash(hash);
    if (route.path) {
      const component = getComponent(route.path);
      // if a hook is provided for the current route
      if (isFunction(route.hook)) {
        const urlParams = getValuesFromHash(hash, route.path);
        const params = {};
        for (const key of urlParams.keys()) {
          params[key] = urlParams.get(key);
        }
        route.hook(app, {
          ...params
        });
      }
      // if there is a component attached to the route
      if (component) {
        // force page to root state to prevent shared state issues
        const activePage = getActivePage();
        if (activePage) {
          const keepAlive = keepActivePageAlive(getActiveRoute(), request);
          if (activePage && route.path === getActiveRoute() && !keepAlive) {
            activePage._setState('');
          }
        }
        if (isPage(component)) {
          load(request).then(() => {
            app._refocus();
            navigateQueue.delete(queueId);
          });
        } else {
          // of the component is not a constructor
          // or a Component instance we can assume
          // that it's a dynamic import
          component().then(contents => {
            return contents.default;
          }).then(module => {
            storeComponent(route.path, module);
            return load(request);
          }).then(() => {
            app._refocus();
            navigateQueue.delete(queueId);
          });
        }
      } else {
        navigateQueue.delete(queueId);
      }
    }
  };

  /**
   * Directional step in history
   * @param level
   */
  const step = function () {
    let level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (!level || isNaN(level)) {
      return false;
    }
    const history = getHistory();
    // for now we only support negative numbers
    level = Math.abs(level);

    //Check whether we have any history avaialble or not
    if (history.length) {
      // for now we only support history back
      const route = history.splice(history.length - level, level)[0];
      // store changed history
      setHistory(history);
      return navigate(route.hash, {
        [symbols.backtrack]: true,
        [symbols.historyState]: route.state
      }, false);
    } else if (routerConfig.get('backtrack')) {
      const hashLastPart = /(\/:?[\w%\s-]+)$/;
      let hash = stripRegex(getHash());
      let floor = getFloor(hash);

      // test if we got deep-linked
      if (floor > 1) {
        while (floor--) {
          // strip of last part
          hash = hash.replace(hashLastPart, '');
          // if we have a configured route
          // we navigate to it
          if (getRouteByHash(hash)) {
            return navigate(hash, {
              [symbols.backtrack]: true
            }, false);
          }
        }
      }
    }

    // we can't step back past the amount
    // of history entries
    if (level > history.length) {
      if (isFunction(app._handleAppClose)) {
        return app._handleAppClose();
      }
      return app.application.closeApp();
    }
    return false;
  };

  /**
   * Resume Router's page loading process after
   * the BootComponent became visible;
   */
  const resume = () => {
    if (isString(resumeHash)) {
      navigate(resumeHash, false);
      resumeHash = '';
    } else if (isFunction(resumeHash)) {
      resumeHash().then(res => {
        resumeHash = '';
        if (isObject(res)) {
          navigate(res.path, res.params);
        } else {
          navigate(res);
        }
      });
    } else {
      console.warn('[Router]: resume() called but no hash found');
    }
  };

  /**
   * Force reload active hash
   */
  const reload = () => {
    if (!isNavigating()) {
      const hash = getActiveHash();
      navigate(hash, {
        reload: true
      }, false);
    }
  };

  /**
   * Query if the Router is still processing a Request
   * @returns {boolean}
   */
  const isNavigating = () => {
    if (navigateQueue.size) {
      let isProcessing = false;
      for (let request of navigateQueue.values()) {
        if (!request.isCancelled) {
          isProcessing = true;
        }
      }
      return isProcessing;
    }
    return false;
  };
  const getResumeHash = () => {
    return resumeHash;
  };

  /**
   * By default we return the location hash
   * @returns {string}
   */
  let getHash = () => {
    return document.location.hash;
  };

  /**
   * Update location hash
   * @param url
   */
  let setHash = url => {
    document.location.hash = url;
  };

  /**
   * This can be called from the platform / bootstrapper to override
   * the default getting and setting of the hash
   * @param config
   */
  const initRouter = config => {
    if (config.getHash) {
      getHash = config.getHash;
    }
    if (config.setHash) {
      setHash = config.setHash;
    }
  };

  /**
   * On hash change we start processing
   */
  const registerListener = () => {
    Registry.addEventListener(window, 'hashchange', async () => {
      if (mustUpdateLocationHash()) {
        try {
          await handleHashChange();
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  /**
   * Navigate to root hash
   */
  const root = () => {
    const rootHash = getRootHash();
    if (isString(rootHash)) {
      navigate(rootHash);
    } else if (isFunction(rootHash)) {
      rootHash().then(res => {
        if (isObject(res)) {
          navigate(res.path, res.params);
        } else {
          navigate(res);
        }
      });
    }
  };
  const deletePage = param => {
    deleteCurrentInstance(param);
  };

  // export API
  var Router = {
    startRouter,
    navigate,
    resume,
    step,
    go: step,
    back: step.bind(null, -1),
    activePage: getActivePage,
    getActivePage() {
      // warning
      return getActivePage();
    },
    deletePage,
    getActiveRoute,
    getActiveHash,
    focusWidget,
    getActiveWidget,
    restoreFocus,
    isNavigating,
    getHistory,
    setHistory,
    getHistoryState,
    replaceHistoryState,
    getQueryStringParams,
    reload,
    symbols,
    App: RoutedApp,
    // keep backwards compatible
    focusPage: restoreFocus,
    root: root,
    /**
     * Deprecated api methods
     */
    setupRoutes() {
      console.warn('Router: setupRoutes is deprecated, consolidate your configuration');
      console.warn('https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/configuration');
    },
    on() {
      console.warn('Router.on() is deprecated, consolidate your configuration');
      console.warn('https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/configuration');
    },
    before() {
      console.warn('Router.before() is deprecated, consolidate your configuration');
      console.warn('https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/configuration');
    },
    after() {
      console.warn('Router.after() is deprecated, consolidate your configuration');
      console.warn('https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/configuration');
    }
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let ApplicationInstance;
  var Launch = (App, appSettings, platformSettings, appData) => {
    initSettings(appSettings, platformSettings);
    initUtils(platformSettings);
    initStorage();
    // Initialize plugins
    if (platformSettings.plugins) {
      platformSettings.plugins.profile && initProfile(platformSettings.plugins.profile);
      platformSettings.plugins.metrics && initMetrics(platformSettings.plugins.metrics);
      platformSettings.plugins.mediaPlayer && initMediaPlayer(platformSettings.plugins.mediaPlayer);
      platformSettings.plugins.mediaPlayer && initVideoPlayer(platformSettings.plugins.mediaPlayer);
      platformSettings.plugins.ads && initAds(platformSettings.plugins.ads);
      platformSettings.plugins.router && initRouter(platformSettings.plugins.router);
      platformSettings.plugins.tv && initTV(platformSettings.plugins.tv);
      platformSettings.plugins.purchase && initPurchase(platformSettings.plugins.purchase);
      platformSettings.plugins.pin && initPin(platformSettings.plugins.pin);
    }
    const app = Application(App, appData, platformSettings);
    initLightningSdkPlugin.log = Log$1;
    initLightningSdkPlugin.settings = Settings$1;
    initLightningSdkPlugin.ads = Ads;
    initLightningSdkPlugin.lightning = Lightning$1;
    ApplicationInstance = new app(appSettings);
    initLightningSdkPlugin.appInstance = ApplicationInstance;
    return ApplicationInstance;
  };

  /*
   * If not stated otherwise in this file or this component's LICENSE file the
   * following copyright and licenses apply:
   *
   * Copyright 2020 Metrological
   *
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class SubtitleComponent extends Lightning$1.Component {
    static _template() {
      return {
        visible: false,
        rect: true,
        color: 0x90000000,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: 5
        },
        Text: {
          y: 5,
          x: 20,
          text: {
            textColor: 0xffffffff,
            fontSize: 38,
            lineHeight: 38 * 1.4,
            textAlign: 'center',
            wordWrap: true,
            maxLines: 3,
            shadow: true,
            shadowColor: 0xff333333
          }
        }
      };
    }
    _init() {
      this._textTextureDefaults = new Lightning$1.textures.TextTexture(this.stage).cloneArgs();
      this.tag('Text').on('txLoaded', _ref => {
        let _source = _ref._source;
        this.w = _source.w + this.tag('Text').x * 2;
        this.h = _source.h;
        this.position();
      });
    }
    get textFormat() {
      const textTag = this.tag('Text').text;
      return {
        fontFace: textTag.fontFace || 'sans-serif',
        fontSize: textTag.fontSize,
        lineHeight: textTag.lineHeight,
        textAlign: textTag.textAlign,
        wordWrap: true,
        maxLines: textTag.maxLines
      };
    }
    show() {
      this.visible = true;
    }
    hide() {
      this.visible = false;
    }
    position() {
      this.x = this._calculateX(this.xPos);
      this.y = this._calculateY(this.yPos);
    }
    set viewportW(v) {
      this._viewportW = v;
      this.x = this._calculateX(this.xPos);
    }
    get viewportW() {
      return this._viewportW || this.application.finalW;
    }
    set viewportH(v) {
      this._viewportH = v;
      this.y = this._calculateY(this.yPos);
    }
    get viewportH() {
      return this._viewportH || this.application.finalH;
    }
    _calculateX(x) {
      if (x === 'center') {
        x = (this.viewportW - this.finalW) / 2;
      } else if (x === 'left') {
        x = 60;
      } else if (x === 'right') {
        x = this.viewportW - this.finalW - 60;
      }
      return x;
    }
    set xPos(v) {
      this._x = v;
      this.x = this._calculateX(v);
    }
    get xPos() {
      return this._x || 'center';
    }
    _calculateY(y) {
      if (y === 'center') {
        return (this.viewportH - this.finalH) / 2;
      } else if (y === 'top') {
        return 60;
      } else if (y === 'bottom') {
        return this.viewportH - this.finalH - 60;
      }
      return y;
    }
    set yPos(v) {
      this._y = v;
      this.y = this._calculateY(v);
    }
    get yPos() {
      return this._y || 'bottom';
    }
    set fontFamily(v) {
      this.tag('Text').text.fontFace = v;
    }
    set fontSize(v) {
      this.tag('Text').text.fontSize = v;
      this.tag('Text').text.lineHeight = v * 1.3;
    }
    set fontColor(v) {
      this.tag('Text').color = v;
    }
    set backgroundColor(v) {
      this.color = v;
    }
    _defineBreakpoint(text, breakpoint) {
      if (breakpoint >= this.maxWidth) return this.maxWidth;
      const info = Lightning$1.textures.TextTexture.renderer(this.stage, this.stage.platform.getDrawingCanvas(), {
        ...this._textTextureDefaults,
        ...this.textFormat,
        ...{
          wordWrapWidth: breakpoint
        },
        text
      })._calculateRenderInfo();
      if (info.width <= breakpoint && info.lines.length <= 2) {
        return breakpoint;
      } else {
        return this._defineBreakpoint(text, breakpoint * 1.25);
      }
    }
    set text(v) {
      this.alpha = 0;
      if (v && v.length) {
        const breakpoint = this._defineBreakpoint(v, 640);
        this.tag('Text').text.wordWrapWidth = breakpoint;
        this.tag('Text').text = v;
        this.alpha = 1;
      }
    }
    set textAlign(v) {
      this._textAlign = v;
      this.tag('Text').text.textAlign = v;
    }
    set maxWidth(v) {
      this._maxWidth = v;
    }
    get maxWidth() {
      return (this._maxWidth || 1200) - this.tag('Text').x * 2;
    }
    set maxLines(v) {
      this.tag('Text').text.maxLines = v;
    }
  }

  const API_URL$1 = 'https://zappingstream-api.vercel.app/channels';
  const getChannels = async () => {
    try {
      // 4. Obtener el token validado por reCAPTCHA
      // Ejemplo de cómo podrías obtenerlo (dependerá de la librería que uses):
      // const token = await getRecaptchaToken();

      // 5. Adjuntar el token en los headers de tu fetch original
      const response = await fetch(API_URL$1, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          // Descomenta la siguiente línea y ajusta la cabecera según lo que espere tu backend:
          // 'Authorization': `Bearer ${token}` 
        }
      });
      if (!response.ok) {
        throw new Error("Error HTTP: ".concat(response.status, " - ").concat(response.statusText));
      }
      const data = await response.json();
      if (!data) {
        return [];
      }

      // Recorremos los canales y filtramos los videos internos con ToBeCut = true
      return data.map(channel => {
        const filterVideos = videos => {
          if (!videos) return videos;
          // Soportar tanto arrays como diccionarios (objetos)
          if (Array.isArray(videos)) {
            return videos.filter(v => v.ToBeCut !== true);
          }
          return Object.fromEntries(Object.entries(videos).filter(_ref => {
            let _ref2 = _slicedToArray(_ref, 2),
              _ = _ref2[0],
              v = _ref2[1];
            return v.ToBeCut !== true;
          }));
        };
        return {
          ...channel,
          Actives: filterVideos(channel.Actives),
          Upcoming: filterVideos(channel.Upcoming),
          Past: filterVideos(channel.Past)
        };
      });
    } catch (error) {
      console.error("Error al obtener los canales:", error);
      throw error;
    }
  };

  const API_URL = 'https://zappingstream-api.vercel.app/provinces';
  const getProvinces = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error HTTP: ".concat(response.status, " - ").concat(response.statusText));
      }
      const data = await response.json();
      const cityProvinceMap = {};
      const provinces = [];
      data.forEach(prov => {
        provinces.push(prov.name);
        prov.cities.forEach(city => {
          cityProvinceMap[city] = prov.name;
        });
      });
      return {
        cityProvinceMap,
        provinces: provinces.sort()
      };
    } catch (error) {
      console.error("Error al obtener las provincias:", error);
      throw error;
    }
  };

  // ============================================
  // Paleta de Colores Global (adaptada de CSS)
  // ============================================
  const COLORS = {
    // Fondos
    BG_BLACK: 0xff000000,
    // #000
    BG_DARK: 0xff111111,
    // #111
    BG_PANEL: 0xff222222,
    // #222

    // Textos
    TEXT_WHITE: 0xffffffff,
    // #fff
    TEXT_GRAY: 0xff888888,
    // #888 (inactivo)

    // Acentos
    ACCENT_BLUE: 0xff38b6ff,
    // #38B6FF (azul principal)
    ACCENT_BLUE_HOVER: 0xff0a30b4,
    // #0a30b4 (azul oscuro hover)

    // Badges
    LIVE_BADGE: 0xffcc0000,
    // rgba(204, 0, 0, 0.9) - Rojo para Live
    PREMIERE_BADGE: 0xff4d68ff,
    // #4d68ff - Azul para Premiere

    // Bordes
    BORDER_LIGHT: 0xff444444,
    // #444
    BORDER_DARK: 0xff333333,
    // #333
    BORDER_DISABLED: 0xff555555 // #555 (deshabilitado)
  };

  // ============================================
  // Valores tipográficos
  // ============================================
  const TYPOGRAPHY = {
    FONT_FAMILY: 'Regular',
    // Lightning usa fuentes registradas
    FONT_SIZE_SMALL: 14,
    FONT_SIZE_NORMAL: 16,
    FONT_SIZE_LARGE: 18,
    FONT_SIZE_XLARGE: 32
  };

  // ============================================
  // Radii de bordes
  // ============================================
  const BORDER_RADIUS = {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    PILL: 20,
    CIRCLE: 50
  };

  // ============================================
  // Espaciado y tamaños comunes
  // ============================================
  const SPACING = {
    GAP_SMALL: 8,
    GAP_MEDIUM: 12,
    GAP_LARGE: 15,
    GAP_XLARGE: 20,
    PADDING_SMALL: 8,
    PADDING_MEDIUM: 10,
    PADDING_LARGE: 20
  };

  // ============================================
  // Tamaños de componentes
  // ============================================
  const COMPONENT_SIZE = {
    // Botones
    BUTTON_HEIGHT: 50,
    BUTTON_HEIGHT_SMALL: 36,
    // Cards
    CARD_WIDTH: 240,
    CARD_HEIGHT: 250,
    // Logos/Avatares
    LOGO_SMALL: 50,
    LOGO_MEDIUM: 80,
    // Scroll Arrows
    ARROW_SIZE: 44
  };

  // Sub-componente interno que simula ser un botón, input o select
  class HeaderButton extends Lightning$1.Component {
    static _template() {
      return {
        rect: true,
        color: COLORS.BG_PANEL,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.MEDIUM
        },
        Label: {
          mount: 0.5,
          text: {
            text: '',
            fontSize: TYPOGRAPHY.FONT_SIZE_NORMAL,
            fontFace: TYPOGRAPHY.FONT_FAMILY,
            textColor: COLORS.TEXT_WHITE,
            textOverflow: 'ellipsis'
          }
        }
      };
    }
    set label(v) {
      this.tag('Label').text.text = v;
    }
    _init() {
      // Asignamos las medidas de forma segura una vez que el componente existe
      this.tag('Label').patch({
        x: this.w / 2,
        y: this.h / 2 + 2,
        text: {
          wordWrapWidth: this.w > 20 ? this.w - 20 : 0
        }
      });
    }
    set isActive(v) {
      this._isActiveFlag = v;
      this._updateAppearance();
    }
    _updateAppearance() {
      if (this.hasFocus()) {
        this.patch({
          color: COLORS.ACCENT_BLUE,
          Label: {
            text: {
              textColor: COLORS.BG_BLACK
            }
          },
          smooth: {
            scale: 1.05
          }
        });
      } else if (this._isActiveFlag) {
        this.patch({
          color: COLORS.BORDER_LIGHT,
          Label: {
            text: {
              textColor: COLORS.ACCENT_BLUE
            }
          },
          smooth: {
            scale: 1.0
          }
        });
      } else {
        this.patch({
          color: COLORS.BG_PANEL,
          Label: {
            text: {
              textColor: COLORS.TEXT_WHITE
            }
          },
          smooth: {
            scale: 1.0
          }
        });
      }
    }
    _focus() {
      this._updateAppearance();
    }
    _unfocus() {
      this._updateAppearance();
    }

    // Al presionar Enter, avisa al padre (AppHeader) qué botón fue presionado
    _handleEnter() {
      this.fireAncestors('$onHeaderAction', this.ref);
    }
  }
  class AppHeader extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 220,
        rect: true,
        color: COLORS.TRANSPARENT,
        Logo: {
          x: 60,
          y: 0,
          w: 220,
          h: 220,
          src: Utils.asset('images/logo.png')
        },
        // Controles de navegación de cabecera alineados horizontalmente
        Controls: {
          x: 350,
          y: 30,
          Search: {
            type: HeaderButton,
            ref: 'Search',
            w: 260,
            h: 60
          },
          Province: {
            type: HeaderButton,
            ref: 'Province',
            x: 280,
            w: 240,
            h: 60
          },
          City: {
            type: HeaderButton,
            ref: 'City',
            x: 540,
            w: 240,
            h: 60
          },
          ModeCards: {
            type: HeaderButton,
            ref: 'ModeCards',
            x: 800,
            w: 160,
            h: 60
          },
          ModeGrid: {
            type: HeaderButton,
            ref: 'ModeGrid',
            x: 980,
            w: 220,
            h: 60
          }
        }
      };
    }
    _construct() {
      this._index = 0; // Índice de foco horizontal
      this._controls = ['Search', 'Province', 'City', 'ModeCards', 'ModeGrid'];
    }

    // Equivalente a recibir los "props" de React
    set config(data) {
      const searchText = data.searchText,
        viewMode = data.viewMode,
        selectedProvince = data.selectedProvince,
        selectedCity = data.selectedCity;
        data.provinces;
        const cities = data.cities,
        callbacks = data.callbacks;
      this._callbacks = callbacks || {};
      this.tag('Controls.Search').label = searchText ? "\uD83D\uDD0D ".concat(searchText) : '🔍 Buscar canal...';
      this.tag('Controls.Province').label = selectedProvince ? "Prov: ".concat(selectedProvince) : 'Provincia: Todas';
      this.tag('Controls.City').label = selectedCity ? "Ciudad: ".concat(selectedCity) : 'Ciudad: Todas';

      // Deshabilitar visualmente o no la ciudad si el arreglo está vacío
      this._hasCities = cities && cities.length > 0;
      this.tag('Controls.City').alpha = this._hasCities ? 1 : 0.5;
      this.tag('Controls.ModeCards').label = 'Canales';
      this.tag('Controls.ModeCards').isActive = viewMode === 'cards';
      this.tag('Controls.ModeGrid').label = 'Transmisiones';
      this.tag('Controls.ModeGrid').isActive = viewMode === 'grid';
    }

    // --- Manejo del Foco Horizontal ---
    _handleLeft() {
      if (this._index > 0) {
        this._index--;
        // Si estamos retrocediendo y "City" está deshabilitado, lo saltamos
        if (this._controls[this._index] === 'City' && !this._hasCities) {
          this._index--;
        }
        this._refocus();
        return true;
      }
      return false; // Permite que el contenedor superior atrape la flecha izquierda si hiciera falta
    }
    _handleRight() {
      if (this._index < this._controls.length - 1) {
        this._index++;
        // Si avanzamos y "City" está deshabilitado, lo saltamos
        if (this._controls[this._index] === 'City' && !this._hasCities) {
          this._index++;
        }
        this._refocus();
        return true;
      }
      return false;
    }

    // Le dice a Lightning JS a qué control darle el estado _focus()
    _getFocused() {
      const controlRef = this._controls[this._index];
      return this.tag("Controls.".concat(controlRef));
    }

    // --- Receptor de Eventos (Simulación de onClick) ---
    $onHeaderAction(ref) {
      if (!this._callbacks) return;
      switch (ref) {
        case 'Search':
          if (this._callbacks.onSearchClick) this._callbacks.onSearchClick();
          break;
        case 'Province':
          if (this._callbacks.onProvinceClick) this._callbacks.onProvinceClick();
          break;
        case 'City':
          if (this._hasCities && this._callbacks.onCityClick) this._callbacks.onCityClick();
          break;
        case 'ModeCards':
          if (this._callbacks.onViewModeChange) this._callbacks.onViewModeChange('cards');
          break;
        case 'ModeGrid':
          if (this._callbacks.onViewModeChange) this._callbacks.onViewModeChange('grid');
          break;
      }
    }
  }

  // Sub-componente interno para los botones del footer
  class FooterButton extends Lightning$1.Component {
    static _template() {
      return {
        w: 260,
        h: 60,
        rect: true,
        color: 0x00000000,
        // Transparente por defecto
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.PILL
        },
        Icon: {
          mount: 0.5,
          x: 50,
          y: 30,
          text: {
            text: '',
            fontSize: 26,
            fontFace: TYPOGRAPHY.FONT_FAMILY,
            textColor: COLORS.TEXT_WHITE
          }
        },
        Label: {
          mountY: 0.5,
          x: 80,
          y: 32,
          text: {
            text: '',
            fontSize: TYPOGRAPHY.FONT_SIZE_LARGE,
            fontFace: TYPOGRAPHY.FONT_FAMILY,
            textColor: COLORS.TEXT_WHITE
          }
        }
      };
    }
    set label(v) {
      this.tag('Label').text.text = v;
    }
    set icon(v) {
      this.tag('Icon').text.text = v;
    }
    set centerLabel(v) {
      if (v) {
        this.tag('Label').patch({
          x: 130,
          mountX: 0.5
        });
      }
    }
    _focus() {
      this.patch({
        color: COLORS.BG_PANEL,
        Label: {
          text: {
            textColor: COLORS.ACCENT_BLUE
          }
        },
        Icon: {
          text: {
            textColor: COLORS.ACCENT_BLUE
          }
        }
      });
    }
    _unfocus() {
      this.patch({
        color: 0x00000000,
        Label: {
          text: {
            textColor: COLORS.TEXT_WHITE
          }
        },
        Icon: {
          text: {
            textColor: COLORS.TEXT_WHITE
          }
        }
      });
    }
    _handleEnter() {
      this.fireAncestors('$onFooterAction', this.ref);
    }
  }
  class AppFooter extends Lightning$1.Component {
    static _template() {
      return {
        w: 560,
        h: 80,
        rect: true,
        color: COLORS.BG_BLACK,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.PILL
        },
        RefreshBtn: {
          type: FooterButton,
          ref: 'RefreshBtn',
          x: 10,
          y: 10,
          label: 'Actualizar',
          icon: '↻'
        },
        Divider: {
          rect: true,
          w: 2,
          h: 40,
          x: 280,
          y: 20,
          color: COLORS.BORDER_LIGHT
        },
        InfoBtn: {
          type: FooterButton,
          ref: 'InfoBtn',
          x: 290,
          y: 10,
          label: 'Info / Contacto',
          centerLabel: true
        }
      };
    }
    _construct() {
      this._index = 0;
      this._buttons = ['RefreshBtn', 'InfoBtn'];
    }
    _init() {
      // Animación infinita para el spinner (girar 360 grados / 2 PI radianes)
      this._spinAnim = this.tag('RefreshBtn.Icon').animation({
        duration: 1,
        repeat: -1,
        actions: [{
          p: 'rotation',
          v: {
            0: 0,
            1: Math.PI * 2
          }
        }]
      });
    }

    // Equivalente a tus props
    set config(data) {
      const onRefresh = data.onRefresh,
        isRefreshing = data.isRefreshing,
        onShowInfo = data.onShowInfo;
      this._onRefresh = onRefresh;
      this._onShowInfo = onShowInfo;
      this._isRefreshing = isRefreshing;

      // Manejar el estado del botón Refresh
      if (isRefreshing) {
        this.tag('RefreshBtn').alpha = 0.5; // Lo mostramos visualmente "deshabilitado"
        this._spinAnim.play(); // Iniciar giro
      } else {
        this.tag('RefreshBtn').alpha = 1;
        this._spinAnim.pause();
        this.tag('RefreshBtn.Icon').rotation = 0; // Resetear la rotación
      }
    }

    // --- Navegación del Control Remoto ---
    _handleLeft() {
      if (this._index > 0) {
        this._index--;
        this._refocus();
        return true;
      }
      return false;
    }
    _handleRight() {
      if (this._index < this._buttons.length - 1) {
        this._index++;
        this._refocus();
        return true;
      }
      return false;
    }
    _getFocused() {
      return this.tag(this._buttons[this._index]);
    }

    // --- Manejo de clics (Eventos) ---
    $onFooterAction(ref) {
      if (ref === 'RefreshBtn' && !this._isRefreshing) {
        if (this._onRefresh) this._onRefresh();
      } else if (ref === 'InfoBtn') {
        if (this._onShowInfo) this._onShowInfo();
      }
    }
  }

  class StatusDisplay extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        alpha: 0,
        // Oculto por defecto (equivale a tu "return null")

        Container: {
          mount: 0.5,
          x: 960,
          // Centro de la pantalla en X
          y: 540,
          // Centro de la pantalla en Y

          Spinner: {
            mount: 0.5,
            x: 0,
            y: -60,
            alpha: 0,
            // Si tienes un asset para el spinner, descomenta la siguiente línea:
            // src: Utils.asset('images/spinner.png'),

            // Mientras tanto, usamos un texto o icono temporal que girará
            text: {
              text: '🔄',
              fontSize: 64,
              textAlign: 'center'
            }
          },
          Message: {
            mountX: 0.5,
            x: 0,
            y: 20,
            text: {
              text: '',
              fontSize: 32,
              fontFace: 'Regular',
              textColor: 0xffffffff,
              textAlign: 'center'
            }
          }
        }
      };
    }
    _init() {
      // Creamos la animación de rotación infinita para el spinner
      this._spinnerAnim = this.tag('Spinner').animation({
        duration: 2,
        repeat: -1,
        actions: [{
          p: 'rotation',
          v: {
            0: 0,
            1: Math.PI * 2
          }
        }]
      });
      if (this._isLoadingFlag) {
        this._spinnerAnim.play();
      }
    }

    // Este setter equivale a recibir los "props" en React
    set status(data) {
      const isFetching = data.isFetching,
        isLoading = data.isLoading,
        hasChannels = data.hasChannels,
        hasFilteredChannels = data.hasFilteredChannels,
        searchText = data.searchText,
        hasActiveFilters = data.hasActiveFilters;

      // Ocultamos el spinner por defecto en cada actualización
      this.tag('Spinner').alpha = 0;
      if (this._spinnerAnim) this._spinnerAnim.pause();
      this._isLoadingFlag = isFetching || isLoading;
      if (this._isLoadingFlag) {
        this.alpha = 1;
        this.tag('Spinner').alpha = 1;
        if (this._spinnerAnim) this._spinnerAnim.play();
        this.tag('Message').text.text = 'Conectando con el universo del stream argentino...';
      } else if (!hasChannels) {
        this.alpha = 1;
        this.tag('Message').text.text = 'No se encontraron canales configurados.';
      } else if (!hasFilteredChannels && (searchText || hasActiveFilters)) {
        this.alpha = 1;
        this.tag('Message').text.text = 'No hay resultados para la búsqueda actual.';
      } else {
        this.alpha = 0; // Ninguna condición se cumple, se oculta todo (return null)
      }
    }
  }

  class InfoModal extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xcc000000,
        // modal-overlay (fondo oscuro semi-transparente)
        alpha: 0,
        // Inicia oculto para poder animar su aparición

        Content: {
          mount: 0.5,
          x: 960,
          y: 540,
          w: 1300,
          h: 850,
          rect: true,
          color: 0xff1e1e1e,
          // Color de fondo del modal
          shader: {
            type: Lightning$1.shaders.RoundedRectangle,
            radius: 16
          },
          Title: {
            x: 650,
            y: 60,
            mountX: 0.5,
            text: {
              text: '¿Qué es Zapping Stream?',
              fontSize: 48,
              fontFace: 'Regular',
              textColor: 0xffffffff
            }
          },
          Body: {
            x: 80,
            y: 150,
            text: {
              // Unimos los párrafos con saltos de línea (\n)
              text: 'Zapping Stream reúne todos los canales de streaming de Argentina en un solo lugar. El objetivo es brindarle a la comunidad un punto de acceso de descubrimiento de canales y contenido por fuera del algoritmo.\n\nEl sitio interactúa directo con YouTube: si se hace click en una tarjeta, el sitio enlaza directo al video o canal de Youtube. El sitio también permite buscar canales por nombre o ciudad.\n\nSe puede visualizar por canal o por transmisiones programadas. Nuestro propósito es facilitar el descubrimiento de contenido local y promover la visibilidad de todos los creadores y medios independientes.',
              fontSize: 28,
              fontFace: 'Regular',
              textColor: 0xddffffff,
              wordWrapWidth: 1140,
              lineHeight: 40
            }
          },
          Contact: {
            x: 650,
            y: 470,
            mountX: 0.5,
            text: {
              text: 'Si tu canal no aparece en la lista y querés sumarlo, o si deseás solicitar\nla baja de tu contenido, escribinos a: contacto@zappingstream.com',
              fontSize: 26,
              fontFace: 'Regular',
              textColor: 0xfffbb03b,
              // Color de acento
              wordWrapWidth: 1140,
              lineHeight: 40,
              textAlign: 'center'
            }
          },
          Legal: {
            x: 80,
            y: 600,
            text: {
              text: 'Al utilizar este sitio, aceptas los Términos de Servicio de YouTube y la Política de Privacidad de Google. Los logos, miniaturas, nombres y descripciones son extraídos directamente de YouTube API Services.\n\nEste sitio es un directorio de canales independiente. No alojamos ni retransmitimos contenido propio. Todos los videos, marcas y logotipos son propiedad exclusiva de sus respectivos creadores y se visualizan a través del reproductor oficial de YouTube.',
              fontSize: 22,
              fontFace: 'Regular',
              textColor: 0xffaaaaaa,
              wordWrapWidth: 1140,
              lineHeight: 32
            }
          },
          // Nuestro botón de "Volver"
          Button: {
            x: 650,
            y: 750,
            mountX: 0.5,
            w: 240,
            h: 60,
            rect: true,
            color: 0xff444444,
            // Fondo del botón por defecto
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: 8
            },
            Text: {
              mount: 0.5,
              x: 120,
              y: 30,
              text: {
                text: 'Volver',
                fontSize: 28,
                fontFace: 'Regular',
                textColor: 0xffffffff
              }
            }
          }
        }
      };
    }

    // Equivalente al "props.onClose"
    set onClose(callback) {
      this._onCloseCallback = callback;
    }

    // Cuando el modal pasa a estar activo (se muestra en pantalla)
    _active() {
      this.patch({
        smooth: {
          alpha: 1
        } // Fade In suave
      });
    }

    // Cuando el componente pasa a estar inactivo (se oculta)
    _inactive() {
      this.alpha = 0;
    }

    // === Manejo del Control Remoto ===

    // Este método captura el foco general del componente
    _getFocused() {
      return this;
    }

    // Se dispara cuando el usuario aprieta la tecla OK/Enter
    _handleEnter() {
      if (this._onCloseCallback) this._onCloseCallback();
    }

    // Se dispara cuando el usuario aprieta la tecla Atrás/Back
    _handleBack() {
      if (this._onCloseCallback) this._onCloseCallback();
    }

    // Efecto visual de "Seleccionado" sobre el botón Volver
    _focus() {
      this.tag('Button').patch({
        color: 0xfffbb03b,
        // Cambia al color de acento
        Text: {
          text: {
            textColor: 0xff000000
          }
        },
        // Texto negro
        smooth: {
          scale: 1.05
        } // Se agranda un poquito
      });
    }

    // Efecto visual cuando pierde el foco (en este caso, cuando se cierra)
    _unfocus() {
      this.tag('Button').patch({
        color: 0xff444444,
        Text: {
          text: {
            textColor: 0xffffffff
          }
        },
        smooth: {
          scale: 1.0
        }
      });
    }
  }

  class TVPlayer extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        rect: true,
        // El fondo debe ser transparente para poder ver el iframe en el DOM que estará detrás
        color: 0x00000000,
        // Nuestro botón visual (ahora es un elemento dibujado en el Canvas)
        Controls: {
          x: 60,
          y: 60,
          alpha: 1,
          rect: true,
          color: 0xb3000000,
          // Fondo negro semi-transparente
          w: 360,
          h: 60,
          Text: {
            mount: 0.5,
            x: 180,
            y: 30,
            text: {
              text: 'Atrás / Esc para salir',
              fontSize: 24,
              fontFace: 'Regular',
              textColor: 0xffffffff
            }
          }
        }
      };
    }
    _init() {
      this._timer = null;
      this._isClosing = false;
    }

    // Se ejecuta automáticamente cuando el componente se muestra en pantalla
    _active() {
      this._isClosing = false;
      this._createIframe();
      this._wakeUpControls();
    }

    // Se ejecuta automáticamente cuando el componente se oculta o destruye
    _inactive() {
      this._destroyIframe();
      this._clearTimer();
    }

    // Setters equivalentes a los Props de React
    set videoId(id) {
      this._videoId = id;
      // Si el video cambia mientras está reproduciendo, lo recargamos
      if (this.active) {
        this._destroyIframe();
        this._createIframe();
      }
    }
    set onClose(callback) {
      this._onCloseCallback = callback;
    }
    _createIframe() {
      if (this._iframe || !this._videoId) return;
      this._iframe = document.createElement('iframe');
      this._iframe.className = 'tv-iframe';
      this._iframe.src = "https://www.youtube-nocookie.com/embed/".concat(this._videoId, "?autoplay=1&fs=1&modestbranding=1&rel=0");
      this._iframe.frameBorder = '0';
      this._iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      this._iframe.allowFullscreen = true;

      // Estilos para que ocupe toda la pantalla y quede por debajo del canvas de Lightning
      this._iframe.style.position = 'absolute';
      this._iframe.style.top = '0';
      this._iframe.style.left = '0';
      this._iframe.style.width = '100vw';
      this._iframe.style.height = '100vh';
      this._iframe.style.zIndex = '-1';
      this._iframe.style.border = 'none';
      document.body.appendChild(this._iframe);
    }
    _destroyIframe() {
      if (this._iframe && this._iframe.parentNode) {
        this._iframe.parentNode.removeChild(this._iframe);
        this._iframe = null;
      }
    }
    _wakeUpControls() {
      this.tag('Controls').alpha = 1;
      this._clearTimer();
      this._timer = setTimeout(() => {
        this.tag('Controls').patch({
          smooth: {
            alpha: 0
          } // Desvanecimiento suave en Lightning
        });
      }, 4000);
    }
    _clearTimer() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    }

    // Este método intercepta la tecla Escape y Backspace (Atrás) por defecto en Lightning
    _handleBack() {
      if (this._isClosing) return;
      this._isClosing = true;
      if (this._onCloseCallback) {
        this._onCloseCallback();
      }
    }

    // Este método intercepta cualquier otra tecla (flechas, enter)
    _handleKey() {
      this._wakeUpControls();
      return false; // Retornar false permite que las teclas hagan otras cosas si es necesario
    }
  }

  class VideoCard extends Lightning$1.Component {
    static _template() {
      return {
        w: 280,
        // Candado base para grilla normal
        h: 175,
        // Aspect ratio 16:10
        rect: true,
        color: 0xff111111,
        // var(--bg-black)
        clipping: true,
        // Evita que la imagen se salga de los bordes
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: 8
        },
        Fallback: {
          w: w => w,
          h: h => h,
          rect: true,
          color: 0xff333333,
          // Fondo gris del fallback
          Text: {
            mount: 0.5,
            x: w => w / 2,
            y: h => h / 2,
            text: {
              text: '?',
              fontSize: 64,
              fontFace: 'Regular',
              textColor: 0xff38b6ff // Letra color celeste
            }
          }
        },
        Image: {
          w: w => w,
          h: h => h,
          alpha: 1 // DEBE iniciar en 1 para que WebGL fuerce la descarga de la textura
        },
        Badge: {
          mountX: 1,
          mountY: 1,
          x: w => w - 8,
          y: h => h - 8,
          rect: true,
          color: 0x00000000,
          // Transparente por defecto
          alpha: 0,
          shader: {
            type: Lightning$1.shaders.RoundedRectangle,
            radius: 4
          },
          Dot: {
            w: 6,
            h: 6,
            x: 8,
            mountY: 0.5,
            y: 13,
            rect: true,
            color: 0xffffffff,
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: 3
            },
            alpha: 0 // Oculto por defecto
          },
          Text: {
            x: 8,
            // Dinámico si hay punto
            mountY: 0.5,
            y: 14,
            // Compensación visual vertical
            text: {
              text: '',
              fontSize: 14,
              // Equivalente a 0.75rem
              fontFace: 'Regular',
              textColor: 0xffffffff
            }
          }
        }
      };
    }
    _init() {
      // Animación de titilar para el badge de Vivo/Estreno
      this._blinkAnim = this.tag('Badge.Dot').animation({
        duration: 1.2,
        repeat: -1,
        actions: [{
          p: 'alpha',
          v: {
            0: 1,
            1: 0.3
          }
        }]
      });

      // Escuchar error en la carga de la imagen
      this.tag('Image').on('txError', () => {
        this._handleImageError();
      });

      // Escuchar cuando la imagen carga exitosamente
      this.tag('Image').on('txLoaded', () => {
        // Si está todo bien, mostramos la imagen
        this.tag('Image').alpha = 1;
        this.tag('Fallback').alpha = 0;
      });
    }
    _handleImageError() {
      this.tag('Image').alpha = 0;
      this.tag('Fallback').alpha = 1;
      const letter = this._fallbackText ? this._fallbackText.substring(0, 1).toUpperCase() : '?';
      this.tag('Fallback.Text').text.text = letter;

      // Llama al callback de error si fue provisto
      if (this.onImageError) {
        this.onImageError();
      }
    }

    // Setter equivalente a pasarle "props" desde React
    set item(data) {
      this._imageUrl = data.imageUrl;
      this._fallbackText = data.fallbackText;
      this.onClick = data.onClick;
      this.onImageError = data.onImageError;

      // Si hay imagen, asigarla para iniciar la carga
      if (this._imageUrl) {
        this.tag('Fallback').alpha = 1; // Aseguramos que el fallback se vea mientras carga
        this.tag('Image').alpha = 1; // Restauramos la visibilidad por si se reusa la tarjeta

        // --- SOLUCIÓN DEFINITIVA A CORS EN WEBGL ---
        // WebGL es estricto: si YouTube no envía la cabecera CORS, la textura colapsa.
        // Pasamos las imágenes de Google/YouTube por un Image CDN (wsrv.nl) que fuerza el CORS.
        let finalSrc = this._imageUrl;
        if (finalSrc.includes('ytimg.com') || finalSrc.includes('youtube.com') || finalSrc.includes('ggpht.com')) {
          finalSrc = "https://wsrv.nl/?url=".concat(encodeURIComponent(finalSrc));
        }
        this.tag('Image').src = finalSrc;
      } else {
        this._handleImageError();
      }
      this._updateBadge(data);
    }
    _updateBadge(_ref) {
      let isLive = _ref.isLive,
        isPremiere = _ref.isPremiere,
        isPast = _ref.isPast,
        isUpcoming = _ref.isUpcoming;
      const badge = this.tag('Badge');
      const label = this.tag('Badge.Text');
      const dot = this.tag('Badge.Dot');
      badge.alpha = 1;
      let text = '';
      let hasDot = false;
      let textColor = 0xffffffff;
      let strokeColor = 0x00000000;
      let strokeWidth = 0;

      // Colores base equivalentes a las variables de tu CSS original
      const PREMIERE_COLOR = 0xff0055ff; // Azul
      const LIVE_COLOR = 0xffff0000; // Rojo
      const PAST_BG = 0xe6000000; // rgba(0,0,0,0.9)
      const PAST_TEXT = 0xffbbbbbb; // Gris texto
      const UPCOMING_BG = 0xc03d3d3c; // rgba(61,61,60,0.75)

      if (isLive) {
        badge.color = isPremiere ? PREMIERE_COLOR : LIVE_COLOR;
        text = isPremiere ? 'ESTRENO' : 'EN VIVO';
        hasDot = true;
        strokeWidth = isPremiere ? 1 : 0;
        strokeColor = PREMIERE_COLOR;
      } else if (isPast) {
        badge.color = PAST_BG;
        textColor = PAST_TEXT;
        text = isPremiere ? 'ESTRENADO' : 'FINALIZADO';
        strokeWidth = 1;
        strokeColor = isPremiere ? 0xff002a80 : 0xff800000; // color-mix black 50%
      } else if (isUpcoming) {
        badge.color = UPCOMING_BG;
        text = isPremiere ? 'ESTRENO PROG.' : 'PROGRAMADO';
        strokeWidth = 1;
        strokeColor = isPremiere ? PREMIERE_COLOR : LIVE_COLOR;
      } else {
        badge.alpha = 0; // Ocultar si no cumple ninguna condición
        if (this._blinkAnim) this._blinkAnim.pause();
        return;
      }
      label.text.text = text;
      label.text.textColor = textColor;
      if (hasDot) {
        dot.alpha = 1;
        label.x = 20; // Hacemos lugar para el punto
        if (this._blinkAnim && !this._blinkAnim.isPlaying()) this._blinkAnim.play();
        badge.w = text.length * 8 + 30; // Aproximación ancho con punto
      } else {
        dot.alpha = 0;
        label.x = 8;
        if (this._blinkAnim) this._blinkAnim.pause();
        badge.w = text.length * 8 + 16; // Aproximación ancho sin punto
      }
      badge.h = 26; // Alto fijo para el fondo
      badge.shader = {
        type: Lightning$1.shaders.RoundedRectangle,
        radius: 4,
        stroke: strokeWidth,
        strokeColor
      };
    }

    // Equivalente al onClick en la TV (Apretar OK/Enter en el control remoto)
    _handleEnter() {
      if (this.onClick) {
        this.onClick(this);
      }
    }

    // Efecto visual cuando navegas hacia la tarjeta
    _focus() {
      this.patch({
        smooth: {
          scale: 1.05
        }
      });
    }

    // Efecto visual cuando sales de la tarjeta
    _unfocus() {
      this.patch({
        smooth: {
          scale: 1.0
        }
      });
    }
  }

  const getFreshImage = (url, dateString) => {
    if (!url) return url;
    const timestamp = new Date(dateString || Date.now()).getTime();
    const separator = url.includes('?') ? '&' : '?';
    return "".concat(url).concat(separator, "t=").concat(timestamp);
  };
  const formatActivityDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  class ChannelCard extends Lightning$1.Component {
    static _template() {
      return {
        w: 320,
        h: 300,
        rect: true,
        color: 0xff1a1a1a,
        // bg-dark
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: 15,
          stroke: 2,
          strokeColor: 0xff38b6ff
        },
        // border: 2px solid var(--accent-blue)
        clipping: true,
        // Cabecera: Logo y Título
        Header: {
          y: 20,
          x: 20,
          w: 280,
          Logo: {
            w: 32,
            h: 32,
            alpha: 0,
            // Se muestra solo si hay imagen
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: 16,
              stroke: 1,
              strokeColor: 0xff38b6ff
            }
          },
          Title: {
            x: 42,
            y: 4,
            text: {
              text: '',
              fontSize: 22,
              fontFace: 'Bold',
              textColor: 0xffffffff,
              wordWrapWidth: 160,
              maxLines: 1,
              textOverflow: 'ellipsis'
            }
          },
          InfoBtn: {
            x: 220,
            y: 0,
            w: 60,
            h: 32,
            rect: true,
            color: 0x00000000,
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: 8,
              stroke: 1,
              strokeColor: 0xff38b6ff
            },
            Text: {
              mount: 0.5,
              x: 30,
              y: 17,
              text: {
                text: 'Info',
                fontSize: 16,
                fontFace: 'Regular',
                textColor: 0xff38b6ff
              }
            }
          }
        },
        // Cuerpo: Contendrá las VideoCards dinámicamente
        Body: {
          y: 65,
          x: 20
        },
        // Textos para la versión expandida (On-Demand)
        ExpandedInfo: {
          alpha: 0,
          // Oculto por defecto
          y: 65,
          x: 20,
          City: {
            y: 190,
            text: {
              text: '',
              fontSize: 18,
              textColor: 0xff38b6ff,
              fontFace: 'Bold'
            }
          },
          Desc: {
            y: 225,
            text: {
              text: '',
              fontSize: 18,
              textColor: 0xffdddddd,
              fontFace: 'Regular',
              wordWrapWidth: 410,
              maxLines: 10,
              lineHeight: 26
            }
          }
        },
        // Pie de página: Última actividad
        Footer: {
          y: 250,
          // Se ajustará dinámicamente según la altura
          x: 160,
          mountX: 0.5,
          alpha: 1,
          Bg: {
            mountX: 0.5,
            x: 0,
            y: 0,
            rect: true,
            color: 0xff222222,
            // var(--bg-panel)
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: 6,
              stroke: 1,
              strokeColor: 0xff333333
            },
            w: 200,
            h: 30
          },
          Text: {
            mount: 0.5,
            x: 0,
            y: 16,
            text: '',
            fontSize: 16,
            fontFace: 'Regular',
            textColor: 0xffaaaaaa
          }
        }
      };
    }
    _construct() {
      this._failedVideos = new Set();
    }

    // Manejador del estado y propiedades
    set item(data) {
      this._item = data;
      this._updateLayout();
    }
    get item() {
      return this._item;
    }
    _updateLayout() {
      if (!this._item) return;
      const _this$_item = this._item,
        channel = _this$_item.channel,
        isExpanded = _this$_item.isExpanded,
        isLiveGroup = _this$_item.isLiveGroup;

      // Lógica de filtrado de videos fallidos y ordenamiento
      let activeVideos = [];
      if (isLiveGroup && channel.Actives) {
        activeVideos = Object.values(channel.Actives).filter(v => !this._failedVideos.has(v.VideoId)).sort((a, b) => {
          if (a.IsPremiere && !b.IsPremiere) return 1;
          if (!a.IsPremiere && b.IsPremiere) return -1;
          const timeA = new Date(a.ActualStartTime || a.ScheduledStartTime || a.AddedAt || 0).getTime();
          const timeB = new Date(b.ActualStartTime || b.ScheduledStartTime || b.AddedAt || 0).getTime();
          return timeB - timeA;
        });
      }
      const mainActive = activeVideos.length > 0 ? activeVideos[0] : null;
      const restoActivos = activeVideos.slice(1);

      // Cálculo de dimensiones del componente contenedor
      let targetWidth = 320;
      let targetHeight = 300;
      if (isExpanded) {
        targetWidth = 450;
        targetHeight = 650; // Más alto para acomodar texto expandido
      } else if (isLiveGroup && restoActivos.length > 0) {
        targetWidth = 320 + restoActivos.length * 295; // 280 de width de VideoCard + 15 de gap
      }
      this.w = targetWidth;
      this.h = targetHeight;
      this.tag('Header').w = targetWidth - 40;
      this.tag('Header.InfoBtn').x = targetWidth - 40 - 60;
      this.tag('Footer').x = targetWidth / 2;

      // --- Render Header ---
      const showMiniLogo = channel.ChannelImgUrl && (isExpanded || isLiveGroup && mainActive);
      this.tag('Header.Logo').patch({
        src: showMiniLogo ? channel.ChannelImgUrl : null,
        alpha: showMiniLogo ? 1 : 0
      });
      this.tag('Header.Title').patch({
        text: {
          text: channel.ChannelName
        },
        x: showMiniLogo ? 45 : 0,
        // Empujamos el texto si hay logo
        text: {
          wordWrapWidth: targetWidth - 40 - 60 - (showMiniLogo ? 55 : 10)
        }
      });
      this.tag('Header.InfoBtn.Text').text.text = isExpanded ? 'Ocultar' : 'Info';

      // --- Render Body ---
      const bodyItems = [];
      this.tag('ExpandedInfo').alpha = 0;
      if (isExpanded) {
        // Modo Expandido
        bodyItems.push({
          type: VideoCard,
          w: 410,
          h: 256,
          // Expandido
          item: {
            imageUrl: channel.ChannelBannerUrl ? "".concat(channel.ChannelBannerUrl, "=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj") : channel.ChannelImgUrl,
            altText: channel.ChannelName,
            fallbackText: channel.ChannelName
          }
        });
        this.tag('ExpandedInfo').alpha = 1;
        this.tag('ExpandedInfo.City').text.text = channel.ChannelCity ? "\uD83D\uDCCD ".concat(channel.ChannelCity) : '';
        this.tag('ExpandedInfo.Desc').text.text = channel.ChannelDescription || "Sin descripción disponible.";
      } else if (isLiveGroup && mainActive) {
        // Modo Vivo con videos activos
        const primaryImageUrl = mainActive.ThumbnailUrl ? getFreshImage(mainActive.ThumbnailUrl, channel.LastActivityAt) : channel.ChannelImgUrl;
        bodyItems.push({
          type: VideoCard,
          item: {
            imageUrl: primaryImageUrl,
            altText: mainActive.Title || channel.ChannelName,
            fallbackText: channel.ChannelName,
            isLive: mainActive.Live !== false,
            isPremiere: mainActive.IsPremiere,
            onImageError: () => this._handleVideoError(mainActive.VideoId)
          }
        });
        restoActivos.forEach((activo, idx) => {
          bodyItems.push({
            type: VideoCard,
            x: 295 * (idx + 1),
            // Lo ubicamos a la derecha (280 + 15 gap)
            item: {
              imageUrl: activo.ThumbnailUrl ? getFreshImage(activo.ThumbnailUrl, channel.LastActivityAt) : undefined,
              altText: activo.Title,
              fallbackText: channel.ChannelName,
              isLive: true,
              isPremiere: activo.IsPremiere,
              onImageError: () => this._handleVideoError(activo.VideoId)
            }
          });
        });
      } else {
        // Modo On-Demand estándar
        bodyItems.push({
          type: VideoCard,
          item: {
            imageUrl: channel.ChannelImgUrl,
            altText: channel.ChannelName,
            fallbackText: channel.ChannelName
          }
        });
      }
      this.tag('Body').children = bodyItems;

      // --- Render Footer ---
      this.tag('Footer').y = targetHeight - 40; // Posición al fondo
      const footerText = formatActivityDate ? formatActivityDate(channel.LastActivityAt) : channel.LastActivityAt;
      this.tag('Footer.Text').text.text = footerText;
      this.tag('Footer.Bg').w = footerText.length * 8 + 30;
    }

    // Equivalente a `setFailedVideos(prev => new Set(prev).add(id))`
    _handleVideoError(videoId) {
      if (!this._failedVideos.has(videoId)) {
        this._failedVideos.add(videoId);
      }
    }

    // --- Interacciones del Control Remoto ---

    _focus() {
      // Animación al enfocar la tarjeta (agrandado suave y resaltado de borde exagerado en TV)
      this.patch({
        smooth: {
          scale: 1.05
        },
        color: 0xff333333,
        // background-color: #333
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: 15,
          stroke: 8,
          strokeColor: 0xff38b6ff
        },
        // outline: 8px solid var(--accent-blue)
        zIndex: 10
      });
      this.tag('Header.InfoBtn').patch({
        color: 0xff38b6ff,
        // background-color: var(--accent-blue)
        Text: {
          text: {
            textColor: 0xff1a1a1a
          }
        } // color: var(--bg-black)
      });
    }
    _unfocus() {
      this.patch({
        smooth: {
          scale: 1.0
        },
        color: 0xff1a1a1a,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: 15,
          stroke: 2,
          strokeColor: 0xff38b6ff
        },
        // border: 2px solid var(--accent-blue)
        zIndex: 1
      });
      this.tag('Header.InfoBtn').patch({
        color: 0x00000000,
        Text: {
          text: {
            textColor: 0xff38b6ff
          }
        }
      });
    }

    // Se dispara cuando el usuario presiona "Enter" en el control
    _handleEnter() {
      const _this$_item2 = this._item,
        channel = _this$_item2.channel,
        isExpanded = _this$_item2.isExpanded,
        isLiveGroup = _this$_item2.isLiveGroup,
        abrirCanal = _this$_item2.abrirCanal,
        abrirCanalOnStreams = _this$_item2.abrirCanalOnStreams;
      if (!isExpanded) {
        if (isLiveGroup && abrirCanal) abrirCanal(channel);else if (abrirCanalOnStreams) abrirCanalOnStreams(channel);
      }
    }

    // Atajo para la funcionalidad "toggleInfo" (Por ej: presionar tecla arriba o alguna otra lógica)
    // Opcionalmente, podrías asignar la tecla "Menu" o "Espacio" para que dispare esta acción.
    _handleMenu() {
      if (this._item.toggleInfo) {
        this._item.toggleInfo(this._item.channel.ChannelName);
      }
    }
  }

  // ==========================================
  // 1. Componente de Botón de Día (DayButton)
  // ==========================================
  class DayButton extends Lightning$1.Component {
    static _template() {
      return {
        w: COMPONENT_SIZE.BUTTON_HEIGHT + 110,
        h: COMPONENT_SIZE.BUTTON_HEIGHT,
        rect: true,
        color: COLORS.BG_PANEL,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.PILL
        },
        Label: {
          mount: 0.5,
          x: (COMPONENT_SIZE.BUTTON_HEIGHT + 110) / 2,
          y: COMPONENT_SIZE.BUTTON_HEIGHT / 2,
          text: {
            text: '',
            fontSize: TYPOGRAPHY.FONT_SIZE_LARGE,
            fontFace: TYPOGRAPHY.FONT_FAMILY,
            textColor: COLORS.TEXT_WHITE
          }
        }
      };
    }
    set item(data) {
      this._item = data;
      this.tag('Label').text.text = data.label;
      this._updateState();
    }
    set isSelected(val) {
      this._isSelected = val;
      this._updateState();
    }
    _updateState() {
      if (this.hasFocus()) {
        this.patch({
          color: COLORS.ACCENT_BLUE,
          Label: {
            text: {
              textColor: COLORS.BG_BLACK
            }
          },
          smooth: {
            scale: 1.1
          }
        });
      } else if (this._isSelected) {
        this.patch({
          color: COLORS.ACCENT_BLUE,
          Label: {
            text: {
              textColor: COLORS.BG_BLACK
            }
          },
          smooth: {
            scale: 1.0
          }
        });
      } else {
        this.patch({
          color: COLORS.BG_PANEL,
          Label: {
            text: {
              textColor: COLORS.TEXT_WHITE
            }
          },
          smooth: {
            scale: 1.0
          }
        });
      }
    }
    _focus() {
      this._updateState();
    }
    _unfocus() {
      this._updateState();
    }
    _handleEnter() {
      this.fireAncestors('$onDaySelected', this._item.date);
    }
  }

  // ==========================================
  // 2. Componente Evento Individual (EpgEvent)
  // ==========================================
  class EpgEvent extends Lightning$1.Component {
    static _template() {
      return {
        w: COMPONENT_SIZE.CARD_WIDTH,
        h: COMPONENT_SIZE.CARD_HEIGHT,
        rect: true,
        color: COLORS.BG_DARK,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.LARGE
        },
        TimeBadge: {
          y: SPACING.PADDING_SMALL,
          x: SPACING.PADDING_SMALL,
          h: 28,
          rect: true,
          color: COLORS.BG_PANEL,
          shader: {
            type: Lightning$1.shaders.RoundedRectangle,
            radius: BORDER_RADIUS.MEDIUM
          },
          Label: {
            x: SPACING.PADDING_SMALL * 1.5,
            mountY: 0.5,
            y: 16,
            text: {
              text: '',
              fontSize: TYPOGRAPHY.FONT_SIZE_SMALL,
              fontFace: TYPOGRAPHY.FONT_FAMILY,
              textColor: COLORS.TEXT_WHITE
            }
          }
        },
        VideoWrapper: {
          y: 35,
          w: COMPONENT_SIZE.CARD_WIDTH,
          h: 120,
          type: VideoCard
        },
        Title: {
          y: 160,
          x: SPACING.PADDING_SMALL,
          w: COMPONENT_SIZE.CARD_WIDTH - SPACING.PADDING_SMALL * 2,
          text: {
            text: '',
            fontSize: TYPOGRAPHY.FONT_SIZE_NORMAL,
            fontFace: TYPOGRAPHY.FONT_FAMILY,
            textColor: COLORS.TEXT_WHITE,
            maxLines: 2,
            textOverflow: 'ellipsis',
            wordWrapWidth: COMPONENT_SIZE.CARD_WIDTH - SPACING.PADDING_SMALL * 2
          }
        }
      };
    }
    set item(data) {
      this._item = data;
      const ev = data.ev;
        data.navigateYouTube;
        const onVideoError = data.onVideoError;

      // Formateo de fecha
      const formatTime = dateStr => {
        if (!dateStr) return "??:??";
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? "??:??" : d.toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      };
      const start = formatTime(ev.ActualStartTime || ev.ScheduledStartTime || ev.AddedAt);
      let timeText = start;
      if (ev.IsPast && !ev.Live) {
        const endStr = ev.ActualEndTime || ev.EndedAt;
        const end = endStr ? formatTime(endStr) : "??:??";
        timeText = "".concat(start, " - ").concat(end);
      }
      const isNotNow = !ev.Live;
      this.tag('TimeBadge').color = isNotNow ? COLORS.BG_DARK : COLORS.LIVE_BADGE;
      this.tag('TimeBadge.Label').text.text = timeText;
      this.tag('TimeBadge.Label').text.textColor = isNotNow ? COLORS.TEXT_GRAY : COLORS.TEXT_WHITE;

      // Ajustar dinámicamente el ancho del badge en base al texto
      this.tag('TimeBadge').w = Math.max(timeText.length * 8 + 24, 60);
      const rawImageUrl = ev.ThumbnailUrl || ev.channel.ChannelImgUrl;
      this.tag('VideoWrapper').item = {
        imageUrl: rawImageUrl ? getFreshImage(rawImageUrl, ev.channel.LastActivityAt) : undefined,
        altText: ev.Title,
        fallbackText: ev.channel.ChannelName,
        isLive: ev.Live,
        isPremiere: ev.IsPremiere || ev.WasPremiere,
        isPast: ev.IsPast && !ev.Live,
        isUpcoming: !ev.IsPast && !ev.Live,
        onImageError: () => onVideoError(ev.VideoId)
      };
      this.tag('Title').text.text = ev.Title || 'Transmisión sin título';
    }
    _focus() {
      this.patch({
        smooth: {
          scale: 1.05
        },
        color: COLORS.BG_PANEL,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.LARGE,
          stroke: 4,
          strokeColor: COLORS.ACCENT_BLUE
        },
        zIndex: 10
      });
    }
    _unfocus() {
      this.patch({
        smooth: {
          scale: 1.0
        },
        color: COLORS.BG_DARK,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.LARGE,
          stroke: 0
        },
        zIndex: 1
      });
    }
    _handleEnter() {
      if (this._item.navigateYouTube) {
        this._item.navigateYouTube("https://www.youtube.com/watch?v=".concat(this._item.ev.VideoId));
      }
    }
  }

  // ==========================================
  // 3. Fila de Canal Completa (EpgRow)
  // ==========================================
  class EpgRow extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 280,
        // Altura fija de la fila
        Sidebar: {
          w: 100,
          h: 260,
          rect: true,
          color: COLORS.BG_BLACK,
          Logo: {
            x: 10,
            y: 15,
            w: COMPONENT_SIZE.LOGO_SMALL,
            h: COMPONENT_SIZE.LOGO_SMALL,
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: BORDER_RADIUS.CIRCLE
            }
          },
          Name: {
            x: 10,
            y: 70,
            w: 80,
            text: {
              text: '',
              fontSize: TYPOGRAPHY.FONT_SIZE_SMALL,
              fontFace: TYPOGRAPHY.FONT_FAMILY,
              textColor: COLORS.ACCENT_BLUE,
              wordWrapWidth: 80,
              maxLines: 2,
              textAlign: 'center'
            }
          },
          InfoBtn: {
            x: 10,
            y: 170,
            w: 80,
            h: COMPONENT_SIZE.BUTTON_HEIGHT_SMALL,
            rect: true,
            color: COLORS.BG_PANEL,
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: BORDER_RADIUS.PILL
            },
            Label: {
              mount: 0.5,
              x: 40,
              y: COMPONENT_SIZE.BUTTON_HEIGHT_SMALL / 2,
              text: {
                text: 'Info',
                fontSize: TYPOGRAPHY.FONT_SIZE_SMALL,
                fontFace: TYPOGRAPHY.FONT_FAMILY,
                textColor: COLORS.TEXT_WHITE
              }
            }
          }
        },
        // Slider horizontal de videos
        TrackBounds: {
          x: 115,
          y: 0,
          w: 1805,
          h: 280,
          clipping: true,
          Slider: {
            x: 0,
            y: 0,
            Items: {}
          }
        }
      };
    }
    _construct() {
      this._index = 1; // 0 = InfoBtn (Sidebar), 1 a N = Eventos
      this._events = [];
    }
    set item(data) {
      this._item = data;
      const row = data.row,
        navigateYouTube = data.navigateYouTube,
        onVideoError = data.onVideoError,
        toggleInfo = data.toggleInfo;

      // Configurar Sidebar
      this.tag('Sidebar.Logo').src = row.channel.ChannelImgUrl;
      this.tag('Sidebar.Name').text.text = row.channel.ChannelName;
      this._toggleInfo = () => toggleInfo(row.channel.ChannelName);

      // Poblar Eventos
      let currentX = 0;
      const items = [];
      row.events.forEach((ev, idx) => {
        items.push({
          type: EpgEvent,
          x: currentX,
          item: {
            ev,
            navigateYouTube,
            onVideoError
          }
        });
        currentX += 280; // 240 de ancho + 40 de gap
      });
      this.tag('TrackBounds.Slider.Items').children = items;
      this._events = this.tag('TrackBounds.Slider.Items').children;

      // Auto-focus al primer video en vivo si existe, sino al primero normal
      const liveIndex = row.events.findIndex(e => e.Live);
      this._index = liveIndex !== -1 ? liveIndex + 1 : 1;
      this._updateScroll(true); // true = sin animación inicial
    }
    _handleLeft() {
      if (this._index > 0) {
        this._index--;
        this._updateScroll();
        this._refocus();
        return true;
      }
      return false; // Permite salir del EPG y volver al menú principal si hubiera uno
    }
    _handleRight() {
      if (this._index < this._events.length) {
        // length es N, index llega hasta N
        this._index++;
        this._updateScroll();
        this._refocus();
        return true;
      }
      return false;
    }
    _updateScroll() {
      let instant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // Lógica de Sidebar Foco vs Video Foco
      if (this._index === 0) {
        // Foco en Botón Info
        this.tag('Sidebar.InfoBtn').color = COLORS.ACCENT_BLUE;
        this.tag('Sidebar.InfoBtn.Label').text.textColor = COLORS.BG_BLACK;
      } else {
        // Foco en Slider
        this.tag('Sidebar.InfoBtn').color = COLORS.BG_PANEL;
        this.tag('Sidebar.InfoBtn.Label').text.textColor = COLORS.TEXT_WHITE;
        const evIndex = this._index - 1;
        let targetX = 0;
        if (evIndex > 0) {
          targetX = -(evIndex * 295) + 100; // Desplazar dejando un poco de margen visual (con gap de 15px)
        }
        if (instant) {
          this.tag('TrackBounds.Slider').x = targetX;
        } else {
          this.tag('TrackBounds.Slider').patch({
            smooth: {
              x: targetX
            }
          });
        }
      }
    }
    _getFocused() {
      if (this._index === 0) return this; // La propia fila captura enter si estamos en el InfoBtn
      return this._events[this._index - 1]; // Delegamos al EpgEvent
    }
    _handleEnter() {
      if (this._index === 0 && this._toggleInfo) {
        this._toggleInfo();
      }
    }
  }

  // ==========================================
  // 4. Grilla Principal de Horarios (Main Grid)
  // ==========================================
  class ScheduleGrid extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        alpha: 1,
        // Selector de Días Horizontal
        DaysRailBounds: {
          x: 60,
          y: 20,
          w: 1800,
          h: 70,
          clipping: true,
          Slider: {
            x: 0,
            y: 0,
            Items: {}
          }
        },
        // Mensaje de Vacío
        NoEventsMsg: {
          alpha: 0,
          mount: 0.5,
          x: 960,
          y: 540,
          text: {
            text: 'No hay transmisiones programadas para este día.',
            fontSize: TYPOGRAPHY.FONT_SIZE_XLARGE,
            fontFace: TYPOGRAPHY.FONT_FAMILY,
            textColor: COLORS.TEXT_GRAY
          }
        },
        // Contenedor Vertical de Canales
        EpgContainerBounds: {
          x: 0,
          y: 100,
          w: 1920,
          h: 830,
          clipping: true,
          Slider: {
            x: 0,
            y: 0,
            Items: {}
          }
        }
      };
    }
    _construct() {
      this._focusY = 0; // 0 = DaysRail, 1 a N = Filas de Canales
      this._dayIndex = 0; // Indice del día seleccionado visualmente
      this._failedVideos = new Set();
      this._failedChannels = new Set();
      this._rowsComponents = [];

      // Configuración de los 15 días (-7 a +7)
      this._today = new Date();
      this._today.setHours(0, 0, 0, 0);
      this._selectedDate = new Date(this._today);
      this._days = [];
      for (let i = -7; i <= 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        d.setHours(0, 0, 0, 0);
        this._days.push(d);
        if (d.getTime() === this._today.getTime()) {
          this._dayIndex = i + 7; // El índice inicial seleccionado será el "Hoy"
        }
      }
    }
    _init() {
      const daysItems = [];
      let currentX = 0;
      this._days.forEach((d, i) => {
        let label = d.toLocaleDateString('es-AR', {
          weekday: 'short',
          day: 'numeric',
          month: 'numeric'
        });
        if (d.getTime() === this._today.getTime()) {
          label = "Hoy";
        }
        daysItems.push({
          type: DayButton,
          x: currentX,
          item: {
            date: d,
            label
          }
        });
        currentX += 172; // 160 de ancho + 12 de gap (estilos CSS .days-rail gap: 12px)
      });
      this.tag('DaysRailBounds.Slider.Items').children = daysItems;
      this._dayButtons = this.tag('DaysRailBounds.Slider.Items').children;
    }

    // Equivalente a Props de React
    set config(data) {
      this._channels = data.channels || [];
      this._navigateYouTube = data.navigateYouTube;
      this._toggleInfo = data.toggleInfo;
      this._abrirCanal = data.abrirCanal;
      this._abrirCanalOnStreams = data.abrirCanalOnStreams;
      this._abrirCanalOnDemand = data.abrirCanalOnDemand;

      // Reactividad a ExpandedChannels
      if (data.expandedChannels && data.expandedChannels.size > 0) {
        // Obtener el primer canal expandido (en la app TV no se abren múltiples a la vez normalmente)
        const channelName = Array.from(data.expandedChannels)[0];
        const channel = this._channels.find(c => c.ChannelName === channelName);
        if (channel) {
          this.fireAncestors('$openExpandedModal', channel); // Emitimos para que App.js lo muestre en overlay completo
        }
      }
      this._buildGrid();
    }

    // Filtra y genera los datos (Equivalente al useMemo de channelRows en React)
    _buildGrid() {
      var _this = this;
      const rowsData = [];
      this._channels.forEach(channel => {
        if (this._failedChannels.has(channel.ChannelName)) return;
        const events = [];
        const checkAndAddEvent = function (v) {
          let isForceLive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (_this._failedVideos.has(v.VideoId)) return;
          const isLive = v.Live || isForceLive;
          const effectiveStartTime = v.ActualStartTime || v.ScheduledStartTime || v.AddedAt;
          if (effectiveStartTime) {
            const vDate = new Date(effectiveStartTime);
            if (vDate.getFullYear() === _this._selectedDate.getFullYear() && vDate.getMonth() === _this._selectedDate.getMonth() && vDate.getDate() === _this._selectedDate.getDate()) {
              if (!events.some(e => e.VideoId === v.VideoId)) {
                events.push({
                  ...v,
                  ScheduledStartTime: effectiveStartTime,
                  Live: isLive,
                  channel
                });
              }
            }
          }
        };
        if (channel.Upcoming) Object.values(channel.Upcoming).filter(v => v.ScheduledStartTime).forEach(v => checkAndAddEvent(v, false));
        if (channel.Actives) Object.values(channel.Actives).forEach(v => checkAndAddEvent(v, true));
        if (channel.Past) {
          Object.values(channel.Past).forEach(v => {
            const effectiveStartTime = v.ActualStartTime || v.ScheduledStartTime || v.AddedAt;
            if (!effectiveStartTime || this._failedVideos.has(v.VideoId)) return;
            const vDate = new Date(effectiveStartTime);
            if (!isNaN(vDate.getTime()) && vDate.toDateString() === this._selectedDate.toDateString()) {
              if (!events.some(e => e.VideoId === v.VideoId)) {
                events.push({
                  ...v,
                  ScheduledStartTime: effectiveStartTime,
                  Live: false,
                  IsPast: true,
                  channel
                });
              }
            }
          });
        }
        if (events.length > 0) {
          const getTime = dateStr => {
            if (!dateStr) return new Date().getTime();
            const t = new Date(dateStr).getTime();
            return isNaN(t) ? new Date().getTime() : t;
          };
          events.sort((a, b) => getTime(a.ScheduledStartTime) - getTime(b.ScheduledStartTime));
          rowsData.push({
            channel,
            events
          });
        }
      });
      rowsData.sort((a, b) => a.channel.ChannelName.localeCompare(b.channel.ChannelName));

      // Dibujar Filas
      this.tag('NoEventsMsg').alpha = rowsData.length === 0 ? 1 : 0;
      let currentY = 0;
      const rowItems = [];
      rowsData.forEach(row => {
        rowItems.push({
          type: EpgRow,
          y: currentY,
          item: {
            row,
            navigateYouTube: this._navigateYouTube,
            toggleInfo: this._toggleInfo,
            onVideoError: videoId => {
              this._failedVideos.add(videoId);
              this._buildGrid(); // Re-renderizar
            }
          }
        });
        currentY += 280; // Altura de fila
      });
      this.tag('EpgContainerBounds.Slider.Items').children = rowItems;
      this._rowsComponents = this.tag('EpgContainerBounds.Slider.Items').children;

      // Actualizar visualmente la selección de días
      if (this._dayButtons) {
        this._dayButtons.forEach((btn, idx) => {
          btn.isSelected = this._days[idx].getTime() === this._selectedDate.getTime();
        });
      }

      // Ajustar el foco si nos quedamos sin filas por el filtrado
      if (this._focusY > this._rowsComponents.length) {
        this._focusY = this._rowsComponents.length;
      }
      this._updateScrollVertical();
    }

    // Evento Escuchado desde DayButton
    $onDaySelected(date) {
      this._selectedDate = date;
      this._buildGrid();
    }

    // --- Manejo del Foco Vertical de la Pantalla ---
    _handleUp() {
      if (this._focusY > 0) {
        this._focusY--;
        this._updateScrollVertical();
        this._refocus();
        return true;
      }
      return false; // Escapa hacia AppHeader
    }
    _handleDown() {
      if (this._focusY < this._rowsComponents.length) {
        this._focusY++;
        this._updateScrollVertical();
        this._refocus();
        return true;
      }
      return false; // Escapa hacia AppFooter
    }
    _handleLeft() {
      if (this._focusY === 0 && this._dayIndex > 0) {
        this._dayIndex--;
        this.tag('DaysRailBounds.Slider').patch({
          smooth: {
            x: -(this._dayIndex * 172) + 500
          }
        }); // Ajustado al nuevo gap de 12px
        this._refocus();
        return true;
      }
      return false;
    }
    _handleRight() {
      if (this._focusY === 0 && this._dayIndex < this._dayButtons.length - 1) {
        this._dayIndex++;
        this.tag('DaysRailBounds.Slider').patch({
          smooth: {
            x: -(this._dayIndex * 172) + 500
          }
        }); // Ajustado al nuevo gap de 12px
        this._refocus();
        return true;
      }
      return false;
    }
    _updateScrollVertical() {
      if (this._focusY > 0) {
        const rowIndex = this._focusY - 1;
        // Desplazar contenedor EPG hacia arriba cuando bajamos de la fila 2
        let targetY = 0;
        if (rowIndex > 1) {
          targetY = -((rowIndex - 1) * 280); // Altura de fila: 280px
        }
        this.tag('EpgContainerBounds.Slider').patch({
          smooth: {
            y: targetY
          }
        });
      }
    }
    _getFocused() {
      if (this._focusY === 0) {
        return this._dayButtons[this._dayIndex]; // Selector de Días
      } else if (this._rowsComponents.length > 0) {
        return this._rowsComponents[this._focusY - 1]; // EpgRow específico
      }
      return this;
    }
  }

  class ChannelCategoryRow extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 400,
        // Altura: título + tarjetas
        alpha: 1,
        Title: {
          x: 60,
          y: 0,
          text: {
            text: '',
            fontSize: 36,
            fontFace: TYPOGRAPHY.FONT_FAMILY,
            textColor: COLORS.ACCENT_BLUE
          }
        },
        // Contenedor que moveremos hacia los lados para simular el scroll
        Slider: {
          x: 60,
          y: 60,
          Items: {}
        }
      };
    }
    _init() {
      this._index = 0; // Índice de la tarjeta enfocada
      this._cards = []; // Guardaremos referencias solo a los elementos enfocables (ChannelCard)
    }

    // Setter que reemplaza los "props" de React
    set category(data) {
      const title = data.title,
        channels = data.channels,
        expandedChannels = data.expandedChannels,
        toggleInfo = data.toggleInfo,
        abrirCanal = data.abrirCanal,
        abrirCanalOnStreams = data.abrirCanalOnStreams,
        abrirCanalOnDemand = data.abrirCanalOnDemand,
        navigateYouTube = data.navigateYouTube;
      if (!channels || channels.length === 0) {
        this.alpha = 0;
        return;
      }
      this.alpha = 1;
      this.tag('Title').text.text = title;
      let currentX = 0;
      const items = [];
      const GAP = 150; // Espaciado muy generoso entre tarjetas

      const isExpanded = name => expandedChannels && expandedChannels.has(name);
      const getCardWidth = channel => {
        const activeCount = Object.keys(channel.Actives || {}).length;
        if (activeCount > 1) {
          return COMPONENT_SIZE.CARD_WIDTH + (activeCount - 1) * 100;
        }
        return COMPONENT_SIZE.CARD_WIDTH;
      };
      channels.forEach(channel => {
        const cardW = getCardWidth(channel);
        items.push({
          type: ChannelCard,
          ref: "Card_".concat(channel.ChannelName),
          x: currentX,
          w: cardW,
          item: {
            channel,
            isExpanded: isExpanded(channel.ChannelName),
            isLiveGroup: title === 'AHORA',
            // true si es categoría de Live
            toggleInfo,
            abrirCanal,
            abrirCanalOnStreams,
            abrirCanalOnDemand,
            navigateYouTube
          }
        });
        currentX += cardW + GAP;
      });
      this.tag('Slider.Items').children = items;
      this._cards = this.tag('Slider.Items').children;
    }

    // --- Control de Foco y Navegación Horizontal ---
    _handleLeft() {
      if (this._index > 0) {
        this._index--;
        this._updateScroll();
        this._refocus();
        return true;
      }
      return false;
    }
    _handleRight() {
      if (this._index < this._cards.length - 1) {
        this._index++;
        this._updateScroll();
        this._refocus();
        return true;
      }
      return false;
    }
    _updateScroll() {
      const currentCard = this._cards[this._index];
      if (currentCard) {
        let targetX = 60 - currentCard.x;
        this.tag('Slider').patch({
          smooth: {
            x: targetX
          }
        });
      }
    }
    _getFocused() {
      return this._cards[this._index];
    }
  }

  class SearchModal extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        Background: {
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xaa000000
        },
        Container: {
          x: 960,
          y: 540,
          mount: 0.5,
          w: 1400,
          h: 600,
          rect: true,
          color: COLORS.BG_DARK,
          shader: {
            type: Lightning$1.shaders.RoundedRectangle,
            radius: BORDER_RADIUS.LARGE
          },
          Border: {
            w: 1400,
            h: 600,
            rect: true,
            color: 0x00000000,
            strokeObject: {
              color: COLORS.ACCENT_BLUE,
              width: 3
            },
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: BORDER_RADIUS.LARGE
            }
          },
          Title: {
            x: 30,
            y: 30,
            text: {
              text: 'Buscar Canal',
              fontSize: TYPOGRAPHY.FONT_SIZE_LARGE,
              fontFace: TYPOGRAPHY.FONT_FAMILY,
              textColor: COLORS.TEXT_WHITE
            }
          },
          InputBox: {
            x: 30,
            y: 80,
            w: 1340,
            h: 60,
            rect: true,
            color: COLORS.ACCENT_BLUE,
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: BORDER_RADIUS.MEDIUM
            },
            InputText: {
              x: 20,
              y: 15,
              text: {
                text: '',
                fontSize: TYPOGRAPHY.FONT_SIZE_LARGE,
                fontFace: TYPOGRAPHY.FONT_FAMILY,
                textColor: COLORS.BG_BLACK
              }
            }
          },
          Keyboard: {
            x: 30,
            y: 160
          }
        }
      };
    }
    _construct() {
      this._searchText = '';
      this._onSearch = null;
      this._rowIndex = 0;
      this._colIndex = 0;
      this._keyboardLayout = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '-', '_'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], ['ESPACIO', 'BORRAR', 'CANCELAR', 'BUSCAR']];
      this._keysGrid = [];
    }
    set config(data) {
      this._onSearch = data.onSearch;
      this._searchText = data.searchText || '';
      this._updateDisplay();
      this._rowIndex = 0;
      this._colIndex = 0;
      this._updateKeyboardFocus();
    }
    _init() {
      this._buildKeyboard();
    }
    _updateDisplay() {
      this.tag('Container.InputBox.InputText').text.text = this._searchText;
    }
    _buildKeyboard() {
      const keyboard = this.tag('Container.Keyboard');
      const gap = 12;
      let yPos = 0;
      const keysList = [];
      this._keysGrid = [];
      this._keyboardLayout.forEach((row, rIdx) => {
        let xPos = 0;
        const rowNodes = [];

        // Calcular el ancho de la fila para centrarla
        let rowWidth = row.reduce((acc, key) => acc + this._getKeyWidth(key) + gap, 0) - gap;
        xPos = (1340 - rowWidth) / 2; // Centrado horizontal

        row.forEach((key, cIdx) => {
          let bw = this._getKeyWidth(key);
          keysList.push({
            x: xPos,
            y: yPos,
            w: bw,
            h: 60,
            rect: true,
            color: COLORS.BG_PANEL,
            shader: {
              type: Lightning$1.shaders.RoundedRectangle,
              radius: BORDER_RADIUS.MEDIUM
            },
            Label: {
              x: bw / 2,
              y: 32,
              // Centrado vertical manual del texto
              mount: 0.5,
              text: {
                text: key,
                fontSize: TYPOGRAPHY.FONT_SIZE_LARGE,
                fontFace: TYPOGRAPHY.FONT_FAMILY,
                textColor: COLORS.TEXT_WHITE
              }
            }
          });
          rowNodes.push({
            key,
            index: keysList.length - 1
          });
          xPos += bw + gap;
        });
        this._keysGrid.push(rowNodes);
        yPos += 60 + gap;
      });
      keyboard.children = keysList;
    }
    _getKeyWidth(key) {
      if (key === 'ESPACIO') return 250;
      if (key === 'BORRAR' || key === 'CANCELAR' || key === 'BUSCAR') return 180;
      return 65; // Letras estándar
    }
    _updateKeyboardFocus() {
      const keyboard = this.tag('Container.Keyboard');

      // Desenfoquar todos
      keyboard.children.forEach(btn => {
        btn.patch({
          color: COLORS.BG_PANEL,
          Label: {
            text: {
              textColor: COLORS.TEXT_WHITE
            }
          },
          smooth: {
            scale: 1.0
          }
        });
      });

      // Enfocar el actual
      const flatIndex = this._keysGrid[this._rowIndex][this._colIndex].index;
      const btn = keyboard.children[flatIndex];
      if (btn) {
        btn.patch({
          color: COLORS.ACCENT_BLUE,
          Label: {
            text: {
              textColor: COLORS.BG_BLACK
            }
          },
          smooth: {
            scale: 1.1
          }
        });
      }
    }
    _handleUp() {
      if (this._rowIndex > 0) {
        this._rowIndex--;
        if (this._colIndex >= this._keysGrid[this._rowIndex].length) {
          this._colIndex = this._keysGrid[this._rowIndex].length - 1;
        }
        this._updateKeyboardFocus();
      }
      return true;
    }
    _handleDown() {
      if (this._rowIndex < this._keysGrid.length - 1) {
        this._rowIndex++;
        if (this._colIndex >= this._keysGrid[this._rowIndex].length) {
          this._colIndex = this._keysGrid[this._rowIndex].length - 1;
        }
        this._updateKeyboardFocus();
      }
      return true;
    }
    _handleLeft() {
      if (this._colIndex > 0) {
        this._colIndex--;
        this._updateKeyboardFocus();
      }
      return true;
    }
    _handleRight() {
      if (this._colIndex < this._keysGrid[this._rowIndex].length - 1) {
        this._colIndex++;
        this._updateKeyboardFocus();
      }
      return true;
    }
    _handleEnter() {
      const key = this._keysGrid[this._rowIndex][this._colIndex].key;
      if (key === 'ESPACIO') {
        this._searchText += ' ';
      } else if (key === 'BORRAR') {
        if (this._searchText.length > 0) {
          this._searchText = this._searchText.slice(0, -1);
        }
      } else if (key === 'CANCELAR') {
        this.fireAncestors('$closeSearchModal');
        return true;
      } else if (key === 'BUSCAR') {
        var _this$_onSearch;
        (_this$_onSearch = this._onSearch) === null || _this$_onSearch === void 0 || _this$_onSearch.call(this, this._searchText.trim());
        this.fireAncestors('$closeSearchModal');
        return true;
      } else {
        this._searchText += key.toLowerCase();
      }
      this._updateDisplay();
      return true;
    }
    _handleBack() {
      this.fireAncestors('$closeSearchModal');
      return true;
    }
  }

  class SelectItem extends Lightning$1.Component {
    static _template() {
      return {
        w: 600,
        h: 60,
        rect: true,
        color: 0x00000000,
        shader: {
          type: Lightning$1.shaders.RoundedRectangle,
          radius: BORDER_RADIUS.MEDIUM
        },
        Label: {
          x: 30,
          mountY: 0.5,
          y: 30,
          text: {
            text: '',
            fontSize: TYPOGRAPHY.FONT_SIZE_LARGE,
            textColor: COLORS.TEXT_WHITE
          }
        }
      };
    }
    set item(v) {
      this._value = v.value;
      this.tag('Label').text.text = v.label;
    }
    _focus() {
      this.patch({
        color: COLORS.ACCENT_BLUE,
        Label: {
          text: {
            textColor: COLORS.BG_BLACK
          }
        },
        smooth: {
          scale: 1.02
        }
      });
    }
    _unfocus() {
      this.patch({
        color: 0x00000000,
        Label: {
          text: {
            textColor: COLORS.TEXT_WHITE
          }
        },
        smooth: {
          scale: 1.0
        }
      });
    }
    _handleEnter() {
      this.fireAncestors('$onOptionSelected', this._value);
    }
  }
  class SelectModal extends Lightning$1.Component {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        Background: {
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xaa000000
        },
        Container: {
          x: 960,
          y: 540,
          mount: 0.5,
          w: 660,
          h: 800,
          rect: true,
          color: COLORS.BG_DARK,
          shader: {
            type: Lightning$1.shaders.RoundedRectangle,
            radius: BORDER_RADIUS.LARGE
          },
          Title: {
            x: 30,
            y: 30,
            text: {
              text: 'Seleccionar',
              fontSize: TYPOGRAPHY.FONT_SIZE_XLARGE,
              textColor: COLORS.ACCENT_BLUE
            }
          },
          ListBounds: {
            x: 30,
            y: 100,
            w: 600,
            h: 660,
            clipping: true,
            Slider: {
              y: 0,
              Items: {}
            }
          }
        }
      };
    }
    _construct() {
      this._index = 0;
      this._options = [];
      this._onSelect = null;
    }
    set config(data) {
      this._onSelect = data.onSelect;
      this.tag('Container.Title').text.text = data.title;
      this._options = data.options.map((opt, i) => ({
        type: SelectItem,
        y: i * 60,
        item: opt
      }));
      this.tag('Container.ListBounds.Slider.Items').children = this._options;
      this._index = 0;
      this._updateScroll(true);
    }
    _handleUp() {
      if (this._index > 0) {
        this._index--;
        this._updateScroll();
      }
      return true;
    }
    _handleDown() {
      if (this._index < this._options.length - 1) {
        this._index++;
        this._updateScroll();
      }
      return true;
    }
    _handleBack() {
      this.fireAncestors('$closeSelectModal');
      return true;
    }
    _updateScroll() {
      let instant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let targetY = 0;
      if (this._index > 5) {
        // Empieza a scrollear al pasar el 5to item
        targetY = -(this._index - 5) * 60;
      }
      if (instant) {
        this.tag('Container.ListBounds.Slider').y = targetY;
      } else {
        this.tag('Container.ListBounds.Slider').patch({
          smooth: {
            y: targetY
          }
        });
      }
    }
    _getFocused() {
      const items = this.tag('Container.ListBounds.Slider.Items').children;
      return items[this._index] || this;
    }
    $onOptionSelected(value) {
      if (this._onSelect) this._onSelect(value);
      this.fireAncestors('$closeSelectModal');
    }
  }

  class App extends Lightning$1.Component {
    static getFonts() {
      return [{
        family: 'Regular',
        url: Utils.asset('fonts/Roboto-Regular.ttf')
      }];
    }
    static _template() {
      return {
        w: 1920,
        h: 1080,
        Background: {
          w: 1920,
          h: 1080,
          color: 0xfffbb03b,
          src: Utils.asset('images/background.png')
        },
        // Estructura Principal
        Main: {
          Header: {
            type: AppHeader,
            y: 0,
            zIndex: 10
          },
          Content: {
            y: 140,
            // Debajo del Header
            Status: {
              type: StatusDisplay
            },
            Grid: {
              type: ScheduleGrid,
              alpha: 0
            },
            CardsLive: {
              type: ChannelCategoryRow,
              alpha: 0,
              y: 100
            },
            CardsDemand: {
              type: ChannelCategoryRow,
              alpha: 0,
              y: 500
            }
          },
          Footer: {
            type: AppFooter,
            y: 980,
            x: 680,
            // Centrado horizontal (1920 / 2 - 560 / 2)
            zIndex: 10
          }
        },
        // Capas Superpuestas (Modales y Reproductor)
        Overlays: {
          Player: {
            type: TVPlayer,
            alpha: 0 // Oculto hasta que se seleccione un video
          },
          Info: {
            type: InfoModal,
            zIndex: 20
          },
          Search: {
            type: SearchModal,
            alpha: 0,
            zIndex: 25
          },
          Select: {
            type: SelectModal,
            alpha: 0,
            zIndex: 26
          }
        }
      };
    }
    _init() {
      // Animación del fondo
      this.tag('Background').animation({
        duration: 15,
        repeat: -1,
        actions: [{
          t: '',
          p: 'color',
          v: {
            0: {
              v: 0xfffbb03b
            },
            0.5: {
              v: 0xfff46730
            },
            0.8: {
              v: 0xfffbb03b
            }
          }
        }]
      }).start();

      // --- Estado Principal de la Aplicación ---
      this._channels = [];
      this._allChannels = []; // Almacenar lista completa para filtrado
      this._provincesList = [];
      this._citiesList = [];
      this._cityProvinceMap = {};
      this._isLoadingChannels = true;
      this._searchText = '';
      this._selectedProvince = '';
      this._selectedCity = '';
      this._viewMode = 'cards'; // 'cards' o 'grid'

      // --- Control de Foco General ---
      this._focusedSection = 'header'; // 'header', 'content', 'footer', 'modal', 'player', 'search'
      this._contentRowIndex = 0; // 0 = CardsLive, 1 = CardsDemand (para navegación vertical)

      // Configurar Modales
      this.tag('Overlays.Info').onClose = () => {
        this._focusedSection = 'footer';
        this._updateUI();
        this._refocus();
      };
      this.tag('Overlays.Player').onClose = () => {
        this._focusedSection = 'content';
        this.tag('Overlays.Player').alpha = 0;
        this.tag('Main').alpha = 1; // Restauramos la interfaz principal
        this.tag('Background').alpha = 1;
        this._updateUI();
        this._refocus();
      };

      // Cargar Datos Iniciales
      this._fetchChannels();
      this._fetchProvinces();
    }
    async _fetchChannels() {
      try {
        this._isLoadingChannels = true;
        this._updateUI();
        this._channels = await getChannels();
        this._allChannels = [...this._channels]; // Guardar copia completa para filtrado
      } catch (err) {
        console.error("Error en App al cargar canales:", err);
      } finally {
        this._isLoadingChannels = false;
        this._updateUI();
        this._refocus(); // Siempre re-enfocar al terminar de cargar, para obligar al render
      }
    }
    async _fetchProvinces() {
      try {
        const data = await getProvinces();
        this._provincesList = data.provinces;
        this._cityProvinceMap = data.cityProvinceMap;
        this._citiesList = Object.keys(this._cityProvinceMap).sort();
        this._updateUI();
      } catch (err) {
        console.error("Error cargando provincias", err);
      }
    }

    // --- Lógica Unificada de Filtros ---
    _applyFilters() {
      let filtered = this._allChannels;
      if (this._searchText.trim() !== '') {
        filtered = filtered.filter(c => c.ChannelName.toLowerCase().includes(this._searchText.toLowerCase()));
      }
      if (this._selectedProvince !== '') {
        // Si se elige provincia, actualizamos la lista de ciudades permitidas
        this._citiesList = Object.keys(this._cityProvinceMap).filter(c => this._cityProvinceMap[c] === this._selectedProvince).sort();
        // Si la ciudad elegida ya no pertenece a la provincia, se limpia
        if (!this._citiesList.includes(this._selectedCity)) {
          this._selectedCity = '';
        }
        filtered = filtered.filter(c => {
          if (!c.ChannelCity) return false;
          return this._cityProvinceMap[c.ChannelCity] === this._selectedProvince;
        });
      } else {
        // Si borran la provincia, vuelven a estar todas las ciudades disponibles
        this._citiesList = Object.keys(this._cityProvinceMap).sort();
      }
      if (this._selectedCity !== '') {
        filtered = filtered.filter(c => c.ChannelCity === this._selectedCity);
      }
      this._channels = filtered;
      this._updateUI();
    }
    _updateUI() {
      // 1. Actualizar el Estado (StatusDisplay)
      const hasChannels = this._channels.length > 0;
      this.tag('Main.Content.Status').status = {
        isLoading: this._isLoadingChannels,
        hasChannels: hasChannels,
        hasFilteredChannels: true,
        searchText: this._searchText
      };

      // 2. Enviar Canales al componente activo (Grid o Cards)
      if (hasChannels && !this._isLoadingChannels) {
        if (this._viewMode === 'grid') {
          this.tag('Main.Content.Grid').alpha = 1;
          this.tag('Main.Content.CardsLive').alpha = 0;
          this.tag('Main.Content.CardsDemand').alpha = 0;
          this.tag('Main.Content.Grid').config = {
            channels: this._channels,
            navigateYouTube: url => this._openPlayer(url),
            toggleInfo: channelName => {
              this._focusedSection = 'modal';
              this.tag('Overlays.Info').alpha = 1;
            },
            abrirCanal: channel => this._playChannel(channel),
            abrirCanalOnStreams: channel => this._playChannel(channel),
            abrirCanalOnDemand: channel => this._playChannel(channel)
          };
        } else {
          this.tag('Main.Content.Grid').alpha = 0;

          // Separar canales en LIVE y ON DEMAND
          const canalesEnVivo = this._channels.filter(c => c.Actives && Object.keys(c.Actives).length > 0);
          const canalesOnDemand = this._channels.filter(c => !c.Actives || Object.keys(c.Actives).length === 0);

          // Mostrar u ocultar filas según tengan contenido
          this.tag('Main.Content.CardsLive').alpha = canalesEnVivo.length > 0 ? 1 : 0;
          this.tag('Main.Content.CardsDemand').alpha = canalesOnDemand.length > 0 ? 1 : 0;

          // Callbacks comunes
          const callbacks = {
            navigateYouTube: url => this._openPlayer(url),
            toggleInfo: channelName => {
              this._focusedSection = 'modal';
              this.tag('Overlays.Info').alpha = 1;
            },
            abrirCanal: channel => this._playChannel(channel),
            abrirCanalOnStreams: channel => this._playChannel(channel),
            abrirCanalOnDemand: channel => this._playChannel(channel)
          };

          // Configurar fila de LIVE
          if (canalesEnVivo.length > 0) {
            this.tag('Main.Content.CardsLive').category = {
              title: 'AHORA',
              channels: canalesEnVivo,
              expandedChannels: new Set(),
              // Placeholder
              ...callbacks
            };
          }

          // Configurar fila de ON DEMAND
          if (canalesOnDemand.length > 0) {
            this.tag('Main.Content.CardsDemand').category = {
              title: 'ON DEMAND',
              channels: canalesOnDemand,
              expandedChannels: new Set(),
              // Placeholder
              ...callbacks
            };
          }
        }
      } else {
        // Si está cargando o no hay canales, ocultamos las listas
        this.tag('Main.Content.Grid').alpha = 0;
        this.tag('Main.Content.CardsLive').alpha = 0;
        this.tag('Main.Content.CardsDemand').alpha = 0;
      }

      // 2. Actualizar Cabecera
      this.tag('Main.Header').config = {
        searchText: this._searchText,
        viewMode: this._viewMode,
        selectedProvince: this._selectedProvince,
        selectedCity: this._selectedCity,
        provinces: this._provincesList,
        cities: this._citiesList,
        callbacks: {
          onViewModeChange: mode => {
            this._viewMode = mode;
            this._focusedSection = 'content';
            this._updateUI();
            this._refocus();
          },
          onSearchClick: () => {
            this._focusedSection = 'search';
            this.tag('Overlays.Search').alpha = 1;
            this.tag('Overlays.Search').config = {
              searchText: this._searchText,
              onSearch: text => this._performSearch(text)
            };
            this._refocus();
          },
          onProvinceClick: () => {
            this._focusedSection = 'select';
            this.tag('Overlays.Select').alpha = 1;
            this.tag('Overlays.Select').config = {
              title: 'Seleccionar Provincia',
              options: [{
                label: 'Todas las provincias',
                value: ''
              }, ...this._provincesList.map(p => ({
                label: p,
                value: p
              }))],
              onSelect: prov => {
                this._selectedProvince = prov;
                this._applyFilters();
              }
            };
            this._refocus();
          },
          onCityClick: () => {
            if (!this._citiesList || this._citiesList.length === 0) return;
            this._focusedSection = 'select';
            this.tag('Overlays.Select').alpha = 1;
            this.tag('Overlays.Select').config = {
              title: 'Seleccionar Ciudad',
              options: [{
                label: 'Todas las ciudades',
                value: ''
              }, ...this._citiesList.map(c => ({
                label: c,
                value: c
              }))],
              onSelect: city => {
                this._selectedCity = city;
                this._applyFilters();
              }
            };
            this._refocus();
          }
        }
      };

      // 3. Actualizar Pie de página
      this.tag('Main.Footer').config = {
        isRefreshing: this._isLoadingChannels,
        onRefresh: () => this._fetchChannels(),
        onShowInfo: () => {
          this._focusedSection = 'modal';
          this.tag('Overlays.Info').alpha = 1; // Mostramos el modal
          this._refocus();
        }
      };
    }

    // --- Lógica para abrir el canal directamente ---
    _playChannel(channel) {
      let videoId = null;

      // 1. Si hay videos activos (En Vivo o Estrenos), buscar el ID del principal
      if (channel.Actives && Object.keys(channel.Actives).length > 0) {
        const activeVideos = Object.values(channel.Actives).sort((a, b) => {
          if (a.IsPremiere && !b.IsPremiere) return 1;
          if (!a.IsPremiere && b.IsPremiere) return -1;
          const timeA = new Date(a.ActualStartTime || a.ScheduledStartTime || a.AddedAt || 0).getTime();
          const timeB = new Date(b.ActualStartTime || b.ScheduledStartTime || b.AddedAt || 0).getTime();
          return timeB - timeA;
        });
        videoId = activeVideos[0].VideoId;
      }
      // 2. Si no hay activos, ver si hay un link directo en ChannelLiveUrl (ej: youtube.com/watch?v=...)
      else if (channel.ChannelLiveUrl) {
        const match = channel.ChannelLiveUrl.match(/v=([^&]+)/);
        if (match && match[1]) {
          videoId = match[1];
        }
      }
      if (videoId) {
        this._openPlayer("https://www.youtube.com/watch?v=".concat(videoId));
      } else {
        console.warn("No se encontró VideoId en vivo para reproducir:", channel.ChannelName);
      }
    }

    // --- Abrir Reproductor ---
    _openPlayer(url) {
      const match = url.match(/v=([^&]+)/);
      if (match && match[1]) {
        this._focusedSection = 'player';
        this.tag('Overlays.Player').videoId = match[1];
        this.tag('Overlays.Player').alpha = 1;
        this.tag('Main').alpha = 0; // Ocultamos la app detrás del reproductor
        this.tag('Background').alpha = 0;
        this._refocus();
      }
    }

    // --- Búsqueda de Canales ---
    _performSearch(text) {
      this._searchText = text.toLowerCase();
      this._applyFilters();
      this._focusedSection = 'content';
      this._refocus();
    }

    // --- Manejador para cerrar modal de búsqueda ---
    $closeSearchModal() {
      this.tag('Overlays.Search').alpha = 0;
      this._focusedSection = 'header';
      this._updateUI();
      this._refocus();
    }

    // --- Manejador para cerrar modal de selector ---
    $closeSelectModal() {
      this.tag('Overlays.Select').alpha = 0;
      this._focusedSection = 'header';
      this._updateUI();
      this._refocus();
    }

    // --- Manejo del Foco General ---
    _handleUp() {
      if (this._focusedSection === 'footer') {
        this._focusedSection = 'content';
        this._refocus();
      } else if (this._focusedSection === 'content') {
        // Si estamos en CardsDemand, intentamos ir a CardsLive
        if (this._contentRowIndex === 1 && this.tag('Main.Content.CardsLive').alpha === 1) {
          this._contentRowIndex = 0;
          this._refocus();
          return true;
        }
        // Si no podemos subir en content, vamos al header
        this._focusedSection = 'header';
        this._refocus();
      } else if (this._focusedSection === 'header') ;
    }
    _handleDown() {
      if (this._focusedSection === 'header') {
        this._focusedSection = 'content';
        this._contentRowIndex = 0; // Empezar en la primera fila visible
        this._refocus();
      } else if (this._focusedSection === 'content') {
        // Si estamos en CardsLive, intentamos ir a CardsDemand
        if (this._contentRowIndex === 0 && this.tag('Main.Content.CardsDemand').alpha === 1) {
          this._contentRowIndex = 1;
          this._refocus();
          return true;
        }
        // Si no podemos bajar en content, vamos al footer
        this._focusedSection = 'footer';
        this._refocus();
      } else if (this._focusedSection === 'footer') ;
    }
    _getFocused() {
      if (this._focusedSection === 'search') return this.tag('Overlays.Search');
      if (this._focusedSection === 'select') return this.tag('Overlays.Select');
      if (this._focusedSection === 'modal') return this.tag('Overlays.Info');
      if (this._focusedSection === 'player') return this.tag('Overlays.Player');
      if (this._focusedSection === 'header') return this.tag('Main.Header');
      if (this._focusedSection === 'footer') return this.tag('Main.Footer');
      if (this._focusedSection === 'content') {
        if (this._viewMode === 'grid' && this.tag('Main.Content.Grid').alpha === 1) {
          return this.tag('Main.Content.Grid');
        } else if (this._viewMode === 'cards') {
          // Navegar entre CardsLive y CardsDemand
          if (this._contentRowIndex === 0 && this.tag('Main.Content.CardsLive').alpha === 1) {
            return this.tag('Main.Content.CardsLive');
          } else if (this._contentRowIndex === 1 && this.tag('Main.Content.CardsDemand').alpha === 1) {
            return this.tag('Main.Content.CardsDemand');
          }
          // Si no está visible, buscar la primera fila visible
          if (this.tag('Main.Content.CardsLive').alpha === 1) {
            this._contentRowIndex = 0;
            return this.tag('Main.Content.CardsLive');
          }
          if (this.tag('Main.Content.CardsDemand').alpha === 1) {
            this._contentRowIndex = 1;
            return this.tag('Main.Content.CardsDemand');
          }
        }
      }
      return this;
    }
  }

  function index () {
    return Launch(App, ...arguments);
  }

  return index;

})();
//# sourceMappingURL=appBundle.js.map
