CREATE UNIQUE INDEX IF NOT EXISTS "medicines_normalized_name_key"
ON "medicines" (lower(btrim("name")));
