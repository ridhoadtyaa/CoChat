import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const secret = process.env.NEXT_PUBLIC_SECRET_JWT;

export const middleware = async (req) => {
  const { token } = req.cookies;
  const url = req.nextUrl.clone();

  url.pathname = '/admin';

  if (!token) {
    return NextResponse.redirect(url);
  }

  try {
    verify(token, secret);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(url);
  }
};
