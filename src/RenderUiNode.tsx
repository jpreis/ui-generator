import React, { FC } from "react";
import { RenderNodeBaseProps, NodeType, UiNode } from "./types";
import { lensPath, min, partialRight, set, view } from "ramda";
import { RenderObjectArrayNode } from "./RenderObjectArrayNode";
import { RenderNumberNode } from "./RenderNumberNode";
import { RenderStringNode } from "./RenderStringNode";
import { RenderStringArrayNode } from "./RenderStringArrayNode";
import { RenderNumberArrayNode } from "./RenderNumberArrayNode";
import { RenderBooleanNode } from "./RenderBooleanNode";
import { RenderSpelNode } from "./RenderSpelNode";
import { RenderJsonNode } from "./RenderJsonlNode";

export const RenderUiNode: FC<{
  node: UiNode;
  object: any;
  path: (string | number)[];
  editMode: boolean;
  onChange: (updatedObject: any) => void;
  level?: number;
}> = ({ node, object, path, editMode, onChange, level = 0 }) => {
  const currentPath = path.concat(node.path);
  const currentLevel = 1 + level + currentPath.length;

  const lens = lensPath(currentPath);
  const propertyValue = view(lens, object);
  const setPropertyValue = partialRight(set(lens), [object]);

  const baseProps: RenderNodeBaseProps = {
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
              marginBottom: `calc(3rem / ${currentLevel})`,
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
                  {...baseProps}
                  templateObject={node.templateObject}
                  templateNodes={node.templateNodes}
                  objectLabel={node.objectLabel}
                  level={currentLevel}
                />
              </>
            );
          case NodeType.NUMBER:
            return <RenderNumberNode {...baseProps} />;
          case NodeType.STRING:
            return <RenderStringNode {...baseProps} />;
          case NodeType.STRING_ARRAY:
            return <RenderStringArrayNode {...baseProps} />;
          case NodeType.SPEL:
            return <RenderSpelNode {...baseProps} />;
          case NodeType.NUMBER_ARRAY:
            return <RenderNumberArrayNode {...baseProps} />;
          case NodeType.BOOLEAN:
            return <RenderBooleanNode {...baseProps} />;
          case NodeType.JSON:
            return <RenderJsonNode {...baseProps} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
