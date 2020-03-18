<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $primaryKey = 'category_id';

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
