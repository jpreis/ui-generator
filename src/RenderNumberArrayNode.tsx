import React, { FC } from "react";
import { FormGroup, Tag, TagInput } from "@blueprintjs/core";
import { remove } from "ramda";
import { BasicRenderNodeProps } from "./types";

export const RenderNumberArrayNode: FC<BasicRenderNodeProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <TagInput
          values={propertyValue as number[]}
          tagProps={{ minimal: true }}
          onRemove={(_, index) => {
            onChange(remove(index, 1, propertyValue as readonly number[]));
          }}
          onAdd={(values) => {
            values.forEach((value) => {
              const valueAsNumber = Number(value);
              const validValues = propertyValue;
              if (!isNaN(valueAsNumber)) {
                (validValues as number[]).push(valueAsNumber);
              }
              onChange(validValues);
            });
          }}
        />
      ) : (
        <>
          {(propertyValue as number[]).map((value) => (
            <Tag key={value} large style={{ marginRight: "5px" }}>
              {value}
            </Tag>
          ))}
        </>
      )}
    </FormGroup>
  );
};
