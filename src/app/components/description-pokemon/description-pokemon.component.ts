import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-description-pokemon',
  templateUrl: './description-pokemon.component.html',
  styleUrls: ['./description-pokemon.component.css'],
})
export class DescriptionPokemonComponent implements OnInit {
  public pokemonRecibido: any;
  public descripcion: any;
  public loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.loading=true;
    this.activatedRoute.params
      .pipe(
        pluck('id'),
        switchMap((id) => this.getPokemon(id)),
        switchMap((pokemon) =>
          this.http.get(pokemon.species.url).pipe(
            map((nuevaDataPokemon) => ({
              ...pokemon,
              ...nuevaDataPokemon,
            }))
          )
        )
      )
      .subscribe((pokemon) => {
        this.pokemonRecibido = pokemon;
        this.descripcion = this.pokemonRecibido.flavor_text_entries
        .find((descripcion) =>
            descripcion.language.name == 'es' ? 
            descripcion.flavor_text : null);

        console.log(this.descripcion);
        console.log(this.pokemonRecibido);
      });
  }

  ngOnInit(): void {}

  public getPokemon(id: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
