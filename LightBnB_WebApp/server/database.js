const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  let user = null;
  pool
    .query(`SELECT email
    FROM users
    WHERE email = $1`, [email.toLowerCase()])
    .then((result) => {
      result ? (user = result) : (user);
      return Promise.resolve(user);
    })
    .catch((err) => {
      console.log(err.message);
    });
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  pool
    .query(`SELECT email
    FROM users
    WHERE id = $1`, [id.toLowerCase()])
    .then((result) => {
      result ? (id = result) : (id);
      return Promise.resolve(id);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  pool
  .query(`
  INSERT INTO users (
    name,
    email,
    password) 
    VALUES (
      $1,
      $2,
      $3)
      RETURNING *`,[user.name, user.email, user.password])
  .then((result) => {
    return Promise.resolve(user);
  })
  .catch((err) => {
    console.log(err.message);
  });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = (guest_id, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties where guest.id = $1 LIMIT $2`, [guest_id, limit])
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
    // 1
    const queryParams = [];
    // 2
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
  
    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    if (options.owner_id) {
      if (queryParams) queryString += `AND `;
      queryParams.push(`%${options. owner_id}%`);
      queryString += `WHERE owner_id LIKE $${queryParams.length} `;
    }
    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      if (queryParams) queryString += `AND `;
      queryParams.push(`%${options.minimum_price_per_night}%`);
      queryParams.push(`%${options.maximum_price_per_night}%`);
      queryString += `WHERE $${queryParams.length - 1} < cost_per_night AND cost_per_night < $${queryParams.length} `;
    }
    if (options.minimum_rating) {
      if (queryParams) queryString += `AND `;
      queryParams.push(`%${options.minimum_rating}%`);
      queryString += `WHERE rating <= $${queryParams.length} `;
    }

  
    // 4
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  
    // 5
    console.log(queryString, queryParams);
  
    // 6
    return pool.query(queryString, queryParams).then((res) => res.rows);
  };
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
