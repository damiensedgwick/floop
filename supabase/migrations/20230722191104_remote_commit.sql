create table "public"."issues" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "title" text not null,
    "details" text,
    "user_email" text not null,
    "project_id" uuid not null
);


alter table "public"."issues" enable row level security;

create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "owner_id" uuid not null,
    "subscription_type" text not null default 'hobby'::text,
    "subscription_expiry" timestamp with time zone,
    "total_submissions" bigint not null default '0'::bigint,
    "name" text not null
);


alter table "public"."projects" enable row level security;

create table "public"."ratings" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "score" smallint not null,
    "details" text,
    "user_email" text not null,
    "project_id" uuid not null
);


alter table "public"."ratings" enable row level security;

create table "public"."suggestions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "title" text not null,
    "details" text,
    "user_email" text not null,
    "project_id" uuid not null
);


alter table "public"."suggestions" enable row level security;

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

create table "public"."users" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "first_name" text,
    "last_name" text,
    "preferred_name" text,
    "project_id" uuid,
    "email" text not null
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX issues_pkey ON public.issues USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX ratings_pkey ON public.ratings USING btree (id);

CREATE UNIQUE INDEX suggestions_pkey ON public.suggestions USING btree (id);

CREATE UNIQUE INDEX team_members_pkey ON public.team_members USING btree (user_id, team_id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."issues" add constraint "issues_pkey" PRIMARY KEY using index "issues_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."ratings" add constraint "ratings_pkey" PRIMARY KEY using index "ratings_pkey";

alter table "public"."suggestions" add constraint "suggestions_pkey" PRIMARY KEY using index "suggestions_pkey";

alter table "public"."team_members" add constraint "team_members_pkey" PRIMARY KEY using index "team_members_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."issues" add constraint "issues_details_check" CHECK ((length(details) < 150)) not valid;

alter table "public"."issues" validate constraint "issues_details_check";

alter table "public"."issues" add constraint "issues_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."issues" validate constraint "issues_project_id_fkey";

alter table "public"."issues" add constraint "issues_title_check" CHECK ((length(title) < 75)) not valid;

alter table "public"."issues" validate constraint "issues_title_check";

alter table "public"."projects" add constraint "projects_name_check" CHECK ((length(name) < 50)) not valid;

alter table "public"."projects" validate constraint "projects_name_check";

alter table "public"."projects" add constraint "projects_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_owner_id_fkey";

alter table "public"."ratings" add constraint "check_score" CHECK (((score >= 1) AND (score <= 10))) not valid;

alter table "public"."ratings" validate constraint "check_score";

alter table "public"."ratings" add constraint "ratings_details_check" CHECK ((length(details) <= 150)) not valid;

alter table "public"."ratings" validate constraint "ratings_details_check";

alter table "public"."ratings" add constraint "ratings_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."ratings" validate constraint "ratings_project_id_fkey";

alter table "public"."suggestions" add constraint "suggestions_details_check" CHECK ((length(details) < 150)) not valid;

alter table "public"."suggestions" validate constraint "suggestions_details_check";

alter table "public"."suggestions" add constraint "suggestions_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."suggestions" validate constraint "suggestions_project_id_fkey";

alter table "public"."suggestions" add constraint "suggestions_title_check" CHECK ((length(title) < 75)) not valid;

alter table "public"."suggestions" validate constraint "suggestions_title_check";

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

CREATE OR REPLACE FUNCTION public.increment_submission_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update public.projects
  set total_submissions = total_submissions + 1
  where id = (select project_id from public.ratings where id = new.id);
  return new;
end;
$function$
;

create policy "Allow read access to issues when user's project_id equals proje"
on "public"."issues"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable insert access for all users"
on "public"."issues"
as permissive
for insert
to public
with check (true);


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


create policy "Allow read access when users have the correct project.id"
on "public"."ratings"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable insert access for all users"
on "public"."ratings"
as permissive
for insert
to public
with check (true);


create policy "Allow read access to suggestions when user's project_id equals "
on "public"."suggestions"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable insert access for all users"
on "public"."suggestions"
as permissive
for insert
to public
with check (true);


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


CREATE TRIGGER increment_submission_count_trigger AFTER INSERT ON public.issues FOR EACH ROW EXECUTE FUNCTION increment_submission_count();

CREATE TRIGGER increment_submission_count_trigger AFTER INSERT ON public.ratings FOR EACH ROW EXECUTE FUNCTION increment_submission_count();

CREATE TRIGGER increment_submission_count_trigger AFTER INSERT ON public.suggestions FOR EACH ROW EXECUTE FUNCTION increment_submission_count();
