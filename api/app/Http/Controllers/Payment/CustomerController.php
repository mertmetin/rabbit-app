<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\StripeCustomer;

class CustomerController extends Controller
{
    protected function get($userId)
    {
        return StripeCustomer::where('user_id', $userId)->get()->last();
    }

    protected function register(Request $request)
    {
        if (!$request->filled('userId'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');

        try {
            $user = User::findOrFail($userId);
        } catch (ModelNotFoundException $exception) {
            throw new \Exception('User not found.');
        }

        $customer = $this->get($userId);

        if ($customer)
            return $customer->customer_id;

        // Set Stripe API key
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $customer = \Stripe\Customer::create([
            'email' => $user->email,
            'phone' => $user->phone
        ]);

        $customerId = $customer->id;

        // Put a copy to the DB
        StripeCustomer::create([
            'user_id' => $userId,
            'customer_id' => $customerId
        ]);

        return $customerId;
    }
}
