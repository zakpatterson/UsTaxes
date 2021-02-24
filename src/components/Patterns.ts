export enum InputType {
  text = 'text',
  numeric = 'numeric'
}

export interface PatternConfig<A> {
  inputType: A
  mask?: string
  regexp?: RegExp
  description?: string
  format?: string
  thousandSeparator?: boolean
  prefix?: string
  allowEmptyFormatting?: boolean
}

export type NumericPattern = PatternConfig<typeof InputType.numeric>
export type TextPattern = PatternConfig<typeof InputType.text>
export type Pattern = NumericPattern | TextPattern

export const Patterns: {[name: string]: Pattern} = {
  name: {
    inputType: InputType.text,
    regexp: /^[A-Za-z ]+$/i,
    description: 'Input should only include letters and spaces'
  },
  zip: {
    inputType: InputType.numeric,
    regexp: /[0-9]{5}-[0-9]{4}/,
    description: 'Input should be filled with 9 numbers',
    format: '#####-####',
    mask: '_'
  },
  ssn: {
    inputType: InputType.numeric,
    format: '###-##-####',
    mask: '_',
    regexp: /[0-9]{3}-[0-9]{2}-[0-9]{4}/,
    description: 'Input should be filled with 9 numbers'
  },
  ein: {
    inputType: InputType.numeric,
    format: '##-#######',
    mask: '_',
    regexp: /[0-9]{2}-[0-9]{7}/,
    description: 'Input should be filled with 9 numbers'
  },
  currency: {
    mask: '_',
    inputType: InputType.numeric,
    prefix: '$',
    thousandSeparator: true,
    description: 'Input should be filled with numbers only'
  },
  bankAccount: {
    inputType: InputType.numeric,
    mask: '_',
    regexp: /[0-9]{10}|[0-9]{11}|[0-9]{12}/,
    description: 'Input should be filled with 10-12 numbers'
  },
  bankRouting: {
    inputType: InputType.numeric,
    mask: '999999999',
    regexp: /[0-9]{9}/,
    description: 'Input should be filled with 10 numbers'
  },
  usPhoneNumber: {
    inputType: InputType.numeric,
    regexp: /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
    description: 'Input should be filled with 10 numbers',
    mask: '999-999-9999'
  }
}
