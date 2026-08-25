export default async () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY

  return new Response(
    JSON.stringify({
      functionWorks: true,
      stripeKeyLoaded: Boolean(stripeKey),
      keyPrefix: stripeKey?.slice(0, 7) ?? null,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}