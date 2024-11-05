export interface Pastillero {
    pastilleroId: string | null;
    pastillas: {
        id_pastilla: string;
        nombre: string;
        hora: string;
    }[];
}



// Create a new pastilla
// let newPastilla = {
//     id_pastilla: '001',
//     nombre: 'Aspirin',
//     hora: '08:00'
// };

// myPastillero.pastillas.push(newPastilla);