import { links, type LinkKey } from '../../../data/links';
/** Figma 162:412, 104×136 cover cropped to its 100px chart window. */
export const roadmapPaperSquares = [[14,18,true],[30,18,false],[62,18,false],[78,30,true],[14,46,false],[46,46,false],[86,58,false],[22,106,false],[54,118,true],[86,106,false],[70,94,false]] as const;
type RoadmapLink = { label: string; key?: LinkKey; href?: string };
export interface Milestone {id:string;date:string;label:string;status:string;title:string;body:string;links:RoadmapLink[];evidence:'reboot'|'paper'|'fork'|'tests'|'goals'|'quote'}
/** Canonical copy 28:7 and all six states of Roadmap / Track 162:454.
 * Refresh after each quarterly report; this snapshot is dated 5 October 2026. */
export const roadmap:Milestone[]=[
 {id:'reboot',date:'2025',label:'Augur reboots',status:'Completed · 2025',title:'Augur starts again.',body:'The Lituus Foundation restarted Augur in March 2025. In May it proposed Generalized Augur: a universal, permissionless oracle for any application.',links:[{label:'Read the mission',href:'/about/'}],evidence:'reboot'},
 {id:'whitepaper',date:'January 2026',label:'Whitepaper',status:'Completed · 29 January 2026',title:'The design, published.',body:'The Augur Lituus whitepaper sets out how the oracle works, with a comparative analysis of oracle security.',links:[{label:'Read the whitepaper',key:'whitepaper'}],evidence:'paper'},
 {id:'moon-fork',date:'August 2026',label:'Moon Fork',status:'Completed · Augur v2 · 3 August 2026',title:'A fork, run live.',body:"Augur v2's fork mechanism completed its first live run on Ethereum mainnet. REP holders migrated to the universe they backed, and Yes won.",links:[{label:'Read the fork report',key:'moonFork'}],evidence:'fork'},
 {id:'implementation',date:'Now',label:'Implementation',status:'In progress · first milestones completed in July 2026',title:'Building Augur Lituus.',body:'ChainSafe is engineering Augur Lituus, and the Foundation reviews the work against the whitepaper. The current focus is dispute resolution and forking.',links:[{label:'Follow the build',key:'lituusCode'},{label:'Q2 2026 report',key:'q2Report'}],evidence:'tests'},
 {id:'testing',date:'2027',label:'Testing & audits',status:'Up next · 2027',title:'Tested and audited.',body:'Before applications can depend on Augur Lituus, the implementation has to be tested, audited and explained in plain language.',links:[{label:'Read the Q2 2026 report',key:'q2Report'}],evidence:'goals'},
 {id:'launch',date:'2027',label:'Launch',status:'Then · 2027',title:'Ready for applications.',body:'Augur Lituus is designed for the prediction markets, protocols and apps that call on it when a real-world outcome is disputed.',links:[{label:'Talk to us',href:'/contact/'}],evidence:'quote'},
];
export const roadmapHref=(link:RoadmapLink)=>link.key?links[link.key].url:link.href!;
