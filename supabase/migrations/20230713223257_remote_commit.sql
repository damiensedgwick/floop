drop policy "Enable insert for authenticated users only" on "public"."project_users";

drop policy "Enable select for authenticated users only" on "public"."project_users";

drop policy "Enable insert for authenticated users only" on "public"."user";

drop policy "Enable read access for all users" on "public"."user";

drop policy "Enable update for users based on email" on "public"."user";

alter table "public"."project_users" drop constraint "project_users_project_id_fkey";

drop function if exists "public"."handle_new_user"();

alter table "public"."project_users" drop constraint "project_users_pkey";

drop index if exists "public"."project_users_pkey";

drop table "public"."project_users";

create table "public"."test" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."test" enable row level security;

alter table "public"."user" add column "confirmation_sent_at" timestamp with time zone;

alter table "public"."user" add column "confirmed_at" timestamp with time zone;

alter table "public"."user" add column "current_sign_in_at" timestamp with time zone;

alter table "public"."user" add column "current_sign_in_ip" inet;

alter table "public"."user" add column "email_change" text;

alter table "public"."user" add column "email_change_token" text;

alter table "public"."user" add column "last_sign_in_at" timestamp with time zone;

alter table "public"."user" add column "last_sign_in_ip" inet;

alter table "public"."user" add column "password" text not null;

alter table "public"."user" add column "recovery_sent_at" timestamp with time zone;

alter table "public"."user" add column "remember_me_token" text;

alter table "public"."user" add column "sign_in_count" integer;

alter table "public"."user" alter column "created_at" drop default;

alter table "public"."user" alter column "created_at" set not null;

alter table "public"."user" alter column "email" drop default;

alter table "public"."user" alter column "phone" drop default;

alter table "public"."user" alter column "phone" drop not null;

alter table "public"."user" alter column "updated_at" set not null;

alter table "public"."user" disable row level security;

CREATE UNIQUE INDEX test_pkey ON public.test USING btree (id);

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);

CREATE UNIQUE INDEX user_phone_key ON public."user" USING btree (phone);

alter table "public"."test" add constraint "test_pkey" PRIMARY KEY using index "test_pkey";

alter table "public"."user" add constraint "user_email_key" UNIQUE using index "user_email_key";

alter table "public"."user" add constraint "user_phone_key" UNIQUE using index "user_phone_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  -- insert a new row into public.user with the values from the new row in auth.users
  insert into public.user (id, first_name, last_name, phone, email, password, confirmed_at, confirmation_sent_at, recovery_sent_at, remember_me_token, email_change_token, email_change, last_sign_in_at, current_sign_in_at, last_sign_in_ip, current_sign_in_ip, sign_in_count, created_at, updated_at)
  values (new.id, new.first_name, new.last_name, new.phone, new.email, new.password, new.confirmed_at, new.confirmation_sent_at, new.recovery_sent_at, new.remember_me_token, new.email_change_token, new.email_change, new.last_sign_in_at, new.current_sign_in_at, new.last_sign_in_ip, new.current_sign_in_ip, new.sign_in_count, new.created_at, new.updated_at);
  return new;
end;
$function$
;

