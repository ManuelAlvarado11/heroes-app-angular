import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css',
})
export class NewPageComponent implements OnInit {
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
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
        .subscribe((hero) => {
          if (!hero) return this.router.navigateByUrl('heroes/list');

          this.heroForm.reset(hero);
          return;
        });
    }
  }

  // Getters
  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  // Metodos
  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar('Heroe actualizado');
      });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.showSnackbar('Heroe creado');
      this.router.navigate(['/heroes/edit', hero.id]);
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
}
