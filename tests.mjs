import {webkit,chromium} from 'playwright';
import assert from 'node:assert/strict';
for(const engine of [webkit,chromium]){
 const browser=await engine.launch({headless:true});
 for(const viewport of [{width:390,height:844},{width:820,height:1180},{width:844,height:390}]){
  const page=await browser.newPage({viewport,hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:1337');await page.click('#demo');await page.waitForTimeout(600);
  assert.equal(await page.locator('#empty').isHidden(),true);
  const pc=await page.evaluate(()=>window.__emulator.cpu.registers.programCounter.value);assert.ok(pc>=0x150);
  const pixels=await page.evaluate(()=>[...new Set(window.__emulator.gpu.screen.data)].length);assert.ok(pixels>3,'Demo must render pixels');
  await page.click('#pause');await page.waitForFunction(()=>document.querySelector('#pause').textContent.includes('Resume'));const before=await page.evaluate(()=>window.__emulator.cpu.registers.programCounter.value);await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>window.__emulator.cpu.registers.programCounter.value),before);
  await page.click('#pause');await page.waitForFunction(()=>document.querySelector('#pause').textContent.includes('Pause'));await page.locator('[data-key="A"]').dispatchEvent('pointerdown',{pointerId:1});await page.locator('[data-key="Up"]').dispatchEvent('pointerdown',{pointerId:2});
  assert.equal(await page.evaluate(()=>window.__emulator.input.isPressingA&&window.__emulator.input.isPressingUp),true);
  await page.locator('[data-key="A"]').dispatchEvent('pointerup',{pointerId:1});await page.locator('[data-key="Up"]').dispatchEvent('pointercancel',{pointerId:2});
  assert.equal(await page.evaluate(()=>window.__emulator.input.isPressingA||window.__emulator.input.isPressingUp),false);
  await page.click('#sound');await page.waitForFunction(()=>window.__emulator.apu.isAudioEnabled);assert.equal(await page.evaluate(()=>window.__emulator.apu.isAudioEnabled),true);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'No horizontal overflow');
  await page.click('.library-trigger');await page.waitForFunction(()=>document.querySelector('dialog').open);assert.equal(await page.locator('.library-item:disabled').count(),1);await page.locator('.library-item').nth(1).click();await page.waitForFunction(()=>document.querySelector('#pause').textContent.includes('Pause'));assert.deepEqual(errors,[]);console.log(engine.name(),viewport,'PASS');await page.close();
 }await browser.close();
}
