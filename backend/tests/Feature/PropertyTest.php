<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Property;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PropertyTest extends TestCase
{

    use RefreshDatabase;

    private $apiUrl = '/api/v1/properties';

    public function test_user_can_list_own_properties()
    {
        $user = User::factory()->create();
        Property::factory()->count(3)->create(['user_id' => $user->id]);
        Property::factory()->count(2)->create();

        $response = $this->actingAs($user, 'sanctum')->getJson($this->apiUrl);

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_user_can_create_property()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson($this->apiUrl, [
                'name' => 'Test House',
                'real_state_type' => 'house',
                'street' => 'Main',
                'external_number' => '123',
                'neighborhood' => 'Centro',
                'city' => 'CDMX',
                'country' => 'MX',
                'rooms' => 3,
                'bathrooms' => 2,
                'price' => 1500000,
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('properties', [
            'name' => 'Test House',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_view_own_property()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson("{$this->apiUrl}/{$property->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $property->id,
                     'name' => $property->name,
                 ]);
    }

    public function test_user_can_update_own_property()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("{$this->apiUrl}/{$property->id}", [
                'price' => 2000000,
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('properties', [
            'id' => $property->id,
            'price' => 2000000,
        ]);
    }

    public function test_user_can_delete_own_property()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("{$this->apiUrl}/{$property->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('properties', [
            'id' => $property->id,
        ]);
    }

}
