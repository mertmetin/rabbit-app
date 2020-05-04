<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use App\UserActivation;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Aws\Sns\SnsClient;

// use Aws\Exception\AwsException;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'min:11'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:4'],
        ]);
    }

    protected function register(Request $request)
    {
        $input = $request->all();
        $validator = $this->validator($input);

        if ($validator->passes()) {
            $user = $this->create($input); 
            $token = $this->sendActivationCode($user->phone);
            $this->createUserActivation($user->id, $token);

            return $user->id;
        } else {
            throw new \Exception('Invalid request.');
        }
    }

    protected function sendActivationCode($phone)
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
            throw new Exception('Unable to send activation code.');
        }

        return $token;
    }

    protected function resendCode(Request $request)
    {
        if (!$request->filled('user_id', 'phone'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('user_id');
        $phone = $request->input('phone');

        try {
            $user = User::findOrFail($userId);
        } catch (ModelNotFoundException $exception) {
            throw new \Exception('User not found.');
        }

        if ($user->phone != $phone)
            throw new \Exception('Invalid request.');

        $code = $this->sendActivationCode($phone);
        $this->createUserActivation($userId, $code);
    }

    protected function activateUser(Request $request)
    {
        if (!$request->filled('user_id', 'token'))
            throw new \Exception('Invalid request.');

        $input = $request->all();
        $userId = $input['user_id'];
        $token = $input['token'];

        try {
            $user = User::findOrFail($userId);
        } catch (ModelNotFoundException $exception) {
            throw new \Exception('User not found.');
        }

        if ($user->active)
           throw new \Exception('User already activated.');

        $userActivation = UserActivation::
                        where('user_id', $userId)
                        ->orderBy('id')
                        ->get()->last();

        if (!$userActivation)
            throw new \Exception('Invalid request.');

        if ($userActivation->token != $token)
            throw new \Exception('Wrong code entered.');    

        User::where('id', $userId)
            ->update(['active' => 1, 'phone_verified_at' => now()]);
    }

    protected function createUserActivation($userId, $token)
    {
        $userActivation = UserActivation::create([
            'user_id' => $userId,
            'token' => $token
        ]);

        return $userActivation;
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
