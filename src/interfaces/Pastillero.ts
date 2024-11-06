export interface Pastillero {
  pastilleroId: string;
  medicamentos: {
    medicamentoId: string;
    nombre: string;
    horarios: {
      id: string;
      hora: string;
    }[];
  }[];

}