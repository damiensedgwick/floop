
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

CREATE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.users (id)
  values (new.id);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

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

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."issue" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "message" "text" DEFAULT '---'::"text",
    "user_email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "project_id" "uuid" NOT NULL
);

ALTER TABLE "public"."issue" OWNER TO "postgres";

CREATE TABLE "public"."project" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "name" "text" NOT NULL,
    "subscription_type" "text" DEFAULT 'hobby'::"text" NOT NULL,
    "subscription_expiry" timestamp with time zone,
    "submission_count" bigint DEFAULT '0'::bigint NOT NULL,
    CONSTRAINT "project_name_check" CHECK (("length"("name") < 255))
);

ALTER TABLE "public"."project" OWNER TO "postgres";

CREATE TABLE "public"."project_users" (
    "project_id" "uuid" NOT NULL,
    "user_id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."project_users" OWNER TO "postgres";

CREATE TABLE "public"."rating" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "rating" bigint NOT NULL,
    "message" "text" DEFAULT '---'::"text",
    "user_email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "project_id" "uuid" NOT NULL,
    CONSTRAINT "rating_rating_check" CHECK ((("rating" IS NOT NULL) AND ("rating" >= 1) AND ("rating" <= 5)))
);

ALTER TABLE "public"."rating" OWNER TO "postgres";

CREATE TABLE "public"."suggestion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "message" "text" DEFAULT '---'::"text",
    "user_email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "project_id" "uuid" NOT NULL
);

ALTER TABLE "public"."suggestion" OWNER TO "postgres";

CREATE TABLE "public"."user" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "first_name" "text",
    "last_name" "text",
    "updated_at" timestamp with time zone,
    "email" "text" DEFAULT ''::"text" NOT NULL,
    "phone" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."user" OWNER TO "postgres";

ALTER TABLE ONLY "public"."issue"
    ADD CONSTRAINT "issue_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project"
    ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_users"
    ADD CONSTRAINT "project_users_pkey" PRIMARY KEY ("project_id");

ALTER TABLE ONLY "public"."rating"
    ADD CONSTRAINT "rating_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."suggestion"
    ADD CONSTRAINT "suggestion_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

CREATE TRIGGER "update_submission_count_trigger_issue" AFTER INSERT ON "public"."issue" FOR EACH ROW EXECUTE FUNCTION "public"."update_submission_count_issue"();

CREATE TRIGGER "update_submission_count_trigger_rating" AFTER INSERT ON "public"."rating" FOR EACH ROW EXECUTE FUNCTION "public"."update_submission_count_rating"();

CREATE TRIGGER "update_submission_count_trigger_suggestion" AFTER INSERT ON "public"."suggestion" FOR EACH ROW EXECUTE FUNCTION "public"."update_submission_count_suggestion"();

ALTER TABLE ONLY "public"."project_users"
    ADD CONSTRAINT "project_users_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable delete for authenticated users only" ON "public"."project" FOR DELETE TO "authenticated" USING (true);

CREATE POLICY "Enable insert access for all users" ON "public"."issue" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert access for all users" ON "public"."rating" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert access for all users" ON "public"."suggestion" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."project" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."project_users" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."user" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."user" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."issue" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."project" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."project_users" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."rating" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."suggestion" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable update for users based on email" ON "public"."user" FOR UPDATE USING ((("auth"."jwt"() ->> 'email'::"text") = "email")) WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = "email"));

ALTER TABLE "public"."issue" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."project" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."project_users" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."rating" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."suggestion" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_submission_count_issue"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_submission_count_issue"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_submission_count_issue"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_submission_count_rating"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_submission_count_rating"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_submission_count_rating"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_submission_count_suggestion"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_submission_count_suggestion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_submission_count_suggestion"() TO "service_role";

GRANT ALL ON TABLE "public"."issue" TO "anon";
GRANT ALL ON TABLE "public"."issue" TO "authenticated";
GRANT ALL ON TABLE "public"."issue" TO "service_role";

GRANT ALL ON TABLE "public"."project" TO "anon";
GRANT ALL ON TABLE "public"."project" TO "authenticated";
GRANT ALL ON TABLE "public"."project" TO "service_role";

GRANT ALL ON TABLE "public"."project_users" TO "anon";
GRANT ALL ON TABLE "public"."project_users" TO "authenticated";
GRANT ALL ON TABLE "public"."project_users" TO "service_role";

GRANT ALL ON TABLE "public"."rating" TO "anon";
GRANT ALL ON TABLE "public"."rating" TO "authenticated";
GRANT ALL ON TABLE "public"."rating" TO "service_role";

GRANT ALL ON TABLE "public"."suggestion" TO "anon";
GRANT ALL ON TABLE "public"."suggestion" TO "authenticated";
GRANT ALL ON TABLE "public"."suggestion" TO "service_role";

GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";

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
