CREATE TABLE notes
(
    id         SERIAL PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    content    TEXT,
    archived   BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE note_categories
(
    note_id     BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (note_id, category_id),
    CONSTRAINT fk_note FOREIGN KEY (note_id) REFERENCES notes (id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);


-- CREATE
-- OR REPLACE FUNCTION set_timestamp_columns()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Set updated_at on every update
--     NEW.updated_at
-- = now();
--
--     -- Set created_at only if it's NULL (usually first insert)
--     IF
-- TG_OP = 'INSERT' AND NEW.created_at IS NULL THEN
--         NEW.created_at = now();
-- END IF;
--
-- RETURN NEW;
-- END;
-- $$
-- LANGUAGE plpgsql;
--
--
-- CREATE TRIGGER notes_timestamps
--     BEFORE INSERT OR
-- UPDATE ON notes
--     FOR EACH ROW
--     EXECUTE FUNCTION set_timestamp_columns();
