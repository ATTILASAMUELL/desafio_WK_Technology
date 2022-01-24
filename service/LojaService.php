<?php
require_once ("../DAO/DAO.php");
require_once ("../DAO/DAOProduto.php");
require_once ("../DAO/DAOCarrinho.php");
if(!isset($_SESSION)) 
{ 
    session_start(); 
} 

class Service
{
    
    public static function  buscarCep($cep)
    {
        
        $url ='https://viacep.com.br/ws/'.$cep.'/json/';
        $resultado = json_decode(@file_get_contents($url));
        if ($resultado == FALSE)
        {
            return array( 
            "error" => 1,
            "mensagem" => "Error ao buscar o cep, verifique o cep."

        );
        }else{
            return array( "cep"=>$resultado->cep,
            "logradouro" => $resultado->logradouro,
            "bairro" => $resultado->bairro,
            "error" => 0

        );
        }
            
            
            
            
        
    }

    public static function CadastrarUsuario(Cliente $cliente)
    {
        if($cliente->getNome())
        {
            
            $inserindo = new DAO;
            if(!$inserindo->buscar($cliente, true))
            {
                $retorno = $inserindo->inserir($cliente);

                return array('cadastrou'=> true);

            }
           

        }else
        {
            return array('cadastrou' => false);
        }
        
    }


    public static function RealizarLogin(Cliente $cliente)
    {
        $login = new DAO;
        $retorno = $login->buscar($cliente, false);

        if($retorno['login'] == 1)
        {
            if($retorno['id'] == 1){

                $email = $cliente->getEmail();
                $_SESSION['adm'] =  $email ;
    
            }
            
            $email = $cliente->getEmail();
            $_SESSION['email'] = $email ;
            $_SESSION['id'] =  $retorno['id'];
            return array('login' => 1 , 'id' => $retorno['id']) ;
        }else
        {
            return array('login' => 0);
        }
    }


    public static function SalvarProduto(Produto $produto)
    {
        if(isset($produto))
        {
            $inserirProduto = new DAOProduto;
            $inserirProduto->inserir($produto);
        }
    }

    public static function BuscarProduto()
    {
        $buscar = new DAOProduto;
        $resultado = $buscar->buscar();
        return $resultado;

    }

    public static function SalvandoCarrinho(Carrinho $carrinho)
    {
        $salvaCarrinhoDAO = new DAOCarrinho;
        $salvaCarrinhoDAO->inserir($carrinho);



    }




}

