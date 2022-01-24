
function cadastrarProtuto()
{
    var form_data = new FormData(); 
    var file_data =  $('#fotoProduto')[0].files[0];
    form_data.append('fileFotoProduto', file_data);
    form_data.append('nomeProduto', $('#nomeProduto').val());
    form_data.append('descricaoProduto', $('#descricaoProduto').val());
    form_data.append('precoProduto', $('#precoProduto').val());
    form_data.append('cadasPro',true);


   
    console.log(form_data);
   

    $.ajax({
        url:  'http://localhost/desafio_wk_technology/controller/lojaController.php',
        type: 'POST',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data){
            if(data.error)
            {
                console.log(data.mensagem)
            }
            console.log(data.mensagem)
           
            
        },error: function(){
            console.log('error')

        }
    })

}


function listarProdutos()
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
            
            
            if(data.produtos.length > 0){
            for(var i = 0 ; i < data.produtos.length; i++ )
                {

                    
                    $('#bodyTab').append("<tr><th scope='row'>1</th> <td>"+data.produtos[i].id+"</td><td>"+data.produtos[i].nome+"</td><td>"+data.produtos[i].foto+"</td><td>"+data.produtos[i].valor+"</td></tr>")
                    
                    console.log(data.produtos[i].nome_arquivo)
                    //console.log(data.produtos[i].nome)
                    
                }
            }
            
           
            
        },error: function(){
            console.log('error')

        }
    })


}

function sair()
{
    alert('apertou sair')
}



listarProdutos(); 
