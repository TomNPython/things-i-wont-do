import Stripe from 'stripe'
import { pledges } from '../../src/data/pledges'

export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  try {
    const { pledgeId } = await request.json()

    const pledge = pledges.find(
      (item) => item.id === pledgeId,
    )

    if (!pledge) {
      return new Response(
        JSON.stringify({ error: 'Pledge not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY!,
    )

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: pledge.currency,
            product_data: {
              name: `I won't ${pledge.title.toLowerCase()}`,
              description: pledge.description,
            },
            unit_amount: pledge.amount * 100,
          },
          quantity: 1,
        },
      ],

      success_url:
        `https://thingsiwontdo.netlify.app/pledges/${pledge.id}/success`,

      cancel_url:
        `https://thingsiwontdo.netlify.app/pledges/${pledge.id}`,

      metadata: {
        pledgeId: pledge.id,
      },
    })

    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: session.url,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Stripe checkout error:', error)

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}