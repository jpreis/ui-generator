import React, { FC } from "react";
import { FormGroup, Tag, TagInput } from "@blueprintjs/core";
import { RenderNodeBaseProps } from "./types";

export const RenderStringArrayNode: FC<RenderNodeBaseProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  const stringArrayValue = propertyValue as string[];

  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <TagInput
          values={stringArrayValue}
          tagProps={{ minimal: true }}
          // @ts-ignore
          onChange={(values: string[]) => {
            onChange(values);
          }}
        />
      ) : (
        <>
          {stringArrayValue.map((value) => (
            <Tag key={value} large minimal style={{ marginRight: "5px" }}>
              {value}
            </Tag>
          ))}
        </>
      )}
    </FormGroup>
  );
};
