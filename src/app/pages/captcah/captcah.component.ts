import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-captcah',
  templateUrl: './captcah.component.html',
  styleUrls: ['./captcah.component.css']
})
export class CaptcahComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
    @Output() passed = new EventEmitter<boolean>();  // <- emite true al validar
  
    private code = '';
    width = 160;
    height = 50;
    length = 5;
    caseSensitive = true;
  
    ngOnInit() { this.refresh(); }
  
    refresh() {
      this.code = this.generate(this.length);
      this.draw();
      this.passed.emit(false); // cada refresh vuelve a bloquear
    }
  
    verify(input: string) {
      const a = this.caseSensitive ? this.code : this.code.toLowerCase();
      const b = this.caseSensitive ? (input || '') : (input || '').toLowerCase();
      const ok = a === b;
      this.passed.emit(ok);
      if (!ok) this.refresh();
    }
  
    // --- helpers ---
    private generate(n: number) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
      return Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
  
    private draw() {
      const c = this.canvasRef.nativeElement;
      const ctx = c.getContext('2d')!;
      const dpr = devicePixelRatio || 1;
      c.width = this.width * dpr; c.height = this.height * dpr;
      c.style.width = this.width + 'px'; c.style.height = this.height + 'px';
      ctx.scale(dpr, dpr);
  
      const w = this.width, h = this.height;
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
  
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = `rgba(2,6,23,${Math.random()*0.15+0.05})`;
        ctx.beginPath(); ctx.arc(Math.random()*w, Math.random()*h, Math.random()*2+0.5, 0, Math.PI*2); ctx.fill();
      }
      for (let i = 0; i < 2; i++) {
        ctx.strokeStyle = `rgba(59,130,246,${Math.random()*0.5+0.25})`; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(Math.random()*w*0.2, Math.random()*h);
        ctx.bezierCurveTo(Math.random()*w,Math.random()*h, Math.random()*w,Math.random()*h, Math.random()*w,Math.random()*h);
        ctx.stroke();
      }
  
      const baseX = w / (this.code.length + 1);
      for (let i = 0; i < this.code.length; i++) {
        const ch = this.code[i];
        const size = Math.floor(h * (Math.random()*0.2 + 0.6));
        const ang = (Math.random()-0.5)*0.6;
        ctx.save();
        ctx.translate((i+1)*baseX, h/2); ctx.rotate(ang);
        ctx.font = `bold ${size}px ui-sans-serif, system-ui`;
        ctx.fillStyle = ['#111827','#1f2937','#2563eb','#059669','#dc2626','#7c3aed'][Math.floor(Math.random()*6)];
        ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
        ctx.fillText(ch, 0, 0);
        ctx.restore();
      }
    }
  }
  
