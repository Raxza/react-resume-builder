import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OtherItem from './OtherItem';
import { Other, emptyOther, Resume } from "@/types/Resume.ts";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Props = {
  others: Other[],
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const AdditionalInformation = ({ others, setResume }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(others.length > 0 ? 0 : null);

  const addOther = () => {
    const newIndex = others.length;
    setResume(prev => ({
      ...prev,
      others: [...prev.others, { ...emptyOther }],
    }));
    setActiveIndex(newIndex);
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
        <AnimatePresence initial={false}>
          {others.map((other, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <OtherItem
                other={other}
                index={index}
                isActive={activeIndex === index}
                onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
                onChange={(updatedOther) => updateOther(index, updatedOther)}
                onRemove={() => removeOther(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <Button type="button" onClick={addOther} variant="outline">
          Add Other Information
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdditionalInformation;
