import { ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'font-semibold rounded-full transition-all duration-200 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-md hover:shadow-lg',
        secondary: 'bg-gray-800 hover:bg-gray-900 text-white shadow-md hover:shadow-lg',
        outline: 'border-2 border-gray-300 hover:border-yellow-500 hover:text-yellow-500 text-gray-700',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}>
        {children}
        </button>
    )

}
