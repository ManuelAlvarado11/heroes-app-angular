import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css',
})
export class NewPageComponent {
  // Propiedades
  public publishers: any[] = [
    { id: 'DC Comits', value: 'DC - Comits' },
    { id: 'Marvel Comits', value: 'Marvel - Comits' },
  ];

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  // Constructor
  constructor(private heroesService: HeroesService) {}

  // Getters
  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  // Metodos
  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        // TODO: Mostrar mensaje
      });
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      // TODO: Mostrar mensaje
    });
  }
}
