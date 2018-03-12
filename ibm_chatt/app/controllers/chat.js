module.exports.iniciaChat = (application,req,res) => {
    let dadosForm = req.body;

    req.assert('apelido','Apelido obrigatorio').notEmpty();
    req.assert('apelido','Apelido entre 3 e 15 caracteres').len(3,15);

    let erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao : erros});
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        { apelido : dadosForm.apelido,
          mensagem : 'acabou de entrar no chat'}
    );

    res.render('chat', {dadosForm : dadosForm});
};
module.exports.msgUsuario = (application,req,res) => {
    let dadosForm = req.body;

    application.get('io').emit(
        'msgParaCliente',
        { apelido : dadosForm.apelido,
          mensagem : dadosForm.msgUsuario}
    );

    console.log(dadosForm.msgUsuario);
    
    const watson = require('watson-developer-cloud/');

    let contexts = [];
    let context_index = 0;
    let context = null;

    let conversation = new watson.ConversationV1({
        username : '3ac4181c-d81d-487c-9b72-202fe7af99d3',
        password : '8uNjdxzlzc8p',
        version_date : '2018-02-03'
    });

    conversation.message(
        {
        input: { text : dadosForm.msgUsuario },
        workspace_id: '348496e5-a869-44b0-9879-59827c29b6d3',
        context : context},function(err,response){
            if(err){
                console.error(err);
            }else{
                console.log(response.output.text[0]);
                contexts.push({'context':response.context});

                
            };
        }
    );
    

}