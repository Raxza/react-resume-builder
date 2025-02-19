import {
  emptyEducation,
  emptyExperience,
  emptyOther,
  Resume,
} from "@/types/Resume.ts";
import { Button } from '@/components/ui/button';
import PersonalInformation from './components/PersonalInformation';
import WorkExperience from './components/WorkExperience';
import EducationSection from './components/EducationSection';
import AdditionalInformation from './components/AdditionalInformation';
import { Input } from '@/components/ui/input';
import { handleUpdateResume, handleGetResumeById } from '@/lib/IndexedDB/resumeStore';
import { useNavigate, useParams } from 'react-router-dom';
import ResumePreview from '@/components/common/ResumePreview';
import { useEffect, useState } from "react";
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

const ResumeEdit = () => {
  const { id } = useParams();
  const [resume, setResume] = useState<Resume>({
    id: 0,
    title: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    experiences: [emptyExperience],
    educations: [emptyEducation],
    others: [emptyOther],
    lastModifiedTime: Date.now(),
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      const fetchedResume = await handleGetResumeById(Number(id));
      if (!fetchedResume) {
        console.error('Resume not found');
        navigate('/');
      } else {
        console.log(fetchResume);
        setResume(fetchedResume);
      }
    };
    fetchResume();
  }, [id]);

  const handleSave = async () => {
    const updatedResume = {
      ...resume,
      lastModifiedTime: Date.now(),
    };
    const result = await handleUpdateResume(updatedResume);
    if (result.status === 'success') {
      console.log('Resume updated successfully');
      navigate('/');
    } else {
      console.error('Error updating resume', result.data);
    }
  };

  if (!resume) {
    return <div>Loading...</div>;
  }

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
      isValid: resume.experiences.every(exp => exp.company && exp.position && exp.startDate && exp.summary)
    },
    {
      title: "Education",
      content: (
        <EducationSection educations={resume.educations} setResume={setResume} />
      ),
      isValid: resume.educations.every(edu => edu.institution && edu.degree && edu.startDate && edu.summary)
    },
    {
      title: "Additional Information",
      content: (
        <AdditionalInformation others={resume.others} setResume={setResume} />
      ),
      isValid: resume.others.every(other => other.type && other.value)
    },
  ];

  const page = pages[currentPage];

  return (
    <div className="flex">
      <form className="max-w-4xl mx-auto p-6 space-y-6 flex-1">
      <ChevronLeftIcon className="h-10 w-10 cursor-pointer" onClick={() => navigate('/')} />
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Input
              type="text"
              id="title"
              value={resume.title}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              placeholder='Resume Title'
              className='w-40'
              required
            />
          </div>
          {showPreview ? (
            <EyeSlashIcon className="h-7 w-7 cursor-pointer" onClick={() => setShowPreview(false)} />
          ) : (
            <EyeIcon className="h-7 w-7 cursor-pointer" onClick={() => setShowPreview(true)} />
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          {pages.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
              >
                {index + 1}
              </div>
              {index < pages.length - 1 && (
                <div className={`flex-1 h-1 ${index < currentPage ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
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
              Save Resume
            </Button>
          )}
        </div>
      </form>
      {showPreview && (
        <div className="flex-1 p-6">
          <ResumePreview resume={resume} />
        </div>
      )}
    </div>
  );
};

export default ResumeEdit;
