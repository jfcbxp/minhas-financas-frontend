import React from "react";
export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <th scope="row">{lancamento.descricao}</th>
                <td>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(lancamento.valor)}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" className="btn btn-success"
                        onClick={e => props.alterarStatusLancamento(lancamento, 'EFETIVADO')}>Efetivar</button>
                    <button type="button" className="btn btn-primary"
                        onClick={e => props.editAction(lancamento.id)}>Editar</button>
                    <button type="button" className="btn btn-danger"
                        onClick={e => props.deleteAction(lancamento)}>Deletar</button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Data</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}

            </tbody>
        </table>
    )
}