import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Inputs';
import { Label } from '../components/common/Lable';
import { AlertCircle, Plus, Share2, Trash2, Phone, Mail, User, UserRound } from 'lucide-react';
import { Alert, AlertDescription } from '../components/common/Alerts';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { addContact, removeContact, updateContact } from '../store/slices/ContactsSlice';
import type { Contact } from '../types/type';

const EmergencyContact: React.FC = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(state => state.contacts.contacts);
    const error = useAppSelector(state => state.contacts.error);

    const handleInputChange = (id: number, field: keyof Contact, value: string) => {
        const contact = contacts.find(c => c.id === id);
        if (contact) {
            dispatch(updateContact({ ...contact, [field]: value }));
        }
    };

    const handleAddContact = () => {
        const newContact: Contact = {
            id: Date.now(),
            name: "",
            relationship: "",
            phone: "",
            email: ""
        };
        dispatch(addContact(newContact));
    };

    const handleRemoveContact = (id: number) => {
        if (contacts.length > 1) {
            dispatch(removeContact(id));
        }
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
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="space-y-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-200"
                        >
                            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
                                <div className="flex items-center space-x-2">
                                    <UserRound className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Contact {contacts.indexOf(contact) + 1}
                                    </h3>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveContact(contact.id)}
                                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
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
                                            value={contact.name}
                                            onChange={(e) => handleInputChange(contact.id, 'name', e.target.value)}
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
                                        onChange={(e) => handleInputChange(contact.id, 'relationship', e.target.value)}
                                        className="border-gray-200 dark:border-gray-700"
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
                                            value={contact.phone}
                                            onChange={(e) => handleInputChange(contact.id, 'phone', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`email-${contact.id}`} className="text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id={`email-${contact.id}`}
                                            className="pl-10"
                                            placeholder="Enter email address"
                                            type="email"
                                            value={contact.email}
                                            onChange={(e) => handleInputChange(contact.id, 'email', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <Button
                        variant="outline"
                        onClick={handleAddContact}
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