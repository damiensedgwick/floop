create policy "Enable insert for authenticated users only"
on "public"."project_users"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable select for authenticated users only"
on "public"."project_users"
as permissive
for select
to authenticated
using (true);



