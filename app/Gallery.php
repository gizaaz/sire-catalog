<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = ['name', 'description'];

    public function galleryImages(){
        return $this->hasMany(GalleryImage::class);
    }

}
