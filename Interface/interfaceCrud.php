

<?php


interface Crud {

    function inserir(Cliente $cliente);
    function alterar(Cliente $cliente);
    function buscar(Cliente $cliente, $tipo);
    function deletar(Cliente $cliente);




}