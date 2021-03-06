<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $array = ['Міжкімнатні двері','Вхідні двері','Розсувні двері','Двері прихованого монтажа','Вікна','Фурнітура','Ворота','Ролети','Жалюзі','Плінтус','Підвіконники','Сітки','Відкоси'];
        $categories = [];
        foreach ($array as $value) {
            $categories[] = ['name' => $value];
        }
        DB::table('categories')->insert($categories);
    }
}
