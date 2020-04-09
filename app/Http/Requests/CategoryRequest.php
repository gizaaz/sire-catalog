<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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

        $rules = [
            'name' => 'required|min:3|max:255|unique:categories,name',
        ];

        if ($this->route()->named('categories.update')){
            $rules['name'] .= ',' . $this->route()->parameter('category')->id;
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'required' => 'Поле не може бути пустим',
            'min' => 'Поле повинно містити не менше :min символів',
            'max' => 'Поле повинно містити не більше :max символів',
            'name.unique' => 'Така категорія вже існує',
        ];
    }
}
