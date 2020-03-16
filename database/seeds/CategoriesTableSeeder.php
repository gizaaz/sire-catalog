<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $array = ['Міжкімнатні двері','Вхідні двері','Розсувні двері','Двері прихованого монтажа','Відкид','Фурнітура','Ворота','Ролети','Жалюзі','Плінтус','Підвіконники','Сітки','Відкоси'];
        $categories = [];
        foreach ($array as $value) {
            $categories[] = ['categoty_name' => $value];
        }
        DB::table('categories')->insert($categories);
    }
}
