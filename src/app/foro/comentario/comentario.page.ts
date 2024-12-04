import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {
  sintomaId: string | undefined;
  sintomaNombre: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sintomaId = this.route.snapshot.paramMap.get('id')!;
    this.sintomaNombre = this.route.snapshot.paramMap.get('nombre') ?? undefined;
    // Aquí puedes cargar los comentarios específicos del síntoma usando el sintomaId
  }
}
