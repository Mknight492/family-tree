import React from "react";
import "./App.css";
import { denormaliseFamilyTree } from "./data/data-formating-util";

import { familyTree } from "./data/mock-data";
import { FamilyTreeNodeComponent } from "./components/FamilyTreeNodeComponent";

// assumptions:
//
// 1. Data is valid - i.e. all ids are correct, unique and exist (wasn't actually true to data provided) and  I haven't built validation for this.
//
// 2. Essentially anything that means it can't be a simple directed acyclic graph:
// all sibling have the same parents i.e. no half siblings
// all siblings have exactly one mother and onr father
// no half- siblings
// no children between related family memeber
// there is only one set of "top level parents"
//
// 3. Team is writing code in a functional style - I wouldn't actually normally write like this but you asked for some functional programming techniques so
//
// 4. It was OK to not follow the style guide - if this was for client facing work with a predefined spec, in something like figma I'd make sure this was done. I can share example of where I've done this if liked.


const familyTreeDenormalised = denormaliseFamilyTree(familyTree);

function App() {
  return (
    <div className="tree" style={{ width: "100%" }}>
      <ul
        style={{
          width: "100%",
        }}
      >
        <FamilyTreeNodeComponent familyTreeNode={familyTreeDenormalised} />
      </ul>
    </div>
  );
}

export default App;
