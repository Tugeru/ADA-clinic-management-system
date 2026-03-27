-- Add split name columns while keeping full_name for backward compatibility.
ALTER TABLE "students"
ADD COLUMN IF NOT EXISTS "first_name" TEXT,
ADD COLUMN IF NOT EXISTS "middle_name" TEXT,
ADD COLUMN IF NOT EXISTS "last_name" TEXT;

-- Best-effort backfill from legacy full_name for existing records.
WITH tokenized AS (
  SELECT
    id,
    full_name,
    regexp_split_to_array(trim(full_name), '\\s+') AS tokens
  FROM "students"
  WHERE full_name IS NOT NULL
)
UPDATE "students" AS s
SET
  first_name = COALESCE(
    s.first_name,
    NULLIF(
      trim(
        CASE
          WHEN POSITION(',' IN t.full_name) > 0
            THEN split_part(trim(split_part(t.full_name, ',', 2)), ' ', 1)
          ELSE t.tokens[1]
        END
      ),
      ''
    )
  ),
  last_name = COALESCE(
    s.last_name,
    NULLIF(
      trim(
        CASE
          WHEN POSITION(',' IN t.full_name) > 0
            THEN split_part(t.full_name, ',', 1)
          WHEN cardinality(t.tokens) >= 2
            THEN t.tokens[cardinality(t.tokens)]
          ELSE NULL
        END
      ),
      ''
    )
  ),
  middle_name = COALESCE(
    s.middle_name,
    NULLIF(
      trim(
        CASE
          WHEN POSITION(',' IN t.full_name) > 0 THEN
            CASE
              WHEN POSITION(' ' IN trim(split_part(t.full_name, ',', 2))) > 0
                THEN substring(
                  trim(split_part(t.full_name, ',', 2))
                  FROM POSITION(' ' IN trim(split_part(t.full_name, ',', 2))) + 1
                )
              ELSE NULL
            END
          WHEN cardinality(t.tokens) > 2
            THEN array_to_string(t.tokens[2:cardinality(t.tokens) - 1], ' ')
          ELSE NULL
        END
      ),
      ''
    )
  )
FROM tokenized AS t
WHERE s.id = t.id;
