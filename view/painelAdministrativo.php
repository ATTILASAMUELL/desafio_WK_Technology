<?php

if(!isset($_SESSION)) 
{ 
    session_start(); 
}
if(!isset($_SESSION['adm'] )) 
{
    header("Location: http://localhost/desafio_wk_technology/view/principal.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loja ATTILA</title>
    <link rel="stylesheet" href="css/loading.css">
    

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<?php
    include_once "include/menu.php";
?>
<br>
<br>

<div class="card-body">
<h1> Cadastrar Produtos</h1>

<form enctype="multipart/form-data">
    <div class="form-group">
        <label for="exampleInputEmail1">Nome Produto</label>
        <input type="text" class="form-control" id="nomeProduto" aria-describedby="emailHelp" placeholder="Produto">
        
    </div>
    
    <div class="form-group">
        <label for="exampleFormControlFile1">Selecione um arquivo</label>
        <input type="file" class="form-control-file" id="fotoProduto">
    </div>

    <div class="form-group">
        <label for="exampleInputPassword1">Descrição</label>
        <input type="text" class="form-control" id="descricaoProduto" placeholder="Descrição">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Preço</label>
        <input type="text" class="form-control" id="precoProduto" placeholder="Preço">
    </div>

    <button type="button" class="btn btn-primary" onclick="cadastrarProtuto()">Cadastrar</button>
    </form>


<br>
<br>






















    <h1> Lista de Produtos</h1>

    <table class="table table-striped table-dark">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">id</th>
        <th scope="col">nome</th>
        <th scope="col">foto</th>
        <th scope="col">valor</th>
        <th scope="col">nome_arquivo</th>
        <th scope="col">descricao</th>
        </tr>
    </thead>
    <tbody id=bodyTab>
       
       
    </tbody>

</div>
</div>
</table>



<!-- jQuery (online) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>




<!-- JavaScript Atualizar Página  -->
<script src="js/painelADM.js"></script>
</body>
</html>