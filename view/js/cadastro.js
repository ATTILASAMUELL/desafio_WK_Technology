
function efetuarcadastro()
{
    data =  $("#dataN").val();
    formatada = data.replace('/', '')
    formatad = formatada.replace('/', '')
    cpf=  $('#cpf').val()
    formataCPF = cpf.replace('.', '')
    formataCPF2 = cpf.replace('-', '')
    dados = {
        'nome' : $('#inputNome').val(),
        'email' :  $('#inputEmail4').val(),
        'senha' :  $('#inputPassword4').val(),
        'cep' :   formataCPF2 ,
        'cidade' : $('#cidade').val(),
        'DataNascimento' :  formatad ,
        'cpf' : $('#cpf').val(),
        'complemento' : $('#complemento').val(),
        'bairro' : $('#bairro').val(),
        'numero' : $('#numero').val(),
        'logradouro' : $('#logradouro').val(),
        'cadastrando' : true
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


    
    carregaLoading()
    
    $.ajax({
        url: 'http://localhost/desafio_wk_technology/controller/lojaController.php',
        type:'POST',
        data: dados,
        success: function(data){
            setTimeout(function(){
                if(data.cadastro)
                {
                    carregaSucesso();
                } else{
                    carregaAlerta();
                }

                escondeLoading();
                
                console.log(data);
                
                




            },2000); // Esse milisegundo (1000) é tempo em milisegundo
            escondeSucesso();
            escondeAlerta();
        },
        error: function(){
            carregaAlerta();
            setTimeout(function(){
                escondeAlerta();
                
                




            },2000); // Esse milisegundo (1000) é tempo em milisegundo
            

        }

    })
    
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
                    var cidade = data.bairro;
                    document.getElementById("logradouro").value += logradouro;
                    document.getElementById("cidade").value += cidade;

    
    
    
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
function carregaAlerta()
{
    var alerta =  document.getElementById('alerta');
    alerta.style.display = "block";

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