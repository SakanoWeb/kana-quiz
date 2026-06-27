/**
 * @file Curated kanji dataset (JLPT N5 subset).
 *
 * @remarks
 * Hand-authored reference data used by the browse/reference view and available
 * to quiz modes. In the planned production pipeline this file is replaced by a
 * generated dataset merging KANJIDIC2 (readings, JLPT level, English meanings)
 * with HISPADIC (Spanish meanings); the shape stays identical, so no consuming
 * code changes. On'yomi are written in katakana and kun'yomi in hiragana, per
 * lexicographic convention.
 *
 * @packageDocumentation
 */

import type { KanjiExample, KanjiItem } from '../types';

/**
 * Build a localized example word.
 *
 * @param word - Written form, e.g. `日本`.
 * @param reading - Kana reading, e.g. `にほん`.
 * @param en - English gloss.
 * @param es - Spanish gloss.
 * @returns A {@link KanjiExample}.
 */
const ex = (word: string, reading: string, en: string, es: string): KanjiExample => ({
  word,
  reading,
  meaning: { en, es },
});

/** Parameters accepted by {@link k}. */
interface KanjiSpec {
  glyph: string;
  on: readonly string[];
  kun: readonly string[];
  en: readonly string[];
  es: readonly string[];
  strokes: number;
  grade: number;
  jlpt: number;
  radical: string;
  examples: readonly KanjiExample[];
}

/**
 * Build a fully-formed {@link KanjiItem} from a compact spec.
 *
 * @param spec - The kanji specification.
 * @returns The kanji item, with derived id and tags.
 */
function k(spec: KanjiSpec): KanjiItem {
  return {
    id: `kanji:${spec.glyph}`,
    kind: 'kanji',
    category: 'kanji',
    glyph: spec.glyph,
    tags: ['kanji', `jlpt-n${spec.jlpt}`, `grade-${spec.grade}`],
    onReadings: spec.on,
    kunReadings: spec.kun,
    meanings: { en: spec.en, es: spec.es },
    strokes: spec.strokes,
    jlpt: spec.jlpt,
    grade: spec.grade,
    radical: spec.radical,
    examples: spec.examples,
  };
}

/**
 * JLPT N5 kanji, in the conventional teaching order (numbers, time, nature,
 * people, position, then common words).
 */
export const KANJI_ITEMS: readonly KanjiItem[] = [
  k({ glyph: '一', on: ['イチ', 'イツ'], kun: ['ひと', 'ひと.つ'], en: ['one'], es: ['uno'], strokes: 1, grade: 1, jlpt: 5, radical: '一', examples: [ex('一つ', 'ひとつ', 'one (thing)', 'uno (cosa)'), ex('一月', 'いちがつ', 'January', 'enero')] }),
  k({ glyph: '二', on: ['ニ'], kun: ['ふた', 'ふた.つ'], en: ['two'], es: ['dos'], strokes: 2, grade: 1, jlpt: 5, radical: '二', examples: [ex('二つ', 'ふたつ', 'two (things)', 'dos (cosas)'), ex('二月', 'にがつ', 'February', 'febrero')] }),
  k({ glyph: '三', on: ['サン'], kun: ['み', 'み.つ', 'みっ.つ'], en: ['three'], es: ['tres'], strokes: 3, grade: 1, jlpt: 5, radical: '一', examples: [ex('三つ', 'みっつ', 'three (things)', 'tres (cosas)'), ex('三月', 'さんがつ', 'March', 'marzo')] }),
  k({ glyph: '四', on: ['シ'], kun: ['よ', 'よ.つ', 'よっ.つ', 'よん'], en: ['four'], es: ['cuatro'], strokes: 5, grade: 1, jlpt: 5, radical: '囗', examples: [ex('四つ', 'よっつ', 'four (things)', 'cuatro (cosas)'), ex('四月', 'しがつ', 'April', 'abril')] }),
  k({ glyph: '五', on: ['ゴ'], kun: ['いつ', 'いつ.つ'], en: ['five'], es: ['cinco'], strokes: 4, grade: 1, jlpt: 5, radical: '二', examples: [ex('五つ', 'いつつ', 'five (things)', 'cinco (cosas)'), ex('五月', 'ごがつ', 'May', 'mayo')] }),
  k({ glyph: '六', on: ['ロク'], kun: ['む', 'む.つ', 'むっ.つ'], en: ['six'], es: ['seis'], strokes: 4, grade: 1, jlpt: 5, radical: '八', examples: [ex('六つ', 'むっつ', 'six (things)', 'seis (cosas)'), ex('六月', 'ろくがつ', 'June', 'junio')] }),
  k({ glyph: '七', on: ['シチ'], kun: ['なな', 'なな.つ', 'なの'], en: ['seven'], es: ['siete'], strokes: 2, grade: 1, jlpt: 5, radical: '一', examples: [ex('七つ', 'ななつ', 'seven (things)', 'siete (cosas)'), ex('七月', 'しちがつ', 'July', 'julio')] }),
  k({ glyph: '八', on: ['ハチ'], kun: ['や', 'や.つ', 'やっ.つ', 'よう'], en: ['eight'], es: ['ocho'], strokes: 2, grade: 1, jlpt: 5, radical: '八', examples: [ex('八つ', 'やっつ', 'eight (things)', 'ocho (cosas)'), ex('八月', 'はちがつ', 'August', 'agosto')] }),
  k({ glyph: '九', on: ['キュウ', 'ク'], kun: ['ここの', 'ここの.つ'], en: ['nine'], es: ['nueve'], strokes: 2, grade: 1, jlpt: 5, radical: '乙', examples: [ex('九つ', 'ここのつ', 'nine (things)', 'nueve (cosas)'), ex('九月', 'くがつ', 'September', 'septiembre')] }),
  k({ glyph: '十', on: ['ジュウ', 'ジッ'], kun: ['とお', 'と'], en: ['ten'], es: ['diez'], strokes: 2, grade: 1, jlpt: 5, radical: '十', examples: [ex('十', 'とお', 'ten', 'diez'), ex('十月', 'じゅうがつ', 'October', 'octubre')] }),
  k({ glyph: '百', on: ['ヒャク'], kun: [], en: ['hundred'], es: ['cien', 'centena'], strokes: 6, grade: 1, jlpt: 5, radical: '白', examples: [ex('百', 'ひゃく', 'hundred', 'cien'), ex('三百', 'さんびゃく', 'three hundred', 'trescientos')] }),
  k({ glyph: '千', on: ['セン'], kun: ['ち'], en: ['thousand'], es: ['mil', 'millar'], strokes: 3, grade: 1, jlpt: 5, radical: '十', examples: [ex('千', 'せん', 'thousand', 'mil'), ex('三千', 'さんぜん', 'three thousand', 'tres mil')] }),
  k({ glyph: '万', on: ['マン', 'バン'], kun: [], en: ['ten thousand', 'myriad'], es: ['diez mil', 'miríada'], strokes: 3, grade: 2, jlpt: 5, radical: '一', examples: [ex('一万', 'いちまん', 'ten thousand', 'diez mil'), ex('万年筆', 'まんねんひつ', 'fountain pen', 'pluma estilográfica')] }),
  k({ glyph: '円', on: ['エン'], kun: ['まる', 'まる.い'], en: ['yen', 'circle', 'round'], es: ['yen', 'círculo', 'redondo'], strokes: 4, grade: 1, jlpt: 5, radical: '冂', examples: [ex('円', 'えん', 'yen', 'yen'), ex('千円', 'せんえん', 'thousand yen', 'mil yenes')] }),
  k({ glyph: '日', on: ['ニチ', 'ジツ'], kun: ['ひ', 'か'], en: ['day', 'sun'], es: ['día', 'sol'], strokes: 4, grade: 1, jlpt: 5, radical: '日', examples: [ex('日本', 'にほん', 'Japan', 'Japón'), ex('今日', 'きょう', 'today', 'hoy')] }),
  k({ glyph: '月', on: ['ゲツ', 'ガツ'], kun: ['つき'], en: ['month', 'moon'], es: ['mes', 'luna'], strokes: 4, grade: 1, jlpt: 5, radical: '月', examples: [ex('月曜日', 'げつようび', 'Monday', 'lunes'), ex('一月', 'いちがつ', 'January', 'enero')] }),
  k({ glyph: '火', on: ['カ'], kun: ['ひ', 'ほ'], en: ['fire'], es: ['fuego'], strokes: 4, grade: 1, jlpt: 5, radical: '火', examples: [ex('火曜日', 'かようび', 'Tuesday', 'martes'), ex('火山', 'かざん', 'volcano', 'volcán')] }),
  k({ glyph: '水', on: ['スイ'], kun: ['みず'], en: ['water'], es: ['agua'], strokes: 4, grade: 1, jlpt: 5, radical: '水', examples: [ex('水曜日', 'すいようび', 'Wednesday', 'miércoles'), ex('水', 'みず', 'water', 'agua')] }),
  k({ glyph: '木', on: ['ボク', 'モク'], kun: ['き', 'こ'], en: ['tree', 'wood'], es: ['árbol', 'madera'], strokes: 4, grade: 1, jlpt: 5, radical: '木', examples: [ex('木曜日', 'もくようび', 'Thursday', 'jueves'), ex('木', 'き', 'tree', 'árbol')] }),
  k({ glyph: '金', on: ['キン', 'コン'], kun: ['かね', 'かな'], en: ['gold', 'money', 'metal'], es: ['oro', 'dinero', 'metal'], strokes: 8, grade: 1, jlpt: 5, radical: '金', examples: [ex('金曜日', 'きんようび', 'Friday', 'viernes'), ex('お金', 'おかね', 'money', 'dinero')] }),
  k({ glyph: '土', on: ['ド', 'ト'], kun: ['つち'], en: ['earth', 'soil'], es: ['tierra', 'suelo'], strokes: 3, grade: 1, jlpt: 5, radical: '土', examples: [ex('土曜日', 'どようび', 'Saturday', 'sábado'), ex('土', 'つち', 'soil', 'tierra')] }),
  k({ glyph: '年', on: ['ネン'], kun: ['とし'], en: ['year'], es: ['año'], strokes: 6, grade: 1, jlpt: 5, radical: '干', examples: [ex('今年', 'ことし', 'this year', 'este año'), ex('去年', 'きょねん', 'last year', 'el año pasado')] }),
  k({ glyph: '人', on: ['ジン', 'ニン'], kun: ['ひと'], en: ['person'], es: ['persona'], strokes: 2, grade: 1, jlpt: 5, radical: '人', examples: [ex('日本人', 'にほんじん', 'Japanese person', 'persona japonesa'), ex('人', 'ひと', 'person', 'persona')] }),
  k({ glyph: '男', on: ['ダン', 'ナン'], kun: ['おとこ'], en: ['man', 'male'], es: ['hombre', 'varón'], strokes: 7, grade: 1, jlpt: 5, radical: '田', examples: [ex('男', 'おとこ', 'man', 'hombre'), ex('男子', 'だんし', 'boy', 'chico')] }),
  k({ glyph: '女', on: ['ジョ', 'ニョ'], kun: ['おんな', 'め'], en: ['woman', 'female'], es: ['mujer', 'hembra'], strokes: 3, grade: 1, jlpt: 5, radical: '女', examples: [ex('女', 'おんな', 'woman', 'mujer'), ex('女子', 'じょし', 'girl', 'chica')] }),
  k({ glyph: '子', on: ['シ', 'ス'], kun: ['こ'], en: ['child'], es: ['niño', 'hijo'], strokes: 3, grade: 1, jlpt: 5, radical: '子', examples: [ex('子ども', 'こども', 'child', 'niño'), ex('女子', 'じょし', 'girl', 'chica')] }),
  k({ glyph: '大', on: ['ダイ', 'タイ'], kun: ['おお', 'おお.きい'], en: ['big', 'large'], es: ['grande'], strokes: 3, grade: 1, jlpt: 5, radical: '大', examples: [ex('大きい', 'おおきい', 'big', 'grande'), ex('大学', 'だいがく', 'university', 'universidad')] }),
  k({ glyph: '中', on: ['チュウ'], kun: ['なか'], en: ['middle', 'inside', 'center'], es: ['medio', 'dentro', 'centro'], strokes: 4, grade: 1, jlpt: 5, radical: '丨', examples: [ex('中', 'なか', 'inside', 'dentro'), ex('中学', 'ちゅうがく', 'middle school', 'escuela secundaria')] }),
  k({ glyph: '小', on: ['ショウ'], kun: ['ちい.さい', 'こ', 'お'], en: ['small', 'little'], es: ['pequeño'], strokes: 3, grade: 1, jlpt: 5, radical: '小', examples: [ex('小さい', 'ちいさい', 'small', 'pequeño'), ex('小学校', 'しょうがっこう', 'elementary school', 'escuela primaria')] }),
  k({ glyph: '上', on: ['ジョウ'], kun: ['うえ', 'あ.げる', 'のぼ.る'], en: ['up', 'above', 'top'], es: ['arriba', 'encima'], strokes: 3, grade: 1, jlpt: 5, radical: '一', examples: [ex('上', 'うえ', 'above', 'encima'), ex('上手', 'じょうず', 'skilful', 'hábil')] }),
  k({ glyph: '下', on: ['カ', 'ゲ'], kun: ['した', 'さ.げる', 'くだ.る'], en: ['down', 'below', 'under'], es: ['abajo', 'debajo'], strokes: 3, grade: 1, jlpt: 5, radical: '一', examples: [ex('下', 'した', 'below', 'debajo'), ex('下手', 'へた', 'unskilful', 'torpe')] }),
  k({ glyph: '左', on: ['サ'], kun: ['ひだり'], en: ['left'], es: ['izquierda'], strokes: 5, grade: 1, jlpt: 5, radical: '工', examples: [ex('左', 'ひだり', 'left', 'izquierda'), ex('左右', 'さゆう', 'left and right', 'izquierda y derecha')] }),
  k({ glyph: '右', on: ['ウ', 'ユウ'], kun: ['みぎ'], en: ['right'], es: ['derecha'], strokes: 5, grade: 1, jlpt: 5, radical: '口', examples: [ex('右', 'みぎ', 'right', 'derecha'), ex('右手', 'みぎて', 'right hand', 'mano derecha')] }),
  k({ glyph: '本', on: ['ホン'], kun: ['もと'], en: ['book', 'origin', 'main'], es: ['libro', 'origen', 'principal'], strokes: 5, grade: 1, jlpt: 5, radical: '木', examples: [ex('本', 'ほん', 'book', 'libro'), ex('日本', 'にほん', 'Japan', 'Japón')] }),
  k({ glyph: '山', on: ['サン'], kun: ['やま'], en: ['mountain'], es: ['montaña'], strokes: 3, grade: 1, jlpt: 5, radical: '山', examples: [ex('山', 'やま', 'mountain', 'montaña'), ex('富士山', 'ふじさん', 'Mt. Fuji', 'monte Fuji')] }),
  k({ glyph: '川', on: ['セン'], kun: ['かわ'], en: ['river'], es: ['río'], strokes: 3, grade: 1, jlpt: 5, radical: '巛', examples: [ex('川', 'かわ', 'river', 'río'), ex('川口', 'かわぐち', 'river mouth', 'desembocadura')] }),
  k({ glyph: '田', on: ['デン'], kun: ['た'], en: ['rice field', 'paddy'], es: ['arrozal', 'campo'], strokes: 5, grade: 1, jlpt: 5, radical: '田', examples: [ex('田', 'た', 'rice field', 'arrozal'), ex('田中', 'たなか', 'Tanaka (surname)', 'Tanaka (apellido)')] }),
  k({ glyph: '名', on: ['メイ', 'ミョウ'], kun: ['な'], en: ['name'], es: ['nombre'], strokes: 6, grade: 1, jlpt: 5, radical: '口', examples: [ex('名前', 'なまえ', 'name', 'nombre'), ex('有名', 'ゆうめい', 'famous', 'famoso')] }),
  k({ glyph: '学', on: ['ガク'], kun: ['まな.ぶ'], en: ['study', 'learning'], es: ['estudio', 'aprendizaje'], strokes: 8, grade: 1, jlpt: 5, radical: '子', examples: [ex('学生', 'がくせい', 'student', 'estudiante'), ex('大学', 'だいがく', 'university', 'universidad')] }),
  k({ glyph: '校', on: ['コウ'], kun: [], en: ['school'], es: ['escuela'], strokes: 10, grade: 1, jlpt: 5, radical: '木', examples: [ex('学校', 'がっこう', 'school', 'escuela'), ex('高校', 'こうこう', 'high school', 'instituto')] }),
  k({ glyph: '先', on: ['セン'], kun: ['さき'], en: ['previous', 'ahead', 'tip'], es: ['anterior', 'delante', 'punta'], strokes: 6, grade: 1, jlpt: 5, radical: '儿', examples: [ex('先生', 'せんせい', 'teacher', 'profesor'), ex('先週', 'せんしゅう', 'last week', 'la semana pasada')] }),
  k({ glyph: '生', on: ['セイ', 'ショウ'], kun: ['い.きる', 'う.まれる', 'なま'], en: ['life', 'birth', 'raw'], es: ['vida', 'nacimiento', 'crudo'], strokes: 5, grade: 1, jlpt: 5, radical: '生', examples: [ex('学生', 'がくせい', 'student', 'estudiante'), ex('先生', 'せんせい', 'teacher', 'profesor')] }),
  k({ glyph: '私', on: ['シ'], kun: ['わたし', 'わたくし'], en: ['I', 'private', 'me'], es: ['yo', 'privado'], strokes: 7, grade: 6, jlpt: 5, radical: '禾', examples: [ex('私', 'わたし', 'I / me', 'yo'), ex('私立', 'しりつ', 'private (institution)', 'privado (institución)')] }),
  k({ glyph: '友', on: ['ユウ'], kun: ['とも'], en: ['friend'], es: ['amigo'], strokes: 4, grade: 2, jlpt: 5, radical: '又', examples: [ex('友だち', 'ともだち', 'friend', 'amigo'), ex('友人', 'ゆうじん', 'friend (formal)', 'amigo (formal)')] }),
  k({ glyph: '国', on: ['コク'], kun: ['くに'], en: ['country', 'nation'], es: ['país', 'nación'], strokes: 8, grade: 2, jlpt: 5, radical: '囗', examples: [ex('国', 'くに', 'country', 'país'), ex('外国', 'がいこく', 'foreign country', 'país extranjero')] }),
  k({ glyph: '語', on: ['ゴ'], kun: ['かた.る'], en: ['language', 'word'], es: ['idioma', 'palabra'], strokes: 14, grade: 2, jlpt: 5, radical: '言', examples: [ex('日本語', 'にほんご', 'Japanese language', 'idioma japonés'), ex('英語', 'えいご', 'English language', 'idioma inglés')] }),
  k({ glyph: '高', on: ['コウ'], kun: ['たか.い'], en: ['high', 'tall', 'expensive'], es: ['alto', 'caro'], strokes: 10, grade: 2, jlpt: 5, radical: '高', examples: [ex('高い', 'たかい', 'high / expensive', 'alto / caro'), ex('高校', 'こうこう', 'high school', 'instituto')] }),
  k({ glyph: '食', on: ['ショク'], kun: ['た.べる', 'く.う'], en: ['eat', 'food'], es: ['comer', 'comida'], strokes: 9, grade: 2, jlpt: 5, radical: '食', examples: [ex('食べる', 'たべる', 'to eat', 'comer'), ex('食堂', 'しょくどう', 'dining hall', 'comedor')] }),
  k({ glyph: '行', on: ['コウ', 'ギョウ'], kun: ['い.く', 'おこな.う'], en: ['go', 'line', 'carry out'], es: ['ir', 'línea', 'llevar a cabo'], strokes: 6, grade: 2, jlpt: 5, radical: '行', examples: [ex('行く', 'いく', 'to go', 'ir'), ex('銀行', 'ぎんこう', 'bank', 'banco')] }),
  k({ glyph: '来', on: ['ライ'], kun: ['く.る', 'きた.る'], en: ['come', 'next'], es: ['venir', 'próximo'], strokes: 7, grade: 2, jlpt: 5, radical: '木', examples: [ex('来る', 'くる', 'to come', 'venir'), ex('来年', 'らいねん', 'next year', 'el año que viene')] }),
  k({ glyph: '口', on: ['コウ', 'ク'], kun: ['くち'], en: ['mouth'], es: ['boca'], strokes: 3, grade: 1, jlpt: 5, radical: '口', examples: [ex('入口', 'いりぐち', 'entrance', 'entrada'), ex('口', 'くち', 'mouth', 'boca')] }),
  k({ glyph: '目', on: ['モク', 'ボク'], kun: ['め'], en: ['eye'], es: ['ojo'], strokes: 5, grade: 1, jlpt: 5, radical: '目', examples: [ex('目', 'め', 'eye', 'ojo')] }),
  k({ glyph: '耳', on: ['ジ'], kun: ['みみ'], en: ['ear'], es: ['oreja', 'oído'], strokes: 6, grade: 1, jlpt: 5, radical: '耳', examples: [ex('耳', 'みみ', 'ear', 'oreja')] }),
  k({ glyph: '手', on: ['シュ'], kun: ['て', 'た'], en: ['hand'], es: ['mano'], strokes: 4, grade: 1, jlpt: 5, radical: '手', examples: [ex('手', 'て', 'hand', 'mano'), ex('手紙', 'てがみ', 'letter', 'carta')] }),
  k({ glyph: '足', on: ['ソク'], kun: ['あし', 'た.りる'], en: ['foot', 'leg', 'suffice'], es: ['pie', 'pierna', 'bastar'], strokes: 7, grade: 1, jlpt: 5, radical: '足', examples: [ex('足', 'あし', 'foot / leg', 'pie / pierna')] }),
  k({ glyph: '力', on: ['リキ', 'リョク'], kun: ['ちから'], en: ['power', 'strength'], es: ['fuerza', 'poder'], strokes: 2, grade: 1, jlpt: 5, radical: '力', examples: [ex('力', 'ちから', 'strength', 'fuerza')] }),
  k({ glyph: '立', on: ['リツ'], kun: ['た.つ'], en: ['stand'], es: ['estar de pie', 'levantar'], strokes: 5, grade: 1, jlpt: 5, radical: '立', examples: [ex('立つ', 'たつ', 'to stand', 'ponerse de pie')] }),
  k({ glyph: '休', on: ['キュウ'], kun: ['やす.む'], en: ['rest'], es: ['descansar'], strokes: 6, grade: 1, jlpt: 5, radical: '人', examples: [ex('休む', 'やすむ', 'to rest', 'descansar'), ex('休日', 'きゅうじつ', 'holiday', 'día festivo')] }),
  k({ glyph: '出', on: ['シュツ'], kun: ['で.る', 'だ.す'], en: ['exit', 'leave', 'put out'], es: ['salir', 'sacar'], strokes: 5, grade: 1, jlpt: 5, radical: '凵', examples: [ex('出口', 'でぐち', 'exit', 'salida'), ex('出る', 'でる', 'to leave', 'salir')] }),
  k({ glyph: '入', on: ['ニュウ'], kun: ['はい.る', 'い.れる'], en: ['enter', 'put in'], es: ['entrar', 'meter'], strokes: 2, grade: 1, jlpt: 5, radical: '入', examples: [ex('入口', 'いりぐち', 'entrance', 'entrada'), ex('入る', 'はいる', 'to enter', 'entrar')] }),
  k({ glyph: '見', on: ['ケン'], kun: ['み.る'], en: ['see', 'look'], es: ['ver', 'mirar'], strokes: 7, grade: 1, jlpt: 5, radical: '見', examples: [ex('見る', 'みる', 'to see', 'ver')] }),
  k({ glyph: '飲', on: ['イン'], kun: ['の.む'], en: ['drink'], es: ['beber'], strokes: 12, grade: 3, jlpt: 5, radical: '食', examples: [ex('飲む', 'のむ', 'to drink', 'beber'), ex('飲み物', 'のみもの', 'beverage', 'bebida')] }),
  k({ glyph: '読', on: ['ドク'], kun: ['よ.む'], en: ['read'], es: ['leer'], strokes: 14, grade: 2, jlpt: 5, radical: '言', examples: [ex('読む', 'よむ', 'to read', 'leer')] }),
  k({ glyph: '書', on: ['ショ'], kun: ['か.く'], en: ['write'], es: ['escribir'], strokes: 10, grade: 2, jlpt: 5, radical: '曰', examples: [ex('書く', 'かく', 'to write', 'escribir')] }),
  k({ glyph: '聞', on: ['ブン', 'モン'], kun: ['き.く'], en: ['hear', 'ask', 'listen'], es: ['oír', 'preguntar', 'escuchar'], strokes: 14, grade: 2, jlpt: 5, radical: '耳', examples: [ex('聞く', 'きく', 'to listen', 'escuchar'), ex('新聞', 'しんぶん', 'newspaper', 'periódico')] }),
  k({ glyph: '話', on: ['ワ'], kun: ['はな.す', 'はなし'], en: ['speak', 'talk', 'story'], es: ['hablar', 'historia'], strokes: 13, grade: 2, jlpt: 5, radical: '言', examples: [ex('話す', 'はなす', 'to speak', 'hablar'), ex('電話', 'でんわ', 'telephone', 'teléfono')] }),
  k({ glyph: '買', on: ['バイ'], kun: ['か.う'], en: ['buy'], es: ['comprar'], strokes: 12, grade: 2, jlpt: 5, radical: '貝', examples: [ex('買う', 'かう', 'to buy', 'comprar'), ex('買い物', 'かいもの', 'shopping', 'compras')] }),
  k({ glyph: '雨', on: ['ウ'], kun: ['あめ'], en: ['rain'], es: ['lluvia'], strokes: 8, grade: 1, jlpt: 5, radical: '雨', examples: [ex('雨', 'あめ', 'rain', 'lluvia')] }),
  k({ glyph: '天', on: ['テン'], kun: ['あめ', 'あま'], en: ['heaven', 'sky'], es: ['cielo'], strokes: 4, grade: 1, jlpt: 5, radical: '大', examples: [ex('天気', 'てんき', 'weather', 'tiempo')] }),
  k({ glyph: '気', on: ['キ', 'ケ'], kun: [], en: ['spirit', 'energy', 'mood'], es: ['ánimo', 'energía', 'aire'], strokes: 6, grade: 1, jlpt: 5, radical: '气', examples: [ex('元気', 'げんき', 'healthy / lively', 'sano / animado'), ex('天気', 'てんき', 'weather', 'tiempo')] }),
  k({ glyph: '空', on: ['クウ'], kun: ['そら', 'あ.く', 'から'], en: ['sky', 'empty', 'air'], es: ['cielo', 'vacío', 'aire'], strokes: 8, grade: 1, jlpt: 5, radical: '穴', examples: [ex('空', 'そら', 'sky', 'cielo'), ex('空気', 'くうき', 'air', 'aire')] }),
  k({ glyph: '電', on: ['デン'], kun: [], en: ['electricity'], es: ['electricidad'], strokes: 13, grade: 2, jlpt: 5, radical: '雨', examples: [ex('電車', 'でんしゃ', 'train', 'tren'), ex('電気', 'でんき', 'electricity / light', 'electricidad / luz')] }),
  k({ glyph: '車', on: ['シャ'], kun: ['くるま'], en: ['car', 'wheel', 'vehicle'], es: ['coche', 'rueda', 'vehículo'], strokes: 7, grade: 1, jlpt: 5, radical: '車', examples: [ex('車', 'くるま', 'car', 'coche'), ex('電車', 'でんしゃ', 'train', 'tren')] }),
  k({ glyph: '駅', on: ['エキ'], kun: [], en: ['station'], es: ['estación'], strokes: 14, grade: 3, jlpt: 5, radical: '馬', examples: [ex('駅', 'えき', 'station', 'estación')] }),
  k({ glyph: '社', on: ['シャ'], kun: ['やしろ'], en: ['company', 'shrine'], es: ['empresa', 'santuario'], strokes: 7, grade: 2, jlpt: 5, radical: '示', examples: [ex('会社', 'かいしゃ', 'company', 'empresa'), ex('社長', 'しゃちょう', 'company president', 'presidente de empresa')] }),
  k({ glyph: '店', on: ['テン'], kun: ['みせ'], en: ['shop', 'store'], es: ['tienda'], strokes: 8, grade: 2, jlpt: 5, radical: '广', examples: [ex('店', 'みせ', 'shop', 'tienda'), ex('店員', 'てんいん', 'shop clerk', 'dependiente')] }),
  k({ glyph: '道', on: ['ドウ'], kun: ['みち'], en: ['road', 'way', 'path'], es: ['camino', 'vía'], strokes: 12, grade: 2, jlpt: 5, radical: '辵', examples: [ex('道', 'みち', 'road', 'camino')] }),
  k({ glyph: '何', on: ['カ'], kun: ['なに', 'なん'], en: ['what'], es: ['qué'], strokes: 7, grade: 2, jlpt: 5, radical: '人', examples: [ex('何', 'なに', 'what', 'qué')] }),
  k({ glyph: '今', on: ['コン', 'キン'], kun: ['いま'], en: ['now'], es: ['ahora'], strokes: 4, grade: 2, jlpt: 5, radical: '人', examples: [ex('今', 'いま', 'now', 'ahora'), ex('今日', 'きょう', 'today', 'hoy')] }),
  k({ glyph: '時', on: ['ジ'], kun: ['とき'], en: ['time', 'hour'], es: ['tiempo', 'hora'], strokes: 10, grade: 2, jlpt: 5, radical: '日', examples: [ex('時間', 'じかん', 'time', 'tiempo'), ex('一時', 'いちじ', 'one o\u2019clock', 'la una')] }),
  k({ glyph: '間', on: ['カン', 'ケン'], kun: ['あいだ', 'ま'], en: ['interval', 'between', 'space'], es: ['intervalo', 'entre', 'espacio'], strokes: 12, grade: 2, jlpt: 5, radical: '門', examples: [ex('時間', 'じかん', 'time / hour', 'tiempo / hora'), ex('間', 'あいだ', 'between', 'entre')] }),
  k({ glyph: '分', on: ['ブン', 'フン', 'ブ'], kun: ['わ.ける', 'わ.かる'], en: ['minute', 'part', 'understand'], es: ['minuto', 'parte', 'entender'], strokes: 4, grade: 2, jlpt: 5, radical: '刀', examples: [ex('分かる', 'わかる', 'to understand', 'entender'), ex('半分', 'はんぶん', 'half', 'mitad')] }),
  k({ glyph: '前', on: ['ゼン'], kun: ['まえ'], en: ['before', 'front'], es: ['antes', 'delante'], strokes: 9, grade: 2, jlpt: 5, radical: '刀', examples: [ex('前', 'まえ', 'front / before', 'delante / antes'), ex('午前', 'ごぜん', 'morning (AM)', 'mañana (AM)')] }),
  k({ glyph: '後', on: ['ゴ', 'コウ'], kun: ['あと', 'うし.ろ', 'のち'], en: ['after', 'behind', 'later'], es: ['después', 'detrás', 'luego'], strokes: 9, grade: 2, jlpt: 5, radical: '彳', examples: [ex('後', 'あと', 'after', 'después'), ex('午後', 'ごご', 'afternoon (PM)', 'tarde (PM)')] }),
  k({ glyph: '東', on: ['トウ'], kun: ['ひがし'], en: ['east'], es: ['este'], strokes: 8, grade: 2, jlpt: 5, radical: '木', examples: [ex('東', 'ひがし', 'east', 'este'), ex('東京', 'とうきょう', 'Tokyo', 'Tokio')] }),
  k({ glyph: '西', on: ['セイ', 'サイ'], kun: ['にし'], en: ['west'], es: ['oeste'], strokes: 6, grade: 2, jlpt: 5, radical: '西', examples: [ex('西', 'にし', 'west', 'oeste')] }),
  k({ glyph: '南', on: ['ナン'], kun: ['みなみ'], en: ['south'], es: ['sur'], strokes: 9, grade: 2, jlpt: 5, radical: '十', examples: [ex('南', 'みなみ', 'south', 'sur')] }),
  k({ glyph: '北', on: ['ホク'], kun: ['きた'], en: ['north'], es: ['norte'], strokes: 5, grade: 2, jlpt: 5, radical: '匕', examples: [ex('北', 'きた', 'north', 'norte')] }),
  k({ glyph: '外', on: ['ガイ', 'ゲ'], kun: ['そと', 'はず.す'], en: ['outside'], es: ['fuera', 'exterior'], strokes: 5, grade: 2, jlpt: 5, radical: '夕', examples: [ex('外', 'そと', 'outside', 'fuera'), ex('外国', 'がいこく', 'foreign country', 'país extranjero')] }),
  k({ glyph: '多', on: ['タ'], kun: ['おお.い'], en: ['many', 'much'], es: ['mucho', 'numeroso'], strokes: 6, grade: 2, jlpt: 5, radical: '夕', examples: [ex('多い', 'おおい', 'many', 'mucho')] }),
  k({ glyph: '少', on: ['ショウ'], kun: ['すく.ない', 'すこ.し'], en: ['few', 'little'], es: ['poco', 'escaso'], strokes: 4, grade: 2, jlpt: 5, radical: '小', examples: [ex('少し', 'すこし', 'a little', 'un poco'), ex('少ない', 'すくない', 'few', 'poco')] }),
  k({ glyph: '白', on: ['ハク', 'ビャク'], kun: ['しろ', 'しろ.い'], en: ['white'], es: ['blanco'], strokes: 5, grade: 1, jlpt: 5, radical: '白', examples: [ex('白い', 'しろい', 'white', 'blanco')] }),
  k({ glyph: '半', on: ['ハン'], kun: ['なか.ば'], en: ['half'], es: ['mitad', 'medio'], strokes: 5, grade: 2, jlpt: 5, radical: '十', examples: [ex('半分', 'はんぶん', 'half', 'mitad'), ex('半', 'はん', 'half (past the hour)', 'y media')] }),
  k({ glyph: '父', on: ['フ'], kun: ['ちち'], en: ['father'], es: ['padre'], strokes: 4, grade: 2, jlpt: 5, radical: '父', examples: [ex('父', 'ちち', '(my) father', '(mi) padre'), ex('お父さん', 'おとうさん', 'father', 'papá')] }),
  k({ glyph: '母', on: ['ボ'], kun: ['はは'], en: ['mother'], es: ['madre'], strokes: 5, grade: 2, jlpt: 5, radical: '母', examples: [ex('母', 'はは', '(my) mother', '(mi) madre'), ex('お母さん', 'おかあさん', 'mother', 'mamá')] }),
  k({ glyph: '毎', on: ['マイ'], kun: [], en: ['every', 'each'], es: ['cada'], strokes: 6, grade: 2, jlpt: 5, radical: '母', examples: [ex('毎日', 'まいにち', 'every day', 'cada día'), ex('毎週', 'まいしゅう', 'every week', 'cada semana')] }),
  k({ glyph: '週', on: ['シュウ'], kun: [], en: ['week'], es: ['semana'], strokes: 11, grade: 2, jlpt: 5, radical: '辵', examples: [ex('週末', 'しゅうまつ', 'weekend', 'fin de semana'), ex('今週', 'こんしゅう', 'this week', 'esta semana')] }),
  k({ glyph: '会', on: ['カイ', 'エ'], kun: ['あ.う'], en: ['meet', 'association'], es: ['reunirse', 'asociación'], strokes: 6, grade: 2, jlpt: 5, radical: '人', examples: [ex('会う', 'あう', 'to meet', 'encontrarse'), ex('会社', 'かいしゃ', 'company', 'empresa')] }),
  k({ glyph: '長', on: ['チョウ'], kun: ['なが.い'], en: ['long', 'leader', 'chief'], es: ['largo', 'jefe'], strokes: 8, grade: 2, jlpt: 5, radical: '長', examples: [ex('長い', 'ながい', 'long', 'largo'), ex('社長', 'しゃちょう', 'company president', 'presidente de empresa')] }),
];
