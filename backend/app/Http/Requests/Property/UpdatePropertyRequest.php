<?php

namespace App\Http\Requests\Property;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Enums\RealStateType;

class UpdatePropertyRequest extends FormRequest
{

    public function rules(): array
    {
        return [

            'name' => [
                'sometimes',
                'string',
                'min:1',
                'max:128',
            ],

            'real_state_type' => [
                'sometimes',
                Rule::in(RealStateType::values()),
            ],

            'street' => [
                'sometimes',
                'string',
                'min:1',
                'max:128',
            ],

            'external_number' => [
                'sometimes',
                'string',
                'max:12',
                'regex:/^[A-Za-z0-9\-]+$/',
            ],

            'internal_number' => [
                'nullable',
                'regex:/^[A-Za-z0-9\-\s]+$/',
                'max:32',
            ],

            'neighborhood' => [
                'sometimes',
                'string',
                'min:1',
                'max:128',
            ],

            'city' => [
                'sometimes',
                'string',
                'min:1',
                'max:64',
            ],

            'country' => [
                'sometimes',
                'string',
                'size:2',
                'regex:/^[A-Z]{2}$/',
            ],

            'rooms' => [
                'sometimes',
                'integer',
                'min:0',
            ],

            'bathrooms' => [
                'sometimes',
                'numeric',
            ],

            'price' => [
                'sometimes',
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

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            $property = $this->route('property');

            if (!$property instanceof \App\Models\Property) {
                return;
            }

            // Get the real_state_type from the request or fallback to the existing property value
            $type = $this->input('real_state_type') ?? $property->real_state_type;

            // Validation for bathrooms
            if ($this->has('bathrooms')) {

                $bathrooms = $this->input('bathrooms');

                if (in_array($type, [RealStateType::LAND->value, RealStateType::COMMERCIAL_GROUND->value])) {
                    if ($bathrooms < 0) {
                        $validator->errors()->add(
                            'bathrooms',
                            'Bathrooms must be greater than or equal to 0 for land or commercial ground.'
                        );
                    }
                } else {
                    if ($bathrooms < 1) {
                        $validator->errors()->add(
                            'bathrooms',
                            'Bathrooms must be at least 1 for houses or apartments.'
                        );
                    }
                }
            }

            // Conditional validation for internal_number
            if (in_array($type, [RealStateType::APARTMENT->value, RealStateType::COMMERCIAL_GROUND->value])) {

                $internal = $this->has('internal_number')
                    ? $this->input('internal_number')
                    : $property->internal_number;

                if (!$internal || trim($internal) === '') {
                    $validator->errors()->add(
                        'internal_number',
                        'Internal number is required for apartments and commercial ground.'
                    );
                }
            }
        });
    }


    public function messages(): array
    {
        return [
            'external_number.regex' => 'External number may only contain letters, numbers and dash (-).',
            'internal_number.regex' => 'Internal number may only contain letters, numbers, dash (-) and spaces.',
            'country.regex' => 'Country must follow ISO 3166 Alpha-2 format (e.g. US, MX, ES).',
        ];
    }

}
