import { getRest, putRest, patchRest, deleteRest, postRest } from "../ApiService";
import ErroValidacao from "../exception/ErroValidacao";

const URL_SERVICE = "/api/lancamentos"

export function consultar(lancamentoFiltro) {
    let params = `?ano=${lancamentoFiltro.ano}`

    if (lancamentoFiltro.mes) {
        params = `${params}$mes=${lancamentoFiltro.mes}`
    }

    if (lancamentoFiltro.tipo) {
        params = `${params}&tipo=${lancamentoFiltro.tipo}`
    }

    if (lancamentoFiltro.status) {
        params = `${params}&status=${lancamentoFiltro.status}`
    }

    if (lancamentoFiltro.usuario) {
        params = `${params}&usuario=${lancamentoFiltro.usuario}`
    }

    if (lancamentoFiltro.descricao) {
        params = `${params}&descricao=${lancamentoFiltro.descricao}`
    }

    return getRest(`${URL_SERVICE}/${params}`)
}

export function obterPorId(id) {
    return getRest(`${URL_SERVICE}/${id}`)
}

export function deletar(id) {
    return deleteRest(`${URL_SERVICE}/${id}`)
}

export function salvar(lancamento) {
    return postRest(`${URL_SERVICE}`, lancamento)
}

export function atualizar(lancamento) {
    return putRest(`${URL_SERVICE}/${lancamento.id}`, lancamento)
}

export function alterarStatus(lancamento, status) {
    console.log(lancamento)
    lancamento.status = status
    lancamento.usuario = lancamento.usuario.id
    return patchRest(`${URL_SERVICE}/${lancamento.id}`, lancamento)
}

export function validar(lancamento) {
    const erros = []

    if (!lancamento.ano) {
        erros.push("Informe o ano.")
    }

    if (!lancamento.mes) {
        erros.push("Informe o mes.")
    }

    if (!lancamento.descricao) {
        erros.push("Informe a descricao.")
    }

    if (!lancamento.valor) {
        erros.push("Informe o valor.")
    }

    if (!lancamento.tipo) {
        erros.push("Informe o tipo.")
    }



    if (erros && erros.length > 0) {
        throw new ErroValidacao(erros)
    }

}

export function obterListaMeses() {
    return [
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
}

export function obterTipos() {
    return [
        { label: "Selecione...", value: "" },
        { label: "Despesa", value: "DESPESA" },
        { label: "Receita", value: "RECEITA" }
    ]
}

