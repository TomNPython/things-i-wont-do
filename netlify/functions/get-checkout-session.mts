import Stripe from 'stripe'
import { pledges } from '../../src/data/pledges'

export default async (request: Request) => {
  if (request.method !== 'GET') {
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
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('session_id')

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing session_id' }),
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

    const session =
      await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return new Response(
        JSON.stringify({
          error: 'Payment has not been completed',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const pledgeId = session.metadata?.pledgeId
    const levelId = session.metadata?.levelId

    const pledge = pledges.find(
      (item) => item.id === pledgeId,
    )

    if (!pledge) {
      return new Response(
        JSON.stringify({
          error: 'Pledge associated with this payment was not found',
        }),
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
        JSON.stringify({
          error: 'Pledge level associated with this payment was not found',
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        pledgeId: pledge.id,
        levelId: level.id,
        levelName: level.name,
        certificateTitle: level.certificateTitle,
        amount: session.amount_total,
        currency: session.currency,
        name: session.customer_details?.name ?? null,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error(
      'Get checkout session error:',
      error,
    )

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'Unable to retrieve payment',
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