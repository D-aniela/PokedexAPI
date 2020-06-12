import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, take, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  // decorador que sirve para hacer referencia a un elemento HTML x medio del "id de angular" (#id)
  // Estructura: @ViewChild('#nombreID')Nombrelemento:Tipodeelemento
  @ViewChild('inputSearch') inputSearch: ElementRef;
  // inputSearch=component.getElementById('inputSearch') ** Es lo mismo

  public pokemonRecibido: any;
  public loading: boolean = true;

  private url = `https://pokeapi.co/api/v2/pokemon/`;

  // Constructor: funcion que se ejecuta cuando se instancia el componente
  // Cuando se instancia un componente? Cuando usamos su etiqueta
  constructor(private http: HttpClient) {}

  // ng OnInit: funcion que se ejecuta despues del constructor y cuando se terminan de
  // crear el html y el css
  // si tengo un metodo que haga referencia a una etiqueta HTML, necesito ponerlo aqui
  // porque si lo pongo en el constructor me marcará un error de que el elemento no existe

  // aqui solo se instancian los inputs y outputs
  ngOnInit(): void {}

  // ng after viw init: es un metodo que se ejecuta despues del ngOnInit
  // su objetivo es verificar que los elementos ya esten renderizados
  // la diferencia que tiene el nfAfter y el ngOnInit es que after espera a que sus elementos
  // esten renderizados y el ngOnInit solo espera a que angular los haya cocstruido
  // en su logica pero sin renderizarlos, por lo tanto es necesario establecer todo lo que
  // tenga que ver con viewchild  debido a que este decorados, busca la referencia del ID
  // en el DOM y no enn la logica de angular
  ngAfterViewInit(): void {
    this.searchPokemon();
  }

  // searchPokemon: metodo que nos ayudara a obtener la informacion del pokemon
  // buscado por medio de rxjs
  searchPokemon() {
    console.log(this.inputSearch);
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        debounceTime(1500),
        pluck('target', 'value'),
        switchMap((nombrePokemon) =>
          this.http.get(`${this.url}${nombrePokemon}`)
        )
      )
      .subscribe(
        (value) => {
          this.pokemonRecibido = value;
          this.loading = false;
        },
        (error) => this.searchPokemon()
      );

    // this.http
    //   .get(url).pipe(debounceTime(1500))
    //   .subscribe((pokemonRecibido) => console.log(pokemonRecibido));
    // }
  }
}


// el callback error del subscrie, vuelve a ejecutar la funcion searchPokemon, para volver a
// instancias el from event y poder continuar con la busqueda