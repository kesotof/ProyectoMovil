import { Component } from '@angular/core';

@Component({
  selector: 'app-paracetamol',
  templateUrl: './paracetamol.component.html',
  styleUrls: ['./paracetamol.component.scss'],
})
export class ParacetamolComponent {

  constructor() { }

  ngOnInit() {
  }
  expandedSection: string | null = null;

  toggleSection(section: string) {
    this.expandedSection = this.expandedSection === section ? null : section;
  }
}
