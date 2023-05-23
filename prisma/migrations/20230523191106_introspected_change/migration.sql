-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "next_auth";

-- CreateTable
CREATE TABLE "next_auth"."accounts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" BIGINT,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,
    "userId" UUID,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "next_auth"."sessions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "expires" TIMESTAMPTZ(6) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" UUID,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "next_auth"."users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMPTZ(6),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "next_auth"."verification_tokens" (
    "identifier" TEXT,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "public"."organisation_users" (
    "organisation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "organisation_users_pkey" PRIMARY KEY ("organisation_id","user_id")
);

-- CreateTable
CREATE TABLE "public"."organisations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_unique" ON "next_auth"."accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessiontoken_unique" ON "next_auth"."sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "email_unique" ON "next_auth"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "token_identifier_unique" ON "next_auth"."verification_tokens"("token", "identifier");

-- AddForeignKey
ALTER TABLE "next_auth"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "next_auth"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."organisation_users" ADD CONSTRAINT "organisation_users_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."organisation_users" ADD CONSTRAINT "organisation_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."organisations" ADD CONSTRAINT "organisations_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
