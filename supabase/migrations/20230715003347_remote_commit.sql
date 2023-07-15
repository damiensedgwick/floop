create table "public"."team_members" (
    "user_id" uuid not null,
    "team_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."team_members" enable row level security;

create table "public"."teams" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."teams" enable row level security;

alter table "public"."issues" add column "details" text;

alter table "public"."issues" add column "title" text not null;

alter table "public"."issues" add column "user_email" text not null;

alter table "public"."projects" add column "name" text not null;

alter table "public"."projects" add column "owner_id" uuid not null;

alter table "public"."projects" add column "subscription_expiry" timestamp with time zone;

alter table "public"."projects" add column "subscription_type" text not null default 'hobby'::text;

alter table "public"."projects" add column "total_submissions" bigint not null default '0'::bigint;

alter table "public"."ratings" add column "details" text;

alter table "public"."ratings" add column "score" smallint not null;

alter table "public"."ratings" add column "user_email" text not null;

alter table "public"."suggestions" add column "details" text;

alter table "public"."suggestions" add column "title" text not null;

alter table "public"."suggestions" add column "user_email" text not null;

alter table "public"."users" add column "email" text not null;

alter table "public"."users" add column "first_name" text;

alter table "public"."users" add column "last_name" text;

alter table "public"."users" add column "preferred_name" text;

alter table "public"."users" add column "project_id" uuid;

alter table "public"."users" alter column "id" drop default;

CREATE UNIQUE INDEX team_members_pkey ON public.team_members USING btree (user_id, team_id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (id);

alter table "public"."team_members" add constraint "team_members_pkey" PRIMARY KEY using index "team_members_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."projects" add constraint "projects_name_check" CHECK ((length(name) < 50)) not valid;

alter table "public"."projects" validate constraint "projects_name_check";

alter table "public"."projects" add constraint "projects_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_owner_id_fkey";

alter table "public"."ratings" add constraint "check_details_length" CHECK ((length(details) <= 140)) not valid;

alter table "public"."ratings" validate constraint "check_details_length";

alter table "public"."ratings" add constraint "check_score" CHECK (((score >= 1) AND (score <= 10))) not valid;

alter table "public"."ratings" validate constraint "check_score";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_project_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.users (id, email, created_at)
  values (new.id, new.email, new.created_at);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_total_submissions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  update project
  set total_submissions = total_submissions + 1
  where id = new.id;
  return new;
end;
$function$
;

create policy "Enable insert for authenticated users only"
on "public"."projects"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable select for authenticated users only"
on "public"."projects"
as permissive
for select
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."users"
as permissive
for insert
to public
with check (true);


create policy "Enable select for authenticated users only"
on "public"."users"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on email"
on "public"."users"
as permissive
for update
to public
using (((auth.jwt() ->> 'email'::text) = email))
with check (((auth.jwt() ->> 'email'::text) = email));


CREATE TRIGGER increment_total_submissions_trigger AFTER INSERT ON public.issues FOR EACH STATEMENT EXECUTE FUNCTION increment_total_submissions();

CREATE TRIGGER increment_total_submissions_trigger AFTER INSERT ON public.ratings FOR EACH STATEMENT EXECUTE FUNCTION increment_total_submissions();

CREATE TRIGGER increment_total_submissions_trigger AFTER INSERT ON public.suggestions FOR EACH STATEMENT EXECUTE FUNCTION increment_total_submissions();


