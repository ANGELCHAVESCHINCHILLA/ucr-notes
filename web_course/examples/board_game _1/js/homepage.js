const player_start_row = 4;
const player_start_col = 5;

const game_board_rows = 5;
const game_board_cols = 6;

class Player {
  // el id corresponde al id dentro del documento html
  constructor(id) {
    this.id = id;
    this.row = player_start_row;
    this.col = player_start_col;
    // obtengo el elemento mediante su id, esta busqueda es logaritmica. Dentro
    // del arbol de eleemntos pobrablemento el navegador tenga un arreglo
    // asociatvio de ids con punteros a elementos.
    this.element = document.getElementById(id);
    console.assert(this.element);
    // Le agrego un evento, en caso de que se haga click entonces llamo al
    // metodo move. La función flecha permite mayor versatilidad.
    this.element.addEventListener('click', (event) => {
      console.log(`click(${event}`)
      this.move(1, 0);
      this.element.classList.add('active_player');
      // al ser una función flecha, esta atrapa el contexto en el que está, por
      // lo que las tres líneas de arriba forman parte de este contexto.
      window.setTimeout(() => {
        // lo que hago es que después de 4000 milisegundos, le quito la clase
        // active_player al elemento.
        this.element.classList.remove('active_player')
      }, 4000); // milisegundos
    });
  }

  move(delta_rows, delta_cols) {
    const computedStyles = window.getComputedStyle(this.element);
    console.log(`computedStyles.left = ${computedStyles.left}`)

    console.log(`move player 1 by (${this.row}, ${this.col})`);
    this.row += delta_rows;
    this.col += delta_cols;
    console.log(`move player 1 by (${this.row}, ${this.col})`);
    // faltan algunas cosas de top y left
  }
}

class Game {
  constructor() {

  }

  setupEvents() {
    this.player1 = new Player('player1');
    this.setupHelp();
  }

  setupHelp() {
    const button = document.getElementById("toggle_help");
    button.addEventListener('click', () => {
      const help = document.getElementById('help');
      // si el display es none entonces paselo a block
      if (help.style.display === '') {
        help.style.display = 'block';
      // si ya estaba en block entonces paselo a none para ocultarlo
      } else {
        help.style.display = '';
      }
    });
  }
}

function main() {
  const game = new Game();
  game.setupEvents();
}

/*
EL objeto global de JS es el objeto window, representa la ventana del navegador.
En el entorno del navegador, cada pestaña o ventana abierta tiene su propio objeto window. 
A este le indicio que cuando se termine de carga la página, etnonces ejecute la
función main */
window.addEventListener('load', main);