import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Rocket, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../common';

interface WaitlistFormProps {
  onClose?: () => void;
}

export function WaitlistForm({ onClose }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual waitlist API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, you would send this to your backend:
      // await fetch('https://your-api.com/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, name, company, useCase })
      // });

      console.log('Waitlist submission:', { email, name, company, useCase });
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">You're on the list! 🎉</h3>
        <p className="text-muted-foreground mb-6">
          We'll notify you at <strong>{email}</strong> when we launch.
        </p>
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Rocket className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Join the Waitlist</h2>
        <p className="text-muted-foreground">
          Be the first to know when we launch. Get early access and exclusive benefits.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company (Optional)
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label htmlFor="useCase" className="block text-sm font-medium mb-2">
            What will you use it for? (Optional)
          </label>
          <textarea
            id="useCase"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Tell us about your automation needs..."
          />
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full bg-gradient-to-r from-[#f87855] to-[#f85c39] hover:from-[#f96d45] hover:to-[#f94d29]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              <Rocket className="h-4 w-4 mr-2" />
              Join Waitlist
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By joining, you agree to receive updates about our launch.
          <br />
          We respect your privacy and won't spam you.
        </p>
      </form>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto block"
        >
          Maybe later
        </button>
      )}
    </motion.div>
  );
}

