<?php

use App\Http\Controllers\InvoicePdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\http\Controllers\Api\AuthController;
use App\http\Controllers\Api\FuncionarioController;
use App\http\Controllers\Api\DepartamentoController;
use App\http\Controllers\Api\PontosController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ConfigurarResponsavelController;

// Authentication
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated rule 1
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::get('/user', function (){
        return auth()->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/departamanto_funcionarios', [DepartamentoController::class , 'departamanto_funcionarios']);
    Route::apiResource('/funcionarios', FuncionarioController::class);
    Route::apiResource('/departmentos', DepartamentoController::class);
    Route::apiResource('/pontos', PontosController::class);
    Route::post('/departamento/assign-user', [DepartamentoController::class, 'assignUser'],);
    Route::get('/funcionarios/{id}/ficha-tecnica', [InvoicePdf::class, 'generateFichaTecnica']);

});
