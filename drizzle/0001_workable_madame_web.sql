ALTER TABLE "poem" ALTER COLUMN "title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "poem" ALTER COLUMN "text" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "poem" ADD COLUMN "appearance" jsonb NOT NULL;