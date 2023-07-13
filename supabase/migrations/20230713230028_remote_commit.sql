alter table "public"."project_user" drop constraint "project_user_project_id_fkey";

alter table "public"."project_user" drop constraint "project_user_user_id_fkey";

alter table "public"."project_user" drop constraint "project_user_pkey";

drop index if exists "public"."project_user_pkey";

drop table "public"."project_user";

create table "public"."project_users" (
    "project_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."project_users" enable row level security;

CREATE UNIQUE INDEX project_user_pkey ON public.project_users USING btree (project_id, user_id);

alter table "public"."project_users" add constraint "project_user_pkey" PRIMARY KEY using index "project_user_pkey";

alter table "public"."project_users" add constraint "project_users_project_id_fkey" FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE not valid;

alter table "public"."project_users" validate constraint "project_users_project_id_fkey";

alter table "public"."project_users" add constraint "project_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE not valid;

alter table "public"."project_users" validate constraint "project_users_user_id_fkey";


