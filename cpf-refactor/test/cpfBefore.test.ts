import { validate } from "../src/cpfBefore";

test("Deve validar CPF válido", () => {
    const result = validate('308.021.220-78');
    expect(result).toBe(true);
});

test("Deve validar CPF inválido", () => {
    const result = validate('236.987.321-09');
    expect(result).toBe(false);
});

test("Deve validar CPF nulo", () => {
    const result = validate(null);
    expect(result).toBe(false);
});

test("Deve validar CPF com todos caracteres iguais", () => {
    const result = validate('111.111.111-11');
    expect(result).toBe(false);
});

test("Deve validar CPF com carátericos alfabéticos", () => {
    const result = validate(' ');
    expect(result).toBe(false);
});