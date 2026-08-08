/*
# Create inquiries table for Styromat landing page

1. Purpose
   Stores "Rychlá poptávka" submissions from the landing page contact form.
   Single-tenant, no sign-in: the public site writes as the anon role.

2. New Tables
   - `inquiries`
     - `id` (uuid, primary key)
     - `name` (text, not null) – Jméno a příjmení odesílatele
     - `email` (text, not null) – kontaktní e-mail
     - `phone` (text) – telefonní číslo
     - `material_type` (text) – vybraný typ materiálu z rozevíracího seznamu
     - `message` (text) – zpráva / specifikace poptávky
     - `status` (text, default 'new') – stav zpracování poptávky
     - `created_at` (timestamptz, default now())

3. Security
   - Enable RLS on `inquiries`.
   - Allow anon + authenticated INSERT only (public submission form).
     No SELECT/UPDATE/DELETE for anon – inquiries are private to the operator.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  material_type text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries"
ON inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);
