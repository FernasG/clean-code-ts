import { validateCPF } from "../src/validateCPF";

test("Deve validar CPF válido", () => {
    const result = validateCPF('308.021.220-78');
    expect(result).toBe(true);
});

test("Deve validar CPF inválido", () => {
    const result = validateCPF('236.987.321-09');
    expect(result).toBe(false);
});

test("Deve validar CPF válido com digito verificador igual a 0", () => {
    const result = validateCPF('693.875.190-07');
    expect(result).toBe(true);
})

test("Deve validar CPF com todos caracteres iguais", () => {
    expect(() => validateCPF('111.111.111-11')).toThrow(new Error('Invalid CPF string.'));
});

test("Deve validar CPF com tamanho inválido", () => {
    expect(() => validateCPF('123.456.789-0')).toThrow(new Error('Invalid CPF length.'));
});

test("Deve validar CPF inválido", () => {
    expect(() => validateCPF('')).toThrow(new Error('Invalid string.'));
});