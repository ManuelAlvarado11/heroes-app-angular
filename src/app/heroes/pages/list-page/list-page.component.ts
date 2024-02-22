import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private srvHeroes: HeroesService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.srvHeroes.getHeroes().subscribe((data) => {
      this.heroes = data;
    });
  }
}
