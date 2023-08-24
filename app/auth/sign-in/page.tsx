"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    router.push("/project/dashboard");
    router.refresh();
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          src="/floop-logo.png"
          width={88}
          height={88}
          alt="Floop logo"
        />
        <h2 className="mt-10 text-2xl font-bold tracking-tight text-center leading-9">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="absolute flex items-center px-4 py-2 text-sm no-underline top-8 left-8 rounded-md text-foreground bg-btn-background group hover:bg-btn-background-hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        {view === "check-email" ? (
          <p className="text-center text-foreground">
            Check <span className="font-bold">{email}</span> to continue signing
            up
          </p>
        ) : (
          <form
            className="flex flex-col justify-center flex-1 w-full gap-2 space-y-6 text-foreground"
            onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-teal-600 hover:text-teal-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {view === "sign-in" && (
              <>
                <Button variant="themed" type="submit">
                  Sign In
                </Button>
                <p className="text-sm text-center">
                  Don&apos;t have an account?
                  <Button
                    size="sm"
                    variant="link"
                    className="underline"
                    onClick={() => setView("sign-up")}
                  >
                    Sign Up Now
                  </Button>
                </p>
              </>
            )}

            {view === "sign-up" && (
              <>
                <Button variant="themed" type="submit">
                  Sign Up
                </Button>
                <p className="text-sm text-center">
                  Already have an account?
                  <Button
                    size="sm"
                    variant="link"
                    className="underline"
                    onClick={() => setView("sign-in")}
                  >
                    Sign In Now
                  </Button>
                </p>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
