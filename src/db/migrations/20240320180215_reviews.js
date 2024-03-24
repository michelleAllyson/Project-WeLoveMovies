exports.up = function (knex) {
    return knex.schema.createTable("reviews", (table) => {
      table.increments("review_id").primary();
      table.text("content");
      table.integer("score");
      table.integer("movie_id").unsigned().notNullable();
      table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("CASCADE");
      table.integer("theater_id").unsigned().notNullable();
      table
        .foreign("theater_id")
        .references("theater_id")
        .inTable("theaters")
        .onDelete("CASCADE");
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };

exports.down = function(knex) {
  
};
