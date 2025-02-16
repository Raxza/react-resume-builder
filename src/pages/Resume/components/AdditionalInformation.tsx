import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OtherItem from './OtherItem';
import { Other, emptyOther, Resume } from "@/types/Resume.ts";

type Props = {
  others: Other[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const AdditionalInformation = ({ others, setResume }: Props) => {
  const addOther = () => {
    setResume(prev => ({
      ...prev,
      others: [...prev.others, { ...emptyOther }],
    }));
  };

  const updateOther = (index: number, updatedOther: Other) => {
    setResume(prev => ({
      ...prev,
      others: prev.others.map((other, i) =>
        i === index ? updatedOther : other
      ),
    }));
  };

  const removeOther = (index: number) => {
    setResume(prev => ({
      ...prev,
      others: prev.others.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {others.map((other, index) => (
          <OtherItem
            key={index}
            other={other}
            index={index}
            onChange={(updatedOther) => updateOther(index, updatedOther)}
            onRemove={() => removeOther(index)}
          />
        ))}
        <Button type="button" onClick={addOther} variant="outline">
          Add Other Information
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdditionalInformation;
