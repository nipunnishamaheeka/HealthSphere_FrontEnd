import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Inputs';
import { Label } from '../components/common/Lable';
import { AlertCircle, Plus, Share2, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '../components/common/Alerts';

interface Contact {
    id: number;
    name: string;
    relationship: string;
    phone: string;
    email: string;
}

const EmergencyContact: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        {
            id: 1,
            name: "John Doe",
            relationship: "Father",
            phone: "+1 (555) 123-4567",
            email: "john.doe@email.com"
        }
    ]);

    const addContact = () => {
        const newContact: Contact = {
            id: contacts.length + 1,
            name: "",
            relationship: "",
            phone: "",
            email: ""
        };
        setContacts([...contacts, newContact]);
    };

    const removeContact = (id: number) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                    <CardDescription>
                        Add emergency contacts who should be notified in case of a medical emergency.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Make sure to keep your emergency contacts up to date and inform them that they're listed here.
                        </AlertDescription>
                    </Alert>

                    {contacts.map((contact) => (
                        <div key={contact.id} className="space-y-4 p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">Contact {contact.id}</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeContact(contact.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`name-${contact.id}`}>Full Name</Label>
                                    <Input
                                        id={`name-${contact.id}`}
                                        placeholder="Enter full name"
                                        value={contact.name}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`relationship-${contact.id}`}>Relationship</Label>
                                    <Input
                                        id={`relationship-${contact.id}`}
                                        placeholder="e.g. Parent, Spouse, Sibling"
                                        value={contact.relationship}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`phone-${contact.id}`}>Phone Number</Label>
                                    <Input
                                        id={`phone-${contact.id}`}
                                        placeholder="Enter phone number"
                                        value={contact.phone}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`email-${contact.id}`}>Email Address</Label>
                                    <Input
                                        id={`email-${contact.id}`}
                                        placeholder="Enter email address"
                                        type="email"
                                        value={contact.email}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={addContact}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact
                    </Button>

                    <Button>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Health Report
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default EmergencyContact;
