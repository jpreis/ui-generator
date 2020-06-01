import React, { FC } from "react";
import { FormGroup, Tag, TagInput } from "@blueprintjs/core";
import { BasicRenderNodeProps } from "./types";

export const RenderStringArrayNode: FC<BasicRenderNodeProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <TagInput
          values={propertyValue as string[]}
          tagProps={{ minimal: true }}
          // @ts-ignore
          onChange={(values: string[]) => {
            onChange(values);
          }}
        />
      ) : (
        <>
          {(propertyValue as string[]).map((value: string) => (
            <Tag key={value} large minimal style={{ marginRight: "5px" }}>
              {value}
            </Tag>
          ))}
        </>
      )}
    </FormGroup>
  );
};
