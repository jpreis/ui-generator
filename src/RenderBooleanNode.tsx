import React, { FC } from "react";
import { FormGroup, Intent, Switch, Tag } from "@blueprintjs/core";
import { BasicRenderNodeProps } from "./types";

export const RenderBooleanNode: FC<BasicRenderNodeProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <Switch
          large
          checked={propertyValue as boolean}
          onChange={() => {
            onChange(!propertyValue);
          }}
        />
      ) : (
        <Tag large intent={propertyValue ? Intent.PRIMARY : Intent.WARNING}>
          {(propertyValue as boolean) ? "yes" : "no"}
        </Tag>
      )}
    </FormGroup>
  );
};
