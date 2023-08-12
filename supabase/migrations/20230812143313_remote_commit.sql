alter table "public"."users" add constraint "users_first_name_check" CHECK ((length(first_name) < 50)) not valid;

alter table "public"."users" validate constraint "users_first_name_check";

alter table "public"."users" add constraint "users_last_name_check" CHECK ((length(last_name) < 50)) not valid;

alter table "public"."users" validate constraint "users_last_name_check";

alter table "public"."users" add constraint "users_preferred_name_check" CHECK ((length(preferred_name) < 100)) not valid;

alter table "public"."users" validate constraint "users_preferred_name_check";


