

function logando()
{
    carregaLoadinge()

    
    

    setTimeout(function(){
        escondeLoadinge()
       
        
        

        
        
    
    

        var realizaLogin = true;

        console.log(realizaLogin)
        
        valores = {
            'emailLogin': $('#login').val(),
            'senhaLogin': $('#senhalogin').val(),
            'login': true
        }


        if(valores['emailLogin'].length < 5 || valores['senhaLogin'].length < 5 )
        {
            

            realizaLogin = false
            carregaAlertaLogin()
            

        
            
        

            setTimeout(function(){
                
                escondeAlertaLogin()


                

            

               
                
                console.log('entrou aqui 2 set')
                

                limparCamposLogin()
                
            },3000);


        }  


            

        
        console.log('entrou aqui 1 set')


        console.log(realizaLogin)

        if(realizaLogin)
        {

            $.ajax({
                url: 'http://localhost/desafio_wk_technology/controller/lojaController.php',
                type:'POST',
                data: valores,
                success: function(datas){
                        
                        
                    setTimeout(function(){
                        escondeLoadinge()

                        console.log('Entrou aqui REALIZA LOGIN')
            
                            
                            
                        if(datas.realiza)
                        {
                            carregaSucessoLogin()
                            setTimeout(function(){
                                escondeSucessoLogin();
                                
                                if(datas.id == 1)
                                {
            
                                        
                                
            
                                    limparCamposLogin()
            
                                    setTimeout(function(){
                                        esconderModalLogin()
                                        window.location.href = "http://localhost/desafio_wk_technology/view/paineladministrativo.php";
                                



                                    },1000);
                                    
                                    
                                   
                                }else{
                                    console.log('entrou login normal')
            
                                    
                                    limparCamposLogin()

                                   
                                    
                                    
                                    
                                    
                                    

                                }
                                
                               
                                
                            },2000);
                            
                            
            
                        }else
                        {
                            carregaAlertaLogin()
                            setTimeout( function(){
                                escondeAlertaLogin()


                            },2000);
        
                            console.log('não logado')
                        }
            
            
                        },2000); // Esse milisegundo (1000) é tempo em milisegundo
                        escondeAlertaLogin();
                        limparCamposLogin()
                        escondeSucessoLogin()
                    },
                    error: function(){
                        escondeLoadinge();
                        carregaAlertaLogin();
                       
                        setTimeout(function(){
                            escondeAlertaLogin()
        
                            
                            
                            
            
            
            
            
                        },3000); // Esse milisegundo (1000) é tempo em milisegundo
                       
                        limparCamposLogin()
                        
            
                    }
            
                })
            
        
        
        
        
    
            

            
            
            

        }

    },2000);
    
    
  
   
    
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

function esconderModalLogin(){

    
    $("[data-dismiss=modal]").trigger({ type: "click" });

}


function limparCamposLogin()
{
    email = $('#login').val('')
    senha = $('#senhalogin').val('') 
}