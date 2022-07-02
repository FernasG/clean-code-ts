import NormalFareCalculator from "../src/NormalFareCalculator";
import OvernightFareCalculator from "../src/OvernightFareCalculator";
import OvernightSundayFareCalculator from "../src/OvernightSundayFareCalculator";
import Ride from "../src/Ride";
import SundayFareCalculator from "../src/SundayFareCalculator";

let ride: Ride;

beforeEach(() => {
    const normalFareCalculator = new NormalFareCalculator();
    const sundayFareCalculator = new SundayFareCalculator(normalFareCalculator);
    const overnightFareCalculator = new OvernightFareCalculator(sundayFareCalculator);
    const overnightSundayFareCalculator = new OvernightSundayFareCalculator(overnightFareCalculator);
    ride = new Ride(overnightSundayFareCalculator);
});

test("Deve calcular o valor da corrida de uma corrida normal", () => {
    ride.addSegment(10, new Date("2021-03-01T10:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(21);
});

test("Deve calcular o valor da corrida de uma corrida em horário noturno", () => {
    ride.addSegment(10, new Date("2021-03-01T23:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(39);
});

test("Deve calcular o valor da corrida de uma corrida no domingo", () => {
    ride.addSegment(10, new Date("2021-03-07T10:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(29);
});

test("Deve calcular o valor da corrida de uma corrida no domingo em horário noturno", () => {
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(50);
});

test("Deve calcular o valor da corrida com a distância inválida", () => {
    expect(() => ride.addSegment(-3, new Date("2021-03-01T10:00:00"))).toThrow(new Error("Invalid Distance"));
});

test("Deve calcular o valor da corrida com a data inválida", () => {
    expect(() => ride.addSegment(10, new Date("abcdef"))).toThrow(new Error("Invalid Date"));
});

test("Deve calcular o valor da corrida com tarifa mínima", () => {
    ride.addSegment(3, new Date("2021-03-01T10:00:00"));
    const fare = ride.finish();
    expect(fare).toBe(10);
});