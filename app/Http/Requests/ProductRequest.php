<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3|max:255',
            'description' => 'required',
            'price' => 'required|numeric|min:1',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Поле не може бути пустим',
            'price.numeric' => 'Ціна не може бути літерами',
            'price.min' => 'Ціна не може бути нульова',
            'name.min' => 'Поле повинно містити не менше :min символів',
            'name.max' => 'Поле повинно містити не більше :max символів',
            'description.min' => 'Поле повинно містити не більше :max символів',
        ];
    }
}
