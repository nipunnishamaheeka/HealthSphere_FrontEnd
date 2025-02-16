export class HealthLogModel {
    log_id: string;
    user_id: string;
    date: Date;
    weight: number;
    blood_pressure: string;
    sleep_hours: number;
    water_intake: number;

    constructor(
        log_id: string,
        user_id: string,
        date: Date,
        weight: number,
        blood_pressure: string,
        sleep_hours: number,
        water_intake: number
    ) {
        this.log_id = log_id;
        this.user_id = user_id;
        this.date = date;
        this.weight = weight;
        this.blood_pressure = blood_pressure;
        this.sleep_hours = sleep_hours
        this.water_intake = water_intake;
    }
}