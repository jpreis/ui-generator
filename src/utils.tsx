import Highlight, {defaultProps, Language} from "prism-react-renderer";
import React, {Fragment} from "react";
import theme from "prism-react-renderer/themes/nightOwlLight";

export const codeStyles = {
    ...theme.plain,
    fontFamily: "monospace",
    fontSize: "16px",
};

export const highlight = (code: string, language: Language) => (
    <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={language}
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