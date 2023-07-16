drop trigger if exists "increment_total_submissions_trigger" on "public"."issues";

drop trigger if exists "increment_total_submissions_trigger" on "public"."ratings";

drop trigger if exists "increment_total_submissions_trigger" on "public"."suggestions";

alter table "public"."ratings" drop constraint "check_details_length";

alter table "public"."issues" add column "project_id" uuid not null;

alter table "public"."ratings" add column "project_id" uuid not null;

alter table "public"."suggestions" add column "project_id" uuid not null;

alter table "public"."issues" add constraint "issues_details_check" CHECK ((length(details) < 150)) not valid;

alter table "public"."issues" validate constraint "issues_details_check";

alter table "public"."issues" add constraint "issues_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."issues" validate constraint "issues_project_id_fkey";

alter table "public"."issues" add constraint "issues_title_check" CHECK ((length(title) < 75)) not valid;

alter table "public"."issues" validate constraint "issues_title_check";

alter table "public"."ratings" add constraint "ratings_details_check" CHECK ((length(details) <= 150)) not valid;

alter table "public"."ratings" validate constraint "ratings_details_check";

alter table "public"."ratings" add constraint "ratings_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."ratings" validate constraint "ratings_project_id_fkey";

alter table "public"."suggestions" add constraint "suggestions_details_check" CHECK ((length(details) < 150)) not valid;

alter table "public"."suggestions" validate constraint "suggestions_details_check";

alter table "public"."suggestions" add constraint "suggestions_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."suggestions" validate constraint "suggestions_project_id_fkey";

alter table "public"."suggestions" add constraint "suggestions_title_check" CHECK ((length(title) < 75)) not valid;

alter table "public"."suggestions" validate constraint "suggestions_title_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_total_submissions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  -- If the project_id of the new entry in ratings, suggestions or issues matches an id in the projects table
  if exists(select 1 from projects where id = new.project_id) then
    -- Increase the total_submissions by 1
    update projects set total_submissions = total_submissions + 1 where id = new.project_id;
  end if;
  return new;
end;
$function$
;

create policy "Allow read access to issues when user's project_id equals proje"
on "public"."issues"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable insert access for all users"
on "public"."issues"
as permissive
for insert
to public
with check (true);


create policy "Allow read access when users have the correct project.id"
on "public"."ratings"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable insert access for all users"
on "public"."ratings"
as permissive
for insert
to public
with check (true);


create policy "Allow read access to suggestions when user's project_id equals "
on "public"."suggestions"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable insert access for all users"
on "public"."suggestions"
as permissive
for insert
to public
with check (true);


CREATE TRIGGER increment_total_submissions_trigger AFTER INSERT ON public.issues FOR EACH ROW EXECUTE FUNCTION increment_total_submissions();

CREATE TRIGGER increment_total_submissions_trigger AFTER INSERT ON public.ratings FOR EACH ROW EXECUTE FUNCTION increment_total_submissions();

CREATE TRIGGER increment_total_submissions_trigger AFTER INSERT ON public.suggestions FOR EACH ROW EXECUTE FUNCTION increment_total_submissions();


