import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import api from './api';
import 'semantic-ui-css/semantic.min.css';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { Select, Button } from 'semantic-ui-react'
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pt-br';

const { ExportCSVButton } = CSVExport;

const SelectContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-width: 500px;
  min-height: 5vh;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const columns = [
  {
    dataField: 'id',
    text: '#'
  }, 
  {
    dataField: 'titulo',
    text: 'Titulo'
  }, 
  {
    dataField: 'responsavel',
    text: 'Responsável'
  },
  {
    dataField: 'cliente',
    text: 'Cliente'
  },
  {
    dataField: 'agendamento',
    text: 'Agendamento',
  },
  {
    dataField: 'prazo',
    text: 'Prazo',
  },
  {
    dataField: 'estado',
    text: 'Status',
  }
];

const quant =  [
  {key: '020' , value: '20', text: '20'},
  {key: '050' , value: '50', text: '50'},
  {key: '100' , value: '100', text: '100'},
  {key: '200' , value: '200', text: '200'},
  {key: '500' , value: '500', text: '500'},
]

const estado =  [
  {key: '001' , value: 'finalizada', text: 'Finalizadas'},
  {key: '002' , value: 'producao', text: 'Produção'},
  {key: '003' , value: 'conferencia', text: 'Conferência'},
  {key: '004' , value: 'parada', text: 'Parada'},
  {key: '005' , value: '', text: 'sem filtro'},
]


class App extends Component {
  state = { perPage: '200', status: '', tarefas: []}

  async componentDidMount() {
    await this.getTasks()
  }

  async getTasks() {
    const {perPage, status} = this.state
    const response = await api.get(`/tarefa2?perpage=${perPage}&estado=${status}&responsavel_id=&cliente_id=&titulo=&dt_cadastro_gte=&dt_cadastro_lte=&sort=recentes&page=1`)
    const data = response.data.data
    console.log(data.filter( task => task.estado !== 'finalizada' ))
    const tarefas = data.map(task =>({
      id: task.id,
      titulo: task.titulo,
      responsavel: task.responsavel.nome,
      cliente: task.cliente.nome,
      agendamento: moment(task.dt_agendamento).locale('pt-br').format('L'),
      prazo: moment(task.dt_prazo).locale('pt-br').format('L'),
      estado: task.estado
    }))


    this.setState({ tarefas })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
  render() {
    const {perPage, status, tarefas} = this.state
    return (
      <div className="App">
        <h1>RELATÓRIO DMX WEB</h1>
        <SelectContainer>
          <Select name="perPage" placeholder='Selecione a quantidade' options={quant} onChange={this.handleChange}/>
          <Select name="status" placeholder='Selecione o status' options={estado} onChange={this.handleChange} />
          <Button primary onClick={ () => this.getTasks()}>Buscar</Button>
        </SelectContainer>
        <ToolkitProvider
          keyField="id"
          data={ tarefas }
          columns={ columns }
          exportCSV
        >
          {
            props => (
              <div>
                <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                <hr />
                <BootstrapTable { ...props.baseProps } />
              </div>
            )
          }
        </ToolkitProvider>
       
      </div>
    );
  }
}

export default App;
