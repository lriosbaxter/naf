import React, { useEffect } from 'react'
import './SourceCode.scss'
import { useRepositories } from '../../../../hooks';

export function SourceCode(props) {
    const { script } = props;
    const { sourceCode, getSourceCode } = useRepositories();

    useEffect(() => {
        // Ensure script is not undefined or null before fetching
        if (script) {
            getSourceCode(script);
        }
    }, [getSourceCode, script]);

    return (
        <div>
            <h1>{script.title}</h1>
            <p>
                <div>
                    {/* Render sourceCode content here if needed */}
                </div>
            </p>
        </div>
    );
}