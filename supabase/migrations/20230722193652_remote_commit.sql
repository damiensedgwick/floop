alter table "public"."team_members" drop constraint "team_members_pkey";

alter table "public"."teams" drop constraint "teams_pkey";

drop index if exists "public"."team_members_pkey";

drop index if exists "public"."teams_pkey";

drop table "public"."team_members";

drop table "public"."teams";


