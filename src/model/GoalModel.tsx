export class GoalSettingModel {
    goal_id: string;
    user_id: string;
    goal_type: string;
    goal_value: string;
    current_progress: number;
    target_date: Date;

    constructor(
        goal_id: string,
        user_id: string,
        goal_type: string,
        goal_value: string,
        current_progress: number,
        target_date: Date
    ) {
        this.goal_id = goal_id;
        this.user_id = user_id;
        this.goal_type = goal_type;
        this.goal_value = goal_value;
        this.current_progress = current_progress;
        this.target_date = target_date;
    }
}