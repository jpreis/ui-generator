import React, { useState } from "react";
import { FormGroup, Pre, Switch } from "@blueprintjs/core";
import { NodeType, UiNode } from "./types";
import { RenderUiNode } from "./RenderUiNode";

const complexObject = {
  numberProp: 1,
  booleanProp: false,
  anObjectArray: [
    {
      num: 1,
      str: "foobar",
    },
  ],
  nestedProp: {
    numberProp: 2,
    stringProp: "bar",
    anotherBooleanProp: true,
    stringArray: ["foo", "bar"],
    numberArray: [1, 2],
    inception: {
      weNeedToGoDeeper: "orly?",
    },
  },
};

const complexNode: UiNode = {
  type: NodeType.OBJECT,
  label: "Action",
  path: [],
  childNodes: [
    {
      type: NodeType.NUMBER,
      label: "Number Prop",
      path: ["numberProp"],
    },
    {
      type: NodeType.BOOLEAN,
      label: "Boolean Prop",
      path: ["booleanProp"],
    },
    {
      type: NodeType.OBJECT_ARRAY,
      label: "An Object Array",
      path: ["anObjectArray"],
      objectLabel: "Object in Array",
      templateObject: {
        num: 0,
        str: "",
      },
      templateNodes: [
        { type: NodeType.NUMBER, label: "Number node", path: ["num"] },
        {
          type: NodeType.STRING,
          label: "String node",
          path: ["str"],
        },
      ],
    },
    {
      type: NodeType.OBJECT,
      label: "Nested Prop",
      path: ["nestedProp"],
      childNodes: [
        {
          type: NodeType.NUMBER,
          label: "Nested Number Prop",
          path: ["numberProp"],
        },
        {
          type: NodeType.STRING_ARRAY,
          label: "A string array",
          path: ["stringArray"],
        },
        {
          type: NodeType.NUMBER_ARRAY,
          label: "A number array",
          path: ["numberArray"],
        },
        {
          type: NodeType.BOOLEAN,
          label: "Another Boolean Prop",
          path: ["anotherBooleanProp"],
        },
        {
          type: NodeType.STRING,
          label: "Nested String Prop",
          path: ["stringProp"],
        },
        {
          type: NodeType.OBJECT,
          label: "Inception",
          path: ["inception"],
          childNodes: [
            {
              type: NodeType.STRING,
              label: "We need to go deeper",
              path: ["weNeedToGoDeeper"],
            },
          ],
        },
      ],
    },
  ],
};

const simpleObject = {
  testSuites: [
    {
      name: "Trigger Tests",
      specs: [{ name: "Spec 1" }],
    },
  ],
};

const simpleNode: UiNode = {
  type: NodeType.OBJECT,
  path: [],
  label: "Tests",
  childNodes: [
    {
      type: NodeType.OBJECT_ARRAY,
      label: "Test Suites",
      objectLabel: "Test Suite",
      path: ["testSuites"],
      templateObject: {
        name: "",
        specs: [],
      },
      templateNodes: [
        {
          type: NodeType.STRING,
          label: "Testsuite Name",
          path: ["name"],
        },
        {
          type: NodeType.OBJECT_ARRAY,
          label: "Specs",
          path: ["specs"],
          objectLabel: "Spec",
          templateObject: { name: "" },
          templateNodes: [
            {
              type: NodeType.STRING,
              label: "Spec Name",
              path: ["name"],
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  const [editMode, setEditMode] = useState(true);
  const [draftObject, setDraftObject] = useState(simpleObject);

  return (
    <div>
      <FormGroup label={"Toggle edit mode"} inline>
        <Switch
          checked={editMode}
          onChange={() => {
            setEditMode((v) => !v);
          }}
        />
      </FormGroup>

      <RenderUiNode
        node={simpleNode}
        object={draftObject}
        path={complexNode.path}
        onChange={setDraftObject}
        editMode={editMode}
      />

      <Pre>{JSON.stringify(draftObject, null, 2)}</Pre>
    </div>
  );
}

export default App;
