import './theme.css';
export function mountTheme(){
 document.title='Kwaku\'s Lounge · Play anywhere';
 document.querySelector('.brand').innerHTML='<span class="brand-mark" aria-hidden="true">▦</span><span>Kwaku\'s Lounge</span>';
 document.querySelector('header .badge').textContent='YOUR NEXT WORLD IS ONE CLICK AWAY';
 document.querySelector('.intro .eyebrow').textContent='CLASSIC HARDWARE. MODERN PLAY.';
 document.querySelector('.intro h1').innerHTML='Press play.<br><em>Go anywhere.</em>';
 document.querySelector('.intro>p').textContent='A home for your favorite emulators and browser games. Load a cartridge, explore your library, and pick up where you left off.';
 document.querySelector('footer>span').textContent='Kwaku\'s Lounge / Your world. Your play.';
 document.querySelector('#load').textContent='＋ Load Game Boy ROM';
 document.querySelectorAll('.eyebrow').forEach(e=>{e.textContent=e.textContent.replaceAll('KWAKU\'S LOUNGE','KWAKU\'S LOUNGE');});
 document.querySelector('.library-description').textContent='Your emulators, games, and desktop guides. Emulators pause when opening the library; hosted games manage their own playback.';
 const header=document.querySelector('header'),nav=document.createElement('div');nav.className='header-actions';const library=document.querySelector('.library-trigger');nav.append(library);const toggle=document.createElement('button');toggle.className='theme-toggle';toggle.type='button';nav.append(toggle);header.append(nav);
 const media=matchMedia('(prefers-color-scheme: dark)');let preference;try{preference=localStorage.getItem('pixelverse-theme');}catch{}
 if(!['light','dark'].includes(preference))preference=null;
 let current=preference|| (media.matches?'dark':'light');
 function apply(theme){current=theme;document.documentElement.dataset.theme=theme;toggle.innerHTML=theme==='dark'?'☀ <span>Light</span>':'☾ <span>Dark</span>';toggle.setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} mode`);toggle.setAttribute('aria-pressed',String(theme==='dark'));let meta=document.querySelector('meta[name="theme-color"]');if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.append(meta);}meta.content=theme==='dark'?'#0d1117':'#f6f8fc';}
 apply(current);toggle.onclick=()=>{preference=current==='dark'?'light':'dark';try{localStorage.setItem('pixelverse-theme',preference);}catch{}apply(preference);};const followSystem=e=>{if(!preference)apply(e.matches?'dark':'light');};if(media.addEventListener)media.addEventListener('change',followSystem);else media.addListener(followSystem);
}
