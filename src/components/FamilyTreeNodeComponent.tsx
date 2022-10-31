import React from "react";
import { IFamilyTreeNode } from "../data/type";

export const FamilyTreeNodeComponent = ({
  familyTreeNode: { gender, name, partner, children, id },
}: {
  familyTreeNode: IFamilyTreeNode;
}) => (
  <>
    <li className={"node " + gender}>{name}</li>

    {partner && <li className={"node " + partner.gender}>{partner.name}</li>}

    <ul className="nodelist">
      {children?.map((childNode) => (
        <div
          style={{
            width: "110px",
          }}
        >
          <FamilyTreeNodeComponent familyTreeNode={childNode} key={id} />
        </div>
      ))}
    </ul>
  </>
);
