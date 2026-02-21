<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{

    use RefreshDatabase;

    private $apiUrl = '/api/auth';

    public function test_user_can_register()
    {
        $response = $this->postJson("{$this->apiUrl}/register", [
            'name' => 'John',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['token']);
    }

    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson("{$this->apiUrl}/login", [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }

    public function test_user_can_logout()
    {
        $user = User::factory()->create();

        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->postJson("{$this->apiUrl}/logout");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Logged out successfully']);
    }

    public function test_user_can_get_profile()
    {
        $user = User::factory()->create();

        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->getJson("{$this->apiUrl}/me");

        $response->assertStatus(200)
                 ->assertJson([
                     'name' => $user->name,
                     'email' => $user->email,
                 ]);
    }

    public function test_guest_cannot_access_protected_route()
    {
        $response = $this->getJson('/api/v1/properties');

        $response->assertStatus(401);
    }

}
