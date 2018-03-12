/* importar as configurações do servidor */

const app = require('./config/server');

/* parametrizar a porta de escuta */

const server = app.listen(80, function(){
    console.log("servidor online");
});

const watson = require('watson-developer-cloud/');

let contexts = [];
let context = null;

let conversation = new watson.ConversationV1({
    username: '3ac4181c-d81d-487c-9b72-202fe7af99d3',
    password: '8uNjdxzlzc8p',
    version_date : '2018-02-03'
});

let io = require('socket.io').listen(server);

app.set('io',io);

/* criar a conexão por websocket */

io.on('connection', (socket) => {
    console.log('Usuario conectou');

    socket.on('disconnect', () =>{
        console.log('usuario desconectou');
    });

    socket.on('msgParaServidor', function(data){
        socket.emit('msgParaCliente', {apelido : data.apelido , mensagem : data.mensagem})

        conversation.message(
            {
            input: { text : data.mensagem },
            workspace_id: '348496e5-a869-44b0-9879-59827c29b6d3',
            context : context},function(err,response){
                if(err){
                    console.error(err);
                }else{
                    context = response.context;
                    console.log(response.output.text[0]);

                    socket.emit('msgParaCliente', {apelido : "IBM-MAQUINAS" , mensagem : response.output.text[0]})
                };
            }
           
        );

    });


});









