<?php

namespace App\Http\Controllers\Store;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Store;

class StoreController extends Controller
{
    protected function getStore(Request $request)
    {
        // if (!$request->filled('address'))
        //     throw new \Exception('Invalid request.');

        $stores = Store::all();

        $output = new Symfony\Component\Console\Output\ConsoleOutput();
        $output->writeln("asd");


        error_log(json_encode('e'));

        // error_log('asd');
        // error_log(json_encode(Store::all()));
        // \Log::info('This is some useful information.');


        return json_encode($stores);
    }
}
