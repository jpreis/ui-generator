import React, { FC, Fragment } from "react";
import { lensIndex, remove, set } from "ramda";
import { Button, Callout, Intent } from "@blueprintjs/core";
import { BasicRenderNodeProps, UiNode } from "./types";
import { RenderUiNode } from "./RenderUiNode";

export const RenderObjectArrayNode: FC<
  BasicRenderNodeProps & {
    templateObject: Object;
    objectLabel: string;
    childNodes: UiNode[];
  }
> = ({
  propertyValue,
  onChange,
  objectLabel,
  editMode,
  templateObject,
  childNodes,
}) => {
  const updateObject = (newObject: any, index: number) => {
    onChange(set(lensIndex(index), newObject, propertyValue));
  };

  const addObject = () => {
    onChange((propertyValue as Object[]).concat(templateObject));
  };

  const removeObject = (index: number) => {
    console.log(remove(index, 1, propertyValue));
    onChange(remove(index, 1, propertyValue));
  };

  return (
    <>
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

      {(propertyValue as Object[]).length === 0 ? (
        <Callout>There are no items</Callout>
      ) : (
        (propertyValue as Object[]).map((objectInArray, index) => (
          <Fragment key={index}>
            <div
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <strong style={{ marginRight: "0.5rem" }}>
                {objectLabel}: {index + 1}
              </strong>
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
            </div>
            {childNodes.map((childNode, nodeIndex) => {
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
                />
              );
            })}
          </Fragment>
        ))
      )}
    </>
  );
};
