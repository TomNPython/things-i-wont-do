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
    const { pledgeId, levelId } = await request.json()

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

    const level = pledge.levels.find(
      (item) => item.id === levelId,
    )

    if (!level) {
      return new Response(
        JSON.stringify({ error: 'Pledge level not found' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY!,
    )

    const origin =
      request.headers.get('origin') ||
      'https://thingsiwontdo.netlify.app'

    const successUrl =
      `${origin}/pledges/${pledge.id}/success?session_id={CHECKOUT_SESSION_ID}`

    const cancelUrl =
      `${origin}/pledges/${pledge.id}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: pledge.currency,

            product_data: {
              name: level.certificateTitle,
              description: `${level.name}: ${level.description}`,
            },

            unit_amount: level.amount * 100,
          },

          quantity: 1,
        },
      ],

      billing_address_collection: 'auto',

      locale: 'auto',

      success_url:
        successUrl,

      cancel_url:
        cancelUrl,

      metadata: {
        pledgeId: pledge.id,
        levelId: level.id,
        levelName: level.name,
        certificateTitle: level.certificateTitle,
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