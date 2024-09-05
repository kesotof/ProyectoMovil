import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.page.html',
  styleUrls: ['./sintomas.page.scss'],
})
export class SintomasPage implements OnInit {

  constructor() { }

  public data: string[] = [
    'Dolor de cabeza',
    'Diarrea',
    'Dolor de garganta',
    'Perdida de audicion'
  ];
  public results = [...this.data];

  handleInput(event : any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  ngOnInit() {
  }


}
