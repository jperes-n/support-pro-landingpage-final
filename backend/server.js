const express = require('express');
const path = require('path'); // Módulo para lidar com caminhos de arquivos

const app = express();
const port = 3000; // Porta em que o servidor backend irá rodar

// Middleware para parsear dados de formulário URL-encoded (enviados pelo HTML form)
app.use(express.urlencoded({ extended: true }));
// Middleware para parsear JSON (útil se você for usar APIs JSON no futuro)
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS, imagens) da pasta pai ('support-pro-landingpage-final')
// __dirname aqui se refere à pasta 'backend'. path.join(__dirname, '..') sobe um nível.
app.use(express.static(path.join(__dirname, '..')));

// Endpoint para receber os dados do formulário de abertura de chamado
app.post('/api/criar-chamado', (req, res) => {
    console.log('--- Novo Chamado Recebido ---');
    console.log('Nome Completo:', req.body.nome);
    console.log('E-mail:', req.body.email);
    console.log('Telefone:', req.body.telefone);
    console.log('Empresa:', req.body.empresa || 'Não informado'); // Trata campo opcional
    console.log('Tipo de Dispositivo/Serviço:', req.body.tipo_dispositivo);
    console.log('Descrição do Problema:', req.body.descricao);
    console.log('-----------------------------');

    // --- LÓGICA FUTURA A SER IMPLEMENTADA AQUI ---
    // 1. Validação robusta dos dados no backend.
    // 2. Salvar os dados em um banco de dados (ex: PostgreSQL, MongoDB, Firebase).
    // 3. Gerar um número de protocolo para o chamado.
    // 4. Enviar e-mails de notificação (para sua equipe e para o cliente).
    // --- FIM DA LÓGICA FUTURA ---

    // Por enquanto, após receber os dados, redirecionamos para a página de "obrigado".
    // O caminho '/obrigado.html' será resolvido pelo middleware express.static.
    res.redirect('/obrigado.html');
});

app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`);
    console.log(`Acesse sua landing page em http://localhost:${port}/index.html`);
    console.log('Envie o formulário "Abrir Chamado" para testar o endpoint /api/criar-chamado.');
});