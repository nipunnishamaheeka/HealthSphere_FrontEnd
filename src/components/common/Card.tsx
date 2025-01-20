import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return <div className={`rounded-lg shadow-md bg-white ${className}`}>{children}</div>;
};

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
    return <div className={`border-b p-4 ${className}`}>{children}</div>;
};

interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
    return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};

interface CardDescriptionProps {
    children: ReactNode;
    className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
    return <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>;
};

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
};

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
    return <div className={`border-t p-4 mt-auto ${className}`}>{children}</div>;
};