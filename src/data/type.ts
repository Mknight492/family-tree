export type IFamilyMember = {
  id: number;
  name: string;
  gender: string;
  children: number[];
  parents: number[];
  mother?: number;
  father?: number;
  partner?: number;
};

export type IFamilyTreeNode = {
  id: number;
  name: string;
  gender: string;
  children: IFamilyTreeNode[];
  partner?: IFamilyMember;
};
