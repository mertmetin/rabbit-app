<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('description');
            $table->string('main_text');
            $table->string('secondary_text');
            $table->string('apt_suite_floor')->nullable();
            $table->string('business_or_building_name')->nullable();
            $table->integer('address_type')->unsigned();
            $table->foreign('address_type')->references('id')->on('address_types');
            $table->string('place_id');
            $table->decimal('lng', 9, 6)->default(0);	
            $table->decimal('lat', 8, 6)->default(0);	
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_addresses');
    }
}
