import getUserIdFromToken from "@/lib/getUserId";
import connectMongo from "@/lib/mongodb";
import Cart from "@/modals/Cart";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
      await connectMongo();

      const token = request.cookies.get('token')?.value;
      if(!token){
        return NextResponse.json({message:'Token missing'},{ status: 401 })
      }

      const userId = getUserIdFromToken(token);

      if(!mongoose.Types.ObjectId.isValid(userId)){
        return NextResponse.json({message: 'Invalid user ID'},{ status: 400 })
      }

      const cart = await Cart.findOne({userId})

      if (!cart) {
        return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
      }
  
      return NextResponse.json({items: cart.items});
    }catch(error){
        return NextResponse.json({message: 'Intrnal Server Error'},{ status: 500 })
    }
}