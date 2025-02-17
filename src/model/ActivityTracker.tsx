export class ActivityTrackerModel {
    activity_id: string;
    user_id: string;
    date: Date;
    exerciseType: string;
    duration: number;
    caloriesBurned: number;

    constructor(
        activity_id: string,
        user_id: string,
        date: Date,
        exerciseType: string,
        duration: number,
        caloriesBurned: number
    ) {
        this.activity_id = activity_id;
        this.user_id = user_id;
        this.date = date;
        this.exerciseType = exerciseType;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
    }
}
