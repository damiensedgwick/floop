drop policy "Allow read access to issues when user's project_id equals proje" on "public"."issues";

drop policy "Enable select for authenticated users only" on "public"."projects";

drop policy "Allow read access when users have the correct project.id" on "public"."ratings";

drop policy "Allow read access to suggestions when user's project_id equals " on "public"."suggestions";

alter table "public"."projects" drop column "subscription_expiry";

alter table "public"."projects" drop column "subscription_type";

create policy "Enable select for authenticated users only"
on "public"."issues"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable read access for all users"
on "public"."projects"
as permissive
for select
to public
using (true);


create policy "Enable select for authenticated users only"
on "public"."ratings"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));


create policy "Enable select for authenticated users only"
on "public"."suggestions"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN projects p ON ((u.project_id = p.id)))
  WHERE (p.id = u.project_id))));
