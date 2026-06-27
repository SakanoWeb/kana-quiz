import type { Messages } from './en';

/**
 * @file Spanish message catalog (must mirror the English key set).
 *
 * Spanish catalog. Must provide exactly the same keys as `en`. The
 * `satisfies Messages` check below makes a missing or extra key a compile error,
 * and the i18n parity test catches it at test time too.
 */
export const es = {
  // Brand / chrome
  'app.title': 'Kana Quiz',
  'nav.configure': 'Configurar',
  'nav.practice': 'Practicar',

  // Language selector
  'language.label': 'Idioma',
  'language.en': 'English',
  'language.es': 'Español',

  // Mode picker
  'modePicker.title': 'Modo',
  'mode.beta': 'beta',
  'mode.reading.name': 'Lectura',
  'mode.reading.description': 'Ves el carácter y escribes su lectura en romaji.',
  'mode.script.name': 'Transcripción',
  'mode.script.description': 'Te dan el romaji y escribes el kana correspondiente.',
  'mode.versus.name': 'Versus',
  'mode.versus.description': 'Aparecen dos caracteres y eliges cuál corresponde a la lectura.',
  'mode.writing.name': 'Escritura',
  'mode.writing.description': 'Te dan el romaji y dibujas el carácter. (En construcción.)',

  // Pool selector
  'pool.title': 'Pool de práctica',
  'pool.hint': 'Empieza con un preset o personaliza qué entra. Puedes combinar libremente.',
  'pool.presets': 'Presets',
  'pool.syllabaries': 'Silabarios',
  'pool.categories': 'Categorías',
  'pool.count': '{count} caracteres en la pool actual.',

  // Kinds
  'kind.hiragana': 'Hiragana',
  'kind.katakana': 'Katakana',
  'kind.kanji': 'Kanji',

  // Presets
  'preset.hiragana-basic': 'Hiragana básico',
  'preset.katakana-basic': 'Katakana básico',
  'preset.kana-basic': 'Kana básico',
  'preset.kana-full': 'Kana completo',

  // Categories: label + concept-level explanation
  'category.base.label': 'Básicas (gojūon)',
  'category.base.concept':
    'Las 46 sílabas fundamentales, el "cuadro de siempre" (de あ a ん). Es el punto de partida de todo.',
  'category.dakuten.label': 'Con dakuten ( ゛)',
  'category.dakuten.concept':
    'Versiones sonoras de las básicas, marcadas con dos rayitas ( ゛). か→が, さ→ざ, た→だ, は→ば. La consonante "vibra".',
  'category.handakuten.label': 'Con handakuten ( ゜)',
  'category.handakuten.concept':
    'Solo afecta a la fila de は, que con un pequeño círculo ( ゜) se convierte en ぱ/ぴ/ぷ/ぺ/ぽ (sonido "p").',
  'category.yoon.label': 'Combinadas (yōon)',
  'category.yoon.concept':
    'Sílabas contraídas: una sílaba de la columna -i seguida de un や/ゆ/よ pequeño, como きゃ (kya) o しょ (sho). Se leen como un solo sonido.',
  'category.extended.label': 'Katakana extendido',
  'category.extended.concept':
    'Combinaciones que solo existen en katakana para sonidos extranjeros: ファ (fa), ティ (ti), ヴ (vu)... Útiles para préstamos.',
  'category.obsolete.label': 'Obsoletas',
  'category.obsolete.concept':
    'Kana históricos que ya casi no se usan: ゐ (wi) y ゑ (we). Solo para quien busque completitud.',

  // Settings
  'settings.title': 'Ajustes',
  'settings.permissive.label': 'Corrección permisiva',
  'settings.permissive.desc':
    'Acepta cualquier lectura válida sin distinguir じ/ぢ, ず/づ ni を/お. Recomendado.',

  // Setup
  'setup.start': 'Empezar →',

  // Quiz
  'quiz.poolSettings': 'Ajustes de pool',
  'quiz.streak': 'racha',
  'quiz.best': 'mejor {best}',
  'quiz.next': 'Siguiente',
  'quiz.skip': 'Saltar',
  'quiz.instruction.reading': '¿Cómo se lee este carácter? (romaji)',
  'quiz.instruction.script': 'Escribe el kana de "{reading}"',
  'quiz.instruction.versus': '¿Cuál es "{reading}"?',
  'quiz.instruction.writing': 'Dibuja el carácter de "{reading}"',
  'quiz.emptyPool': 'La pool está vacía. Elige al menos un silabario y una categoría.',
  'quiz.configurePool': 'Configurar pool',
  'quiz.unusable': 'No se puede generar una pregunta con esta combinación. Prueba a ampliar la pool.',
  'quiz.adjust': 'Ajustar',
  'quiz.drawingStub': 'El modo de escritura está en construcción. La pista es {reading}.',

  // Answer reveal
  'reveal.correct': '¡Correcto!',
  'reveal.wrong': 'No es esa',
  'reveal.yourAnswer': 'Tu respuesta: {given}. Esperado: {expected}.',
  'reveal.meaning': 'Significado',

  // Common
  'common.on': 'Sí',
  'common.off': 'No',

  // Navigation / entry
  'nav.browse': 'Explorar',
  'modePicker.browse': 'Explorar caracteres',
  'modePicker.browseHint': 'Consulta kana y kanji en lugar de practicar.',

  // Browse landing
  'browse.title': 'Explorar caracteres',
  'browse.subtitle': 'Elige un sistema de escritura para ver el cuadro completo o consultar kanji.',
  'browse.hiragana': 'Hiragana',
  'browse.hiragana.desc': 'El silabario cursivo, para palabras nativas y gramática.',
  'browse.katakana': 'Katakana',
  'browse.katakana.desc': 'El silabario angular, para préstamos y énfasis.',
  'browse.kanji': 'Kanji',
  'browse.kanji.desc': 'Caracteres logográficos. Busca, desplázate y abre cualquiera para ver detalles.',
  'browse.back': '← Explorar',

  // Kana chart
  'browse.showVariations': 'Mostrar variaciones (lista completa)',
  'browse.baseOnly': 'Solo cuadro básico',
  'browse.section.gojuon': 'Gojūon (básicas)',
  'browse.section.dakuten': 'Dakuten ( ゛)',
  'browse.section.handakuten': 'Handakuten ( ゜)',
  'browse.section.yoon': 'Yōon (combinadas)',
  'browse.section.extended': 'Katakana extendido',
  'browse.section.obsolete': 'Obsoletas',

  // Kanji browser
  'browse.searchPlaceholder': 'Busca por kanji, lectura o significado…',
  'browse.noResults': 'Ningún kanji coincide con tu búsqueda.',
  'browse.resultCount': '{count} kanji',
  'browse.loadingMore': 'Cargando más…',
  'browse.loadMore': 'Cargar más',
  'browse.loading': 'Cargando kanji…',
  'browse.loadError': "No se pudo cargar la lista completa de kanji; se muestra un conjunto básico.",
  'browse.kanjiEnglishOnly': 'Esta sección solo está disponible en inglés.',

  // Kanji detail
  'kanji.on': "On'yomi",
  'kanji.kun': "Kun'yomi",
  'kanji.meanings': 'Significados',
  'kanji.strokes': 'Trazos',
  'kanji.jlpt': 'JLPT',
  'kanji.grade': 'Curso',
  'kanji.radical': 'Radical',
  'kanji.examples': 'Ejemplos',
  'kanji.close': 'Cerrar',
} satisfies Messages;
