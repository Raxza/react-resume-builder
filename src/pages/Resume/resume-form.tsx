import { Resume, ResumeVersion } from "@/types/Resume.ts";
import { Button } from '@/components/ui/button';
import PersonalInformation from './components/PersonalInformation';
import WorkExperience from './components/WorkExperience';
import EducationSection from './components/EducationSection';
import AdditionalInformation from './components/AdditionalInformation';
import { Input } from '@/components/ui/input';
import { handleAddResume, handleUpdateResume, handleGetResumeById, getResumeVersions } from '@/lib/IndexedDB/resumeStore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ResumePreview from '@/components/common/ResumePreview';
import { useEffect, useState } from "react";
import { ChevronLeft, Eye, EyeOff, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/util/button-variants";
import { motion, AnimatePresence } from "framer-motion";

const ResumeForm = () => {
  const { id } = useParams();
  const [resume, setResume] = useState<Resume>({
    title: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    experiences: [],
    educations: [],
    others: [],
    lastModifiedTime: Date.now(),
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [showVersions, setShowVersions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        const fetchedResume = await handleGetResumeById(Number(id));
        if (!fetchedResume) {
          console.error('Resume not found');
          navigate('/');
        } else {
          setResume(fetchedResume);
        }
      };
      fetchResume();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (id) {
      const fetchVersions = async () => {
        const resumeVersions = await getResumeVersions(Number(id));
        setVersions(resumeVersions.sort((a, b) => b.version - a.version));
      };
      fetchVersions();
    }
  }, [id]);

  const handleSave = async () => {
    const updatedResume = {
      ...resume,
      lastModifiedTime: Date.now(),
    };
    const result = id ? await handleUpdateResume(updatedResume) : await handleAddResume(updatedResume);
    if (result.status === 'success') {
      console.log(id ? 'Resume updated successfully' : 'Resume saved successfully');
      navigate('/');
    } else {
      console.error(id ? 'Error updating resume' : 'Error saving resume', result.data);
    }
  };

  const handleVersionSelect = (version: ResumeVersion) => {
    setResume(version.data);
  };

  const pages = [
    {
      title: "Personal Information",
      content: (
        <PersonalInformation name={resume.name} email={resume.email} phone={resume.phone} address={resume.address} summary={resume.summary} setResume={setResume} />
      ),
      isValid: resume.name.trim() !== ''
    },
    {
      title: "Work Experience",
      content: (
        <WorkExperience experiences={resume.experiences} setResume={setResume} />
      ),
      isValid: resume.experiences.every(exp => exp.company && exp.position && exp.startDate && (exp.endDate || exp.isCurrent))
    },
    {
      title: "Education",
      content: (
        <EducationSection educations={resume.educations} setResume={setResume} />
      ),
      isValid: resume.educations.every(edu => edu.institution && edu.degree && edu.startDate && (edu.endDate || edu.isCurrent))
    },
    {
      title: "Additional Information",
      content: (
        <AdditionalInformation others={resume.others} setResume={setResume} />
      ),
      isValid: true
    },
  ];

  const page = pages[currentPage];

  return (
    <main className="py-4 pt-14 grid xl:grid-cols-2 items-start justify-center gap-4 sm:mx-12 relative overflow-hidden">
      <motion.form 
        layout="position"
        transition={{ 
          duration: 0.5,
          type: "spring",
          bounce: 0.1
        }}
        className={`w-full max-w-xl mx-auto ${showPreview ? '' : 'xl:col-span-2 xl:mx-auto'}`}
      >
        <header className="flex gap-4 justify-between" aria-labelledby="Form Header">
          <div className="flex gap-4">
            <Input
              type="text"
              id="title"
              value={resume.title}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              placeholder='Resume Title'
              className='w-40'
              required
            />
            {id && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowVersions(!showVersions)}
              >
                <Clock className="w-4 h-4 mr-2" />
                Version History
              </Button>
            )}
          </div>
        </header>

        {showVersions && versions.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="my-4 p-4 border rounded-md"
          >
            <h3 className="font-semibold mb-2">Version History</h3>
            <div className="space-y-2">
              {versions.map((version) => (
                <Button
                  key={version.id}
                  type="button"
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleVersionSelect(version)}
                >
                  <span>Version {version.version + 1}</span>
                  <span className="ml-2 text-muted-foreground">
                    {new Date(version.createdAt).toLocaleString()}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-[auto_1fr_auto] py-4 gap-4 justify-between">
          <Link className={buttonVariants({ variant: "outline" })} to={'/'}>
            <ChevronLeft />
          </Link>
          <nav aria-labelledby="Form Navigation">
            <ul className="flex items-center">
              {pages.map((_, index) => {
                const aintThisPage = index !== currentPage;
                const isInvalid = !page.isValid && aintThisPage;

                return [
                  <li key={`step-${index}`}>
                    <Button 
                      type="button" 
                      className="rounded-full w-8 h-8 disabled:bg-primary/70 aria-disabled:bg-primary/70 aria-disabled:opacity-50"
                      aria-disabled={index > currentPage}
                      disabled={isInvalid} 
                      onClick={() => setCurrentPage(index)}
                    >
                      {index + 1}
                    </Button>
                  </li>,
                  index < pages.length - 1 && (
                    <li key={`separator-${index}`} aria-hidden="true" className="w-full">
                      <Separator 
                        aria-disabled={isInvalid || index >= currentPage} 
                        className="bg-primary aria-disabled:bg-primary/70 aria-disabled:opacity-50 h-1" 
                      />
                    </li>
                  )
                ]
              })}
            </ul>
          </nav>
          <Button type="button" variant={"ghost"} onClick={() => setShowPreview(!showPreview)} aria-labelledby="Toggle Resume Preview">
            {showPreview ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {page.content}

        <div className="flex justify-between mt-6">
          {currentPage > 0 ? (
            <Button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </Button>
          ) : (
            <div className="flex-1" />
          )}

          {currentPage < pages.length - 1 ? (
            <Button
              type="button"
              disabled={!page.isValid}
              onClick={() => {
                if (page.isValid) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </Button>
          ) : (
            <Button type="button" disabled={!page.isValid} onClick={handleSave}>
              {id ? 'Update Resume' : 'Save Resume'}
            </Button>
          )}
        </div>
      </motion.form>
      
      <AnimatePresence mode="popLayout">
        {showPreview && (
          <motion.aside 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              bounce: 0.1
            }}
            className="w-full max-w-xl relative"
          >
            <ResumePreview resume={resume} scale={0.85} />
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ResumeForm;