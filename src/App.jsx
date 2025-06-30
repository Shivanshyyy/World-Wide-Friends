// App.jsx
import React, { useState } from "react";
import StartScreen from "./StartScreen";
import Viewer from "./Viewer";
import TreehousePage from "./treeshouse";

export default function App() {
  const [screen, setScreen] = useState("start");

  if (screen === "start") return <StartScreen onStart={() => setScreen("viewer")} />;
  if (screen === "viewer") return <Viewer onViewTreehouse={() => setScreen("treehouse")} />;
  if (screen === "treehouse") return <TreehousePage onBack={() => setScreen("viewer")} />;

  return null;
}
