'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  UserPlus, 
  Settings, 
  Mail, 
  Phone, 
  Calendar,
  Activity,
  FileText,
  MessageSquare,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Crown,
  Shield,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  avatar: string
  joinedAt: string
  lastActive: string
  status: 'active' | 'inactive' | 'pending'
  contentCount: number
  projects: string[]
}

interface Team {
  id: string
  name: string
  description: string
  avatar: string
  memberCount: number
  createdAt: string
  owner: string
}

interface Invitation {
  id: string
  email: string
  role: string
  status: 'pending' | 'accepted' | 'expired'
  sentAt: string
  expiresAt: string
  sentBy: string
}

interface Activity {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
  type: 'content' | 'team' | 'settings' | 'billing'
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('members')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [isInviting, setIsInviting] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')

  const teams: Team[] = [
    {
      id: '1',
      name: 'ContentCraft Team',
      description: 'Main content creation team',
      avatar: '/team-avatar.jpg',
      memberCount: 5,
      createdAt: '2024-01-01',
      owner: 'John Doe'
    }
  ]

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'owner',
      avatar: '/john-avatar.jpg',
      joinedAt: '2024-01-01',
      lastActive: '2024-01-30T10:30:00Z',
      status: 'active',
      contentCount: 47,
      projects: ['Blog Content', 'Social Media']
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
      avatar: '/jane-avatar.jpg',
      joinedAt: '2024-01-15',
      lastActive: '2024-01-29T14:20:00Z',
      status: 'active',
      contentCount: 23,
      projects: ['Email Marketing', 'Product Descriptions']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'member',
      avatar: '/mike-avatar.jpg',
      joinedAt: '2024-01-20',
      lastActive: '2024-01-28T09:15:00Z',
      status: 'active',
      contentCount: 15,
      projects: ['Social Media']
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'member',
      avatar: '/sarah-avatar.jpg',
      joinedAt: '2024-01-25',
      lastActive: '2024-01-27T16:45:00Z',
      status: 'inactive',
      contentCount: 8,
      projects: ['Blog Content']
    }
  ]

  const invitations: Invitation[] = [
    {
      id: '1',
      email: 'new.member@example.com',
      role: 'member',
      status: 'pending',
      sentAt: '2024-01-28',
      expiresAt: '2024-02-11',
      sentBy: 'John Doe'
    }
  ]

  const activities: Activity[] = [
    {
      id: '1',
      user: 'John Doe',
      action: 'created',
      target: '10 Ways to Improve Your SEO Strategy',
      timestamp: '2024-01-30T10:30:00Z',
      type: 'content'
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'edited',
      target: 'Product Launch Announcement',
      timestamp: '2024-01-30T09:15:00Z',
      type: 'content'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'invited',
      target: 'new.member@example.com',
      timestamp: '2024-01-28T14:20:00Z',
      type: 'team'
    },
    {
      id: '4',
      user: 'Sarah Wilson',
      action: 'published',
      target: 'Monthly Newsletter - October 2024',
      timestamp: '2024-01-27T16:45:00Z',
      type: 'content'
    }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'text-purple-600 bg-purple-50'
      case 'admin':
        return 'text-blue-600 bg-blue-50'
      case 'member':
        return 'text-green-600 bg-green-50'
      case 'viewer':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4" />
      case 'admin':
        return <Shield className="w-4 h-4" />
      case 'member':
        return <Users className="w-4 h-4" />
      case 'viewer':
        return <Eye className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50'
      case 'inactive':
        return 'text-gray-600 bg-gray-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'content':
        return <FileText className="w-4 h-4 text-blue-600" />
      case 'team':
        return <Users className="w-4 h-4 text-purple-600" />
      case 'settings':
        return <Settings className="w-4 h-4 text-gray-600" />
      case 'billing':
        return <Crown className="w-4 h-4 text-green-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || member.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleInviteMember = async () => {
    if (!inviteEmail) return
    
    setIsInviting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsInviting(false)
    setInviteEmail('')
    alert(`Invitation sent to ${inviteEmail}`)
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
              <p className="text-gray-600">Manage your team members, roles, and permissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              {/* Team Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{teamMembers.length}</p>
                        <p className="text-sm text-gray-600">Total Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'active').length}</p>
                        <p className="text-sm text-gray-600">Active</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Crown className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{teamMembers.filter(m => m.role === 'owner' || m.role === 'admin').length}</p>
                        <p className="text-sm text-gray-600">Admins</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{invitations.filter(i => i.status === 'pending').length}</p>
                        <p className="text-sm text-gray-600">Pending</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Invite Member */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Invite Team Member</span>
                  </CardTitle>
                  <CardDescription>
                    Send an invitation to join your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        type="email"
                      />
                    </div>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleInviteMember} disabled={isInviting || !inviteEmail}>
                      {isInviting ? (
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <UserPlus className="w-4 h-4 mr-2" />
                      )}
                      Send Invite
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members List */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage your team members and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getRoleColor(member.role)}>
                                <div className="flex items-center space-x-1">
                                  {getRoleIcon(member.role)}
                                  <span>{member.role}</span>
                                </div>
                              </Badge>
                              <Badge className={getStatusColor(member.status)}>
                                {member.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">{member.contentCount} pieces</p>
                            <p className="text-xs text-gray-500">Content created</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatRelativeTime(member.lastActive)}</p>
                            <p className="text-xs text-gray-500">Last active</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invitations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Invitations</CardTitle>
                  <CardDescription>
                    Manage pending team invitations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invitations.filter(i => i.status === 'pending').map((invitation) => (
                      <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{invitation.email}</h3>
                            <p className="text-sm text-gray-600">
                              Invited by {invitation.sentBy} • Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRoleColor(invitation.role)}>
                            {invitation.role}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Resend
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {invitations.filter(i => i.status === 'pending').length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <p className="text-gray-600">No pending invitations</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Activity</CardTitle>
                  <CardDescription>
                    Recent activity from your team members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-gray-600"> {activity.action} </span>
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Settings</CardTitle>
                    <CardDescription>
                      Configure your team preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="teamName">Team Name</Label>
                      <Input id="teamName" defaultValue="ContentCraft Team" />
                    </div>
                    <div>
                      <Label htmlFor="teamDescription">Team Description</Label>
                      <Textarea id="teamDescription" defaultValue="Main content creation team" />
                    </div>
                    <div>
                      <Label htmlFor="defaultRole">Default Role for New Members</Label>
                      <Select defaultValue="member">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                    <CardDescription>
                      Manage team permissions and access levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Content Creation</h4>
                          <p className="text-sm text-gray-600">Allow members to create content</p>
                        </div>
                        <Badge className="bg-green-50 text-green-600">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Team Management</h4>
                          <p className="text-sm text-gray-600">Allow admins to manage team</p>
                        </div>
                        <Badge className="bg-green-50 text-green-600">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Billing Access</h4>
                          <p className="text-sm text-gray-600">Allow access to billing information</p>
                        </div>
                        <Badge className="bg-red-50 text-red-600">Owners Only</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}