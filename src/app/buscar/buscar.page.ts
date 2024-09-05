import { Component } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage  {

  public data: string[] = [
    'Paracetamol',
    'Oxolamina',
    'Viagra',
    'Ibuprofeno'
  ];
  public results = [...this.data];

  constructor(private router: Router) {}

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().includes(query));
  }

  goMedication(medication: string) {
    this.router.navigate([medication.toLowerCase()]);
  }


}

