import { FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import React, { ChangeEvent, FC } from "react";
import { BasicRenderNodeProps } from "./types";

export const RenderStringNode: FC<BasicRenderNodeProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <InputGroup
          value={propertyValue as string}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
          }}
        />
      ) : (
        <Tag large minimal>
          {propertyValue as string}
        </Tag>
      )}
    </FormGroup>
  );
};
