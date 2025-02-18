export class EmergencyContactModel {
    user_id: string;
    contact_name: string;
    relationship: string;
    contact_number: string;

    constructor(
        user_id: string,
        contact_name: string,
        relationship: string,
        contact_number: string
    ) {
        this.user_id = user_id;
        this.contact_name = contact_name;
        this.relationship = relationship;
        this.contact_number = contact_number;
    }
}
