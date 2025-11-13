import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TestResult {
  success: boolean;
  output?: unknown;
  error?: string;
  timestamp?: string;
  duration?: number;
}

interface TestResultPanelProps {
  result: TestResult;
  onClose?: () => void;
  compact?: boolean;
}

export function TestResultPanel({
  result,
  onClose,
  compact = false,
}: TestResultPanelProps) {
  const [expanded, setExpanded] = useState(!compact);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = JSON.stringify(result.output, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`mt-2 p-2 rounded-lg border ${
          result.success
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-red-500/10 border-red-500/30'
        }`}
      >
        <div className="flex items-center gap-2">
          {result.success ? (
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          )}
          <span className="text-xs font-medium flex-1">
            {result.success ? 'Test passed' : 'Test failed'}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 pt-2 border-t border-border/50"
            >
              {result.error ? (
                <div className="text-xs text-red-600 dark:text-red-400 mb-2">
                  {String(result.error)}
                </div>
              ) : null}
              {result.output ? (
                <div className="text-xs text-muted-foreground">
                  <pre className="whitespace-pre-wrap break-all">
                    {String(JSON.stringify(result.output, null, 2).slice(0, 200))}
                    {String(JSON.stringify(result.output)).length > 200 && '...'}
                  </pre>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-card border border-border rounded-lg shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div
        className={`p-4 border-b border-border ${
          result.success ? 'bg-green-500/5' : 'bg-red-500/5'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {result.success ? (
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">
                {result.success ? 'Test Successful' : 'Test Failed'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {result.timestamp &&
                  new Date(result.timestamp).toLocaleString()}
                {result.duration && ` • ${result.duration}ms`}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {/* Error Message */}
        {result.error ? (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
                  Error
                </div>
                <div className="text-sm text-red-600/80 dark:text-red-400/80">
                  {String(result.error)}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Output */}
        {result.output ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Output</h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Copy className="h-3 w-3" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-muted rounded-lg p-3 overflow-x-auto">
              <pre className="text-xs text-foreground">
                {JSON.stringify(result.output, null, 2)}
              </pre>
            </div>
          </div>
        ) : null}

        {/* Success with no output */}
        {result.success && !result.output && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-sm">Test completed successfully</p>
            <p className="text-xs mt-1">No output data returned</p>
          </div>
        )}
      </div>

      {/* Footer with suggestions */}
      {!result.success && (
        <div className="p-4 bg-muted/50 border-t border-border">
          <h4 className="text-sm font-semibold mb-2">Suggestions</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Check that all required fields are filled</li>
            <li>• Verify your integration credentials are valid</li>
            <li>• Ensure the integration is properly connected</li>
            <li>• Review the error message above for specific details</li>
          </ul>
        </div>
      )}
    </motion.div>
  );
}

// Inline compact version for nodes
export function NodeTestResult({ result }: { result: TestResult }) {
  return <TestResultPanel result={result} compact />;
}

