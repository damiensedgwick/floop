alter table "public"."users" add column "metadata" json;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.users (id, email, created_at, metadata)
  values (new.id, new.email, new.created_at, new.user_metadata);
  return new;
end;
$function$
;


