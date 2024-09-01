import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public data: string[] = [
    'Paracetamol',
    'Oxolamina',
    'Viagra',
    'Ibuprofeno'
  ];
  public results = [...this.data];

  handleInput(event : any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }
}

