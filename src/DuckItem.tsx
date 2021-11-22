import React from "react";
import { Duck } from "./demo";

interface Props {
  duck: Duck;
}

function DuckItem({ duck }: Props) {
  return (
    <div>
      <div key={duck.name}>
        <span>{duck.name}</span>
        <button onClick={() => duck.makeSound(duck.name + "quack")}>
          hihih
        </button>
      </div>
    </div>
  );
}

export default DuckItem;
