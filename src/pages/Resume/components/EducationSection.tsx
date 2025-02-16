import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EducationItem from './EducationItem';
import { Education, emptyEducation, Resume } from "@/types/Resume.ts";

type Props = {
  educations: Education[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const EducationSection = ({ educations, setResume }: Props) => {
  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      educations: [...prev.educations, { ...emptyEducation }],
    }));
  };

  const updateEducation = (index: number, updatedEducation: Education) => {
    setResume(prev => ({
      ...prev,
      educations: prev.educations.map((edu, i) =>
        i === index ? updatedEducation : edu
      ),
    }));
  };

  const removeEducation = (index: number) => {
    setResume(prev => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.map((edu, index) => (
          <EducationItem
            key={index}
            education={edu}
            index={index}
            onChange={(updatedEducation) => updateEducation(index, updatedEducation)}
            onRemove={() => removeEducation(index)}
          />
        ))}
        <Button type="button" onClick={addEducation} variant="outline">
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationSection;
