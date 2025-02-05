<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pontos;
use App\Models\Funcionario;
use App\Http\Resources\PontosResource;
use App\Http\Resources\FuncionarioResource;



class PontosController extends Controller
{


   public function index(Request $request)
    {

        $ano = $request->query('ano'); // Ano desejado
        $mes = $request->query('mes'); // Mês desejado
        $funcionarioId = $request->query('funcionario_id'); // ID do funcionário
        $active = $request->query('active'); // entrada
        $off = $request->query('off'); // saida
        $done = $request->query('done'); // off

        $PointedArray = Pontos::whereDate('created_at', now()->format('Y-m-d'))
            ->pluck('id_funcionario')
            ->toArray();
        $Unpointed = Funcionario::whereNotIn('id', $PointedArray)->count();
        $Pointed = Pontos::whereDate('created_at', now()->format('Y-m-d'))->count();

        /*return [
                    "Pontos" => FuncionarioResource::collection($funcionariosSemPontosHoje),
                    "PointedNum" => $Unpointed,
                    "UnpointedNum" => $Pointed,
                    ];
        */

        $query = Pontos::query();

        if ($ano) {
            $query->whereYear('created_at', $ano);
        }

        if ($mes) {
            $query->whereMonth('created_at', $mes);
        }

        if ($funcionarioId) {
            $query->where('id_funcionario', $funcionarioId);
        }

        if ($active) {
           $query->whereNotNull('entrada')->whereNull('saida');
        }

        if ($done) {
           $query->whereNotNull('entrada')->whereNotNull('saida');
        }

          if (!$ano && !$mes && !$off) {
            $query->whereDate('created_at', now()->format('Y-m-d'));
        }

        if ($off) {

            $funcionariosComPontosHoje = Pontos::whereDate('created_at', now()->format('Y-m-d'))
            ->pluck('id_funcionario')
            ->toArray();

            $funcionariosSemPontosHoje = Funcionario::whereNotIn('id', $funcionariosComPontosHoje)->get();

            return FuncionarioResource::collection($funcionariosSemPontosHoje);
        }

        $query->orderBy('created_at', 'asc');
        $pontos = $query->get();

        return PontosResource::collection($pontos);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_funcionario' => 'required|exists:funcionarios,id',
            'entrada' => 'nullable|date_format:H:i',
            'saida' => 'nullable|date_format:H:i|after:entrada',
        ]);
    
        $ponto = new Pontos();
        $ponto->id_funcionario = $validatedData['id_funcionario'];
        $ponto->entrada = $validatedData['entrada'] ?? null;
        $ponto->saida = $validatedData['saida'] ?? null;
        $ponto->save();
    
        return new PontosResource($ponto);
    }

    public function show(string $id)
    {
        $ponto = Pontos::findOrFail($id);
        return new PontosResource($ponto);
    }

    public function update(Request $request, string $id)
    {
        $ponto = Pontos::findOrFail($id);
    
        $validatedData = $request->validate([
            'entrada' => 'nullable|date_format:H:i',
            'saida' => 'nullable|date_format:H:i|after:entrada',
        ]);

        if (isset($validatedData['entrada'])) {
            $ponto->entrada = $validatedData['entrada'];
        }
        
        if (isset($validatedData['saida'])) {
            $ponto->saida = $validatedData['saida'];
        }

        $ponto->save();

        return new PontosResource($ponto);
    }

    public function destroy(string $id)
    {
        $ponto = Pontos::findOrFail($id);
        $ponto->delete();

        return response()->json(['message' => 'Registro removido com sucesso.'], 200);
    }
}
