<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\PasswordReset;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Aws\Sns\SnsClient;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */
    protected function sendPasswordResetCode(Request $request)
    {
        if (!$request->filled('phone'))
            throw new \Exception('Invalid request.');

        $phone = $request->input('phone');

        try {
            $user = User::where('phone', $phone)->firstOrFail();
        } catch (Exception $e) {
            throw new Exception('User not found.');
        }

        $token = $this->sendCode($phone);
        $passwordReset = PasswordReset::create([
            'user_id' => $user->id,
            'token' => $token
        ]);

        return $user->id;
    }
    
    protected function sendCode($phone)
    {
        $token = mt_rand (1000 , 9999);
        $msg = 'Your rabbit code is ' . $token;
        $snsClient = new SnsClient([
            'profile' => 'default',
            'region' => 'us-east-1',
            'version' => '2010-03-31'
        ]);

        try { 
            $result = $snsClient->publish([
                'Message' => $msg,
                'PhoneNumber' => '+1' . $phone,
            ]);
        } catch (Exception $e) {
            throw new Exception('Unable to send a password reset code.');
        }

        return $token;
    }
}
