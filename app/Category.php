<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'images', 'category_id'];

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function childrenCategories()
    {
        return $this->hasMany(Category::class)->with('categories');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function children($parent)
    {
        $array = Category::where('category_id', $parent)->get();
        if (isset($array[0])) {
            return $array;
        }
        return null;
    }
}
