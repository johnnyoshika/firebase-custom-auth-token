// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../config/firebaseAdmin';

const claimsPayload = (claims: string | undefined) =>
  claims
    ? claims.split(',').reduce((a, b) => {
        const parts = b.split('=');
        if (parts.length !== 2) return a;
        else return { ...a, [parts[0]]: parts[1] };
      }, {})
    : undefined;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string }>,
) {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }

  const {
    body: { uid, claims },
  }: { body: { uid?: string; claims?: string } } = req;

  if (!uid) {
    res.status(400).end();
    return;
  }

  const token = await auth.createCustomToken(
    uid,
    claimsPayload(claims),
  );

  res.status(200).json({ token });
}
