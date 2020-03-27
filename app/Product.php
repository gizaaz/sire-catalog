<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected  $primaryKey = 'product_id';

    protected $fillable = ['name', 'price', 'description', 'currency', 'category_id','images','status'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
