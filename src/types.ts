export enum NodeType {
  BOOLEAN,
  NUMBER,
  STRING,
  NUMBER_ARRAY,
  STRING_ARRAY,
  OBJECT_ARRAY,
  OBJECT,
}

export type BaseNode = {
  type: NodeType;
  label: string;
  path: (string | number)[];
};

export type BooleanNode = BaseNode & {
  type: NodeType.BOOLEAN;
};

export type NumberNode = BaseNode & {
  type: NodeType.NUMBER;
};

export type StringNode = BaseNode & {
  type: NodeType.STRING;
};

export type NumberArrayNode = BaseNode & {
  type: NodeType.NUMBER_ARRAY;
};

export type StringArrayNode = BaseNode & {
  type: NodeType.STRING_ARRAY;
};

export type ObjectArrayNode = BaseNode & {
  type: NodeType.OBJECT_ARRAY;
  childNodes: UiNode[];
  objectLabel: string;
  templateObject: any;
};

export type ObjectNode = BaseNode & {
  type: NodeType.OBJECT;
  childNodes: UiNode[];
};

export type UiNode =
  | BooleanNode
  | NumberNode
  | StringNode
  | NumberArrayNode
  | StringArrayNode
  | ObjectArrayNode
  | ObjectNode;

export type BasicRenderNodeProps = {
  propertyValue: any;
  onChange: (newPropertyValue: any) => void;
  label: string;
  editMode: boolean;
};
