import React, { useEffect } from 'react';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { useNavigate, useParams } from 'react-router-dom'
import { mensagemErro, mensagemSucesso } from '../../components/Toastr';
import { obterListaMeses, obterTipos, salvar, atualizar, obterPorId, validar } from '../../app/service/LancamentoService';
import { obterItem } from '../../app/service/LocalStorageService';
import { AuthConsumer } from '../../main/ProvedorAutenticacao';
import SelectMenu from '../../components/SelectMenu';

function CadastroLancamento(props) {
    const [state, setState] = React.useState({ id: null, descricao: "", valor: 0, mes: "", ano: "", tipo: "", status: "PENDENTE", usuario: null, atualizando: false });
    const navigate = useNavigate();
    const { idLancamento } = useParams()

    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setState({ ...state, [name]: value })
    }

    useEffect(() => {
        if (idLancamento) {
            obterPorId(idLancamento)
                .then(response => {
                    setState({ ...state, ...response.data, atualizando: true })

                }).catch(error => {
                    mensagemErro(error.response.status)
                })
        }
    }, []);

    const salvarLancamento = () => {

        const usuarioLogado = obterItem("_usuario_logado")
        const { descricao, valor, mes, ano, tipo } = state
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        try {
            validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens
            mensagens.forEach(msg => mensagens.mensagemErro(msg))
            return false
        }


        salvar(lancamento)
            .then(response => {
                navigate("/consulta-lancamento");
                mensagemSucesso("lançamento cadastrado com sucesso!")

            }).catch(error => {
                mensagemErro(error.response.data)

            })
    }

    const atualizarLancamento = () => {
        const usuarioLogado = obterItem("_usuario_logado")
        const { descricao, valor, mes, ano, tipo, id } = state
        const lancamento = { descricao, valor, mes, ano, tipo, id, usuario: usuarioLogado.id }

        atualizar(lancamento)
            .then(response => {
                const navigate = props.navigate;
                navigate("/consulta-lancamento");
                mensagemSucesso("lançamento atualizado com sucesso!")

            }).catch(error => {
                mensagemErro(error.response.data)

            })
    }

    const cancelar = () => {
        const navigate = props.navigate;
        navigate("/consulta-lancamento");
        mensagemErro("operação cancelada pelo usuario")
    }

    const tipos = obterTipos()
    const meses = obterListaMeses()


    return (
        <Card title={state.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"}>
            <div className="row">
                <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao" type="text" className="form-control"
                            name="descricao" onChange={handleChange} value={state.descricao} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno" type="text" className="form-control"
                            name="ano" onChange={handleChange} value={state.ano} />
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mes: *">
                        <SelectMenu id="inputMes" lista={meses} className="form-control"
                            name="mes" onChange={handleChange} value={state.mes} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                        <input id="inputValor" type="text" className="form-control"
                            name="valor" onChange={handleChange} value={state.valor} />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTipo" lista={tipos} className="form-control"
                            name="tipo" onChange={handleChange} value={state.tipo} />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: ">
                        <input id="inputStatus" type="text" className="form-control" disabled
                            name="status" onChange={handleChange} value={state.status} />
                    </FormGroup>
                </div>
                <div className="col-md-12">
                    {
                        state.atualizando ?
                            (
                                <button onClick={atualizarLancamento} type="button" className="btn btn-primary">Atualizar</button>
                            ) :
                            (
                                <button onClick={salvarLancamento} type="button" className="btn btn-success">Salvar</button>
                            )
                    }
                    <button onClick={cancelar} type="button" className="btn btn-danger">Cancelar</button>

                </div>

                <div />
            </div>
        </Card>
    )
}

export default () => (
    <AuthConsumer>
        {
            (contexto) => (<CadastroLancamento contexto={contexto} />)
        }
    </AuthConsumer>
)