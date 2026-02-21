<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {

            $table->id();
            $table->string('name', 128);
            $table->enum('real_state_type', [
                'house',
                'apartment',
                'land',
                'commercial_ground'
            ]);
            $table->string('street', 128);
            $table->string('external_number', 12);
            $table->string('internal_number', 32)->nullable();
            $table->string('neighborhood', 128);
            $table->string('city', 64);
            $table->string('country', 2);
            $table->integer('rooms')->unsigned();
            $table->decimal('bathrooms', 5, 2);
            $table->decimal('price', 15, 2);
            $table->string('comments', 128)->nullable();

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }

};
