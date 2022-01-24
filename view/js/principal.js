$(document).ready(function(){
        
        
    setInterval(()=>{
        carregaProdutos()

    }, 3000);
        
})  


function carregaProdutos()
{

    dados = {
        'listar' : true
    }
    $.ajax({
        url:  'http://localhost/desafio_wk_technology/controller/lojaController.php',
        type: 'POST',
        data: dados,
        success: function(data){
            console.log("entrou listando:")
            $('#coluna').empty();
            
            
            if(data.produtos.length > 0){
            for(var i = 0 ; i < data.produtos.length; i++ )
                {
                    $('#coluna').append('<div class="card-group"><div class="card m-1" style="width: 18rem;"><img class="card-img-top" src="'+data.produtos[i].foto+'"  height="150" width="190" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+data.produtos[i].nome+ '</h5><p class="card-text">'+data.produtos[i].descricao+ ' </p><a  class="btn btn-primary">R$ '+data.produtos[i].valor+ '</a><button  onClick="adicionarCarrinho('+data.produtos[i].id+')" class="btn btn-success">Comprar</button></div></div>')

                  
                    //console.log(data.produtos[i].nome_arquivo)
                    //console.log(data.produtos[i].nome)
                    
                }
            }
            
           
            
        },error: function(){
            console.log('error')

        }
    })
}


function adicionarCarrinho($id)
{
    alert('add');
    dados = {
        'salvarCarrinho' : true,
        'id' : $id
    }
    $.ajax({
        url:  'http://localhost/desafio_wk_technology/controller/lojaController.php',
        type: 'POST',
        data: dados,
        success: function(data){
            console.log(data);
           
            
           
            
        },error: function(){
            console.log('error')

        }
    })
}

function sair()
{
    alert('apertou sair')
}


























   
   



