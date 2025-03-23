const fs = require("fs");
const path = require("path");
const axios = require("axios");

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000";

async function generateRoutes() {
  try {
    const response = await axios.get(apiUrl);
    const pokemons = response.data.results;

    const routes = pokemons.map((pokemon) => `/pokemon/${pokemon.name}`);
    const paginatedRoutes = Array.from(
      { length: Math.ceil(pokemons.length / 20) },
      (_, i) => `/pokemons/page/${i + 1}`
    );

    const allRoutes = [...paginatedRoutes, ...routes];
    const filePath = path.join(__dirname, "..", "routes.txt");
    const dirPath = path.dirname(filePath);

    // Ensure the directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFile(filePath, allRoutes.join("\n"), (err) => {
      if (err) {
        console.error("Error writing routes.txt:", err);
      } else {
        console.log("routes.txt generated successfully.");
      }
    });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

generateRoutes();
