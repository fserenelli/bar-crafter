<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Models\Cart;
use App\Models\CartProduct;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new OrderCollection(Cart::with('user')
            ->with('products')
            ->where('status', 0)
            ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cart = new Cart;
        $cart->user_id = Auth::user()->id;
        $cart->total = $request->total;
        $cart->save();

        $cart_id = $cart->id;
        $products = $request->products;

        $product_order = [];

        foreach ($products as $product) {
            $product_order[] = [
                'cart_id' => $cart_id,
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ];
        }

        CartProduct::insert($product_order);

        return [
            'message' => 'Order confirmed, will be ready in a few minutes'
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        $cart->status = 1;
        $cart->save();

        return [
            'cart' => $cart
        ];
    }
}
