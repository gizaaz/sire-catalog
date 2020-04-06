<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('count')->withTimestamps();
    }


    public function getFullPrice()
    {
        $sum = 0;
        foreach ($this->products as $product) {
            $sum += $product->getPriceForCount();
        }
        return $sum;
    }

    public function saveOrder($user_name, $phone, $email, $descriprion)
    {
        if ($this->status == 0) {
            $this->user_name = $user_name;
            $this->phone = $phone;
            $this->email = $email;
            $this->descriprion = $descriprion;
            session()->forget('orderId');
            return true;
        } else {
            return false;
        }
    }
}
