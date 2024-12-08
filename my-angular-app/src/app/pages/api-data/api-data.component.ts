import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-data.component.html',
  styleUrl: './api-data.component.css'
})
export class ApiDataComponent implements OnInit {
  pokemons: any[] = [];
  loading = true;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPokemons().subscribe({
      next: (data) => {
        const detailRequests = data.map(pokemon => 
          this.apiService.getPokemonDetails(pokemon.url)
        );
        
        forkJoin(detailRequests).subscribe({
          next: (details) => {
            this.pokemons = details;
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Failed to load Pokemon details';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        this.error = 'Failed to load Pokemon list';
        this.loading = false;
      }
    });
  }
}
