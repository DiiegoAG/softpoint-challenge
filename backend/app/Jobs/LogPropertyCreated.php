<?php

namespace App\Jobs;

use App\Models\Property;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class LogPropertyCreated implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function __construct(public Property $property)
    {
    }

    public function handle(): void
    {
        Log::info('Property created in background', [
            'property_id' => $this->property->id,
            'name' => $this->property->name,
            'price' => $this->property->price,
        ]);
    }
}
