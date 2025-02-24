import { useEffect, useState } from 'react';
import { Resume } from '@/types/Resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { handleGetAllResumes } from '@/lib/IndexedDB/resumeStore';
import { Trash } from 'lucide-react';

const ResumeList = () => {
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
      {resumes.map((resume) => (
        <Card key={resume.id} onClick={() => navigate(`/resume/edit/${resume.id}`)} className="cursor-pointer flex items-center justify-between hover:bg-accent hover:text-foreground">
          <CardHeader>
            <CardTitle>{resume.title}</CardTitle>
            <span>Last Modified: {new Date(resume.lastModifiedTime).toLocaleDateString()}</span>
          </CardHeader>
          <CardContent className='py-0'>
            <Button variant={'destructive'}><Trash /></Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeList;
