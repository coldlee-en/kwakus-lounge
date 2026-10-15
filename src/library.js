// Add future experiences here; URL entries support same-origin apps or HTTPS games.
export const experiences = [
 {id:'gameboy',name:'Game Boy',kind:'Emulator',detail:'Original handheld · Load your own .gb cartridge',icon:'▦',action:'cartridge'},
 {id:'nes',name:'NES',kind:'8-bit emulator',detail:'Load a .nes cartridge · Touch controller',icon:'▤',action:'nes'},
 {id:'snes',name:'SNES',kind:'16-bit emulator',detail:'Load .sfc / .smc · Full six-button controller',icon:'▥',action:'snes'},
 {id:'retro-bowl',name:'Retro Bowl',kind:'Web game · Football',detail:'Hit the field · Play the hosted game here',icon:'◈',action:'retro-bowl'},
 {id:'mcraft',name:'mcraft.fun',kind:'Embedded web game',detail:'Build and explore · Built-in joystick & touch controls',icon:'▩',action:'eagler'},
 {id:'web-dashers',name:'Web Dashers',kind:'Embedded web game · Rhythm',detail:'Jump into levels · Fan-made browser demo mod',icon:'◫',action:'web-dashers'},
 {id:'halo',name:'OpenHaloCE',kind:'Browser game · Own game data required',detail:'Original hosted player · Dedicated isolated page',icon:'◎',action:'halo'},
 {id:'future',name:'More worlds, soon',kind:'Expansion slot',detail:'Ready for future emulators and browser games',icon:'＋',disabled:true},
];
export function mountLibrary({onSelect,onOpen}) {
 const trigger=document.createElement('button');trigger.className='library-trigger';trigger.textContent='▦ Library';trigger.setAttribute('aria-haspopup','dialog');document.querySelector('header').append(trigger);
 const dialog=document.createElement('dialog');dialog.className='library';dialog.setAttribute('aria-labelledby','library-title');
 dialog.innerHTML=`<div class="library-heading"><div><span class="eyebrow">YOUR POCKET COLLECTION</span><h2 id="library-title">Pick your next world.</h2></div><button class="close-library" aria-label="Close library">×</button></div><p class="library-description">One home for your emulators and games. Switching safely pauses your current session.</p><div class="library-items"></div><p class="library-note">Cartridges and saves stay on this device.</p>`;
 for(const entry of experiences){const button=document.createElement(entry.newTab?'a':'button');button.className='library-item';if(entry.newTab){button.href=entry.url;button.target='_blank';button.rel='noopener noreferrer';button.setAttribute('aria-label',entry.name+' (opens in a new tab)');}else button.disabled=!!entry.disabled;button.innerHTML=`<span class="library-icon">${entry.icon}</span><span><small>${entry.kind}</small><strong>${entry.name}</strong><span>${entry.detail}</span></span><b>${entry.disabled?'SOON':'↗'}</b>`;button.onclick=()=>{dialog.close();if(entry.newTab)return;if(entry.url){const url=new URL(entry.url,location.href);if(!['http:','https:'].includes(url.protocol))return;location.assign(url.href);}else onSelect(entry.action);};dialog.querySelector('.library-items').append(button);}
 document.body.append(dialog);trigger.onclick=()=>{onOpen();dialog.showModal();};dialog.querySelector('.close-library').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}};dialog.addEventListener('close',()=>trigger.focus());
}
