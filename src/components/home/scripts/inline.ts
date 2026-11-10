// Melo's sheets and scripts, ported from the web lab as strings and rendered is:inline after their markup
// (Home.astro renders the sheets after the sections; each section renders its script after itself). The
// sheets come after every component style, so their rules win specificity ties as they do in the lab.
// `?inline` is processed, minified CSS; `?raw` is the file as written, with its data written in below.
import homeStyle from '../styles/home-page.css?inline';
import homeExtraStyle from '../styles/home-extra.css?inline';
import tenetsIsoScript from './tenets-iso.js?raw';
import floorScript from './hero-floor.js?raw';
import useCasesScript from './use-cases.js?raw';
import howPathScript from './how-path.js?raw';
import roadmapScript from './roadmap.js?raw';
import ribbonScript from './ribbon.js?raw';
import revealScript from './reveal.js?raw';
import {isoTracks} from '../data/tenets-iso';
import {howActs} from '../data/how-scenes';
import {easing,timing,heroTimeline,useCaseTimeline,howPathTimeline,roadmapTimeline,ribbonTimeline,revealTimeline} from '../motion/timelines';
// Comment lines and indentation are dropped; the line breaks stay, so the script parses as written.
const compact = (js: string) => js.replace(/^\s*\/\/.*\n/gm, '').replace(/^[ \t]+/gm, '').trim();
// `tenets` plays the isometric Why Augur scenes; `floor` the hero's live
// floor; `useCases` the use-case product cards; `howPath` How it works' four steps,
// its entrance ("paid", then the scene) and its example; `roadmap` the roadmap's picker motion and its track's
// entrance; `ribbon` sweeps the Why Augur answer band once its lead has landed; `reveal` settles each section
// in as the reader reaches it (Home.astro renders it once, as a module, so it runs after the footer is parsed).
type Inline = { styles: string[]; scripts: Record<string, string> };
const scripts = { tenets: compact(tenetsIsoScript).replace('__SCENES__', JSON.stringify(isoTracks)), floor: compact(floorScript).replace('__FLOOR__', JSON.stringify(heroTimeline.floor)), useCases: compact(useCasesScript).replace('__USE_CASES__', JSON.stringify({ easing, timeline: useCaseTimeline })), howPath: compact(howPathScript).replace('__HOW_PATH__', JSON.stringify({ easing, timeline: howPathTimeline, ready: revealTimeline.ready, dwell: revealTimeline.dwell, acts: howActs })), roadmap: compact(roadmapScript).replace('__ROADMAP__', JSON.stringify({ easing, timeline: roadmapTimeline, fadeOut: timing.fadeOut, ready: revealTimeline.ready, dwell: revealTimeline.dwell })), ribbon: compact(ribbonScript).replace('__RIBBON__', JSON.stringify({ easing, timeline: ribbonTimeline })), reveal: compact(revealScript).replace('__REVEAL__', JSON.stringify({ easing, timeline: revealTimeline, duration: timing.panel })) };
export const homeInline: Inline = { styles: [homeStyle, homeExtraStyle], scripts };
