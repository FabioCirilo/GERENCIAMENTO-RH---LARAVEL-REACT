<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Departamento;
use App\Http\Resources\DepartamentoResource;
use App\Http\Requests\DepartamentoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartamentoController extends Controller
{
    public function index()
    {
        return DepartamentoResource::collection(Departamento::all());
    }

    public function departamanto_funcionarios()
    {
        $data =Departamento::with('funcionarios')->get();
        $det_names=[];
        $det_total_func=[];
        
        foreach ($data as $dep) {
            if ($dep->funcionarios->count()) {
                $det_names[] = $dep->name;
                $det_total_func[] = $dep->funcionarios->count();
            }
        }
        return response()->json(array('det_names' => $det_names, 'det_total_func' => $det_total_func), 200);
    }


    public function assignUser(Request $request){

        $funcioID = $request->input('funcionario_id');
        $departID = $request->input('departamento_id');

       try {
        if (!$funcioID && !$departID) {
            return response()->json(["success" => false, "message" => "Dados nao processaveis"], 422);
        }
        DB::table('departamento_responsavels')->insert([
            'id_funcionario' => $funcioID,
            'id_departamento' => $departID,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        return response()->json(["success" => true, "message" => "Funcionari assignado ao departamento"], 200);
       } catch (\Exception $e) {
        return response()->json(["success" => false, "message" => "Erro a assignar funcionario ao departamento"], 500);
       }
    }

    public function store(DepartamentoRequest $request)
    {
         $dados = $request->validated();

         Departamento::create($dados);

         return response([
            "mensagem" => "Criado",
         ], 201);

    }


    public function show($id)
    {
         return new DepartamentoResource(Departamento::where('id',$id)->first());
    }


    public function update(DepartamentoRequest $request, string $id)
    {
         $dados = $request->validated();
         $departamento = Departamento::find($id);
         $departamento->update($dados);
         return response([
            "mensagem" => "updated",
         ], 200);
    }


    public function destroy(string $id)
    {
        //
    }
}
