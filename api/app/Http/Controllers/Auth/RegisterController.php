<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Aws\Sns\SnsClient;
use Aws\Credentials\Credentials;

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
            'phone' => ['required', 'numeric', 'min:11'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:4'],
        ]);
    }

    protected function register(Request $request)
    {
        $input = $request->all();
        $validator = $this->validator($input);



        // $s3 = App::make('aws')->createClient('s3');
                        // error_log(json_encode(env('AWS_ACCESS_KEY_ID', '')));


// $sns = AWS::createClient('sns');;

                // error_log(json_encode($sns));


        $SnSclient = new SnsClient([
            'profile' => 'default',
            'region' => 'us-east-1',
            'version' => '2010-03-31'
        ]);

//         $SnSclient = new SnsClient([
//     'version' => '2010-03-31',
//     'region' => 'ca-central-1',
//     'credentials' => new Credentials(
//         '***REMOVED***',
//         '***REMOVED***'
//     )
// ]);

        error_log(json_encode($SnSclient));


//         // $client = SnsClient::factory(array(
// //     'profile' => 'default',
// //     'region'  => 'us-east-1',
// //                 'version' => '2010-03-31'

// // ));

        $message = 'This message is sent from a Amazon SNS code sample.';
        $phone = '+16133278306';

//         // error_log(env('AWS_SECRET_ACCESS_KEY', false));

//         try {
//             error_log(json_encode($SnSclient));

            $result = $SnSclient->publish([
                'Message' => $message,
                'PhoneNumber' => $phone,
            ]);
//                         error_log(json_encode('here'));


//         } catch (AwsException $e) {
//             // output error message if fails
//                         error_log('here');

//             error_log(json_encode($e));
//         } 


        // if ($validator->passes()) {
        //     $user = $this->create($input); 
        //     // $token = Str::random(90);
        //     // UserActivation::create([
        //     //     'user_id' => $user->id,
        //     //     'token' => $token
        //     // ]);
        //     // $user->activationUrl = url("/api/activateUser/$user->id/$token");
            
        //     // Mail::to($user)->send(new UserRegistered($user));
        // }
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
