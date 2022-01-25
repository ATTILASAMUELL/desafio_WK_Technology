
function efetuarcadastro()
{
    var autoriza = true;
    carregaLoading()
    data =  $("#dataN").val();
    formatada = data.replace('/', '')
    formatad = formatada.replace('/', '')
    
    dados = {
        'nome' : $('#inputNome').val(),
        'email' :  $('#inputEmail4').val(),
        'senha' :  $('#inputPassword4').val(),
        'cep' :    $("#cep").val() ,
        'cidade' : $('#cidade').val(),
        'DataNascimento' :  formatad ,
        'cpf' : $('#cpf').val(),
        'complemento' : $('#complemento').val(),
        'bairro' : $('#bairro').val(),
        'numero' : $('#numero').val(),
        'logradouro' : $('#logradouro').val(),
        'cadastrando' : true
    }

    if(dados['nome'].length < 5  || dados['email'].length < 5 
    || dados['senha'].length < 5  || dados['cep'].length < 5
    || dados['cidade'].length < 5 || dados['DataNascimento'].length < 5
    || dados['cpf'].length < 5 || dados['complemento'].length < 5
    || dados['bairro'].length < 5 || dados['numero'].length < 5
    || dados['logradouro'].length < 5 || dados['cadastrando'].length < 5
      )
    {
        
        autoriza = false
        setTimeout(function(){
            escondeLoading();
            var mensagem = "Digite os dados corretamente";
            carregaAlerta(mensagem)
            limparDadosCadastro();
           
     
        },2000);
        escondeAlerta();
        
    }

    console.log(typeof(dados['nome']));
    console.log(typeof(dados['email']));
    console.log(typeof(dados['senha']));
    console.log(typeof(dados['cep']));
    console.log(typeof(dados['cidade']));
    console.log(dados['DataNascimento']);
    console.log(typeof(dados['cpf']))
    console.log(typeof(dados['complemento']))
    console.log(typeof(dados['bairro']))
    console.log(typeof(dados['numero']))
    console.log(typeof(dados['logradouro']))


    
    if(autoriza){
        $.ajax({
            url: 'http://localhost/desafio_wk_technology/controller/lojaController.php',
            type:'POST',
            data: dados,
            success: function(data){
                setTimeout(function(){
                    escondeLoading();
                    if(data.cadastro)
                    {
                        carregaSucesso();
                        limparDadosCadastro();
                    } else{
                        var mensagem = "Digite os dados corretamente";
                        carregaAlerta(mensagem)
                        limparDadosCadastro();
                    }
    
                    
                    
                    console.log(data);
                    
                    
    
    
    
    
                },2000); // Esse milisegundo (1000) é tempo em milisegundo
                escondeSucesso();
                escondeAlerta();
                limparDadosCadastro();
                $("#exampleModal1").html(data.items); 
                document.location.reload(true);
            },
            error: function(){
               
                setTimeout(function(){
                    escondeLoading();
                    var mensagem = "Digite os dados corretamente";
                    carregaAlerta(mensagem)
                    
                    
                    
    
    
    
    
                },2000); // Esse milisegundo (1000) é tempo em milisegundo
                escondeAlerta();
                limparDadosCadastro();
    
            }
    
        })

    }
    
    
    
}

function limparDadosCadastro()
{
    nome =  $('#inputNome').val(' ') 
    email = $('#inputEmail4').val(' ')
    senha = $('#inputPassword4').val(' ') 
    cep = $('#cep').val(' ')  
    cidade = $('#cidade').val(' ') 
    dataNasc =  $('#inputPassword4').val(' ') 

    cpf = $('#dataN').val(' ') 
    complemento = $('#complemento').val(' ')  
    bairro = $('#bairro').val(' ') 
    numero =  $('#numero').val(' ') 
    logradouro =  $('#logradouro').val(' ') 
    
}

function mascaraCpf()
{
    var cpf = document.getElementById('cpf');
    if(cpf.value.length == 3 || cpf.value.length == 7)
    {
        cpf.value+= ".";
        
    }else if (cpf.value.length == 11){
        cpf.value += "-";
    }
}

function mascaraData()
{
    var data = document.getElementById('dataN');
    if(data.value.length == 2 || data.value.length == 5)
    {
        data.value+= "/";
        
    }
    

}


function mascEbuscaAPI()
{
    
    var cep = $('#cep').val();
    console.log(cep)
   
    
    if(cep.length == 9 )
    {   
        carregaLoading()
        dados = {
            'cep' :  $('#cep').val(),
            'conectar' : true
        }
        console.log(dados)
        

        $.ajax({
            url: 'http://localhost/desafio_wk_technology/controller/lojaController.php',
            type:'POST',
            data: dados,
            success: function(data){
                
                setTimeout(function(){
                    escondeLoading();
                    console.log(data);
                    var logradouro = data.logradouro;
                    var bairro = data.bairro;
                    var cidade = data.cidade;
                    document.getElementById("logradouro").value += logradouro;
                    document.getElementById("cidade").value += cidade;
                    document.getElementById("bairro").value += bairro;

    
    
    
                },2000); // Esse milisegundo (1000) é tempo em milisegundo
            },
            error: function(){
                alert('deu ruim');
    
            }
    
        })
    }


    else if (cep.length == 5)
    {
       document.getElementById("cep").value += "-";    }
}
function carregaAlerta($mensagem)
{
    var alerta =  document.getElementById('alerta');
    alerta.style.display = "block";
    alerta.value = $mensagem

}
function escondeAlerta()
{
    var alerta =  document.getElementById('alerta');
    alerta.style.display = "none";

}
function carregaLoading()
{
    var load =  document.getElementById('loading');
    load.style.display = "block";

}
function escondeLoading()
{
    var load =  document.getElementById('loading');
    load.style.display = "none";
}

function carregaSucesso()
{
    var sucesso =  document.getElementById('sucesso');
    sucesso.style.display = "block";
    
}

function escondeSucesso()
{
    var sucesso =  document.getElementById('sucesso');
    sucesso.style.display = "none";
}