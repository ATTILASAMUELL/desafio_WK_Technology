<?php


interface InterfacePedidoVenda {

    function inserir(PedidoVenda $pedido);
    function alterar(PedidoVenda $pedido);
    function buscar($id);
    function deletar(PedidoVenda $pedido);




}