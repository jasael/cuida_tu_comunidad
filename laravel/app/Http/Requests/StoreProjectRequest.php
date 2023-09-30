<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:20',
            'description' => 'required|string|max:500',
            'date' => 'required|date',
            'author' => 'required|string|max:20',
            'state' => 'required|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.required' => 'El título es requerido',
            'title.string' => 'El título debe ser un texto',
            'title.max' => 'El título debe tener como máximo 20 caracteres',
            'description.required' => 'La descripción es requerida',
            'description.string' => 'La descripción debe ser un texto',
            'description.max' => 'La descripción debe tener como máximo 500 caracteres',
            'date.required' => 'La fecha es requerida',
            'date.date' => 'La fecha debe ser una fecha',
            'author.required' => 'El autor es requerido',
            'author.string' => 'El autor debe ser un texto',
            'author.max' => 'El autor debe tener como máximo 20 caracteres',
            'state.required' => 'El estado es requerido',
            'state.string' => 'El estado debe ser un texto',
        ];
    }
}
