import { initializeGame } from "./components/factories/game";
import "../styles/main.css";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

initializeGame();
