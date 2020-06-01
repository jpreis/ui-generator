import React, { FC } from "react";
import { FormGroup, NumericInput, Tag } from "@blueprintjs/core";
import { BasicRenderNodeProps } from "./types";

export const RenderNumberNode: FC<BasicRenderNodeProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  const numberValue = propertyValue as number;

  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <NumericInput
          value={numberValue}
          onValueChange={(valueAsNumber) => {
            if (!isNaN(valueAsNumber)) {
              onChange(valueAsNumber);
            }
          }}
        />
      ) : (
        <Tag large>{numberValue}</Tag>
      )}
    </FormGroup>
  );
};
