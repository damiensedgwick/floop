set check_function_bodies = off;

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


