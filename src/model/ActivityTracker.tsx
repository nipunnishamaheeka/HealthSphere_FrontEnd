export class ActivityTrackerModel {
    id: string;
    user_id: string;
    date: Date;
    type: string;
    duration: number;
    calories: number;

    constructor(
        id: string,
        user_id: string,
        date: Date,
        type: string,
        duration: number,
        calories: number
    ) {
        this .id = id;
        this.user_id = user_id;
        this.date = date;
        this.type = type;
        this.duration = duration;
        this.calories = calories;
    }
}
