/**
 * @file English message catalog (the source-of-truth locale).
 *
 * English catalog. This is the SOURCE-OF-TRUTH locale: its set of keys defines
 * the `MessageKey` type, and every other locale must provide the same keys.
 * Keys are flat and dot-namespaced for simple, type-safe lookup.
 */
export const en = {
  // Brand / chrome
  'app.title': 'Kana Quiz',
  'nav.configure': 'Configure',
  'nav.practice': 'Practice',

  // Language selector
  'language.label': 'Language',
  'language.en': 'English',
  'language.es': 'Español',

  // Mode picker
  'modePicker.title': 'Mode',
  'mode.beta': 'beta',
  'mode.reading.name': 'Reading',
  'mode.reading.description': 'You see the character and type its reading in romaji.',
  'mode.script.name': 'Transcription',
  'mode.script.description': 'You are given the romaji and write the matching kana.',
  'mode.versus.name': 'Versus',
  'mode.versus.description': 'Two characters appear and you pick which one matches the reading.',
  'mode.writing.name': 'Writing',
  'mode.writing.description': 'You are given the romaji and draw the character. (In progress.)',

  // Pool selector
  'pool.title': 'Practice pool',
  'pool.hint': 'Start with a preset or customize what is included. You can mix freely.',
  'pool.presets': 'Presets',
  'pool.syllabaries': 'Syllabaries',
  'pool.categories': 'Categories',
  'pool.count': '{count} characters in the current pool.',

  // Kinds
  'kind.hiragana': 'Hiragana',
  'kind.katakana': 'Katakana',
  'kind.kanji': 'Kanji',

  // Presets
  'preset.hiragana-basic': 'Basic hiragana',
  'preset.katakana-basic': 'Basic katakana',
  'preset.kana-basic': 'Basic kana',
  'preset.kana-full': 'Full kana',

  // Categories: label + concept-level explanation
  'category.base.label': 'Basics (gojūon)',
  'category.base.concept':
    'The 46 fundamental syllables, the "classic chart" (from あ to ん). The starting point for everything.',
  'category.dakuten.label': 'With dakuten ( ゛)',
  'category.dakuten.concept':
    'Voiced versions of the basics, marked with two small strokes ( ゛). か→が, さ→ざ, た→だ, は→ば. The consonant "vibrates".',
  'category.handakuten.label': 'With handakuten ( ゜)',
  'category.handakuten.concept':
    'Only affects the は row, which with a small circle ( ゜) becomes ぱ/ぴ/ぷ/ぺ/ぽ (a "p" sound).',
  'category.yoon.label': 'Combined (yōon)',
  'category.yoon.concept':
    'Contracted syllables: an -i column syllable followed by a small や/ゆ/よ, like きゃ (kya) or しょ (sho). Read as a single sound.',
  'category.extended.label': 'Extended katakana',
  'category.extended.concept':
    'Combinations that exist only in katakana to write foreign sounds: ファ (fa), ティ (ti), ヴ (vu)... Used for loanwords.',
  'category.obsolete.label': 'Obsolete',
  'category.obsolete.concept':
    'Historical kana that are barely used anymore: ゐ (wi) and ゑ (we). Only for the sake of completeness.',

  // Settings
  'settings.title': 'Settings',
  'settings.permissive.label': 'Permissive checking',
  'settings.permissive.desc':
    'Accepts any valid reading without distinguishing じ/ぢ, ず/づ or を/お. Recommended.',

  // Setup
  'setup.start': 'Start →',

  // Quiz
  'quiz.poolSettings': 'Pool settings',
  'quiz.streak': 'streak',
  'quiz.best': 'best {best}',
  'quiz.next': 'Next',
  'quiz.skip': 'Skip',
  'quiz.instruction.reading': 'How do you read this character? (romaji)',
  'quiz.instruction.script': 'Write the kana for "{reading}"',
  'quiz.instruction.versus': 'Which one is "{reading}"?',
  'quiz.instruction.writing': 'Draw the character for "{reading}"',
  'quiz.emptyPool': 'The pool is empty. Pick at least one syllabary and one category.',
  'quiz.configurePool': 'Configure pool',
  'quiz.unusable': "Can't generate a question with this combination. Try widening the pool.",
  'quiz.adjust': 'Adjust',
  'quiz.drawingStub': 'Writing mode is under construction. The hint is {reading}.',

  // Answer reveal
  'reveal.correct': 'Correct!',
  'reveal.wrong': 'Not that one',
  'reveal.yourAnswer': 'Your answer: {given}. Expected: {expected}.',
  'reveal.meaning': 'Meaning',

  // Common
  'common.on': 'On',
  'common.off': 'Off',

  // Navigation / entry
  'nav.browse': 'Browse',
  'modePicker.browse': 'Browse characters',
  'modePicker.browseHint': 'Look up kana and kanji instead of practising.',

  // Browse landing
  'browse.title': 'Browse characters',
  'browse.subtitle': 'Pick a writing system to explore the full chart or look up kanji.',
  'browse.hiragana': 'Hiragana',
  'browse.hiragana.desc': 'The cursive syllabary, used for native words and grammar.',
  'browse.katakana': 'Katakana',
  'browse.katakana.desc': 'The angular syllabary, used for loanwords and emphasis.',
  'browse.kanji': 'Kanji',
  'browse.kanji.desc': 'Logographic characters. Search, scroll and open any for details.',
  'browse.back': '← Browse',

  // Kana chart
  'browse.showVariations': 'Show variations (full list)',
  'browse.baseOnly': 'Base chart only',
  'browse.section.gojuon': 'Gojūon (basics)',
  'browse.section.dakuten': 'Dakuten ( ゛)',
  'browse.section.handakuten': 'Handakuten ( ゜)',
  'browse.section.yoon': 'Yōon (combined)',
  'browse.section.extended': 'Extended katakana',
  'browse.section.obsolete': 'Obsolete',

  // Kanji browser
  'browse.searchPlaceholder': 'Search by kanji, reading or meaning…',
  'browse.noResults': 'No kanji match your search.',
  'browse.resultCount': '{count} kanji',
  'browse.loadingMore': 'Loading more…',
  'browse.loadMore': 'Load more',
  'browse.loading': 'Loading kanji…',
  'browse.loadError': "Couldn't load the full kanji list; showing a basic set.",
  'browse.kanjiEnglishOnly': 'This section is only available in English.',

  // Kanji detail
  'kanji.on': "On'yomi",
  'kanji.kun': "Kun'yomi",
  'kanji.meanings': 'Meanings',
  'kanji.strokes': 'Strokes',
  'kanji.jlpt': 'JLPT',
  'kanji.grade': 'Grade',
  'kanji.radical': 'Radical',
  'kanji.examples': 'Examples',
  'kanji.close': 'Close',
} as const;

export type Messages = typeof en;
export type MessageKey = keyof Messages;
