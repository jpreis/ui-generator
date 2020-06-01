import React, { FC } from "react";
import { FormGroup, NumericInput, Tag } from "@blueprintjs/core";
import { BasicRenderNodeProps } from "./types";

export const RenderNumberNode: FC<BasicRenderNodeProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <NumericInput
          value={propertyValue as number}
          onValueChange={(valueAsNumber) => {
            if (!isNaN(valueAsNumber)) {
              onChange(valueAsNumber);
            }
          }}
        />
      ) : (
        <Tag large>{propertyValue as number}</Tag>
      )}
    </FormGroup>
  );
};
