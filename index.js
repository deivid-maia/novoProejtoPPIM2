import express from 'express';

const porta = 3000;
const host = '0.0.0.0';
var listaUsuarios = [];

function processaCadastroUsuario(requisicao, resposta){
    //processar os parametros da url em http://localhost:3000/cadastroUsuario.html?nome=DEIVID+MAIA&telefone=18991082293&email=DEIVID.MM%40GMAIL.COM&senha=1234&confirmarSenha=1234
    const usuario = {
                        nome: requisicao.query.nome,
                        telefone: requisicao.query.telefone,
                        email: requisicao.query.email,
                        senha: requisicao.query.senha,
                        confirmarSenha: requisicao.query.confirmarSenha,

                    }

    //adiciona um novo usuario na lista de usuarios já cadastrados
    listaUsuarios.push(usuario);
    //retornar a lista de usuarios
    let conteudoResposta =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title> Menu do sistema </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <h1>Lista de usuários cadastrados</h1>
        <table class="table table-dark table-hover">
              <thead>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Senha</th>
                    <th>Confirmar senha</th>
              </thead>
              <tbody>`;
            
    for(const usuario of listaUsuarios){
         conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.telefone}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.senha}</td>
                            <td>${usuario.confirmarSenha}</td>
                        </tr>
                    
                    `;
    }
 
    conteudoResposta += `
             </tbody>
        </table>
        <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
        <a class="btn btn-primary" href="/cadastroUsuario.html" role="button">Continuar cadastrando</a>
    </body>
    </html> `;
    resposta.end(conteudoResposta);
}                    

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title> Menu do sistema </title>
            </head>
            <body>
                <h1> MENU </h1>
                <ul>
                    <li> <a href="/cadastroUsuario.html"> Cadastrar Usuário </a> </li>
                </ul>
            </body>
        </html>
        
    `);
})

//rota para processar o cadastro de usuarios endpoint = '/cadastroUsuario'
app.get('/cadastroUsuario', processaCadastroUsuario);


app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);

});