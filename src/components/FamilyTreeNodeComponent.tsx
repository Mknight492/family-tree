import React from "react";
import { IFamilyTreeNode } from "../data/type";

export const FamilyTreeNodeComponent = ({
  familyTreeNode,
}: {
  familyTreeNode: IFamilyTreeNode;
}) => (
  <>
    <li className={"node " + familyTreeNode.gender}>{familyTreeNode.name}</li>

    {familyTreeNode?.partner && (
      <li className={"node " + familyTreeNode.partner.gender}>
        {familyTreeNode.partner.name}
      </li>
    )}

    <ul className="nodelist">
      {familyTreeNode?.children?.map((c) => (
        <div
          style={{
            width: "110px",
          }}
        >
          <FamilyTreeNodeComponent familyTreeNode={c} key={familyTreeNode.id} />
        </div>
      ))}
    </ul>
  </>
);
