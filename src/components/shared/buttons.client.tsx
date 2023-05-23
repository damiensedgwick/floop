"use client";

import { signIn, signOut } from "next-auth/react";

type Props = {
  text: string;
};

export function GenericButton({ text }: Props) {
  return (
    <button className="w-28 bg-teal-500 px-4 py-2 text-white hover:bg-teal-700">
      {text}
    </button>
  );
}

export function SignInButton() {
  return (
    <button
      className="w-28 bg-teal-500 px-4 py-2 text-white hover:bg-teal-700"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      className="w-28 bg-teal-500 px-4 py-2 text-white hover:bg-teal-700"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
