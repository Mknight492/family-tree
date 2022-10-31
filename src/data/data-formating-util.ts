import { flow } from "fp-ts/lib/function";
import { IFamilyMember, IFamilyTreeNode } from "./type";

function normaliseFamilyTree(
  familyTree: IFamilyMember[]
): Record<string, IFamilyMember> {
  return familyTree.reduce(
    (acc, fm) => ({ ...acc, [fm.id.toString()]: fm }),
    {}
  );
}

const addMotherAndFather = (
  familyTree: Record<string, IFamilyMember>
): Record<string, IFamilyMember> => {
  return Object.entries(familyTree).reduce(
    (acc, [id, fm]) => ({
      ...acc,
      //n(1) lookup to find parents as only 2 parents
      [id]: {
        ...fm,
        mother: fm.parents.find((p) => familyTree[p].gender === "female"),
        father: fm.parents.find((p) => familyTree[p].gender === "male"),
      },
    }),
    {}
  );
};

const addPartner = (
  familyTree: Record<string, IFamilyMember>
): Record<string, IFamilyMember> => {
  return Object.entries(familyTree).reduce(
    (acc, [id, fm]) => ({
      ...acc,
      [id]: {
        ...fm,
        //n(1) lookup to find partners
        partner:
          fm.gender === "female"
            ? familyTree[fm.children[0]]?.father
            : familyTree[fm.children[0]]?.mother,
      },
    }),
    {}
  );
};

//assuming family tree is a DAG can recusively traverse from any node to find the root
const findRoot = (
  familyMemberNormalised: Record<string, IFamilyMember>,
  currentId: number
): number => {
  const currentMember = familyMemberNormalised[currentId];
  //if father side has grandparents continue to traverse
  if (
    currentMember?.father &&
    familyMemberNormalised[currentMember.father].parents.length !== 0
  ) {
    return findRoot(familyMemberNormalised, currentMember.father);
  }
  // else is mothers side has grandparents continue to traverse
  else if (
    currentMember?.mother &&
    familyMemberNormalised[currentMember.mother].parents.length !== 0
  ) {
    return findRoot(familyMemberNormalised, currentMember.mother);
  }
  // otherwise mother must be root node
  else if (currentMember?.mother) {
    return currentMember.mother;
  } else {
    throw Error(
      "invalid family tree - family tree is not a valid directed acyclic graph"
    );
  }
};

const denormaliseFamilyTreeRecursive =
  (normalisedFamilyTree: Record<string, IFamilyMember>) =>
  (id: number): IFamilyTreeNode => {
    const node = normalisedFamilyTree[id];
    return {
      id: node.id,
      name: node.name,
      gender: node.gender,
      children: node.children.map((c) =>
        denormaliseFamilyTreeRecursive(normalisedFamilyTree)(c)
      ),
      //can't have the partner be a node as well and be recursive
      partner: node.partner ? normalisedFamilyTree[node.partner] : undefined,
    };
  };

export const denormaliseFamilyTree = (
  familyTree: IFamilyMember[]
): IFamilyTreeNode => {
  const firstMember = familyTree.find((fm) => fm.parents.length !== 0)?.id;

  if (!firstMember) {
    throw Error("invalid family tree - no family members with parents");
  }

  const familyTreeWithPartner = flow(
    normaliseFamilyTree,
    addMotherAndFather,
    addPartner
  )(familyTree);

  const rootId = findRoot(familyTreeWithPartner, firstMember);

  return denormaliseFamilyTreeRecursive(familyTreeWithPartner)(rootId);
};
