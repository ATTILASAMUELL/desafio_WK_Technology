<?php


require_once("../Interface/interfaceCrudProduto.php");

require_once ("../Conexao/conexao.php");
if(!isset($_SESSION)) 
{ 
    session_start(); 
} 


class DAOProduto implements CrudProduto
{
    
    function inserir(Produto $produto)
    {
        $nome = $produto->getNome();
        $foto =  $produto->getFoto();
        $valor = floatval($produto->getValor());
        $nomeArquivo = $produto->getNomeArquivo();
        $descricao = $produto->getDescricao();

        $inserindos = Conexao::Conectar();
        $prepare = $inserindos->prepare("INSERT INTO produto(nome,foto,valor,nome_arquivo,descricao) VALUES (:nome,:foto,:valor,:nome_arquivo,:descricao)");
        $prepare->bindParam(":nome",  $nome);
        $prepare->bindParam(":foto",  $foto);
        $prepare->bindParam(":valor",  $valor);
        $prepare->bindParam(":nome_arquivo",  $nomeArquivo);
        $prepare->bindParam(":descricao",  $descricao);
        $prepare->execute();


    }
    function alterar(Produto $produto)
    {

    }
    function buscar()
    {


        $query = "SELECT * FROM produto ";
        $buscando = Conexao::Conectar();
        $prepare = $buscando->prepare($query);
        $prepare->execute();
        $lista = [];
        
       
        if($prepare->rowCount()>0)
        {
            $produtos = $prepare->fetchAll(PDO::FETCH_ASSOC);
            foreach($produtos as $itens)
            {
               $lista[] =[
                   'id' => $itens['id'],
                   'nome' => $itens['nome']  ,
                   'foto' =>  $itens['foto']  ,
                   'valor' => $itens['valor'] ,
                   'nome_arquivo' => $itens['nome_arquivo'] ,
                   'descricao' =>  $itens['descricao']    
                

               ];
            }
            return $lista;

        }


        
    }
    function deletar(Produto $produto)
    {

    }



}