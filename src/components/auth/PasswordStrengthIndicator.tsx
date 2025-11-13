import { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../utils';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

type StrengthLevel = 'weak' | 'medium' | 'strong' | 'very-strong';

interface Requirement {
  label: string;
  met: boolean;
}

export function PasswordStrengthIndicator({ password, className }: PasswordStrengthIndicatorProps) {
  const requirements: Requirement[] = useMemo(() => {
    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'One lowercase letter', met: /[a-z]/.test(password) },
      { label: 'One number', met: /\d/.test(password) },
    ];
  }, [password]);

  const strength: StrengthLevel = useMemo(() => {
    const metCount = requirements.filter(r => r.met).length;
    if (metCount === 0) return 'weak';
    if (metCount <= 2) return 'weak';
    if (metCount === 3) return 'medium';
    if (metCount === 4) return 'strong';
    return 'very-strong';
  }, [requirements]);

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-blue-500',
    'very-strong': 'bg-green-500',
  };

  const strengthLabels = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    'very-strong': 'Very Strong',
  };

  if (!password) return null;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Password strength</span>
          <span className={cn(
            'font-medium',
            strength === 'weak' && 'text-red-500',
            strength === 'medium' && 'text-yellow-500',
            strength === 'strong' && 'text-blue-500',
            strength === 'very-strong' && 'text-green-500'
          )}>
            {strengthLabels[strength]}
          </span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-300',
              strengthColors[strength]
            )}
            style={{
              width: `${(requirements.filter(r => r.met).length / requirements.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1.5">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            )}
            <span className={cn(
              req.met ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
            )}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

