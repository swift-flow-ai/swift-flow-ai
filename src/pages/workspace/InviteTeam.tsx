import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button, Input } from '../../components/common';

interface TeamMember {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export function InviteTeam() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceName = searchParams.get('workspace') || 'your workspace';
  
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [emailError, setEmailError] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const roles = [
    {
      value: 'admin' as const,
      label: 'Admin',
      description: 'Can manage workspace settings and members',
    },
    {
      value: 'editor' as const,
      label: 'Editor',
      description: 'Can create and edit workflows',
    },
    {
      value: 'viewer' as const,
      label: 'Viewer',
      description: 'Can view workflows and approve tasks',
    },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddMember = () => {
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (teamMembers.some(m => m.email === email)) {
      setEmailError('This email has already been added');
      return;
    }

    const newMember: TeamMember = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role: selectedRole,
    };

    setTeamMembers([...teamMembers, newMember]);
    setEmail('');
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const handleSendInvites = async () => {
    if (teamMembers.length === 0) {
      navigate('/app/home');
      return;
    }

    setIsInviting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Call API to send invites
      // await workspaceService.inviteMembers(workspaceId, teamMembers);
      
      navigate('/app/home');
    } catch (error) {
      console.error('Failed to send invites:', error);
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Invite your team</h1>
          <p className="text-muted-foreground">
            Start collaborating by inviting team members to <span className="font-semibold text-foreground">{workspaceName}</span>
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl shadow-lg overflow-hidden"
        >
          {/* Add Member Form */}
          <div className="p-6 border-b border-border">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                  error={emailError}
                />
              </div>
              
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'editor' | 'viewer')}
                className="px-4 py-2.5 rounded-lg bg-transparent border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              <Button onClick={handleAddMember}>
                <Mail className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Role Info */}
            <div className="mt-3 text-xs text-muted-foreground">
              <strong className="capitalize">{selectedRole}:</strong> {roles.find(r => r.value === selectedRole)?.description}
            </div>
          </div>

          {/* Team Members List */}
          {teamMembers.length > 0 ? (
            <div className="p-6 space-y-3">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Team members ({teamMembers.length})
              </h3>
              
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <UserPlus className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">No team members added yet</p>
              <p className="text-sm text-muted-foreground">
                Add email addresses above to invite your team
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="p-6 bg-muted/30 border-t border-border">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>You can invite more people later</span>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/app/home')}
                  disabled={isInviting}
                >
                  Skip for now
                </Button>
                <Button
                  onClick={handleSendInvites}
                  disabled={isInviting}
                >
                  {isInviting ? (
                    'Sending invites...'
                  ) : teamMembers.length > 0 ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Send {teamMembers.length} invite{teamMembers.length !== 1 ? 's' : ''}
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          <div className="text-center p-4 rounded-lg bg-card/50 border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Admin</div>
            <p className="text-xs text-muted-foreground">Full access</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-card/50 border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Editor</div>
            <p className="text-xs text-muted-foreground">Can edit</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-card/50 border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Viewer</div>
            <p className="text-xs text-muted-foreground">Read only</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

