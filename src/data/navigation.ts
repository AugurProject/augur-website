import {links, type LinkKey} from './links';
export type NavigationItem = {label:string;href:string;external?:boolean;icon?:string;logo?:string;description?:string;cta?:string};
const external=(label:string,key:LinkKey,logo?:string):NavigationItem=>({label,href:links[key].url,external:true,logo});
/** Local pages other than the homepage. */
export const pages = { contact:'/contact/' } as const;
// Homepage sections are linked as `/#section`, so the header and footer also work on other pages.
export const navigation = {
 augur:[{label:'Why Augur',href:'/#why-augur'},{label:'Contact',href:pages.contact}],
 products:[{label:'Augur Lituus',href:'/#applications',description:'Resolution for real-world outcomes.',cta:'Explore the use cases'}],
 resources:[{label:'How it works',href:'/#how-it-works',icon:'list-checks'},{label:'Roadmap',href:'/#roadmap',icon:'clock'},{label:'Learn more',href:'/#learn-more',icon:'book-open'},external('Whitepaper','whitepaper')],
 community:[external('Discord','discord','discord-logo'),external('Telegram','telegram','telegram-logo'),external('X','x','x-logo'),external('GitHub','github','github-logo')],
};
export const navigationGroups=[{label:'Augur',items:navigation.augur},{label:'Products',items:navigation.products},{label:'Resources',items:navigation.resources},{label:'Community',items:navigation.community}];
