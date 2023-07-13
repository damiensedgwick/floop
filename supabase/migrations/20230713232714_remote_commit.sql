
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE FUNCTION "public"."insert_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  -- insert a new row into public.user with the values from the new row in auth.users
  insert into public.user (id, first_name, last_name, phone, email, password, confirmed_at, confirmation_sent_at, recovery_sent_at, remember_me_token, email_change_token, email_change, last_sign_in_at, current_sign_in_at, last_sign_in_ip, current_sign_in_ip, sign_in_count, created_at, updated_at)
  values (new.id, new.first_name, new.last_name, new.phone, new.email, new.password, new.confirmed_at, new.confirmation_sent_at, new.recovery_sent_at, new.remember_me_token, new.email_change_token, new.email_change, new.last_sign_in_at, new.current_sign_in_at, new.last_sign_in_ip, new.current_sign_in_ip, new.sign_in_count, new.created_at, new.updated_at);
  return new;
end;
$$;

ALTER FUNCTION "public"."insert_user"() OWNER TO "postgres";

CREATE FUNCTION "public"."update_submission_count_issue"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  -- Increment the submission_count in the project table where the id is a match
  update project
  set submission_count = submission_count + 1,
  updated_at = current_timestamp
  where id = new.project_id;
  return new;
end;
$$;

ALTER FUNCTION "public"."update_submission_count_issue"() OWNER TO "postgres";

CREATE FUNCTION "public"."update_submission_count_rating"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  -- Increment the submission_count in the project table where the id is a match
  update project
  set submission_count = submission_count + 1,
  updated_at = current_timestamp
  where id = new.project_id;
  return new;
end;
$$;

ALTER FUNCTION "public"."update_submission_count_rating"() OWNER TO "postgres";

CREATE FUNCTION "public"."update_submission_count_suggestion"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  -- Increment the submission_count in the project table where the id is a match
  update project
  set submission_count = submission_count + 1,
  updated_at = current_timestamp
  where id = new.project_id;
  return new;
end;
$$;

ALTER FUNCTION "public"."update_submission_count_suggestion"() OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."insert_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."insert_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_submission_count_issue"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_submission_count_issue"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_submission_count_issue"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_submission_count_rating"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_submission_count_rating"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_submission_count_rating"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_submission_count_suggestion"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_submission_count_suggestion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_submission_count_suggestion"() TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
