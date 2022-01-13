# firebase-custom-auth-token

[Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Test Firebase custom auth behaviour:

https://firebase.google.com/docs/auth/admin/create-custom-tokens
https://firebase.google.com/docs/auth/web/custom-auth

## Getting Started

Download service account key from [Firebase console](https://console.firebase.google.com/) -> Project settings -> Service accounts and save it in root of this project as `serviceAccount.json`.

```bash
cp .env.sample .env.local
```

Populate .env.local with Firebase client SDK config from [Firebase console](https://console.firebase.google.com/) -> Project settings -> General -> Web apps.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Observations

- `auth.createCustomToken()` will create a new auth user if user with uid doesn't exist
- `developerClaims` passed to `auth.createCustomToken()` will merge with the persisted user claims before the client ID Token is constructed, but they will not affect the persisted user claims
- Every time the user token is refreshed, it will once again merge `developerClaims` with the latest persisted user claims
