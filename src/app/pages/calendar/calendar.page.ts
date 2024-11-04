import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  horarios: any[] = [];
  groupedHorarios: { [key: string]: any[] } = {};
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.loadHorarios();
  }

  loadHorarios() {
    this.firestoreService.getHorarios().subscribe(data => {
      this.horarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
      this.groupHorariosByTime();
    });
  }

  groupHorariosByTime() {
    this.groupedHorarios = this.horarios.reduce((groups, horario) => {
      if (horario.time) {
        const time = horario.time.split('T')[1].split(':').slice(0, 2).join(':');
        if (!groups[time]) {
          groups[time] = [];
        }
        groups[time].push(horario);
      }
      return groups;
    }, {});
  }
}
