<?php


require_once("../Interface/interfaceCarrinho.php");

require_once ("../Conexao/conexao.php");
if(!isset($_SESSION)) 
{ 
    session_start(); 
} 


class DAOCarrinho implements CarrinhoCrud
{


    function inserir(Carrinho $carrinho)
    {
        $cliente = intval( $carrinho->getCliente());
        $produto = intval( $carrinho->getProduto());
        $qtd = intval( $carrinho->getQtd());
        $date = date('Y-m-d');

        $inserindo = Conexao::Conectar();
        $prepare = $inserindo->prepare("INSERT INTO  carrinho(fk_clientee, fk_produtoo, dat, qtd) VALUES (:cliente,:produto, :dat , :qtd)");
        $prepare->bindParam(":cliente", $cliente);
        $prepare->bindParam(":produto", $produto  );
        $prepare->bindParam(":dat", $date  );
        $prepare->bindParam(":qtd", $qtd  );
        $prepare->execute();


    }
    function alterar(Carrinho $carrinho)
    {

    }
    function buscar(Carrinho $carrinho)
    {

    }
    function deletar(Carrinho $carrinho)
    {

    }



}
