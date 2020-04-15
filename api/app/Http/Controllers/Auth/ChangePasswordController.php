<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class ChangePasswordController extends Controller
{
    protected function changePassword(Request $request)
    {
        if (!$request->filled('userId', 'oldPassword', 'password'))
            throw new \Exception('Invalid request.');

        $userId = $request->input('userId');
        $oldPassword = $request->input('oldPassword');
        $password = $request->input('password');

        try {
            $user = User::findOrFail($userId);
        } catch (ModelNotFoundException $exception) {
            throw new \Exception('User not found.');
        }

        if (!Hash::check($oldPassword, $user->password))
            throw new \Exception('Wrong password.');

        $result = User::where('id', $userId)
            ->update(['password' => Hash::make($password)]);

        return $result;
    }
}
