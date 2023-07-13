alter table "public"."test" drop constraint "test_pkey";

drop index if exists "public"."test_pkey";

drop table "public"."test";

create table "public"."project_user" (
    "project_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."project_user" enable row level security;

alter table "public"."user" enable row level security;

CREATE UNIQUE INDEX project_user_pkey ON public.project_user USING btree (project_id, user_id);

alter table "public"."project_user" add constraint "project_user_pkey" PRIMARY KEY using index "project_user_pkey";

alter table "public"."project_user" add constraint "project_user_project_id_fkey" FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE not valid;

alter table "public"."project_user" validate constraint "project_user_project_id_fkey";

alter table "public"."project_user" add constraint "project_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE not valid;

alter table "public"."project_user" validate constraint "project_user_user_id_fkey";


