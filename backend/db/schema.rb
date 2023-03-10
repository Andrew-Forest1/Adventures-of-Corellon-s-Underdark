# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_10_200121) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abilities", force: :cascade do |t|
    t.string "name"
    t.string "ability_type"
    t.integer "damage"
    t.integer "cooldown"
    t.integer "uses"
    t.string "effect"
    t.integer "cast"
    t.integer "mana"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "duration"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "character_abilities", force: :cascade do |t|
    t.bigint "character_id", null: false
    t.bigint "ability_id", null: false
    t.integer "slot"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ability_id"], name: "index_character_abilities_on_ability_id"
    t.index ["character_id"], name: "index_character_abilities_on_character_id"
  end

  create_table "character_consumables", force: :cascade do |t|
    t.bigint "consumable_id", null: false
    t.bigint "character_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_character_consumables_on_character_id"
    t.index ["consumable_id"], name: "index_character_consumables_on_consumable_id"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.integer "level"
    t.integer "experience"
    t.integer "points"
    t.integer "strength"
    t.integer "agility"
    t.integer "intellect"
    t.integer "vitality"
    t.integer "spirit"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "health"
    t.integer "gold"
    t.index ["user_id"], name: "index_characters_on_user_id"
  end

  create_table "consumable_abilities", force: :cascade do |t|
    t.bigint "consumable_id", null: false
    t.bigint "ability_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ability_id"], name: "index_consumable_abilities_on_ability_id"
    t.index ["consumable_id"], name: "index_consumable_abilities_on_consumable_id"
  end

  create_table "consumables", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dungeon_enemies", force: :cascade do |t|
    t.bigint "enemy_id", null: false
    t.bigint "dungeon_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dungeon_id"], name: "index_dungeon_enemies_on_dungeon_id"
    t.index ["enemy_id"], name: "index_dungeon_enemies_on_enemy_id"
  end

  create_table "dungeons", force: :cascade do |t|
    t.string "name"
    t.integer "min_level"
    t.integer "max_level"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "enemies", force: :cascade do |t|
    t.string "name"
    t.integer "level"
    t.integer "strength"
    t.integer "agility"
    t.integer "intellect"
    t.integer "vitality"
    t.integer "spirit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "experience"
  end

  create_table "enemy_abilities", force: :cascade do |t|
    t.bigint "ability_id", null: false
    t.bigint "enemy_id", null: false
    t.integer "slot"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ability_id"], name: "index_enemy_abilities_on_ability_id"
    t.index ["enemy_id"], name: "index_enemy_abilities_on_enemy_id"
  end

  create_table "progresses", force: :cascade do |t|
    t.bigint "character_id", null: false
    t.bigint "dungeon_id", null: false
    t.bigint "dungeon_enemy_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_progresses_on_character_id"
    t.index ["dungeon_enemy_id"], name: "index_progresses_on_dungeon_enemy_id"
    t.index ["dungeon_id"], name: "index_progresses_on_dungeon_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "character_abilities", "abilities", on_delete: :cascade
  add_foreign_key "character_abilities", "characters", on_delete: :cascade
  add_foreign_key "character_consumables", "characters", on_delete: :cascade
  add_foreign_key "character_consumables", "consumables", on_delete: :cascade
  add_foreign_key "characters", "users", on_delete: :cascade
  add_foreign_key "consumable_abilities", "abilities", on_delete: :cascade
  add_foreign_key "consumable_abilities", "consumables", on_delete: :cascade
  add_foreign_key "dungeon_enemies", "dungeons", on_delete: :cascade
  add_foreign_key "dungeon_enemies", "enemies", on_delete: :cascade
  add_foreign_key "enemy_abilities", "abilities", on_delete: :cascade
  add_foreign_key "enemy_abilities", "enemies", on_delete: :cascade
  add_foreign_key "progresses", "characters", on_delete: :cascade
  add_foreign_key "progresses", "dungeon_enemies", on_delete: :cascade
  add_foreign_key "progresses", "dungeons", on_delete: :cascade
end
