import React, { FC } from "react";
import { FormGroup, Intent, Switch, Tag } from "@blueprintjs/core";
import { BasicRenderNodeProps } from "./types";

export const RenderBooleanNode: FC<BasicRenderNodeProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  const booleanValue = propertyValue as boolean;

  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <Switch
          large
          checked={booleanValue}
          onChange={() => {
            onChange(!propertyValue);
          }}
        />
      ) : (
        <Tag large intent={propertyValue ? Intent.PRIMARY : Intent.WARNING}>
          {booleanValue ? "yes" : "no"}
        </Tag>
      )}
    </FormGroup>
  );
};
