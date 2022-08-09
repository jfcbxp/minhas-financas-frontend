

export function adicionarItem(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

export function obterItem(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function removerItem(chave) {
    localStorage.removeItem(chave)
}
