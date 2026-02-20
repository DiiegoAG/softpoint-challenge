<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Http\Requests\Property\StorePropertyRequest;
use App\Http\Requests\Property\UpdatePropertyRequest;

class PropertyController extends Controller
{

    public function index(Request $request)
    {
        $properties = $request->user()->properties()->with('owner:id,name,email')->get();

        return response()->json($properties, 200);
    }

    // FALTA IMPLEMENTAR POLITICA DE AUTORIZACION PARA QUE SOLO EL PROPIETARIO PUEDA VER SUS PROPIEDADES
    public function store(StorePropertyRequest $request)
    {
        $data = $request->validated();
        $property = new Property($data);
        $property->user_id = $request->user()->id;
        $property->save();

        return response()->json([
            'message' => 'Property created successfully',
            'data' => $property->load('owner:id,name,email'),
        ], 201);
    }

    public function show(Property $property)
    {
        $property->load('owner:id,name,email');

        return response()->json($property, 200);
    }

    public function update(UpdatePropertyRequest $request, Property $property)
    {
        $data = $request->validated();
        $property->update($data);

        return response()->json([
            'message' => 'Property updated successfully',
            'data' => $property->load('owner:id,name,email'),
        ], 200);
    }

    public function destroy(Property $property)
    {
        $property->delete();

        return response()->json([
            'message' => 'Property deleted successfully',
        ], 200);
    }

}
