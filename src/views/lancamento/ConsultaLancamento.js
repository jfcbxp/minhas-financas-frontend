import React from 'react';
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectMenu from '../../components/SelectMenu';
import { mensagemErro, mensagemSucesso } from '../../components/Toastr';
import ConsultaLancamentoTabela from './ConsultaLancamentoTabela';
import LancamentoService from '../../app/service/LancamentoService';
import LocalStorageService from '../../app/service/LocalStorageService';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

class ConsultaLancamento extends React.Component {

    state = {
        ano: "",
        mes: "",
        tipo: "",
        descricao: "",
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
    }

    cadastrar = () => {
        const navigate = this.props.navigate;
        navigate("/cadastro-lancamento");
    }

    buscar = () => {
        if (!this.state.ano) {
            mensagemErro("O Preenchimento do campo ano é obrigatorio")
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado")
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
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

    editar = (id) => {
        const navigate = this.props.navigate;
        navigate(`/cadastro-lancamento/${id}`);
    }

    alterarStatus = (lancamento, status) => {
        this.lancamentoService.alterarStatus(lancamento, status)
            .then(response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(lancamento)
                if (index !== -1) {
                    lancamento.status = status
                    lancamentos[index] = lancamento
                    this.setState({ lancamentos })
                }
                mensagemSucesso("status atualizado com sucesso!")
            })
            .catch(error => {
                console.log(error)
                mensagemErro("erro ao atualizar status do lançamento")
            })
    }

    deletar = () => {
        this.lancamentoService.deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false, lancamentoDeletar: {} })
                mensagemSucesso("lançamento deletado com sucesso!")
            })
            .catch(error => {
                mensagemErro("erro ao deletar lançamento")
            })
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
    }

    render() {
        const meses = this.lancamentoService.obterListaMeses()
        const tipos = this.lancamentoService.obterTipos()

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

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
                                <FormGroup label="Descrição: " htmlFor="inputDescricao">
                                    <input type="text" className="form-control" id="inputDescricao" name="descricao" placeholder="Digite a descrição"
                                        value={this.state.descricao} onChange={e => this.setState({ descricao: e.target.value })} />
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
                            <ConsultaLancamentoTabela lancamentos={this.state.lancamentos}
                                alterarStatus={this.alterarStatus}
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar} />

                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Deletar Registro?"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }} modal={true}
                        onHide={this.cancelarDelecao}
                        footer={confirmDialogFooter}>
                        Confirma a exclusão desse lançamento ?
                    </Dialog>
                </div>
            </Card>

        )
    }
}


export default withNavigate(ConsultaLancamento)