<?php

namespace App\Enums;

enum RealStateType: string
{
    case HOUSE = 'house';
    case APARTMENT = 'apartment';
    case LAND = 'land';
    case COMMERCIAL_GROUND = 'commercial_ground';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
