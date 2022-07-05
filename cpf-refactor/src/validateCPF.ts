// @ts-nocheck

function calcVerifyingDigitRest(digit: number): number {
    let rest = (digit % 11);
    return (rest < 2) ? 0 : 11 - rest;
}

export function validateCPF(cpf: string) {
    cpf = cpf.replace('.', '')
        .replace('.', '')
        .replace('-', '')
        .replace(" ", "");

    if (!cpf) throw new Error('Invalid string.');

    if (cpf.length !== 11) throw new Error('Invalid CPF length.');

    if (cpf.split("").every(c => c === cpf[0])) throw new Error('Invalid CPF string.');

    let verifyingDigitSum1 = 0, verifyingDigitSum2 = 0;

    for (let position = 1; position < cpf.length - 1; position++) {
        let digit = parseInt(cpf[position - 1]);

        verifyingDigitSum1 += (11 - position) * digit;
        verifyingDigitSum2 += (12 - position) * digit;
    }

    let verifyingDigit1 = calcVerifyingDigitRest(verifyingDigitSum1);
    verifyingDigitSum2 += 2 * verifyingDigit1;
    let verifyingDigit2 = calcVerifyingDigitRest(verifyingDigitSum2);

    let actualVerifyingDigits = cpf.substring(cpf.length - 2, cpf.length);
    let expectedVerifyingDigits = String(verifyingDigit1) + String(verifyingDigit2);

    return actualVerifyingDigits === expectedVerifyingDigits;
}