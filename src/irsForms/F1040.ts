import { AccountType, Dependent, FilingStatus, IncomeW2, PersonRole, Refund, TaxPayer } from '../redux/data'
import F4972 from './F4972'
import F8814 from './F8814'
import Schedule8863 from './F8863'
import F8888 from './F8888'
import F8995 from './F8995'
import F8995A from './F8995A'
import Schedule1 from './Schedule1'
import Schedule2 from './Schedule2'
import Schedule3 from './Schedule3'
import Schedule8812 from './Schedule8812'
import ScheduleA from './ScheduleA'
import ScheduleD from './ScheduleD'
import ScheduleEIC from './ScheduleEIC'
import Form from './Form'
import federalBrackets from '../data/federal'

const displayNumber = (n: number): number | undefined => {
  if (n <= 0) {
    return undefined
  }
  return n
}

const computeField = (f: number | undefined): number => f === undefined ? 0 : f

const sumFields = (fs: Array<number | undefined>): number =>
  fs.map((f) => computeField(f)).reduce((l, r) => l + r)

export default class F1040 implements Form {
  // intentionally mirroring many fields from the state,
  // trying to represent the fields that the 1040 requires
  filingStatus?: FilingStatus
  firstNameAndInitial?: string
  lastName?: string
  yourSocialSecurityNumber?: string
  spousesFirstNameAndInitial?: string
  spousesLastName?: string
  spousesSocialSecurityNumber?: string
  homeAddress?: string
  aptNo?: string
  city?: string
  state?: string
  zip?: string
  foreignCountryName?: string
  province?: string
  postalCode?: string
  virtualCurrency: boolean
  claimDependentPrimary: boolean
  claimDependentSpouse: boolean
  dependents: Dependent[]
  refund?: Refund
  contactPhoneNumber?: string
  contactEmail?: string

  w2s: IncomeW2[]

  schedule1?: Schedule1
  schedule2?: Schedule2
  schedule3?: Schedule3
  scheduleA?: ScheduleA
  scheduleD?: ScheduleD
  scheduleEIC?: ScheduleEIC
  schedule8812?: Schedule8812
  schedule8863?: Schedule8863
  f4972?: F4972
  f8814?: F8814
  f8888?: F8888
  f8995?: F8995 | F8995A

  constructor (tp: TaxPayer) {
    this.filingStatus = tp.filingStatus
    this.firstNameAndInitial = tp.primaryPerson?.firstName
    this.lastName = tp.primaryPerson?.lastName
    this.yourSocialSecurityNumber = tp.primaryPerson?.ssid
    this.spousesFirstNameAndInitial = tp.spouse?.firstName
    this.spousesLastName = tp.spouse?.lastName
    this.spousesSocialSecurityNumber = tp.spouse?.ssid
    this.homeAddress = tp.primaryPerson?.address.address
    this.aptNo = tp.primaryPerson?.address.aptNo
    this.city = tp.primaryPerson?.address.city
    this.state = tp.primaryPerson?.address.state
    this.zip = tp.primaryPerson?.address.zip
    this.foreignCountryName = tp.primaryPerson?.address.foreignCountry
    this.province = tp.primaryPerson?.address.province
    this.postalCode = tp.primaryPerson?.address.postalCode
    this.virtualCurrency = false
    this.claimDependentPrimary = false
    this.claimDependentSpouse = false
    this.dependents = tp.dependents
    this.w2s = []
    this.contactPhoneNumber = tp.contactPhoneNumber
    this.contactEmail = tp.contactEmail
  }

  addW2 (w2: IncomeW2): void {
    this.w2s.push(w2)
  }

  addSchedule1 (s: Schedule1): void {
    this.schedule1 = s
  }

  addSchedule2 (s: Schedule2): void {
    this.schedule2 = s
  }

  addSchedule3 (s: Schedule3): void {
    this.schedule3 = s
  }

  addScheduleA (s: ScheduleA): void {
    this.scheduleA = s
  }

  addScheduleD (s: ScheduleD): void {
    this.scheduleD = s
  }

  addScheduleEIC (s: ScheduleEIC): void {
    this.scheduleEIC = s
  }

  add8995 (s: F8995 | F8995A): void {
    this.f8995 = s
  }

  add8814 (s: F8814): void {
    this.f8814 = s
  }

  add4972 (s: F4972): void {
    this.f4972 = s
  }

  addSchedule8812 (s: Schedule8812): void {
    this.schedule8812 = s
  }

  addRefund (r: Refund): void {
    this.refund = r
  }

  // TODO -> born before 1956/01/02
  bornBeforeDate = (): boolean => false
  // TODO
  blind = (): boolean => false

  // TODO
  spouseBeforeDate = (): boolean => false

  // TODO
  spouseBlind = (): boolean => false

  wages (): number {
    if (this.w2s.length > 0) {
      return this.w2s.map((w2) => w2.income).reduce((l, r) => l + r)
    }
    return 0
  }

  w2ForRole = (r: PersonRole): IncomeW2 | undefined =>
    (this.w2s ?? []).find((w2) => w2.personRole === r)

  static standardDeductions: {[key: string]: number} = {
    [FilingStatus.S]: 12400,
    [FilingStatus.MFS]: 12400,
    [FilingStatus.HOH]: 18650,
    [FilingStatus.MFJ]: 24800,
    [FilingStatus.W]: 24800
  }

  standardDeduction = (): number => {
    if (this.filingStatus === undefined) {
      return 12400
    }
    return F1040.standardDeductions[this.filingStatus]
  }

  l1 = (): number | undefined => displayNumber(this.wages())
  l2a = (): number | undefined => undefined
  l2b = (): number | undefined => undefined
  l3a = (): number | undefined => undefined
  l3b = (): number | undefined => undefined
  l4a = (): number | undefined => undefined
  l4b = (): number | undefined => undefined
  l5a = (): number | undefined => undefined
  l5b = (): number | undefined => undefined
  l6a = (): number | undefined => undefined
  l6b = (): number | undefined => undefined
  l7 = (): number | undefined => undefined
  l8 = (): number | undefined => this.schedule1?.l9()
  l9 = (): number | undefined => displayNumber(
    sumFields([
      this.l1(),
      this.l2b(),
      this.l3b(),
      this.l4b(),
      this.l5b(),
      this.l7(),
      this.l8()
    ])
  )

  l10a = (): number | undefined => this.schedule1?.l22()
  l10b = (): number | undefined => undefined
  l10c = (): number | undefined => displayNumber(
    sumFields([
      this.l10a(), this.l10b()
    ])
  )

  l11 = (): number | undefined => displayNumber(
    computeField(this.l9()) - computeField(this.l10c()) - 100












    )/******

had to uninstall and then reinstall

  */

  l12 = (): number | undefined => {
    if (this.scheduleA !== undefined) {
      return this.scheduleA.deductions()
    }
    return this.standardDeduction()
  }

  l13 = (): number | undefined => this.f8995?.deductions()
  l14 = (): number | undefined => displayNumber(
    sumFields([
      this.l12(), this.l13()
    ])
  )

  l15 = (): number | undefined => displayNumber(
    computeField(this.l11()) - computeField(this.l14())
  )

  // Todo, must actually compute tax
  computeTax = (): number | undefined => {
    const table = federalBrackets.tax_withholding_percentage_method_tables.annual
    const filingStatusLookup = {
      [FilingStatus.S]: table.single,
      [FilingStatus.MFS]: table.married_separately,
      [FilingStatus.MFJ]: table.married,
      [FilingStatus.HOH]: table.head_of_household
    }

    if (this.filingStatus !== FilingStatus.W && this.filingStatus !== undefined) {
      const table = filingStatusLookup[this.filingStatus].income_tax_brackets

      const taxableIncome = this.l15() ?? 0
      const ordinaryIncome = taxableIncome

      let oi = table.length - 1

      while (table[oi].bracket > ordinaryIncome) {
        oi--
      }
      const ordinaryBracket = table[oi]
      const baseTax = ordinaryBracket.amount
      const bracketTaxableOrdinaryIncome = ordinaryIncome - ordinaryBracket.bracket
      // TODO - otherwise ignoring long-term vs short term capital gains
      const ordinaryTax = baseTax + bracketTaxableOrdinaryIncome * table[oi].marginal_rate / 100

      return Math.floor(ordinaryTax)
    }
    return undefined
  }

  l16 = (): number | undefined => displayNumber(
    sumFields([
      this.f8814?.tax(),
      this.f4972?.tax(),
      this.computeTax()
    ])
  )

  l17 = (): number | undefined => this.schedule2?.l3()
  l18 = (): number | undefined => displayNumber(
    sumFields([
      this.l16(), this.l17()
    ])
  )

  // TODO
  l19 = (): number | undefined => undefined
  l20 = (): number | undefined => this.schedule3?.l7()
  l21 = (): number | undefined => displayNumber(
    sumFields([this.l19(), this.l20()])
  )

  l22 = (): number | undefined => displayNumber(
    computeField(this.l18()) - computeField(this.l21())
  )

  l23 = (): number | undefined => this.schedule2?.l10()
  l24 = (): number | undefined => displayNumber(
    sumFields([this.l22(), this.l23()])
  )

  l25a = (): number | undefined => {
    if (this.w2s.length > 0) {
      this.w2s.map((w2) => w2.fedWithholding).reduce((l, r) => l + r)
    }
    return undefined
  }

  // TODO: 1099s
  l25b = (): number | undefined => undefined

  // TODO: Other withholding forms?
  l25c = (): number | undefined => undefined

  l25d = (): number | undefined => displayNumber(
    sumFields([
      this.l25a(), this.l25b(), this.l25c()
    ])
  )

  // TODO: handle estimated tax payments
  l26 = (): number | undefined => undefined

  l27 = (): number | undefined => this.scheduleEIC?.credit()

  l28 = (): number | undefined => this.schedule8812?.credit()

  l29 = (): number | undefined => this.schedule8863?.l8()

  // TODO: recovery rebate credit?
  l30 = (): number | undefined => undefined

  l31 = (): number | undefined => this.schedule3?.l13()

  l32 = (): number | undefined => displayNumber(
    sumFields([
      this.l27(),
      this.l28(),
      this.l29(),
      this.l30(),
      this.l31()
    ])
  )

  l33 = (): number | undefined => displayNumber(
    sumFields([
      this.l25d(),
      this.l26(),
      this.l32()
    ])
  )

  l34 = (): number | undefined => displayNumber(
    computeField(this.l33()) - computeField(this.l24())
  )

  // TODO: assuming user wants amount refunded
  // rather than applied to estimated tax
  l35a = (): number | undefined => this.l34()
  l36 = (): number | undefined => displayNumber(
    computeField(this.l34()) - computeField(this.l35a())
  )

  l37 = (): number | undefined => displayNumber(
    computeField(this.l24()) - computeField(this.l33())
  )

  // TODO - estimated tax penalty
  l38 = (): number | undefined => displayNumber(
    0
  )

  _depField = (idx: number): string | boolean => {
    const deps: Dependent[] = this.dependents

    // Based on the PDF row we are on, select correct dependent
    const depIdx = Math.floor((idx) / 5)
    const depFieldIdx = idx % 5

    let fieldArr = ['', '', '', false, false]

    if (depIdx < deps.length) {
      const dep = deps[depIdx]
      // Based on the PDF column, select the correct field
      fieldArr = [`${dep.firstName} ${dep.lastName}`, dep.ssid, dep.relationship, false, false]
    }

    return fieldArr[depFieldIdx]
  }

  // 1040 allows 4 dependents listed without a supplemental schedule,
  // so create field mappings for 4x5 grid of fields
  _depFieldMappings = (): Array<string | boolean> =>
    Array.from(Array(20)).map((u, n: number) => this._depField(n))

  fields = (): Array<string | number | boolean> => ([
    this.filingStatus === FilingStatus.S,
    this.filingStatus === FilingStatus.MFJ,
    this.filingStatus === FilingStatus.MFS,
    this.filingStatus === FilingStatus.HOH,
    this.filingStatus === FilingStatus.W,
    '', // TODO: W, MFS, HoH qualifying person
    this.firstNameAndInitial,
    this.lastName,
    this.yourSocialSecurityNumber,
    (this.filingStatus === FilingStatus.MFJ) ? (this.spousesFirstNameAndInitial) : '',
    (this.filingStatus === FilingStatus.MFJ) ? (this.spousesLastName ?? '') : '',
    this.spousesSocialSecurityNumber,
    this.homeAddress,
    this.aptNo,
    this.city,
    this.state,
    this.zip,
    this.foreignCountryName,
    this.province,
    this.postalCode,
    false, // election campaign boxes
    false,
    this.virtualCurrency,
    !this.virtualCurrency,
    this.claimDependentPrimary,
    this.claimDependentSpouse,
    false, // TODO: spouse itemizes separately,
    this.dependents.length > 4,
    this.bornBeforeDate(),
    this.blind(),
    this.spouseBeforeDate(),
    this.spouseBlind(),
    ...this._depFieldMappings(),
    this.l1(),
    this.l2a(),
    this.l2b(),
    this.l3a(),
    this.l3b(),
    this.l4a(),
    this.l4b(),
    this.l5a(),
    this.l5b(),
    this.l6a(),
    this.l6b(),
    this.scheduleD !== undefined,
    this.l7(),
    this.l8(),
    this.l9(),
    this.l10a(),
    this.l10b(),
    this.l10c(),
    this.l11(),
    this.l12(),
    this.l13(),
    this.l14(),
    this.l15(),
    this.f8814 !== undefined,
    this.f4972 !== undefined,
    false, // TODO: other tax form
    '', // TODO: other tax form
    this.l16(),
    this.l17(),
    this.l18(),
    this.l19(),
    this.l20(),
    this.l21(),
    this.l22(),
    this.l23(),
    this.l24(),
    this.l25a(),
    this.l25b(),
    this.l25c(),
    this.l25d(),
    this.l26(),
    this.l27(),
    this.l28(),
    this.l29(),
    this.l30(),
    this.l31(),
    this.l32(),
    this.l33(),
    this.l34(),
    this.f8888 !== undefined,
    this.l35a(),
    this.refund?.routingNumber,
    this.refund?.accountType === AccountType.checking,
    this.refund?.accountType === AccountType.savings,
    this.refund?.accountNumber,
    this.l36(),
    this.l37(),
    this.l38(),
    // TODO: 3rd party
    false,
    false,
    '',
    '',
    '',
    this.w2ForRole(PersonRole.PRIMARY)?.occupation,
    // TODO: pin numbers
    '',
    this.w2ForRole(PersonRole.SPOUSE)?.occupation,
    '',
    this.contactPhoneNumber,
    this.contactEmail,
    // Paid preparer fields:
    '',
    '',
    false,
    '',
    '',
    '',
    ''
  ]).map((x) => x === undefined ? '' : x)
}
