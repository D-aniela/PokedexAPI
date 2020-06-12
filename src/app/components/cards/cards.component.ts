import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  // se encarga de conectar al elemento padre con el hijo
  @Input() pokemonInput: any;

  constructor(private routes: Router) {}

  ngOnInit(): void {
  }

  public GotoDescription(id: number) {
    this.routes.navigate(['description', id]);
  }
}
