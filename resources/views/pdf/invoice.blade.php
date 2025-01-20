<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Ficha Técnica</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0; /* Remove margens padrão */
            padding: 20px; /* Espaçamento na margem */
        }

        .main {
            background: white; /* Fundo branco para a ficha técnica */
            border-radius: 8px; /* Bordas arredondadas */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
            padding: 20px;
            width: 100%; /* Largura total da página */
            max-width: 1200px; /* Largura máxima (opcional, ajuste conforme necessário) */
            margin: auto; /* Centraliza horizontalmente */
        }

        .section {
            display: flex; 
            justify-content: space-between; 
            padding: 10px 0; /* Espaçamento superior e inferior */
            border-bottom: 1px solid #e0e0e0; /* Linha separadora */
        }

        .section:last-child {
            border-bottom: none; /* Remove a linha do último item */
        }

        .title {
            font-size: 30px; /* Tamanho do texto */
            color: #2c384e; /* Cor do título */
            font-weight: bold; /* Negrito */
        }

        .dark .title {
            color: #6b7280; /* Cor para modo escuro (se aplicável) */
        }

        h1 {
            font-size: 30px; /* Tamanho do título */
            color: #2c384e; 
            text-align: center; /* Centraliza o título */
            margin-bottom: 20px; /* Espaço abaixo do título */
        }

        p {
            margin: 0; /* Remove margem padrão do parágrafo */
        }

        /* Responsividade */
        @media (max-width: 600px) {
            .section {
                flex-direction: column; /* Alterar a direção do flex em telas pequenas */
                align-items: flex-start; /* Alinhar à esquerda */
            }

            .section p {
                margin-bottom: 5px; /* Espaço abaixo dos parágrafos em telas pequenas */
            }
        }
    </style>
</head>
<body>

    <div class="main">
        <h1>Ficha Técnica do(a) <span class="title"> {{$funcionario->nome}} </span></h1>
        <div class="section">
            <p>Nome:</p>
            <span class="title"> {{$funcionario->nome}} </span>
        </div>
        <div class="section">
            <p>Cargo:</p>
            <span class="title"> {{$funcionario->cargo}} </span>
        </div>
        <div class="section">
            <p>Salário:</p>
            <span class="title"> {{$funcionario->salario}} </span>
        </div>
        <div class="section">
            <p>Departamento:</p>
            <span class="title"> {{$funcionario->departamento->nome}} </span>
        </div>
        <div class="section">
            <p>Email:</p>
            <span class="title"> {{$funcionario->email}} </span>
        </div>
        <div class="section">
            <p>Telefone:</p>
            <span class="title"> {{$funcionario->telefone}} </span>
        </div>
        <div class="section">
            <p>Data de Entrada:</p>
            <span class="title"> {{$funcionario->data_entrada}} </span>
        </div>
    </div>

</body>
</html>