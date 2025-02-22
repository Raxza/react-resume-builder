import { useEffect, useState } from 'react';
import { Resume } from '@/types/Resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { handleGetAllResumes } from '@/lib/IndexedDB/resumeStore';
import { TrashIcon } from '@heroicons/react/16/solid';

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
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <Button onClick={() => navigate('/resume/create')} variant="outline">
        Create Resume
      </Button>
      {resumes.map((resume) => (
        <Card key={resume.id} onClick={() => navigate(`/resume/edit/${resume.id}`)} className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <CardHeader>
            <div className='flex w-full justify-between'>
              <CardTitle className='flex-1'>{resume.title}</CardTitle>
              <Button variant={'destructive'}><TrashIcon /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex w-full justify-between'>
              <div className='flex-1'/>
              <h3 className='flex-shrink-0'>Last Modified: {new Date(resume.lastModifiedTime).toLocaleDateString()}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default ResumeList;
