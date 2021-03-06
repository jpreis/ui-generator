import React, { FC, Fragment } from "react";
import { lensIndex, min, remove, set } from "ramda";
import { Button, Callout, Intent } from "@blueprintjs/core";
import { RenderNodeBaseProps, UiNode } from "./types";
import { RenderUiNode } from "./RenderUiNode";

export const RenderObjectArrayNode: FC<
  RenderNodeBaseProps & {
    templateObject: Object;
    objectLabel: string;
    templateNodes: UiNode[];
    level: number;
  }
> = ({
  propertyValue,
  onChange,
  objectLabel,
  editMode,
  templateObject,
  templateNodes,
  level,
}) => {
  const objectArrayValue = propertyValue as Object[];

  const updateObject = (newObject: any, index: number) => {
    onChange(set(lensIndex(index), newObject, propertyValue));
  };

  const addObject = () => {
    onChange(objectArrayValue.concat(templateObject));
  };

  const removeObject = (index: number) => {
    onChange(remove(index, 1, objectArrayValue));
  };

  // determine heading tag based upon nesting level - don't go further than <h6>
  const LevelHeading = `h${min(level + 1, 6)}` as keyof JSX.IntrinsicElements;

  return (
    <>
      {objectArrayValue.length === 0 ? (
        <Callout>There are no items</Callout>
      ) : (
        objectArrayValue.map((objectInArray, index) => (
          <Fragment key={index}>
            <LevelHeading
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "0.5rem" }}>
                {objectLabel}: {index + 1}
              </span>{" "}
              {editMode && (
                <Button
                  icon={"trash"}
                  minimal
                  small
                  intent={Intent.DANGER}
                  onClick={() => {
                    removeObject(index);
                  }}
                />
              )}
            </LevelHeading>

            {templateNodes.map((childNode, nodeIndex) => {
              return (
                <RenderUiNode
                  key={nodeIndex}
                  node={childNode}
                  object={objectInArray}
                  path={[]}
                  editMode={editMode}
                  onChange={(updatedObject) => {
                    updateObject(updatedObject, index);
                  }}
                  level={level}
                />
              );
            })}
          </Fragment>
        ))
      )}
      {editMode && (
        <Button
          outlined
          intent={Intent.PRIMARY}
          icon={"add"}
          style={{ marginBottom: "1rem" }}
          onClick={addObject}
        >
          Add '{objectLabel}'
        </Button>
      )}
    </>
  );
};
