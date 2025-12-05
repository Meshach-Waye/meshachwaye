import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, User, FileText, Calendar, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface ContactSubmission {
  id: number;
  created_at: string;
  Name: string | null;
  Email: string | null;
  "Project Type": string | null;
  Message: string | null;
}

const Admin = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!isAdmin) {
        setLoadingData(false);
        return;
      }

      const { data, error } = await supabase
        .from('Website Contact Form')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSubmissions(data);
      }
      setLoadingData(false);
    };

    if (user && isAdmin) {
      fetchSubmissions();
    } else if (!isLoading) {
      setLoadingData(false);
    }
  }, [user, isAdmin, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <h1 className="font-display text-4xl mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">View contact form submissions</p>

        {!isAdmin ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto mb-4">
              <Inbox className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have admin privileges to view contact submissions.
            </p>
          </div>
        ) : loadingData ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <Inbox className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Submissions Yet</h2>
            <p className="text-muted-foreground">
              Contact form submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="glass-card rounded-xl p-6">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-medium">{submission.Name || 'No name'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{submission.Email || 'No email'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="capitalize">{submission["Project Type"]?.replace('-', ' ') || 'No type'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(submission.created_at), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                </div>
                <p className="text-foreground/80 whitespace-pre-wrap">
                  {submission.Message || 'No message'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
