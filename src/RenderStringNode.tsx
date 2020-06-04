import { FormGroup, InputGroup, Tag } from "@blueprintjs/core";
import React, { ChangeEvent, FC } from "react";
import { RenderNodeBaseProps } from "./types";

export const RenderStringNode: FC<RenderNodeBaseProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  const stringValue = propertyValue as string;

  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <InputGroup
          value={stringValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
          }}
        />
      ) : (
        <Tag large minimal>
          {stringValue}
        </Tag>
      )}
    </FormGroup>
  );
};
