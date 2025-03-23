const fs = require("fs");
const path = require("path");
const axios = require("axios");

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000";
const timeout = 5000; // 5 seconds timeout for each request

async function generateRoutes() {
  try {
    const response = await axios.get(apiUrl, { timeout });
    const pokemons = response.data.results;

    const validPokemons = pokemons.filter((pokemon) => {
      const id = parseInt(pokemon.url.split("/").slice(-2, -1)[0], 10);
      return id <= 10000; // Assuming 10000 is the maximum valid ID
    });

    const routes = [];
    for (const pokemon of validPokemons) {
      try {
        routes.push(`/pokemon/${pokemon.name}`);
      } catch (error) {
        console.error(`Error processing Pokémon ${pokemon.name}:`, error);
      }
    }

    const paginatedRoutes = Array.from(
      { length: Math.ceil(validPokemons.length / 20) },
      (_, i) => `/pokemons/page/${i + 1}`
    );

    const allRoutes = [...paginatedRoutes, ...routes];
    const filePath = path.join(__dirname, "..", "routes.txt");
    const dirPath = path.dirname(filePath);

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

    console.log("Generated routes:", allRoutes);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

await generateRoutes();
