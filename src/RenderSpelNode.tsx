import React, { FC, Fragment } from "react";
import { RenderNodeBaseProps } from "./types";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwlLight";
import { FormGroup } from "@blueprintjs/core";

export const RenderSpelNode: FC<RenderNodeBaseProps> = ({
  propertyValue,
  onChange,
  label,
  editMode,
}) => {
  const codeValue = propertyValue as string;

  const styles = {
    ...theme.plain,
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    fontSize: "16px",
  };

  const highlight = (code: string) => (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language="javascript"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  return (
    <FormGroup label={`${label} (SPeL)`}>
      <Editor
        disabled={!editMode}
        value={codeValue}
        onValueChange={onChange}
        padding={10}
        highlight={highlight}
        // @ts-ignore
        style={styles}
      />
    </FormGroup>
  );
};
