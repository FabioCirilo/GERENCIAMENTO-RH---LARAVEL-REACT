<?php

namespace App\Http\Controllers;
use App\Models\Departamento;
use Illuminate\Http\Request;

class ConfigurarResponsavelController extends Controller
{
 public function configurarResponsavel(Request $request) {
       // Validar os dados da requisacao
       $request -> validate([
        'id_funcionario' => 'required|exists:funcionario, id',
        'id_departamento' => 'required|exists:departamento, id',
    ]);
    // Encontrar o departamneto
    $departamento = Departamento::find($request->ID);

    // Configurar o responsavel
    $departamento -> responsavel_id = $request-> id_funcionario;
    $departamento -> save();

    return response() -> json([
        'message' => 'Responsavel configurado com sucesso',
        'departamento' => $departamento
    ]);
 }
}
