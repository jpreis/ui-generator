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
  const numberArrayValue = propertyValue as number[];

  return (
    <FormGroup label={label} inline>
      {editMode ? (
        <TagInput
          values={numberArrayValue}
          tagProps={{ minimal: true }}
          onRemove={(_, index) => {
            onChange(remove(index, 1, propertyValue as readonly number[]));
          }}
          onAdd={(values) => {
            values.forEach((value) => {
              const validValues = numberArrayValue;
              const valueAsNumber = Number(value);
              if (!isNaN(valueAsNumber)) {
                validValues.push(valueAsNumber);
              }
              onChange(validValues);
            });
          }}
        />
      ) : (
        <>
          {numberArrayValue.map((value) => (
            <Tag key={value} large style={{ marginRight: "5px" }}>
              {value}
            </Tag>
          ))}
        </>
      )}
    </FormGroup>
  );
};
