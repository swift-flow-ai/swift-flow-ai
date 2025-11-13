import { cn } from '../../utils';

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    xs: 'h-4 w-4 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const initials = fallback || alt.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className={cn('relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 font-medium text-primary', sizeClasses[size], className)}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

