export class EmergencyContactModel {
    id: string;
    user_id: string;
    contactName: string;
    relationship: string;
    contactNumber: string;

    constructor(
        id: string,
        user_id: string,
        contactName: string,
        relationship: string,
        contactNumber: string
    ) {
        this.id = id;
        this.user_id = user_id;
        this.contactName = contactName;
        this.relationship = relationship;
        this.contactNumber = contactNumber;
    }
}
