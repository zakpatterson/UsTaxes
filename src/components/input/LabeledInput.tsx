import React, { ReactElement } from 'react'
import { TextField, Box } from '@material-ui/core'
import { LabeledInputProps } from './types'
import NumberFormat from 'react-number-format'
import { InputType } from '../Patterns'

export function LabeledInput (props: LabeledInputProps): ReactElement {
  const { strongLabel, label, register, error, required = false, patternConfig = { inputType: InputType.text }, name, defaultValue } = props

  //  let helperText: string | undefined
  // fix error where pattern wouldn't match if input wasn't filled out even if required was set to false
  if (!required) {
    patternConfig.regexp = /.?/
  }

  const textFieldProps = {
    fullWidth: patternConfig.mask === undefined,
    defaultValue: defaultValue,
    helperText: error?.message,
    inputRef: register({
      required: required ? 'Input is required' : undefined,
      pattern: {
        value: patternConfig.regexp ?? (required ? /.+/ : /.*/),
        message: patternConfig.description ?? (required ? 'Input is required' : '')
      }
    }
    ),
    error: error !== undefined,
    name,
    variant: 'filled' as ('filled' | 'standard')
  }

  /* if there is a mask prop, create masked textfield rather than standard */
  let input: ReactElement = <TextField {...textFieldProps} />

  if (patternConfig.inputType === InputType.numeric) {
    input = (
      <NumberFormat
        mask={patternConfig.mask}
        thousandSeparator={patternConfig.thousandSeparator}
        prefix={patternConfig.prefix}
        allowEmptyFormatting={true}
        format={patternConfig.format}
        customInput={TextField}
        isNumericString={true}
        {...textFieldProps}
      />
    )
  }

  return (
    <div>
      <Box display="flex" justifyContent="flex-start">
        <p><strong>{strongLabel}</strong>{label}</p>
      </Box>
      <Box display="flex" justifyContent="flex-start">
        {input}
      </Box>
    </div>
  )
}

export default LabeledInput
