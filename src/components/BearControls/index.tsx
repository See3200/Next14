"use client";

import useStore from "@/store/Store";
import { useState } from "react";

const BearControls = () => {
  const [newBears, setNewBears] = useState(0);

  const increasePopulation = useStore((state) => state.increasePopulation);
  const saveNewBears = () => {
    increasePopulation(newBears);
    setNewBears(0);
  };

  return (
    <div>
      <input type="numeric" value={newBears} onChange={(event) => setNewBears(Number(event.target.value))} />
      <button onClick={saveNewBears}>one up</button>
    </div>
  );
};

export default BearControls;
