drop trigger if exists "increment_submission_count_trigger" on "public"."issues";

drop trigger if exists "increment_submission_count_trigger" on "public"."ratings";

drop trigger if exists "increment_submission_count_trigger" on "public"."suggestions";

drop function if exists "public"."increment_submission_count"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_total_submissions()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  raise log 'new = %', new;
  update projects
  set total_submissions = total_submissions + 1
  where id = new.project_id;
  return new;
end;
$function$
;

CREATE TRIGGER update_total_submissions_trigger AFTER INSERT ON public.issues FOR EACH ROW EXECUTE FUNCTION update_total_submissions();

CREATE TRIGGER update_total_submissions_trigger AFTER INSERT ON public.ratings FOR EACH ROW EXECUTE FUNCTION update_total_submissions();

CREATE TRIGGER update_total_submissions_trigger AFTER INSERT ON public.suggestions FOR EACH ROW EXECUTE FUNCTION update_total_submissions();


