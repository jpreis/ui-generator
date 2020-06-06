import React, {FC} from "react";
import {RenderNodeBaseProps} from "./types";
import Editor from "react-simple-code-editor";

import {FormGroup} from "@blueprintjs/core";
import {codeStyles, highlight} from "./utils";

export const RenderSpelNode: FC<RenderNodeBaseProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  const codeValue = propertyValue as string;

  return (
    <FormGroup label={`${label} (SPeL)`}>
      <Editor
        disabled={!editMode}
        value={codeValue}
        onValueChange={onChange}
        padding={10}
        highlight={(code) => highlight(code, "javascript")}
        // @ts-ignore
        style={codeStyles}
      />
    </FormGroup>
  );
};
