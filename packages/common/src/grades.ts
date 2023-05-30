// This file defines common grading systems and possible values for those systems

export type Grade = BoulderGrade|RopeGrade|NA;

export type NA = "N/A"
export type BoulderGrade = VScale;
export type RopeGrade = Ewbank|YDS;


export enum BoulderGradeScale {
    VScale = "V-Scale",
    FontScale = "Font. Scale",
}
export enum RopeGradeScale {
    Ewbank = "Ewbank Scale",
    YDS = "Yosemite Decimal Scale",
    FrenchScale = "French Scale",
}

// BOULDER GRADING SCALES
    // V-Scale (Boulders - Global)
    export type VScale = {
        type: BoulderGradeScale.VScale
        value: VScaleValues
    }
    export enum VScaleValues {
        "VB-" = "VB-",
        "VB" = "VB",
        "VB+" = "VB+",
        "V0-" = "V0-",
        "V0" = "V0",
        "V0+" = "V0+",
        "V1" = "V1",
        "V2" = "V2",
        "V3" = "V3",
        "V4" = "V4",
        "V5" = "V5",
        "V6" = "V6",
        "V7" = "V7",
        "V8" = "V8",
        "V9" = "V9",
        "V10" = "V10",
        "V11" = "V11",
        "V12" = "V12",
        "V13" = "V13",
        "V14" = "V14",
        "V15" = "V15",
        "V16" = "V16",
        "V17" = "V17"
    }
    

// ROPE GRADING SCALES
    // Ewbank Scale (AU/NZ)
    export type Ewbank = {
        type: RopeGradeScale.Ewbank,
        value: EwbankValues
    }
    export enum EwbankValues {
        Value1 = 1,
        Value2,
        Value3,
        Value4,
        Value5,
        Value6,
        Value7,
        Value8,
        Value9,
        Value10,
        Value11,
        Value12,
        Value13,
        Value14,
        Value15,
        Value16,
        Value17,
        Value18,
        Value19,
        Value20,
        Value21,
        Value22,
        Value23,
        Value24,
        Value25,
        Value26,
        Value27,
        Value28,
        Value29,
        Value30,
        Value31,
        Value32,
        Value33,
        Value34,
        Value35,
        Value36,
        Value37,
        Value38,
        Value39,
        Value40
    }
    // Yosemite Decimal Scale (US)
    export type YDS = {
        type: RopeGradeScale.YDS,
        value: YDSValues,
    }
    export enum YDSValues {
        "3-4" = "3-4",
        "5.0" = "5.0",
        "5.1_" = "5.1",
        "5.2_" = "5.2",
        "5.3_" = "5.3",
        "5.4_" = "5.4",
        "5.5_" = "5.5",
        "5.6_" = "5.6",
        "5.7_" = "5.7",
        "5.8_" = "5.8",
        "5.9_" = "5.9",
        "5.10a" = "5.10a",
        "5.10b" = "5.10b",
        "5.10c" = "5.10c",
        "5.10d" = "5.10d",
        "5.11a" = "5.11a",
        "5.11b" = "5.11b",
        "5.11c" = "5.11c",
        "5.11d" = "5.11d",
        "5.12a" = "5.12a",
        "5.12b" = "5.12b",
        "5.12c" = "5.12c",
        "5.12d" = "5.12d",
        "5.13a" = "5.13a",
        "5.13b" = "5.13b",
        "5.13c" = "5.13c",
        "5.13d" = "5.13d",
        "5.14a" = "5.14a",
        "5.14b" = "5.14b",
        "5.14c" = "5.14c",
        "5.14d" = "5.14d",
        "5.15a" = "5.15a",
        "5.15b" = "5.15b",
        "5.15c" = "5.15c",
        "5.15d" = "5.15d"
    }
    

// Integer range types for Ewbank
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>