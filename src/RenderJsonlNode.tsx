import React, { FC, useEffect, useState } from "react";
import { RenderNodeBaseProps } from "./types";
import Editor from "react-simple-code-editor";

import { FormGroup, Pre } from "@blueprintjs/core";
import { codeStyles, highlight } from "./utils";

export const RenderJsonNode: FC<RenderNodeBaseProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  const stringify = (value: any) =>
    JSON.stringify(value, (k, v) => (v === undefined ? null : v), 2);

  const parseJson = (value: string) => {
    try {
      const parsedObject = JSON.parse(value);
      onChange(parsedObject);
      setHasError(false);
    } catch (e) {
      setHasError(true);
    } finally {
        setCodeString(value);
    }
  };

  const [codeString, setCodeString] = useState(stringify(propertyValue));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCodeString(stringify(propertyValue));
  }, [propertyValue]);

  return (
    <>
      <FormGroup label={`${label} (JSON)`}>
        <Editor
          disabled={!editMode}
          value={codeString}
          onValueChange={parseJson}
          padding={10}
          highlight={(code) => highlight(code, "json")}
          // @ts-ignore
          style={codeStyles}
        />
      </FormGroup>
      <Pre>{JSON.stringify(codeString, null, 2)}</Pre>
      {hasError && <div>Parsing error</div>}
    </>
  );
};
