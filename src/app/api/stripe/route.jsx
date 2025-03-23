import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51P8HdbJUuIKY8I25Gn7SSuXYklcZiEdhDcE5KjhgQDkS7DlmanGsuMhNherSPFXP65DbFDlzeTC4Ff5l8R0VnVQs00xJl8vRw9');

export async function POST(request) {
    console.log();
    try {
        const reqBody = await request.json()
        console.log(reqBody);
        const { paymentMethodId, price } = reqBody
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(price * 100),
            currency: 'cad',
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
        });
        return NextResponse.json({ status: paymentIntent });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}


