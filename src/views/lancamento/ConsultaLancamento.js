import React, { useEffect } from 'react';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { useNavigate } from 'react-router-dom'
import { mensagemErro, mensagemSucesso } from '../../components/Toastr';
import { obterListaMeses, obterTipos, consultar, alterarStatus, deletar, validar } from '../../app/service/LancamentoService';
import { AuthConsumer } from '../../main/ProvedorAutenticacao';
import SelectMenu from '../../components/SelectMenu';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ConsultaLancamentoTabela from './ConsultaLancamentoTabela'

function ConsultaLancamento(props) {
    const [state, setState] = React.useState({ ano: "", mes: "", tipo: "", descricao: "", showConfirmDialog: false, lancamentoDeletar: {}, lancamentos: [] });
    const navigate = useNavigate();

    const cadastrar = () => {
        navigate("/cadastro-lancamento");
    }

    const buscar = () => {
        if (!state.ano) {
            mensagemErro("O Preenchimento do campo ano é obrigatorio")
            return false
        }

        const usuarioLogado = props.contexto.usuarioAutenticado
        const lancamentoFiltro = {
            ano: state.ano,
            mes: state.mes,
            tipo: state.tipo,
            descricao: state.descricao,
            usuario: usuarioLogado.id
        }
        consultar(lancamentoFiltro)
            .then(response => {
                setState({ ...state, lancamentos: response.data })
            })
            .catch(error => {
                console.log(error)
            })

    }

    const editar = (id) => {
        navigate(`/cadastro-lancamento/${id}`);
    }

    const alterarStatusLancamento = (lancamento, status) => {
        alterarStatus(lancamento, status)
            .then(response => {
                const lancamentos = state.lancamentos
                const index = lancamentos.indexOf(lancamento)
                if (index !== -1) {
                    lancamento.status = status
                    lancamentos[index] = lancamento
                    setState({ ...state, lancamentos })
                }
                mensagemSucesso("status atualizado com sucesso!")
            })
            .catch(error => {
                console.log(error)
                mensagemErro("erro ao atualizar status do lançamento")
            })
    }

    const deletarLancamento = () => {
        deletar(state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = state.lancamentos
                const index = lancamentos.indexOf(state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                setState({ ...state, lancamentos: lancamentos, showConfirmDialog: false, lancamentoDeletar: {} })
                mensagemSucesso("lançamento deletado com sucesso!")
            })
            .catch(error => {
                mensagemErro("erro ao deletar lançamento")
            })
    }

    const abrirConfirmacao = (lancamento) => {
        setState({ ...state, showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    const cancelarDelecao = () => {
        setState({ ...state, showConfirmDialog: false, lancamentoDeletar: {} })
    }

    const tipos = obterTipos()
    const meses = obterListaMeses()

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletarLancamento} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} />
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
                                    value={state.ano} onChange={e => setState({ ...state, ano: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Mes: " htmlFor="inputMes">
                                <SelectMenu
                                    className="form-control"
                                    value={state.mes}
                                    onChange={e => setState({ ...state, mes: e.target.value })}
                                    lista={meses} />
                            </FormGroup>
                            <FormGroup label="Descrição: " htmlFor="inputDescricao">
                                <input type="text" className="form-control" id="inputDescricao" name="descricao" placeholder="Digite a descrição"
                                    value={state.descricao} onChange={e => setState({ ...state, descricao: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Tipo Lançamento: " htmlFor="inputTipo">
                                <SelectMenu
                                    className="form-control"
                                    value={state.tipo}
                                    onChange={e => setState({ ...state, tipo: e.target.value })}
                                    lista={tipos} />
                            </FormGroup>
                            <button onClick={buscar} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={cadastrar} type="button" className="btn btn-danger">Cadastrar</button>

                        </fieldset>
                    </div>

                </div>

            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <ConsultaLancamentoTabela lancamentos={state.lancamentos}
                            alterarStatus={alterarStatusLancamento}
                            deleteAction={abrirConfirmacao}
                            editAction={editar} />

                    </div>
                </div>
            </div>
            <div>
                <Dialog header="Deletar Registro?"
                    visible={state.showConfirmDialog}
                    style={{ width: '50vw' }} modal={true}
                    onHide={cancelarDelecao}
                    footer={confirmDialogFooter}>
                    Confirma a exclusão desse lançamento ?
                </Dialog>
            </div>
        </Card>

    )
}

export default () => (
    <AuthConsumer>
        {
            (contexto) => (<ConsultaLancamento contexto={contexto} />)
        }
    </AuthConsumer>
)