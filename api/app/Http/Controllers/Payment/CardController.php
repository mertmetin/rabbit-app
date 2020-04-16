<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\StripeCard;

class CardController extends Controller
{
    protected function add(Request $request)
    {
        if (!$request->filled('customerId', 'number'))
            throw new \Exception('Invalid request.');

        $customerId = $request->input('customerId');
        $number = $request->input('number');

        // Set Stripe API key.
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $token = \Stripe\Token::create([
            'card' => [
                'number' => $number,
                'exp_month' => 01,
                'exp_year' => 2023,
                'cvc' => '264',
            ],
        ]);

        $cardToken = \Stripe\Token::retrieve($token->id);
        $cardFingerPrint = $cardToken->card->fingerprint;
        $card = StripeCard::where('fingerprint', $cardFingerPrint)->get()->last();

        if (!empty($card))
            throw new \Exception('This card is already in your wallet.');

         $card = \Stripe\Customer::createSource($customerId, [
            'source' => $token,
        ]);

        StripeCard::create([
            'id' => $card->id,
            'customer_id' => $customerId,
            'fingerprint' => $card->fingerprint,
            'last4' => $card->last4,
            'exp_month' => $card->exp_month,
            'exp_year' => $card->exp_year,
            'brand' => $card->brand,
        ]);

        return $card->id;
    }
}
