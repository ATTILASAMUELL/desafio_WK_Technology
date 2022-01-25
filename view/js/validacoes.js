

function logando()
{
    carregaLoadinge()

    
    

    setTimeout(function(){
        escondeLoadinge()
       
        
        

        limparCamposLogin()
        
    },2000);
    

    var realizaLogin = true;
     
    valores = {
        'emailLogin': $('#login').val(),
        'senhaLogin': $('#senhalogin').val(),
        'login': true
    }


    if(valores['emailLogin'].length < 5 || valores['senhaLogin'].length < 5 )
    {
        

        realizaLogin = false
        

       
        
       

        setTimeout(function(){
            escondeAlertaLogin()

            carregaAlertaLogin()

           
            
            

            limparCamposLogin()
            
        },2000);


        escondeAlertaLogin()


        

       
        console.log('entrou aqui')

        
        
        

    }
    
    
    
    if(realizaLogin)
    {
        $.ajax({
            url: 'http://localhost/desafio_wk_technology/controller/lojaController.php',
            type:'POST',
            data: valores,
            success: function(datas){
                
                
                setTimeout(function(){
                    escondeLoadinge()
    
                    
                    
                    if(datas.realiza)
                    {
                        if(datas.id == 1)
                        {

                            



                            carregaSucessoLogin()

                            limparCamposLogin()

                        

                            window.location.href = "http://localhost/desafio_wk_technology/view/paineladministrativo.php";
                        }else
                        {
                            

                            carregaSucessoLogin()


                            

                           
                            limparCamposLogin()
                            document.location.reload(true);
    
                        }
                        
    
                        console.log('logado')
                    }else
                    {
                        carregaAlertaLogin()
    
                        console.log('não logado')
                    }
                    
                    
    
    
    
    
                },2000); // Esse milisegundo (1000) é tempo em milisegundo
                escondeAlertaLogin();
                limparCamposLogin()
                escondeSucessoLogin()
            },
            error: function(){
                
               
                setTimeout(function(){
                    escondeLoadinge();
                    carregaAlertaLogin();

                    
                    
                    
    
    
    
    
                },2000); // Esse milisegundo (1000) é tempo em milisegundo
                escondeAlertaLogin()
                limparCamposLogin()
                
    
            }
    
        })
    





    }
    
}


 function carregaAlertaLogin()
{
    var alertaLogin =  document.getElementById('alertalogin');
    alertaLogin.style.display = "block";

}
function escondeAlertaLogin()
{
    var alerta =  document.getElementById('alertalogin');
    alerta.style.display = "none";

}
function carregaLoadinge()
{
    var loadLogin =  document.getElementById('loadinglogin');
    loadLogin.style.display = "block";

}
function escondeLoadinge()
{
    var loadLoginEs =  document.getElementById('loadinglogin');
    loadLoginEs.style.display = "none";
}

function carregaSucessoLogin()
{
    var sucessoLogi =  document.getElementById('sucessologin');
    sucessoLogi.style.display = "block";
    
}

function escondeSucessoLogin()
{
    var sucessoLogies =  document.getElementById('sucessologin');
    sucessoLogies.style.display = "none";
}


function limparCamposLogin()
{
    email = $('#login').val(' ')
    senha = $('#senhalogin').val(' ') 
}