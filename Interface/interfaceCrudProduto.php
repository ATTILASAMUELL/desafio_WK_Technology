

<?php


interface CrudProduto {

    function inserir(Produto $produto);
    function alterar(Produto $produto);
    function buscar();
    function deletar(Produto $produto);




}