export enum NodeType {
  BOOLEAN = "BOOLEAN",
  NUMBER = "NUMBER",
  STRING = "STRING",
  SPEL = "SPEL",
  NUMBER_ARRAY = "NUMBER_ARRAY",
  STRING_ARRAY = "STRING_ARRAY",
  OBJECT_ARRAY = "OBJECT_ARRAY",
  OBJECT = "OBJECT",
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

export type SpelNode = BaseNode & {
  type: NodeType.SPEL;
};

export type ObjectArrayNode = BaseNode & {
  type: NodeType.OBJECT_ARRAY;
  templateNodes: UiNode[];
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
  | SpelNode
  | ObjectArrayNode
  | ObjectNode;

export type RenderNodeBaseProps = {
  propertyValue: any;
  onChange: (newPropertyValue: any) => void;
  label: string;
  editMode: boolean;
};
