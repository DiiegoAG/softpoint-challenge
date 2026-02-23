<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Enums\RealStateType;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $properties = [

            [
                'name' => 'Family House',
                'real_state_type' => RealStateType::HOUSE->value,
                'street' => 'Main Street',
                'external_number' => '123A',
                'internal_number' => null,
                'neighborhood' => 'Downtown',
                'city' => 'Monterrey',
                'country' => 'MX',
                'rooms' => 3,
                'bathrooms' => 2,
                'price' => 2500000,
                'comments' => 'Beautiful family home',
                'user_id' => 1,
            ],

            [
                'name' => 'Modern Apartment',
                'real_state_type' => RealStateType::APARTMENT->value,
                'street' => 'Skyline Ave',
                'external_number' => '456',
                'internal_number' => '12B',
                'neighborhood' => 'Financial District',
                'city' => 'CDMX',
                'country' => 'MX',
                'rooms' => 2,
                'bathrooms' => 1,
                'price' => 3200000,
                'comments' => 'Great city view',
                'user_id' => 1,
            ],

            [
                'name' => 'Vacant Land',
                'real_state_type' => RealStateType::LAND->value,
                'street' => 'Rural Road',
                'external_number' => '789',
                'internal_number' => null,
                'neighborhood' => 'Countryside',
                'city' => 'Querétaro',
                'country' => 'MX',
                'rooms' => 0,
                'bathrooms' => 0,
                'price' => 1500000,
                'comments' => 'Ideal for development',
                'user_id' => 1,
            ],

            [
                'name' => 'Commercial Ground',
                'real_state_type' => RealStateType::COMMERCIAL_GROUND->value,
                'street' => 'Business Ave',
                'external_number' => '890',
                'internal_number' => 'Suite 10',
                'neighborhood' => 'Industrial Park',
                'city' => 'Tijuana',
                'country' => 'MX',
                'rooms' => 5,
                'bathrooms' => 2,
                'price' => 7800000,
                'comments' => 'Office space opportunity',
                'user_id' => 1,
            ],

            [
                'name' => 'Luxury House',
                'real_state_type' => RealStateType::HOUSE->value,
                'street' => 'Palm Drive',
                'external_number' => '555',
                'internal_number' => null,
                'neighborhood' => 'Exclusive Zone',
                'city' => 'Guadalajara',
                'country' => 'MX',
                'rooms' => 4,
                'bathrooms' => 3,
                'price' => 9800000,
                'comments' => 'Premium location',
                'user_id' => 1,
            ],
        ];

        foreach ($properties as $property) {
            Property::create($property);
        }
    }
}
