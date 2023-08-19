import { CartProductItem } from "@/typings";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
    typescript: true,
  });

  const data = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card", "p24", "blik"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1N9XI9DTM8d40EgJnuqGPyjR" }],
      shipping_address_collection: {
        allowed_countries: ["PL"],
      },
      line_items: data.map((item: CartProductItem) => {
        const img = item?.mainImage?.asset?._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/chgfofvz/production/"
          )
          .replace("-png", ".png");

        return {
          price_data: {
            currency: "pln",
            product_data: {
              name: item?.title,
              images: [newImage],
            },
            unit_amount: item?.newPrice
              ? item?.newPrice * 100
              : item?.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item?.quantity,
        };
      }),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/canceled`,
    });

    return NextResponse.json(session);
  } catch (err) {
    console.log(err);
    throw new Error("Could not get bought item");
  }
}
