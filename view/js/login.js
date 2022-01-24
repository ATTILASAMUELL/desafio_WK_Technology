
function loginLogando()
{
    
    dados = {
        'emailLogin': $('#login').val(),
        'senhaLogin': $('#senhalogin').val(),
        'login': true
    }
    console.log(dados);
    if(validarCampos(dados['emailLogin'], dados['senhaLogin'])){
        logando(dados);
        

    }else{
        alert('preencha campos')
    }


    
}



function validarCampos(email, senha)
{

    if(email.length < 1 || senha.length < 1 )
    {
        return false;
    }




    return true;
}

function logando()
{
     
    dados = {
        'emailLogin': $('#login').val(),
        'senhaLogin': $('#senhalogin').val(),
        'login': true
    }
    carregaLoadinge()
    //var load =  document.getElementById('loadinglogin');
    //load.style.display = "block";
    $.ajax({
        url: 'http://localhost/desafio_wk_technology/controller/lojaController.php',
        type:'POST',
        data: dados,
        success: function(datas){
            
            setTimeout(function(){

                var load =  document.getElementById('loadinglogin');
                load.style.display = "none";
                console.log(datas)
                if(datas.realiza)
                {
                    if(datas.id == 1)
                    {
                        window.location.href = "http://localhost/desafio_wk_technology/view/paineladministrativo.php";
                    }else
                    {
                        document.location.reload(true);

                    }
                    

                    console.log('logado')
                }else
                {

                    console.log('não logado')
                }
                
                




            },2000); // Esse milisegundo (1000) é tempo em milisegundo
        },
        error: function(){
            carregaAlerta();
            setTimeout(function(){
                escondeAlerta();
                
                




            },2000); // Esse milisegundo (1000) é tempo em milisegundo
            

        }

    })

}


function carregaAlerta()
{
    var alerta =  document.getElementById('alertalogin');
    alerta.style.display = "block";

}
function escondeAlerta()
{
    var alerta =  document.getElementById('alertalogin');
    alerta.style.display = "none";

}
function carregaLoadinge()
{
    var load =  document.getElementById('loadinglogin');
    load.style.display = "block";

}
function encondeLoading()
{
    var load =  document.getElementById('loadinglogin');
    load.style.display = "none";
}

function carregaSucesso()
{
    var sucesso =  document.getElementById('sucessologin');
    sucesso.style.display = "block";
    
}

function escondeSucesso()
{
    var sucesso =  document.getElementById('sucessologin');
    sucesso.style.display = "none";
}
