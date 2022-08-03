import React from 'react';
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectMenu from '../../components/SelectMenu';
import { mensagemErro } from '../../components/Toastr';
import ConsultaLancamentoTabela from './ConsultaLancamentoTabela';
import LancamentoService from '../../app/service/LancamentoService';
import LocalStorageService from '../../app/service/LocalStorageService';

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

class ConsultaLancamento extends React.Component {

    state = {
        ano: "",
        mes: "",
        tipo: "",
        lancamentos: []
    }

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
    }

    cadastrar = () => {
        const msgs = this.validar();
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false;
        }
    }

    buscar = () => {
        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado")
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id
        }
        this.lancamentoService.consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const meses = [
            { label: "Selecione...", value: "" },
            { label: "Janeiro", value: 1 },
            { label: "Fevereiro", value: 2 },
            { label: "Março", value: 3 },
            { label: "Abril", value: 4 },
            { label: "Maio", value: 5 },
            { label: "Junho", value: 6 },
            { label: "Julho", value: 7 },
            { label: "Agosto", value: 8 },
            { label: "Setembro", value: 9 },
            { label: "Outubro", value: 10 },
            { label: "Novembro", value: 11 },
            { label: "Dezembro", value: 12 }
        ]

        const tipos = [
            { label: "Selecione...", value: "" },
            { label: "Despesa", value: "DESPESA" },
            { label: "Receita", value: "RECEITA" }
        ]

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">

                            <fieldset>
                                <FormGroup label="Ano: *" htmlFor="inputAno">
                                    <input type="text" className="form-control" id="inputAno" name="ano" placeholder="Digite o ano"
                                        value={this.state.ano} onChange={e => this.setState({ ano: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Mes: " htmlFor="inputMes">
                                    <SelectMenu
                                        className="form-control"
                                        value={this.state.mes}
                                        onChange={e => this.setState({ mes: e.target.value })}
                                        lista={meses} />
                                </FormGroup>
                                <FormGroup label="Tipo Lançamento: " htmlFor="inputTipo">
                                    <SelectMenu
                                        className="form-control"
                                        value={this.state.tipo}
                                        onChange={e => this.setState({ tipo: e.target.value })}
                                        lista={tipos} />
                                </FormGroup>
                                <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                                <button onClick={this.cadastrar} type="button" className="btn btn-danger">Cadastrar</button>

                            </fieldset>
                        </div>

                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ConsultaLancamentoTabela lancamentos={this.state.lancamentos}></ConsultaLancamentoTabela>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}


export default withNavigate(ConsultaLancamento)