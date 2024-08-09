import React from 'react';

export function CommandSendedFormat(props) {
    const { data } = props;
    console.log(data)
    return (
        <div>
            <h4>
                Status: {data.status}
            </h4>
            <h4>
                Command sended: {data.command_sended}
            </h4>
            <h4>
                Prompt result: {data.prompt_result}
            </h4>
        </div>
    );
}
