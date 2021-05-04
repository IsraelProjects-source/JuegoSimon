const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const points = document.getElementById('points')
const ULTIMO_NIVEL = 10


class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generaSecuencia()
    //setTimeout() para que no empiece ta rapido el juego
    setTimeout(this.siguienteNivel, 1000)
  }
  
  inicializar() {

    this.maxScore = localStorage.getItem('puntos')
    debugger
    if (this.maxScore != null) {
      points.innerHTML = this.maxScore
    }

    this.siguienteNivel = this.siguienteNivel.bind(this)
    /// de esta forma siempre el metodo eleguir color estara atado la clase Juego
    this.elegirColor = this.elegirColor.bind(this)
    //toggle se icnifica como si fuera una switch de encender o apagar
    this.cambiarNivel = this.cambiarNivel.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1 
    this.points = 1
    this.colors = {
      // celeste: celeste,
      // violeta: violeta,
      // es lo mismo poner
      celeste,
      violeta, 
      naranja,
      verde
      }
    }
    
  toggleBtnEmpezar () {
    //si contiene la clase hide se la quitamos, si no la tiene se la agregamos
    if(btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else  {
      btnEmpezar.classList.add('hide')
    }
  }

  generaSecuencia () {
    //creamos un array lo llenamos con 0 y mapeamos generando un random entre 0 y 3 y redondeamos con Math.floor
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }
  
  siguienteNivel () {
    if (this.nivel === 1) this.cambiarNivel()

    else swal(`Nivel ${this.nivel - 1} superado`, `Siguiente nivel: ${this.nivel}, puntos: ${this.points}`, 'success')
        .then(this.cambiarNivel)
    // }
    // else swal(`Nivel ${this.nivel - 1} superado`, `Siguiente nivel: ${this.nivel}`, 'success')
    //     .then(this.cambiarNivel)
    }
    
  cambiarNivel () {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
    }

  transformarNumeroAColor (num) {
      //en uso de return ya no hace falta el break, el return ya detiene la ejecucion
    switch (num) {
        case 0:
            return 'celeste'
        case 1:
            return 'violeta'
        case 2:
            return 'naranja'
        case 3: 
            return 'verde'    
    }
  }

  transformarColorANumero (color) {
      //en uso de return ya no hace falta el break, el return ya detiene la ejecucion
    switch (color) {
        case 'celeste':
            return 0
        case 'violeta':
            return 1
        case 'naranja':
            return 2
        case 'verde': 
            return 3    
    }
  }

  iluminarSecuencia () {
      //dentro de los for conviene mas usar let para limitar el scope
      for (let i = 0; i < this.nivel; i++) {
          //aqui con let mantenemos el color sin estarlo cambiando con var se repetiria el mismo color
          //const tambien funciona porque se mantiene constante en cada iteracion 1.-const 2.-let 3.-var
        const color = this.transformarNumeroAColor(this.secuencia[i])
        setTimeout(() => {
            // console.log(color)
            this.iluminarColor(color)
        }, 1000 * i) 
      }
  }

  iluminarColor (color) {
    this.colors[color].classList.add('light')  
    // console.log(color)  
    setTimeout(() => this.apagarColor(color), 500)
  }

  apagarColor(color) {
      this.colors[color].classList.remove('light')
  }

  agregarEventosClick () {
    // agregamos manejadores de eventos o escuchadores de eventos
    this.colors.celeste.addEventListener('click', this.elegirColor)
    //el bind(this) es para no perder la refernecia y es como atar el metodo con la clase Juego
    // de esta forma this ya no sera un elemnto de html
    this.colors.verde.addEventListener('click', this.elegirColor)
    this.colors.violeta.addEventListener('click', this.elegirColor)
    this.colors.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick () {
    this.colors.celeste.removeEventListener('click', this.elegirColor)
    this.colors.verde.removeEventListener('click', this.elegirColor)
    this.colors.naranja.removeEventListener('click', this.elegirColor)
    this.colors.violeta.removeEventListener('click', this.elegirColor)
  }

  // elegirColor (ev) {
  //   const nombreColor = ev.target.dataset.color
  //   const numeroColor = this.transformarColorANumero(nombreColor)
  //   this.iluminarColor(nombreColor)
  //   if (numeroColor === this.secuencia[this.subnivel]){
  //     this.eliminarEventosClick()
  //     this.subnivel++
  //     if (this.subnivel === this.nivel) {
  //       this.nivel++
  //       //ahora tenemos que eliminar los eventos click
  //       this.eliminarEventosClick()
  //       if (this.nivel === (ULTIMO_NIVEL + 1)) {
  //         this.ganoJuego()
  //       } else {
  //         //agregamos setTimeout para que se espere en llama el siguiente metodo
  //         //aqui solo le indicamos la funcion que tiene que llamar, no la invocamos, 
  //         // para invocarla seria this.siguienteNivel(), con los ()
  //         setTimeout(this.siguienteNivel, 1500)
  //       }
  //     }
  //   } else {
  //     this.eliminarEventosClick()
  //     this.perdioJuego()
  //   }
  // }



    elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]) {
        this.subnivel++
        if (this.subnivel === this.nivel) {
          this.nivel++
          this.points++
          console.log(this.points)
          console.log(this.maxScore)
                this.eliminarEventosClick()
            if (this.nivel === (ULTIMO_NIVEL + 1)) {
                this.ganoElJuego()
            } else {
                setTimeout(() => this.siguienteNivel(), 500);
            }
        }
    } else {
        this.perdioElJuego()
    }
    }

    ganoElJuego() {
        swal('Simon Dice', 'Ganaste !!', 'success')
            .then(this.inicializar)
    }

    perdioElJuego() {
        if (this.points > this.maxScore) {
            localStorage.setItem('puntos', this.points)
            swal('Simon Dice', `Mejoraste tu puntuacion :)  ${this.points} `, 'success')
                .then(() => {
                    this.eliminarEventosClick()
                    this.inicializar()
                })
        }else
        {
            swal('Simon Dice', `Lo lamentamos perdiste :(, puntos obtenidos:  ${this.points} `, 'error')
                .then(() => {
                    this.eliminarEventosClick()
                    this.inicializar()
                })
        }
    
    }



    ganoJuego () {
    //como el swal devuelve una promesa podemos hacer acciones despues del mensaje
    swal('Game say', 'You win!', 'success')
    .then(this.inicializar())
    }

    perdioJuego () {
    //como el swal devuelve una promesa podemos hacer acciones despues del mensaje
    swal('Game say', 'You lose :[', 'error')
    .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
    })
    }


}



function empezarJuego() {
window.juego = new Juego()
puntaje()
}

function puntaje() {
  let maxScore = localStorage.getItem('points')
  if (maxScore != null) {
    points.innerHTML = maxScore
  }
}

