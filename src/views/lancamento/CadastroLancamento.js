import React from "react";
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectMenu from "../../components/SelectMenu";
import { mensagemErro, mensagemSucesso } from '../../components/Toastr';
import LancamentoService from '../../app/service/LancamentoService';
import LocalStorageService from '../../app/service/LocalStorageService';

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};


class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    constructor() {
        super()
        this.lancamentoService = new LancamentoService()
    }

    salvar = () => {
        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado")
        const { descricao, valor, mes, ano, tipo } = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        this.lancamentoService.salvar(lancamento)
            .then(response => {
                const navigate = this.props.navigate;
                navigate("/consulta-lancamento");
                mensagemSucesso("lançamento cadastrado com sucesso!")

            }).catch(error => {
                mensagemErro(error.response.data)

            })
    }

    cancelar = () => {
        const navigate = this.props.navigate;
        navigate("/consulta-lancamento");
        mensagemErro("operação cancelada pelo usuario")
    }

    render() {
        const tipos = this.lancamentoService.obterTipos()
        const meses = this.lancamentoService.obterListaMeses()


        return (
            <Card title="Cadastrar Lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text" className="form-control"
                                name="descricao" onChange={this.handleChange} value={this.state.descricao} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control"
                                name="ano" onChange={this.handleChange} value={this.state.ano} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mes: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control"
                                name="mes" onChange={this.handleChange} value={this.state.mes} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control"
                                name="valor" onChange={this.handleChange} value={this.state.valor} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control"
                                name="tipo" onChange={this.handleChange} value={this.state.tipo} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input id="inputStatus" type="text" className="form-control" disabled
                                name="status" onChange={this.handleChange} value={this.state.status} />
                        </FormGroup>
                    </div>
                    <div className="col-md-12">
                        <button onClick={this.salvar} type="button" className="btn btn-success">Salvar</button>
                        <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>

                    </div>

                    <div />
                </div>
            </Card>
        )
    }
}

export default withNavigate(CadastroLancamento)