import React, {useEffect, useState} from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Inputs';
import { Label } from '../components/common/Lable';
import {  Plus, Share2, Trash2, Phone, Mail, User, UserRound } from 'lucide-react';
import { Alert, AlertDescription } from '../components/common/Alerts';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import {
    deleteEmergencyContact,
    getEmergencyContacts,
    saveEmergencyContact,
    updateEmergencyContact
} from '../store/slices/ContactsSlice';
import {EmergencyContactModel} from "../model/EmergencyContactModel";

const EmergencyContact: React.FC = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector((state) => state.contacts);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({

        contactName: "",
        relationship: "",
        contactNumber: "",
    });

    // State to track which contact is being edited
    const [editingContactId, setEditingContactId] = useState<string | null>(null);

    useEffect(() => {
        console.log("Fetching Emergency Contacts");
        dispatch(getEmergencyContacts())
            .unwrap()
            .then(() => console.log("Contacts fetched successfully"))
            .catch((error) => {
                console.error("Error fetching contacts:", error);
                setError(typeof error === 'string' ? error : "Failed to fetch contacts");
            });
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle input change for existing contacts
    const handleContactInputChange = (contactId: string, field: string, value: string) => {
        const updatedContacts = contacts.map(contact => {
            if (contact.id === contactId) {
                return { ...contact, [field]: value };
            }
            return contact;
        });
        // Update the local state without dispatching an action
        const contactToUpdate = updatedContacts.find(c => c.id === contactId);
        if (contactToUpdate) {
            // This is a visual update only until save is clicked
            console.log(`Updated field ${field} for contact ${contactId}`);
        }
    };

    const handleAddContact = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Adding new contact:", formData);

        // Create new contact with the correct model structure
        const newContact = new EmergencyContactModel(
            crypto.randomUUID(),
            "U12345",
            formData.contactName,
            formData.relationship,
            formData.contactNumber
        );

        dispatch(saveEmergencyContact(newContact))
            .unwrap()
            .then(() => {
                console.log("Contact added successfully", newContact);
                setFormData({
                    contactName: "",
                    relationship: "",
                    contactNumber: "",
                });
            })
            .catch((error) => {
                console.error("Error adding contact:", error);
                setError(typeof error === 'string' ? error : "Failed to add contact");
            });
    };

    const handleUpdateContact = (contact: any) => {
        // Create an updated contact model with the correct structure
        const updatedContact = new EmergencyContactModel(
            contact.id,
            contact.user_id,
            contact.contactName,
            contact.relationship,
            contact.contactNumber
        );

        dispatch(updateEmergencyContact(updatedContact))
            .unwrap()
            .then(() => {
                console.log(`Contact with id: ${contact.id} updated successfully`);
                setEditingContactId(null);
            })
            .catch((error) => {
                console.error("Error updating contact:", error);
                setError(typeof error === 'string' ? error : "Failed to update contact");
            });
    };

    const handleRemoveContact = (id: string) => {
        console.log(`Deleting contact with id: ${id}`);
        dispatch(deleteEmergencyContact(id))
            .unwrap()
            .then(() => {
                console.log(`Contact with id: ${id} deleted successfully`);
            })
            .catch((error) => {
                console.error("Error deleting contact:", error);
                setError(typeof error === 'string' ? error : "Failed to delete contact");
            });
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
            <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-blue-500" />
                        <CardTitle>Emergency Contacts</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                        Keep your emergency contacts updated for quick access during medical emergencies.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                            <AlertDescription className="text-red-700 dark:text-red-300">
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Display existing contacts */}
                    {contacts.map((contact, index) => (
                        <div
                            key={contact.id}
                            className="space-y-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-200"
                        >
                            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
                                <div className="flex items-center space-x-2">
                                    <UserRound className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Contact {index + 1}
                                    </h3>
                                </div>
                                <div className="flex space-x-2">
                                    {editingContactId === contact.id ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleUpdateContact(contact)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setEditingContactId(contact.id)}
                                            className="text-gray-500 hover:text-blue-500"
                                        >
                                            <User className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveContact(contact.id)}
                                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor={`name-${contact.id}`} className="text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id={`name-${contact.id}`}
                                            className="pl-10"
                                            placeholder="Enter full name"
                                            value={contact.contactName}
                                            onChange={(e) => handleContactInputChange(contact.user_id, 'contact_name', e.target.value)}
                                            disabled={editingContactId !== contact.id}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`relationship-${contact.id}`} className="text-gray-700 dark:text-gray-300">
                                        Relationship
                                    </Label>
                                    <Input
                                        id={`relationship-${contact.id}`}
                                        placeholder="e.g. Parent, Spouse, Sibling"
                                        value={contact.relationship}
                                        onChange={(e) => handleContactInputChange(contact.user_id, 'relationship', e.target.value)}
                                        className="border-gray-200 dark:border-gray-700"
                                        disabled={editingContactId !== contact.id}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`phone-${contact.id}`} className="text-gray-700 dark:text-gray-300">
                                        Phone Number
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id={`phone-${contact.id}`}
                                            className="pl-10"
                                            placeholder="Enter phone number"
                                            value={contact.contactNumber}
                                            onChange={(e) => handleContactInputChange(contact.user_id, 'contact_number', e.target.value)}
                                            disabled={editingContactId !== contact.id}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add new contact form */}
                    <div className="space-y-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg border-dashed">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                            Add New Contact
                        </h3>

                        <form onSubmit={handleAddContact} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="contactName" className="text-gray-700 dark:text-gray-300">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="contactName"
                                        name="contactName"
                                        className="pl-10"
                                        placeholder="Enter full name"
                                        value={formData.contactName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="relationship" className="text-gray-700 dark:text-gray-300">
                                    Relationship
                                </Label>
                                <Input
                                    id="relationship"
                                    name="relationship"
                                    placeholder="e.g. Parent, Spouse, Sibling"
                                    value={formData.relationship}
                                    onChange={handleInputChange}
                                    className="border-gray-200 dark:border-gray-700"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contactNumber" className="text-gray-700 dark:text-gray-300">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        className="pl-10"
                                        placeholder="Enter phone number"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 flex justify-end mt-4">
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Contact
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <Button
                        variant="outline"
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        className="w-full sm:w-auto"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Contact
                    </Button>

                    <Button
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Emergency Contacts
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default EmergencyContact;