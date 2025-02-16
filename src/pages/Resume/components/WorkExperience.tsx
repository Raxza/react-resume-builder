import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExperienceItem from './ExperienceItem';
import { Experience, emptyExperience, Resume } from "@/types/Resume.ts";

type Props = {
  experiences: Experience[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const WorkExperience = ({ experiences, setResume }: Props) => {
  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...emptyExperience }],
    }));
  };

  const updateExperience = (index: number, updatedExperience: Experience) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? updatedExperience : exp
      ),
    }));
  };

  const removeExperience = (index: number) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            experience={exp}
            index={index}
            onChange={(updatedExperience) => updateExperience(index, updatedExperience)}
            onRemove={() => removeExperience(index)}
          />
        ))}
        <Button type="button" onClick={addExperience} variant="outline">
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkExperience;
