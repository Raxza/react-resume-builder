import { useEffect, useState } from 'react';
import { Resume } from '@/types/Resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { handleGetAllResumes, handleDeleteResume } from '@/lib/IndexedDB/resumeStore';
import { Trash, Pencil } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ResumeListProps {
  onSelect?: (resume: Resume) => void;
  onDelete?: (id: number) => void;
}

const ResumeList = ({ onSelect, onDelete }: ResumeListProps) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      const allResumes = await handleGetAllResumes();
      setResumes(allResumes);
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await handleDeleteResume(id);
    if (result.status === 'success') {
      setResumes(resumes.filter(resume => resume.id !== id));
      onDelete?.(id);
    }
    setDeleteId(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 grid">
      {resumes.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-muted-foreground">
            You haven't created any resumes yet. Click the + button above to get started!
          </p>
        </div>
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
              <Button 
                variant='destructive'
                onClick={() => setDeleteId(resume.id!)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the resume and all its previous versions.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeList;
