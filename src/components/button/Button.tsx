'use client'
import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, disabled  }) => {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;