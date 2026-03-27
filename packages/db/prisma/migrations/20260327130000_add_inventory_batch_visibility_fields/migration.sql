ALTER TABLE "inventory_batches"
ADD COLUMN IF NOT EXISTS "is_hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "hidden_at" TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS "hidden_reason" TEXT;

CREATE INDEX IF NOT EXISTS "inventory_batches_medicine_id_is_hidden_idx"
ON "inventory_batches" ("medicine_id", "is_hidden");
