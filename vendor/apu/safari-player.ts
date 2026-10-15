// Web Audio queue: no SharedArrayBuffer or AudioWorklet required.
export class RingBufferPlayer {
  private samples = new Float32Array(2048);
  private index = 0;
  private nextTime = 0;
  constructor(private context: AudioContext, _length: number) {}
  writeSample(sample: number) {
    if(this.context.state !== 'running') { this.index=0; this.nextTime=0; return; }
    this.samples[this.index++]=sample;
    if(this.index !== this.samples.length) return;
    const buffer=this.context.createBuffer(1,this.samples.length,this.context.sampleRate);
    buffer.copyToChannel(this.samples,0);
    const source=this.context.createBufferSource();source.buffer=buffer;source.connect(this.context.destination);
    this.nextTime=Math.max(this.nextTime,this.context.currentTime+0.015);
    if(this.nextTime>this.context.currentTime+0.2) this.nextTime=this.context.currentTime+0.015;
    source.start(this.nextTime);this.nextTime+=buffer.duration;this.index=0;
    source.onended=()=>source.disconnect();
  }
  writeParameter(_index:number,_value:number) { return false; }
}
