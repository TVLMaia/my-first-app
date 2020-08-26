import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*Em classes JavaScript, você sempre precisa chamar super ao definir o construtor de uma subclasse. Todas os componentes de classe React que possuem um método constructor devem iniciá-lo com uma chamada super (props).*/

function Square(props) {
    return (
        <button 
        className="square" onClick= {props.onClick}>
            {props.value}
      </button>
        //onClick={ => this.props.onClick()} Quando um Quadrado for clicado, a função onClick provida pelo Tabuleiro será chamada.
        );
        
    }
  
    
    /*constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
Note que com onClick = {() => alert ('click')}, estamos passando uma função como prop onClick. O React só chamará essa função depois de um clique. Esquecendo () => e escrevendo somente onClick = {alert ('click')} é um erro comum, e dispararia o alerta toda vez que o componente fosse renderizado novamente.*/
  
        
        

        /*A propriedade onClick do DOM embutida no componente <button> diz ao React para criar um evento de escuta (event listener).
        
        Quando o botão é clicado, o React irá chamar a função o manipulador de eventos onClick definido no método render() do Quadrado.
        
        Esse manipulador de eventos chamará a função recebida através da propriedade onClick que foi criada no Tabuleiro (this.props.onClick()).
        
        Como o Tabuleiro passou onClick={() => this.handleClick(i)} para o Quadrado, a função this.handleClick(i) será chamada quando o Quadrado for clicado.
        
        Como nós não definimos a função handleClick() ainda, nosso código quebrará.*/
        
        
        
        
        
        //Quando você chama this.setState({value: 'X'})} em um componente, o React atualiza automaticamente os componentes filhos dentro dele também
        
        /*tipo:
        <button 
        className="classe do botao" 
        onClick={() => this.setState({value: 'valor que quer que tenha o botão toda vez que for clicado'})}
        >
          {this.state.value} -- é pra aparecer no botao o valor do estado
        </button>*/

  /*Assim, será automatico criar um array. onde seus valores depois representarao os valores do board, tipo isso
  [
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
] */



/*O atributo onClick dos elementos <button> no DOM possuem um significado especial para o React, pois ele é um componente nativo. Para componentes customizados como o Square, o nome é por sua conta. Nós poderíamos renomear a propriedade onClick do componente Square para handleClick. Em React, no entanto, a convenção é usar nomes on[Event] para propriedades que representam eventos e handle[Event] para metodos que manipulam os eventos.*/
  
  class Board extends React.Component {
    
        /*componente board que tambem é um componente react 
        construira as propriedades
        esse estado
        square, que sao os quadrados, é um array com 9 valores, e preencha todos com null*/
    renderSquare(i) {
      return (
      <Square
       value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)}
        />
      );
    }



    /*Agora cada Square vai receber a proriedade value que vai ser 'X', 'O', ou null para quadrados vazios quando for clicado.*/

    render() {
      return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }
  }
    
      
    
  
    class Game extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            history: [
              {
                squares: Array(9).fill(null)
              }
            ],
            stepNumber: 0,
            xIsNext: true
          };
        }

handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();// o slice cria uma copia do array inves de modificalo
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ //Ao contrário do método de arrays push(), o método concat() não modifica o array original, por isso é melhorzim.
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
    

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
   
   
    const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
            <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
      return (
        <div className="game">
          <div className="game-board">
            <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
          <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  //agora criando o history para voltar as jogadas

  