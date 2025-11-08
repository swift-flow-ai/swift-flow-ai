import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Brain,
  Workflow,
  Bot,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Cpu,
  Network,
  Rocket,
} from 'lucide-react';
import { Button } from '../components/common';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Automation',
      description: 'Let AI handle complex workflows with intelligent decision-making and natural language processing.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Execute workflows in milliseconds with our optimized AI engine and smart caching.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Bot,
      title: 'Smart Assistants',
      description: 'AI assistants that learn from your patterns and suggest optimizations automatically.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Network,
      title: 'Intelligent Routing',
      description: 'AI analyzes content and routes tasks to the right team members automatically.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Cpu,
      title: 'ML-Powered Insights',
      description: 'Machine learning models predict bottlenecks and recommend improvements.',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: Shield,
      title: 'AI Security',
      description: 'Advanced AI monitors for anomalies and protects your workflows 24/7.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  const stats = [
    { value: '10M+', label: 'Workflows Executed', icon: Workflow },
    { value: '99.9%', label: 'AI Accuracy', icon: Brain },
    { value: '5x', label: 'Faster Processing', icon: Zap },
    { value: '24/7', label: 'AI Monitoring', icon: Shield },
  ];

  const useCases = [
    {
      title: 'AI Document Processing',
      description: 'Extract, classify, and route documents with 99% accuracy using GPT-4 and custom ML models.',
      icon: '📄',
    },
    {
      title: 'Smart Customer Support',
      description: 'AI analyzes tickets, suggests responses, and routes to the right team automatically.',
      icon: '🎫',
    },
    {
      title: 'Intelligent Approvals',
      description: 'ML models review requests, flag risks, and auto-approve based on learned patterns.',
      icon: '✅',
    },
    {
      title: 'Predictive Analytics',
      description: 'AI forecasts trends, identifies bottlenecks, and optimizes resource allocation.',
      icon: '📊',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Swift Flow AI
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="primary" onClick={() => navigate('/signup')}>
              Get Started Free
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Automate Everything
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                With AI Intelligence
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Build powerful workflows with AI that thinks, learns, and adapts. 
              From document processing to customer support, let AI handle the complexity.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="primary"
                onClick={() => navigate('/signup')}
                className="px-8 py-6 text-lg"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Start Building Free
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/login')}
                className="px-8 py-6 text-lg"
              >
                Watch Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Floating AI Badges */}
            <div className="flex items-center justify-center gap-6 mt-12">
              {['GPT-4', 'Claude', 'Gemini', 'Custom ML'].map((ai, index) => (
                <motion.div
                  key={ai}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="px-4 py-2 bg-card border border-border rounded-lg shadow-lg"
                >
                  <span className="text-sm font-medium">{ai}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              AI-Powered Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI capabilities that transform how you work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Real-World AI Applications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how AI transforms business processes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-card to-primary/5 border border-border rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10">
              <Sparkles className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Supercharge Your Workflows?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of teams using AI to automate their business
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/signup')}
                  className="px-8 py-6 text-lg bg-white text-primary hover:bg-gray-100"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Get Started Free
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/login')}
                  className="px-8 py-6 text-lg bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Sign In
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Swift Flow AI</span>
          </div>
          <p>© 2024 Swift Flow AI. All rights reserved.</p>
          <p className="mt-2">Powered by GPT-4, Claude, and Custom ML Models</p>
        </div>
      </footer>
    </div>
  );
}

