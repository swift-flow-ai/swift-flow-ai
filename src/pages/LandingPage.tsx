import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Brain,
  Workflow,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Cpu,
  Network,
  Rocket,
  Clock,
  DollarSign,
  Star,
  Play,
  Quote,
  Target,
  Globe,
  Infinity as InfinityIcon,
  XCircle,
} from 'lucide-react';
import { Button } from '../components/common';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Workflow,
      title: 'Executable Processes',
      description: 'Turn your documented processes into executable workflows. No more outdated wikis or forgotten SOPs.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Visibility',
      description: 'Know exactly what\'s happening across your organization. Track every process, every step, in real-time.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'AI analyzes your processes, suggests improvements, and automates decision-making.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Network,
      title: 'Replace Documentation Tools',
      description: 'Stop maintaining Jira, Notion, and Confluence. Your process IS your documentation.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Cpu,
      title: 'Process Analytics',
      description: 'Understand bottlenecks, measure performance, and optimize continuously.',
      gradient: 'from-red-500 to-rose-500',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Workflows Created', icon: Workflow },
    { value: '50M+', label: 'Tasks Automated', icon: Zap },
    { value: '99.9%', label: 'Uptime SLA', icon: Shield },
    { value: '40hrs', label: 'Saved Per Week', icon: Clock },
  ];

  const useCases = [
    {
      title: 'Employee Onboarding',
      description: 'From offer letter to first day. Track every step, automate approvals, never miss a task. Replace scattered docs with one executable process.',
      icon: '👥',
    },
    {
      title: 'Sales Operations',
      description: 'Lead to close in one view. No more hunting through Salesforce notes. See where every deal stands, what\'s blocking, who needs to act.',
      icon: '💰',
    },
    {
      title: 'Support Escalations',
      description: 'Customer issues don\'t get lost. Automatic routing, SLA tracking, escalation paths. Everyone knows their role, nothing falls through cracks.',
      icon: '🎫',
    },
    {
      title: 'Procurement & Approvals',
      description: 'Purchase requests to invoice payment. Multi-level approvals, budget checks, compliance gates. Full visibility into company spend.',
      icon: '📋',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img src="/logo.svg" alt="Swift Flow AI" className="w-10 h-10" />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#f87855] via-[#f85c39] to-[#ff6b4a] bg-clip-text text-transparent">
                Swift Flow
              </span>
              <div className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                AI Automation
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button 
              variant="secondary" 
              onClick={() => navigate('/login')}
              className="hidden md:flex"
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-[#f87855] to-[#f85c39] hover:from-[#f96d45] hover:to-[#f94d29]"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Start Free Trial
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full mb-8"
            >
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Trusted by 1,000+ Teams Worldwide
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1]">
              Turn Chaos Into
              <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                Automated Magic
              </span>
            </h1>

            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed">
              Stop wasting time on repetitive tasks. Build powerful AI-driven workflows that connect your favorite apps and automate everything.
            </p>

            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto mb-12">
              <strong className="text-foreground">No code required.</strong> Just drag, drop, and watch your business run itself.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                onClick={() => navigate('/signup')}
                className="px-10 py-7 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
              >
                <Rocket className="h-6 w-6 mr-2" />
                Start Free - No Credit Card
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/login')}
                className="px-10 py-7 text-lg font-semibold border-2 hover:bg-muted/50"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>

            {/* Social Proof - Company Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 pt-8 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground mb-6">Trusted by innovative teams at</p>
              <div className="flex items-center justify-center gap-12 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all">
                {['Stripe', 'Shopify', 'Notion', 'Figma', 'Linear'].map((company) => (
                  <div key={company} className="text-2xl font-bold text-muted-foreground">
                    {company}
                  </div>
                ))}
              </div>
            </motion.div>
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

      {/* Problem Section - Documentation vs Execution */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-indigo-500/5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-indigo-500/10 border border-red-500/20 rounded-full mb-6"
            >
              <Zap className="h-4 w-4 text-red-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent">
                The Old Way vs The AI Way
              </span>
            </motion.div>
            <h2 className="text-5xl font-bold mb-6">
              Documentation vs. <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">AI Execution</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stop maintaining outdated docs. Let AI execute your processes in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Way - Glassmorphism with red tint */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-card/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 shadow-2xl">
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-red-500/50 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-red-500/50 rounded-br-3xl" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                    <XCircle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      The Documentation Problem
                    </h3>
                    <p className="text-xs text-muted-foreground">Legacy Approach</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    { icon: "📄", text: "Processes documented in Jira, Notion, Confluence" },
                    { icon: "⏰", text: "Outdated the moment you write them" },
                    { icon: "👁️", text: "No visibility into what's actually happening" },
                    { icon: "🕳️", text: "Things fall through the cracks" },
                    { icon: "📊", text: "Manual tracking in spreadsheets" },
                    { icon: "🔀", text: "Lost context across tools" },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-red-500/20 transition-colors">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <span className="text-foreground/80 group-hover/item:text-foreground transition-colors">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* New Way - Glassmorphism with gradient */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-card/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl">
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-fuchsia-500/50 rounded-br-3xl" />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                  <div className="absolute top-20 right-20 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-500" />
                  <div className="absolute bottom-20 left-20 w-2 h-2 bg-fuchsia-500 rounded-full animate-ping delay-1000" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/50 relative">
                    <Sparkles className="h-7 w-7 text-white animate-pulse" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                      The Swift Flow Way
                    </h3>
                    <p className="text-xs text-muted-foreground">AI-Powered Execution</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    { icon: "🤖", text: "AI executes workflows automatically", gradient: "from-indigo-500 to-purple-500" },
                    { icon: "🔄", text: "Always up-to-date, self-documenting", gradient: "from-purple-500 to-fuchsia-500" },
                    { icon: "📊", text: "100% visibility in real-time", gradient: "from-indigo-500 to-cyan-500" },
                    { icon: "🧠", text: "AI ensures nothing gets missed", gradient: "from-purple-500 to-pink-500" },
                    { icon: "⚡", text: "Automatic tracking and analytics", gradient: "from-fuchsia-500 to-pink-500" },
                    { icon: "🎯", text: "Single source of truth for everything", gradient: "from-indigo-500 to-purple-500" },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform`}>
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <span className="text-foreground/80 group-hover/item:text-foreground transition-colors">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full mb-6"
            >
              <Brain className="h-4 w-4 text-indigo-500 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                AI-Powered Features
              </span>
            </motion.div>
            <h2 className="text-5xl font-bold mb-4">
              Intelligent Automation <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Built-In</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your processes live in Jira tickets, Notion pages, and Confluence wikis. 
              By the time you read them, they're already outdated. <strong className="text-foreground">Make them executable with AI instead.</strong>
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
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group cursor-pointer"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`} />
                
                {/* Card */}
                <div className="relative bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Animated corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    {/* Orbiting dot */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 animate-ping`} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full mb-6"
            >
              <Target className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Real-World Applications
              </span>
            </motion.div>
            <h2 className="text-5xl font-bold mb-4">
              Real Processes, <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Real Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how teams are replacing documentation with AI-powered execution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group cursor-pointer"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Card */}
                <div className="relative bg-card/80 backdrop-blur-sm border border-border group-hover:border-primary/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300" />
                  
                  <div className="relative z-10">
                    {/* Icon with gradient background */}
                    <div className="relative inline-flex mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <span className="text-4xl">{useCase.icon}</span>
                      </div>
                      {/* Orbiting ring */}
                      <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Hover indicator with arrow */}
                    <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-sm font-medium">Explore workflow</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about Swift Flow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Swift Flow transformed how we handle onboarding. What used to take 2 weeks now takes 2 days. Everything is automated and nothing falls through the cracks.",
                author: "Sarah Chen",
                role: "Head of HR",
                company: "TechCorp",
                rating: 5,
              },
              {
                quote: "We replaced 5 different tools with Swift Flow. Our invoice approval process went from 7 days to 2 hours. The ROI was immediate.",
                author: "Michael Rodriguez",
                role: "CFO",
                company: "FinanceHub",
                rating: 5,
              },
              {
                quote: "The AI-powered routing is incredible. Support tickets automatically go to the right team. Our response time dropped by 60%.",
                author: "Emily Watson",
                role: "Support Director",
                company: "CustomerFirst",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              The Numbers Don't Lie
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Average results from teams using Swift Flow for 3 months
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                value: "40 hrs",
                label: "Saved Per Week",
                description: "Time recovered from manual tasks",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: DollarSign,
                value: "$50K+",
                label: "Annual Savings",
                description: "Average cost reduction per team",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: TrendingUp,
                value: "3x",
                label: "Faster Execution",
                description: "Process completion speed",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Target,
                value: "99%",
                label: "Accuracy Rate",
                description: "Elimination of human error",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mx-auto mb-4`}>
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="font-semibold mb-2">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 bg-gradient-to-b from-muted/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for trying out Swift Flow",
                features: [
                  "5 active workflows",
                  "100 executions/month",
                  "Basic integrations",
                  "Community support",
                  "7-day execution history",
                ],
                cta: "Start Free",
                popular: false,
              },
              {
                name: "Professional",
                price: "$49",
                description: "For growing teams and businesses",
                features: [
                  "Unlimited workflows",
                  "10,000 executions/month",
                  "All integrations",
                  "Priority support",
                  "90-day execution history",
                  "Advanced analytics",
                  "Team collaboration",
                  "Custom integrations",
                ],
                cta: "Start 14-Day Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Everything in Professional",
                  "Unlimited executions",
                  "Dedicated support",
                  "SLA guarantees",
                  "Custom deployment",
                  "Advanced security",
                  "SSO & SAML",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card border-2 rounded-2xl p-8 hover:shadow-2xl transition-all relative ${
                  plan.popular ? 'border-primary scale-105' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  onClick={() => navigate('/signup')}
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                      : ''
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              All plans include 14-day money-back guarantee • No credit card required for free plan
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-sm">99.9% uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <InfinityIcon className="h-5 w-5 text-primary" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </motion.div>
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
                Ready to Make Your Processes Executable?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Stop documenting. Start executing. See what's really happening in your business.
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
          <p className="mt-2">Turn your processes into executable workflows. Stop documenting, start executing.</p>
        </div>
      </footer>
    </div>
  );
}

