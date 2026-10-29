// Melo's sheets and scripts, ported from the web lab as strings and rendered is:inline after their markup
// (Home.astro renders the sheets after the sections; each section renders its script after itself). The
// sheets come after every component style, so their rules win specificity ties as they do in the lab.
// `?inline` is processed, minified CSS; `?raw` is the file as written, with its data written in below.
import type {ReviewVariant} from '../data/homepage-review';
import v2Style from '../styles/home-v2.css?inline';
import v2OnlyStyle from '../styles/home-v2-only.css?inline';
import howScript from './how-it-works-v2.js?raw';
import tenetsIsoScript from './tenets-iso-v2.js?raw';
import flockScript from './hero-flock-v2.js?raw';
import floorScript from './hero-floor-v2.js?raw';
import useCasesScript from './use-cases-v2.js?raw';
import howPathScript from './how-path-v2.js?raw';
import {flockMotion} from '../data/hero-flock';
import {isoTracks} from '../data/tenets-iso';
import {howActs} from '../data/how-scenes';
import {easing,useCaseTimeline,howPathTimeline} from '../motion/timelines';
// Comment lines and indentation are dropped; the line breaks stay, so the script parses as written.
const compact = (js: string) => js.replace(/^\s*\/\/.*\n/gm, '').replace(/^[ \t]+/gm, '').trim();
export const reviewScripts = { how: compact(howScript) } as Record<string, string>;
// `tenets` plays the isometric Why Augur scenes; `flock` the hero's lituus flock below 1024 px; `floor` the
// hero's live floor from 1024 px; `useCases` the use-case product cards; `howPath` How it works' four steps
// and its example.
type Inline = { styles: string[]; scripts: Record<string, string> };
const scripts = { ...reviewScripts, tenets: compact(tenetsIsoScript).replace('__SCENES__', JSON.stringify(isoTracks)), flock: compact(flockScript).replace('__FLOCK__', JSON.stringify(flockMotion)), floor: compact(floorScript), useCases: compact(useCasesScript).replace('__USE_CASES__', JSON.stringify({ easing, timeline: useCaseTimeline })), howPath: compact(howPathScript).replace('__HOW_PATH__', JSON.stringify({ easing, timeline: howPathTimeline, acts: howActs })) };
export const reviewInline: Record<ReviewVariant, Inline> = { v2: { styles: [v2Style, v2OnlyStyle], scripts } };
