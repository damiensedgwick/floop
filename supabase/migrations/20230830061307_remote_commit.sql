alter table "public"."users" drop column "metadata";

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


