import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      dias: [],
      feriados: [],
      mes: 1,
      ano: new Date().getFullYear()
    };

    this.meses = Array.from({length: 12}, (v, i) => new Date(2018, i).toLocaleString('pt-BR', {month: 'long'}) );
  }

  preencher(e) {
    e.preventDefault();
    if (this.state.feriadosStr !== undefined) {
      this.setState({feriados: this.state.feriadosStr.replace(' ', '').split(',')});
    }

    this.qtDias = new Date(this.state.ano, this.state.mes, 0).getDate();
    this.setState({dias: Array.from({length: this.qtDias}, (v, i) => new Date(Date.UTC(this.state.ano, this.state.mes-1, i+2)))});
  }

  tratarAlteracao(nomeInput, e) {
    this.setState({[nomeInput]: e.target.value});
  }

  imprimir(e) {
    e.preventDefault();
    window.print();
  }

  render() {
    return (
      <div>
        <header>
          <h1>Folha de Ponto</h1>
        </header>

        <div id="filtros">
          <form className="pure-form pure-form-aligned">
            <div className="pure-control-group">
              <label htmlFor="empregador">Empregador:</label>
              <input id="empregador" type="text" value={this.state.empregador} onChange={this.tratarAlteracao.bind(this, 'empregador')} placeholder="Ex: Ana da Silva"/>
            </div>

            <div className="pure-control-group">
              <label htmlFor="empregado">Empregado:</label>
              <input id="empregado" type="text" value={this.state.empregado} onChange={this.tratarAlteracao.bind(this, 'empregado')} placeholder="Ex: João de Souza"/>
            </div>

            <div className="pure-control-group">
              <label htmlFor="feriadosStr">Dias de feriados:</label>
              <input id="feriadosStr" type="text" value={this.state.feriadosStr} onChange={this.tratarAlteracao.bind(this, 'feriadosStr')} placeholder="Ex: 1, 20, 23"/>
            </div>

            <div className="pure-control-group">
              <label htmlFor="mes">Mês:</label>
              <select id="mes" value={this.state.mes} onChange={this.tratarAlteracao.bind(this, 'mes')}>
                {this.meses.map((m,i) => <option value={i+1}>{m}</option> )}
              </select>
            </div>

            <div className="pure-control-group">
              <label htmlFor="ano">Ano:</label>
              <input id="ano" type="number" value={this.state.ano} onChange={this.tratarAlteracao.bind(this, 'ano')} placeholder="Ex: 2018"/>
            </div>

            <div className="pure-controls">
              <button className="pure-button pure-button-primary" onClick={this.preencher.bind(this)}>Gerar</button>
              <button className="pure-button pure-button-primary" onClick={this.imprimir.bind(this)} style={{marginLeft: 10}}>Imprimir</button>
            </div>
          </form>

        </div>

        <div id="resultados">

          <div>Empregador: {this.state.empregador}</div>
          <div>Empregado: {this.state.empregado}</div>
          <div>Mês: {this.meses[this.state.mes-1]} - Ano: {this.state.ano}</div>

          <table className="pure-table pure-table-bordered">
            <thead>
              <tr>
                <th>Dia</th>
                <th className="hora">Entrada</th>
                <th className="hora">Saída</th>
                <th className="hora">Entrada</th>
                <th className="hora">Saída</th>
                <th>Ass. Empregado</th>
                <th>Ass. Empregador</th>
              </tr>
            </thead>
            <tbody>
            {this.state.dias.map(d => 
                <tr className={d.getDay() === 0 || this.state.feriados.includes(d.getDate().toString()) ? 'naoUsado' : ''}>
                  <td>{d.getDate()}</td>
                  <td>
                    {this.state.feriados.includes(d.getDate().toString()) ? 
                      'Feriado' : 
                      d.getDay() === 0 ? 
                        'Domingo' : 
                        ''
                    }
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr> 
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
