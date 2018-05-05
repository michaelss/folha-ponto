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
  }

  preencher(e) {
    e.preventDefault();
    if (this.state.feriadosStr !== undefined) {
      this.setState({feriados: this.state.feriadosStr.replace(' ', '').split(',')});
    }
    this.setState({dias: Array.from({length: 31}, (v, i) => new Date(Date.UTC(this.state.ano, this.state.mes-1, i+2)))});
  }

  tratarAlteracao(nomeInput, e) {
    this.setState({[nomeInput]: e.target.value});
  }

  render() {
    return (
      <div>
        <header>
          <h1>Gerador de Folha de Ponto</h1>
        </header>

        <div>
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
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>

            <div className="pure-control-group">
              <label htmlFor="ano">Ano:</label>
              <input id="ano" type="text" value={this.state.ano} onChange={this.tratarAlteracao.bind(this, 'ano')} placeholder="Ex: 2018"/>
            </div>

            <div className="pure-controls">
              <button className="pure-button pure-button-primary" onClick={this.preencher.bind(this)}>Gerar folha de ponto</button>
            </div>
          </form>

        </div>

        <div id="resultados">

          <h1>FOLHA DE PONTO</h1>

          <div>Empregador: {this.state.empregador}</div>
          <div>Empregado: {this.state.empregado}</div>
          <div>Mês: {this.state.mes} - Ano: {this.state.ano}</div>

          <table className="pure-table pure-table-bordered">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Entrada</th>
                <th>Saída</th>
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
