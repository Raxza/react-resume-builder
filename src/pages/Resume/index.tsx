import { useEffect, useState } from 'react';
import { Resume } from '@/types/Resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { handleGetAllResumes } from '@/lib/IndexedDB/resumeStore';
import { Trash, Pencil } from 'lucide-react';

interface ResumeListProps {
  onSelect?: (resume: Resume) => void;
  showPreview?: boolean;
}

const ResumeList = ({ onSelect, showPreview }: ResumeListProps) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      const allResumes = await handleGetAllResumes();
      setResumes(allResumes);
    };
    fetchResumes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 grid">
      {resumes.length === 0 ? (
        <Card className="text-center p-6">
          <CardContent>
            <p className="text-muted-foreground">
              You haven't created any resumes yet. Click the + button above to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        resumes.map((resume) => (
          <Card 
            key={resume.id} 
            className="flex items-center justify-between hover:bg-accent/50"
          >
            <CardHeader 
              className="cursor-pointer"
              onClick={() => onSelect?.(resume)}
            >
              <CardTitle>{resume.title}</CardTitle>
              <span>Last Modified: {new Date(resume.lastModifiedTime).toLocaleDateString()}</span>
            </CardHeader>
            <CardContent className='py-0 flex gap-2'>
              <Button 
                variant="outline"
                onClick={() => navigate(`/resume/edit/${resume.id}`)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant='destructive'>
                <Trash className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ResumeList;
