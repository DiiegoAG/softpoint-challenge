<?php

namespace App\Http\Controllers\API;

use App\Models\Property;
use App\Enums\RealStateType;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        $allTypes = RealStateType::values();

        $totalProperties = $user->properties()->count();

        $averagePrice = $user->properties()->avg('price');

        $counts = $user->properties()
            ->select('real_state_type', DB::raw('count(*) as total'))
            ->groupBy('real_state_type')
            ->pluck('total', 'real_state_type');

        $groupedByType = collect($allTypes)
            ->mapWithKeys(function ($type) use ($counts) {
                return [$type => $counts[$type] ?? 0];
            });

        $recentProperties = $user->properties()
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'total_properties' => $totalProperties,
            'average_price' => round($averagePrice, 2),
            'properties_by_type' => $groupedByType,
            'recent_properties' => $recentProperties,
        ]);
    }

}
