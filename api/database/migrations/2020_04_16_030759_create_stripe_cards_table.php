<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStripeCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stripe_cards', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->string('customer_id')->unassigned();
            $table->foreign('customer_id')->references('customer_id')
                ->on('stripe_customers')->onDelete('cascade');
            $table->string('fingerprint');
            $table->string('last4');
            $table->string('exp_month');
            $table->string('exp_year');
            $table->string('brand');
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
        Schema::dropIfExists('stripe_cards');
    }
}
