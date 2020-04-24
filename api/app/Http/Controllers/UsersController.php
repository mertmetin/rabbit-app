<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    protected function edit(Request $request)
    {
        if (!$request->filled('user'))
            throw new \Exception('Invalid request.');

        $user = $request->input('user');
        $dbUser = User::find($user['id'])->first();

        return $dbUser->update($request->input('user'));
    }
}
