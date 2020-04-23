<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = ['name','description','rating','email'];

    protected $table = 'feedbacks';
}
