// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../config/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    uid: string;
    email?: string;
    emailVerified: boolean;
    claims: any;
  }>,
) {
  const {
    query: { uid },
  }: { query: { uid?: string } } = req;

  if (!uid) {
    res.status(400).end();
    return;
  }

  const user = await auth.getUser(uid);

  res.status(200).json({
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    claims: user.customClaims,
  });
}
