import React from "react";
import { FormInput } from "../custom/inputs";
import { FormContentProps, FormGroupProps, FormRowProps } from "./form-content.types";
import { isGroup, isInput, isRow } from "./form-content.utils";

export function FormContent({ content, gap }: FormContentProps): React.ReactNode {
    return (
        <div className='form-content' style={{gap}}>
            {content.content.map((item, i) => {
                if (isGroup(item)) {
                    return <FormGroup key={`Form-Group-${content.name}-${i}`} group={item} index={i}/>
                } else if (isRow(item)) {
                    return <FormRow key={`Form-Row-${content.name}-${i}`} row={item} index={i}/>
                }
                return null
            })}
        </div>
    )
}

export function FormGroup({ group, index = 1 }: FormGroupProps): React.ReactNode {
    return (
        <div className="form-group">
            {group.rows.map((row, i) => <FormRow key={`${row.name}-${index}-${i}`} row={row} index={i} />)}
        </div>
    )
}

export function FormRow({ row, index = 1 }: FormRowProps): React.ReactNode {
	return (
		<div className='form-row' style={{justifyContent: row.justify || 'center'}}>
			{row.inputs.map((item, i) => {
                const key = `${row.name}-${index}-${i}`

                if (React.isValidElement(item)) {
                    return <div key={key}>{item}</div>
                } else if (isInput(item)) {
                    return <FormInput
                        key={key}
                        name={item.name}
                        label={item.label}
                        type={item.type}
                        width={item.width || '100%'}
                        placeholder={item.placeholder}
                        passwordHint={item.passwordHint}
                    />
                }
                console.warn(`Unrecognized item in row "${row.name}" at index ${i}`, item);
                return null
			})}
		</div>
	)
}