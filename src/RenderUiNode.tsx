import React, { FC } from "react";
import { BasicRenderNodeProps, NodeType, UiNode } from "./types";
import { lensPath, min, partialRight, set, view } from "ramda";
import { RenderObjectArrayNode } from "./RenderObjectArrayNode";
import { RenderNumberNode } from "./RenderNumberNode";
import { RenderStringNode } from "./RenderStringNode";
import { RenderStringArrayNode } from "./RenderStringArrayNode";
import { RenderNumberArrayNode } from "./RenderNumberArrayNode";
import { RenderBooleanNode } from "./RenderBooleanNode";

export const RenderUiNode: FC<{
  node: UiNode;
  object: any;
  path: (string | number)[];
  editMode: boolean;
  onChange: (updatedObject: any) => void;
  level?: number
}> = ({ node, object, path, editMode, onChange, level = 0 }) => {
  const currentPath = path.concat(node.path);
  const currentLevel = 1 + level + currentPath.length;

  const lens = lensPath(currentPath);
  const propertyValue = view(lens, object);
  const setPropertyValue = partialRight(set(lens), [object]);

  const basicProps: BasicRenderNodeProps = {
    propertyValue: propertyValue,
    onChange: (newPropertyValue: any) => {
      onChange(setPropertyValue(newPropertyValue));
    },
    editMode: editMode,
    label: node.label,
  };

  // determine heading tag based upon nesting level - don't go further than <h6>
  const LevelHeading = `h${min(
    currentLevel,
    6
  )}` as keyof JSX.IntrinsicElements;

  return (
    <div
      style={
        currentLevel > 1
          ? {
              paddingLeft: "10px",
              borderLeft: "2px solid #ddd",
          marginBottom: `calc(3rem / ${currentLevel})`
            }
          : undefined
      }
    >
      {(() => {
        switch (node.type) {
          case NodeType.OBJECT:
            return (
              <>
                <LevelHeading>{node.label}</LevelHeading>
                {node.childNodes.map((node, index) => (
                  <RenderUiNode
                    key={`${node.path}-${index}`}
                    node={node}
                    object={object}
                    path={currentPath}
                    editMode={editMode}
                    onChange={onChange}
                  />
                ))}
              </>
            );
          case NodeType.OBJECT_ARRAY:
            return (
              <>
                <LevelHeading>{node.label}</LevelHeading>
                <RenderObjectArrayNode
                  {...basicProps}
                  templateObject={node.templateObject}
                  templateNodes={node.templateNodes}
                  objectLabel={node.objectLabel}
                  level={currentLevel}
                />
              </>
            );
          case NodeType.NUMBER:
            return <RenderNumberNode {...basicProps} />;
          case NodeType.STRING:
            return <RenderStringNode {...basicProps} />;
          case NodeType.STRING_ARRAY:
            return <RenderStringArrayNode {...basicProps} />;
          case NodeType.NUMBER_ARRAY:
            return <RenderNumberArrayNode {...basicProps} />;
          case NodeType.BOOLEAN:
            return <RenderBooleanNode {...basicProps} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
