import * as React from 'react';
import { cn } from '../../../shared/utils/cn';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        className={cn('space-y-4', className)}
        ref={ref}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ children, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  );
};

interface FormErrorProps {
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <p className="text-sm text-red-600">{message}</p>
  );
};

export { Form, FormField, FormError };
