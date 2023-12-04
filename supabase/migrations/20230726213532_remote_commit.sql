alter table "public"."projects" add column "stripe_subscription_id" text;

create policy "Owners can update their own projects."
on "public"."projects"
as permissive
for update
to public
using ((auth.uid() = owner_id));
