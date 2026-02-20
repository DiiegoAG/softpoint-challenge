<?php

namespace App\Http\Requests\Property;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Enums\RealStateType;

class StorePropertyRequest extends FormRequest
{

    public function rules()
    {
        return [

            'name' => [
                'required',
                'string',
                'min:1',
                'max:128',
            ],

            'real_state_type' => [
                'required',
                Rule::in(RealStateType::values()),
            ],

            'street' => [
                'required',
                'string',
                'min:1',
                'max:128',
            ],

            'external_number' => [
                'required',
                'string',
                'max:12',
                'regex:/^[A-Za-z0-9\-]+$/',
            ],

            'internal_number' => [
                'nullable',
                'required_if:real_state_type,' . RealStateType::APARTMENT->value . ',' . RealStateType::COMMERCIAL_GROUND->value,
                'regex:/^[A-Za-z0-9\-\s]+$/',
                'max:32',
            ],

            'neighborhood' => [
                'required',
                'string',
                'min:1',
                'max:128',
            ],

            'city' => [
                'required',
                'string',
                'min:1',
                'max:64',
            ],

            'country' => [
                'required',
                'string',
                'size:2', // ISO 3166 Alpha-2
                'regex:/^[A-Z]{2}$/',
            ],

            'rooms' => [
                'required',
                'integer',
                'min:0',
            ],

            'bathrooms' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) {
                    $type = $this->input('real_state_type');

                    if (in_array($type, [RealStateType::LAND->value, RealStateType::COMMERCIAL_GROUND->value])) {
                        if ($value < 0) {
                            $fail('Bathrooms must be greater than or equal to 0 for land or commercial ground.');
                        }
                    } else {
                        if ($value < 1) {
                            $fail('Bathrooms must be at least 1 for houses or apartments.');
                        }
                    }
                },
            ],

            'price' => [
                'required',
                'numeric',
                'gt:0',
            ],

            'comments' => [
                'nullable',
                'string',
                'max:128',
            ],
        ];
    }

    public function messages()
    {
        return [
            'external_number.regex' => 'External number may only contain letters, numbers and dash (-).',
            'internal_number.regex' => 'Internal number may only contain letters, numbers, dash (-) and spaces.',
            'country.regex' => 'Country must follow ISO 3166 Alpha-2 format (e.g. US, MX, ES).',
        ];
    }

    public function authorize()
    {
        return true;
    }

}
