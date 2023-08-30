create table "public"."project_users" (
    "project_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."project_users" enable row level security;

CREATE UNIQUE INDEX project_users_pkey ON public.project_users USING btree (project_id, user_id);

alter table "public"."project_users" add constraint "project_users_pkey" PRIMARY KEY using index "project_users_pkey";

alter table "public"."project_users" add constraint "project_users_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."project_users" validate constraint "project_users_project_id_fkey";

alter table "public"."project_users" add constraint "project_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."project_users" validate constraint "project_users_user_id_fkey";


