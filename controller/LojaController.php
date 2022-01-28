<?php

// CORS HEADERS
header("Access-Control-Allow-Origin: *");


//Inicia a Sessão

if(!isset($_SESSION)) 
{ 
    session_start(); 
} 



//Inclusão

require_once ("../service/LojaService.php");
require_once ("../model/Cliente.php");
require_once ("../model/Produto.php");
require_once ("../model/PedidoVenda.php");
require_once ("../model/Carrinho.php");





if(isset($_POST['conectar'])){
    $cep = $_POST['cep'];
    buscarDadosCorreios($cep);
    var_dump($cep);
    


    
}else{

}

if(isset($_POST['deletarItemCarrinho']))
{
    deletandoItemCarrinho();

}
if(isset($_POST['salvarCarrinho']))
{
    salvarCarrinho();
}
if(isset($_POST['listandoCarrinho']))
{
    listandoCarrinho();

}

if(isset($_POST['sair']))
{
    sairdoSistema();

}
if(isset($_POST['cadasPro'])){
    
    
    if(isset($_FILES['fileFotoProduto']))
    {
        cadastrarProduto(true);
       

    }else
    {
        cadastrarProduto(false);

    }
   

    
   
}

if(isset($_POST['login']))
{
    $email = filter_input(INPUT_POST,'emailLogin', FILTER_SANITIZE_STRING);
    $senha = filter_input(INPUT_POST,'senhaLogin', FILTER_SANITIZE_STRING);

    if(!$email or !$senha)
    {
        realizarLogin(false,false);

    }
    else
    {
        $array = array( 'email' => $email, 'senha' => $senha);
        realizarLogin(true, $array);
    }

}

if(isset($_POST['listar']))
{
    buscarProduto();
}


if(isset($_POST['cadastrando']))
{
    
    $nome = filter_input(INPUT_POST,'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST,'email', FILTER_SANITIZE_STRING);
    $senha = filter_input(INPUT_POST,'senha', FILTER_SANITIZE_STRING);
    $cep = filter_input(INPUT_POST,'cep', FILTER_SANITIZE_STRING);
    $cidade = filter_input(INPUT_POST,'cidade', FILTER_SANITIZE_STRING);
    $inputDataNascimento = filter_input(INPUT_POST,'DataNascimento', FILTER_SANITIZE_STRING);
    $cpf = filter_input(INPUT_POST,'cpf', FILTER_SANITIZE_STRING);
    $complemento = filter_input(INPUT_POST,'complemento', FILTER_SANITIZE_STRING);
    $bairro = filter_input(INPUT_POST,'bairro', FILTER_SANITIZE_STRING);
    $numero = filter_input(INPUT_POST,'numero', FILTER_SANITIZE_STRING);
    $logradouro = filter_input(INPUT_POST,'logradouro', FILTER_SANITIZE_STRING);

    if(!$nome or !$email or !$senha or !$cep or !$cidade  or !$inputDataNascimento
    or !$cpf or !$complemento or !$bairro or !$numero  or !$logradouro)
    {
       
        fazerCadastro(false,false);

    }else{
        $array = array('nome'=> $nome, 'email' => $email, 'senha' => $senha, 'cep' => $cep, 'cidade' => $cidade, 'data_nascimento' => $inputDataNascimento,
        'cpf' => $cpf, 'complemento' => $complemento, 'bairro' => $bairro , 'numero' => $numero, 'logradouro' => $logradouro);
        
        fazerCadastro(true,$array);

    }
   
    

}

if(isset($_POST['fazerPedido']))
{
    fazerPedido();
    

}

if(isset($_POST['listarPedidos']))
{
    listarPedidos();
}


function buscarDadosCorreios($cep)
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");

    //Retorno do Json (Validação)
    header('Content-Type: application/json');

    $valor = Service::buscarCep($cep);
    print json_encode($valor);
    exit();
}

function fazerCadastro($condicao, $valores)
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    //Retorno do Json (Validação)
    header('Content-Type: application/json');
    
    if($condicao)
    {
        $cliente = new Cliente;
        $cliente->setNome($valores['nome']);
        $cliente->setEmail($valores['email']);
        $cliente->setSenha($valores['senha']);
        $cliente->setCep($valores['cep']);
        $cliente->setCidade($valores['cidade']);
        $cliente->setDatanascimento($valores['data_nascimento']);
        $cliente->setCpf($valores['cpf']);
        $cliente->setComplemento($valores['complemento']);
        $cliente->setBairro($valores['bairro']);
        $cliente->setNumero($valores['numero']);
        $cliente->setLogradouro($valores['logradouro']);

        $cadastrar = Service::CadastrarUsuario($cliente);

        if(!$cadastrar['cadastrou'])
        {
            print json_encode(array('cadastro'=> false ));
            exit();
        }else
        {
            print json_encode(array('cadastro'=> true ));
            exit();

        }




        

    }else
    {
       
        
        print json_encode(array ('cadastro'=> false));
        exit();
    }

}

function realizarLogin($condicao, $valores)
{
    if($condicao)
    {
        // CORS HEADERS
        header("Access-Control-Allow-Origin: *");
        //Retorno do Json (Validação)
        header('Content-Type: application/json');

        $cliente = new Cliente;
   
        $cliente->setEmail($valores['email']);
        $cliente->setSenha($valores['senha']);

        $Login = Service::RealizarLogin($cliente);

        if($Login['login'] == 1)
        {
            
             
            print json_encode(array('realiza' => true, 'id' => $Login['id']));
            exit();

        }else
        {
            print json_encode(array('realiza' => false));
            exit();

             
      
        }

    }else
    {
        print json_encode(array('realiza'=> false));
        exit();

    }

}

function cadastrarProduto($condicao){
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    //Retorno do Json (Validação)
    header('Content-Type: application/json');
    $nomeProduto = $_POST['nomeProduto'];
    $descricaoProduto = $_POST['descricaoProduto'];
    $precoProduto = $_POST['precoProduto'];
    $produto = new Produto;

    

    if($condicao){
        //cadastrar

        $arquivo = $_FILES['fileFotoProduto'];
        //se tiver errror
        if($arquivo['error'])
        {
            print json_encode(array('error'=> true , 'mensagem' => 'Error ao carregar arquivo'));
            exit();

        }
        if($arquivo['size'] > 2097152)
        {
            print json_encode(array('error'=> true , 'mensagem' => 'Arquivo muito grande!!'));
            exit();
        }

        $pasta = "../arquivoUpload/";
        $nomeDoarquivo = $arquivo['name'];
        $nomeNovoArquivo = uniqid();
        $extensao = strtolower(pathinfo($nomeDoarquivo, PATHINFO_EXTENSION ));
        
        if($extensao !=  'jpg'){
            print json_encode(array('error'=> true , 'mensagem' => 'Extensão do arquivo não aceita'));
            exit();

        }
        $deu_certo = move_uploaded_file($arquivo['tmp_name'], $pasta. $nomeNovoArquivo. ".". $extensao);
        $path = $pasta. $nomeNovoArquivo. ".". $extensao;

        if($deu_certo)
        {
            $produto->setNome($nomeProduto);
            $produto->setDescricao($descricaoProduto);
            $produto->setFoto($path);
            $produto->setNomeArquivo($nomeDoarquivo);
            $produto->setValor($precoProduto);

            $salvandoProduto = Service::SalvarProduto($produto);
            print json_encode(array('error'=> false , 'mensagem' => 'deu certo'));
            exit();

        }else
        {
            print json_encode(array('error'=> true , 'mensagem' => 'upload não realizado'));
            exit();

        }




        

    }
}

function buscarProduto()
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");

    //Retorno do Json (Validação)
    header('Content-Type: application/json');

    $produtos = Service::BuscarProduto();
    print json_encode(array('produtos'=>$produtos));
    exit();


}



function salvarCarrinho()
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    //Retorno do Json (Validação)
    header('Content-Type: application/json');

    $id = $_POST['id'];
    $cliente = $_SESSION['id'];

    if($cliente !=  1)
    {
            
        $carrinho = new Carrinho;
        $carrinho->setCliente($cliente);
        $carrinho->setProduto($id);
        $carrinho->setQtd(1);


        $salvandoCarrinho = Service::SalvandoCarrinho($carrinho);

        print json_encode(array('idP'=>$id, 'idC' => $cliente));
        exit();

    }

   


}

function listandoCarrinho()
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    //Retorno do Json (Validação)
    header('Content-Type: application/json');
    $id = $_SESSION['id'];

    if($id)
    {
        $itens = Service::buscandoCarrinho();
        print json_encode(array('valores'=> $itens , 'error' => false));
        exit();

    }else
    {
        print json_encode(array('error'=> true));
        exit();
        

    }
    



    


}
function deletandoItemCarrinho()
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    $id = $_POST['idCarr'];

    $carrinhoC = new Carrinho;
    $carrinhoC->setId($id);

    $deletando = new Service;
    $deletando-> deletaritemcarrinho( $carrinhoC, true);
}

function fazerPedido()
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    //Retorno do Json (Validação)
    header('Content-Type: application/json');

    $usuario = $_SESSION['id'];
    $listaPedi = [];
    $total = 0.0;
    $data = date("Y-m-d H:i:s");

    $pedidoVenda = new PedidoVenda;


    $pegaritens = Service::buscandoCarrinho();

    foreach($pegaritens as $itens)
    {
        $listaPedi[] =[
            'id_produto' => $itens['id_produto'],
            'nome_produto' =>  $itens['nome'],
            'quantidade' => $itens['qtd'],
            'valor' =>  $itens['valor']

        ];

        $total += $itens['valor'];
        

    };

    $pedidoVenda->setCliente($usuario);
    $pedidoVenda->setListaPedido($listaPedi);
    $pedidoVenda->setTotal($total);
    $pedidoVenda->setData($data);
    $pedidoVenda->setStatus("Pedido");

    $salvarpedidoVenda = Service::salvarPedidoVenda($pedidoVenda);

    $id = $_SESSION['id'];

    $carrinhoC = new Carrinho;
    $carrinhoC->setCliente($id);

    $deletando =Service::deletaritemcarrinho($carrinhoC, false);
    



    print json_encode(array('pedido'=>  true , 'id' => $id  ));
    exit();


}


function listarPedidos()
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    //Retorno do Json (Validação)
    header('Content-Type: application/json');

    
    $pedidosFeito = Service::listarPedidos();


     
    print json_encode(array('valores' => $pedidosFeito  ));
    exit();



}


function sairdoSistema()
{
    // CORS HEADERS
    header("Access-Control-Allow-Origin: *");
    //Retorno do Json (Validação)
    header('Content-Type: application/json');

    //destroi seções
    session_destroy();

    print json_encode(array('redirecionar'=>true));
    exit();
    
    
}