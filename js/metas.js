// Definindo as metas para cada dia da semana
const metas = [
    50.00,   // Segunda-feira
    50.00,   // Terça-feira
    50.00,   // Quarta-feira
    50.00,   // Quinta-feira
    120.00,  // Sexta-feira
    90.00,   // Sábado
    50.00    // Domingo
];

// Função para obter o valor da meta do dia
function carregarMeta() {
    const hoje = new Date();
    const diaDaSemana = hoje.getDay();  // 0: domingo, 1: segunda, ..., 6: sábado
    const metaDoDia = metas[diaDaSemana];

    // Exibir a meta do dia na página
    document.getElementById('metaDoDia').innerHTML = metaDoDia.toFixed(2);  // Exibe a meta do dia com 2 casas decimais

    // Exibir a mensagem de meta do dia (caso queira)
    document.getElementById('meta').innerHTML = `A meta do dia é: R$ ${metaDoDia.toFixed(2)}`;
}

// Recuperando o total acumulado armazenado no LocalStorage
let totalAcumulado = parseFloat(localStorage.getItem('totalAcumulado')) || 0;
let historico = JSON.parse(localStorage.getItem('historico')) || [];

// Atualizando a exibição do total acumulado ao carregar a página
document.getElementById('total').innerText = totalAcumulado.toFixed(2);

// Função para atualizar o total acumulado
function metaConcluida() {
    const valorDepositado = parseFloat(document.getElementById('deposito').value);

    if (!valorDepositado || valorDepositado <= 0) {
        alert("Por favor, insira um valor válido para o depósito.");
        return;
    }

    const chavePixDiv = document.getElementById('chavePix');
    chavePixDiv.style.display = 'block';  // Exibe a chave Pix

    // Atualizando o total acumulado com o valor do depósito
    totalAcumulado += valorDepositado;
    localStorage.setItem('totalAcumulado', totalAcumulado);  // Salva o total no LocalStorage

    // Salvar o histórico de metas
    const hoje = new Date();
    historico.push({
        data: hoje.toLocaleDateString(),
        meta: metas[hoje.getDay()],
        depositado: valorDepositado
    });

    // Salvar o histórico no LocalStorage
    localStorage.setItem('historico', JSON.stringify(historico));

    // Atualizando o total na página
    document.getElementById('total').innerText = totalAcumulado.toFixed(2);

    // Atualizando o histórico na página
    exibirHistorico();

    // Limpar o campo de depósito após a conclusão
    document.getElementById('deposito').value = '';
}

// Função para zerar o total acumulado
function zerarTotal() {
    totalAcumulado = 0; // Zera o valor acumulado
    localStorage.setItem('totalAcumulado', totalAcumulado); // Salva o valor zerado no LocalStorage
    document.getElementById('total').innerText = totalAcumulado.toFixed(2); // Atualiza o total na página
    document.getElementById('chavePix').style.display = 'none'; // Esconde a chave Pix novamente
}

// Função para exibir o histórico de metas
function exibirHistorico() {
    const historicoLista = document.getElementById('historicoLista');
    historicoLista.innerHTML = '';  // Limpa a lista de histórico antes de atualizar

    historico.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `Data: ${item.data} - Meta: R$ ${item.meta.toFixed(2)} - Depositado: R$ ${item.depositado.toFixed(2)}`;
        historicoLista.appendChild(li);
    });
}

// Chama a função para exibir o histórico quando a página carregar
exibirHistorico();

// Ação para quando o botão "Meta Concluída" for clicado
document.getElementById('metaConcluida').addEventListener('click', metaConcluida);

// Ação para quando o botão "Zerar Total" for clicado
document.getElementById('zerarTotal').addEventListener('click', zerarTotal);

// Carregar a meta ao carregar a página
carregarMeta();
// Função para zerar o histórico
function zerarHistorico() {
    // Limpar o histórico do LocalStorage
    localStorage.removeItem('historico');
    
    // Limpar o histórico da interface
    historico = []; // Limpa o array de histórico
    exibirHistorico(); // Atualiza a exibição do histórico
}

// Adicionar evento para o botão de "Zerar Histórico"
document.getElementById('zerarHistorico').addEventListener('click', zerarHistorico);
