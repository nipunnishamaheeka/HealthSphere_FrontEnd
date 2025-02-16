export class HealthLogModel {
    id: string;
    user_id: string;
    date: Date;
    weight: number;
    bloodPressure: string;
    sleepHours: number;
    waterIntake: number;

    constructor(
        id: string,
        user_id: string,
        date: Date,
        weight: number,
        bloodPressure: string,
        sleepHours: number,
        waterIntake: number
    ) {
        this.id = id;
        this.user_id = user_id;
        this.date = date;
        this.weight = weight;
        this.bloodPressure = bloodPressure;
        this.sleepHours = sleepHours
        this.waterIntake = waterIntake;
    }
}