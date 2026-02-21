<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\RealStateType;

class Property extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'real_state_type',
        'street',
        'external_number',
        'internal_number',
        'neighborhood',
        'city',
        'country',
        'rooms',
        'bathrooms',
        'price',
        'comments',
        'user_id',
    ];

    protected $casts = [
        'rooms' => 'integer',
        'bathrooms' => 'decimal:2',
        'price' => 'decimal:2',
        'real_state_type' => RealStateType::class,
    ];

    protected $appends = ['full_address'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getFullAddressAttribute(): string
    {
        return "{$this->street} {$this->external_number}" .
            ($this->internal_number ? " Int. {$this->internal_number}" : '') .
            ", {$this->neighborhood}, {$this->city}, {$this->country}";
    }

    public function scopeOwnedBy($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

}
