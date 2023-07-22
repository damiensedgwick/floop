drop trigger if exists "increment_total_submissions_trigger" on "public"."issues";

drop trigger if exists "increment_total_submissions_trigger" on "public"."ratings";

drop trigger if exists "increment_total_submissions_trigger" on "public"."suggestions";

drop function if exists "public"."increment_total_submissions"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_submission_count()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  update public.projects
  set total_submissions = total_submissions + 1
  where id = (select project_id from public.ratings where id = new.id);
  return new;
end;
$function$
;

CREATE TRIGGER increment_submission_count_trigger AFTER INSERT ON public.issues FOR EACH ROW EXECUTE FUNCTION increment_submission_count();

CREATE TRIGGER increment_submission_count_trigger AFTER INSERT ON public.ratings FOR EACH ROW EXECUTE FUNCTION increment_submission_count();

CREATE TRIGGER increment_submission_count_trigger AFTER INSERT ON public.suggestions FOR EACH ROW EXECUTE FUNCTION increment_submission_count();


