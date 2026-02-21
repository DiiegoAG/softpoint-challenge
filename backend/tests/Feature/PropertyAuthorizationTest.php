<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Property;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PropertyAuthorizationTest extends TestCase
{

    use RefreshDatabase;

    private $apiUrl = '/api/v1/properties';

    public function test_user_cannot_view_other_users_property()
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $property = Property::factory()->create([
            'user_id' => $owner->id,
        ]);

        $response = $this->actingAs($intruder, 'sanctum')
            ->getJson("{$this->apiUrl}/{$property->id}");

        $response->assertStatus(403);
    }

    public function test_user_cannot_update_other_users_property()
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $property = Property::factory()->create([
            'user_id' => $owner->id,
        ]);

        $response = $this->actingAs($intruder, 'sanctum')
            ->putJson("{$this->apiUrl}/{$property->id}", [
                'price' => 999999,
            ]);

        $response->assertStatus(403);
    }

    public function test_user_cannot_delete_other_users_property()
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $property = Property::factory()->create([
            'user_id' => $owner->id,
        ]);

        $response = $this->actingAs($intruder, 'sanctum')
            ->deleteJson("{$this->apiUrl}/{$property->id}");

        $response->assertStatus(403);
    }

}
