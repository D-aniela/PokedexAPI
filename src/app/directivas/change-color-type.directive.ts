import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appChangeColorType]',
})
export class ChangeColorTypeDirective {
  @Input() nameType: string;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    console.log(this.nameType);
    this.changeColorLabel();    
  }

  changeColorLabel(){
    switch(this.nameType){
      case'bug': 
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#3B984D'
      )
      break;
      case'poison': 
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#5E2D88'
      )
      break;
      case'electric': 
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#E1E22C'
      )
      break;
      case'fairy': 
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#E91360'
      )
      break;
      case'fighting': 
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#EC6430'
      )
      break;
      case'fire':
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#F34755'
      )
      break;
      case'flying':
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#91A3AF'
      )
      break;
      case'grass':
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#25C94E'
      )
      break;
      case'ground':
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#6B4A1D'
      )
      break;
      case'normal':
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#72545C'
      )
      break;
      case'water':
      this.render.setStyle(
        this.el.nativeElement,
        'background', '#1A51CD'
      )
      break;
    }
  }
}
