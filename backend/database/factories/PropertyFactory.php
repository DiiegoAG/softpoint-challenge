<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Property;
use App\Models\User;

class PropertyFactory extends Factory
{

    protected $model = Property::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),

            'name' => $this->faker->words(3, true),

            'real_state_type' => $this->faker->randomElement([
                'house',
                'apartment',
                'land',
                'commercial_ground',
            ]),

            'street' => $this->faker->streetName(),
            'external_number' => (string) $this->faker->numberBetween(1, 999),
            'internal_number' => null,

            'neighborhood' => $this->faker->city(),
            'city' => $this->faker->city(),
            'country' => 'MX',

            'rooms' => $this->faker->numberBetween(0, 5),
            'bathrooms' => 1,
            'price' => $this->faker->numberBetween(100000, 5000000),

            'comments' => null,
        ];
    }

}
