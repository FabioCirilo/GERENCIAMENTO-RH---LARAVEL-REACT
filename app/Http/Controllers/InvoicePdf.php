<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;

class InvoicePdf extends Controller
{
    public function generateFichaTecnica($id) {
        $funcionario = Funcionario::find($id);

        if(!$funcionario) {
            Log::error("Funcionário não encontrado para ID: $id");
            abort(404, "Funcionario não encontrado");
        }

        //$data = array("name" => "Samuel Mira");
        //$pdf = Pdf::loadView("pdf.invoice", $data)->setPaper("a4", "portrait") -> setOption(["dpi" => "300"]);
        $pdf = Pdf::loadView('pdf.invoice', compact('funcionario'))
                  ->setPaper('a4', 'portrait')
                  ->setOption(['dpi' => '300']);
Log::info($funcionario);
        return $pdf->download("pdf.invoice.pdf");
        //return $pdf -> stream("invoice.pdf");
    }
}
