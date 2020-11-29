<?php

namespace App\Http\Controllers;

use App\Models\Sum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sums = Sum::orderBy('created_at', 'desc')->get();
        return response()->json($sums, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'summandOne' => ['required', 'numeric'],
            'summandTwo' => ['required', 'numeric'],
        ]);

        if ($validator->fails())
            return response()->json(["message" => $validator->messages()], 400);

        $sum = new Sum;
        $sum->summand_one = $request->summandOne;
        $sum->summand_two = $request->summandTwo;
        $sum->total = ($request->summandOne + $request->summandTwo);
        $result = $sum->save();
        return $result ? response()->json(["message" => "Suma realizada e isertada correctamente."], 200) : response()->json(["message" => "Error, intentelo más tarde."], 400);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sum  $sum
     * @return \Illuminate\Http\Response
     */
    public function show(Sum $sum)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sum  $sum
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sum $sum)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sum  $sum
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sum $sum)
    {
        $result = $sum->delete();
        return $result ? response()->json(["message" => "Suma eliminada correctamente."], 200) : response()->json(["message" => "Error, intentelo más tarde."], 400);
    }
}
