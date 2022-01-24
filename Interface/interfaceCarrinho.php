
<?php


interface CarrinhoCrud {

    function inserir(Carrinho $carrinho);
    function alterar(Carrinho $carrinho);
    function buscar(Carrinho $carrinho);
    function deletar(Carrinho $carrinho);




}