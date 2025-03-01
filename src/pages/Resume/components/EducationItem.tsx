import { useState } from 'react';
import { Education, DegreeType } from "@/types/Resume.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import DatePicker from '@/components/ui/DatePicker';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  education: Education,
  index: number,
  isActive: boolean,
  onToggle: () => void,
  onChange: (education: Education) => void,
  onRemove: () => void
}

const EducationItem = ({ education, index, isActive, onToggle, onChange, onRemove }: Props) => {

  const updateInstitution = (value: string) => {
    onChange({ ...education, institution: value });
  };

  const updateDegree = (value: DegreeType | string) => {
    const isDegreeType = Object.values(DegreeType).includes(value as DegreeType);
    if (isDegreeType && value !== DegreeType.Add) {
      onChange({ ...education, degree: value as DegreeType, customDegree: '' });
    } else {
      onChange({ ...education, degree: value as DegreeType });
    }
  };

  const updateLocation = (value: string) => {
    onChange({ ...education, location: value });
  }

  const updateCustomDegree = (value: string) => {
    onChange({ ...education, customDegree: value });
  };

  const updateMajor = (value: string) => {
    onChange({ ...education, major: value });
  }

  const updateScore = (value: string) => {
    onChange({ ...education, score: value ?? null });
  };

  const updateMaxScore = (value: string) => {
    onChange({ ...education, maxScore: value ?? null });
  };

  const updateStartDate = (date: Date | null) => {
    onChange({ ...education, startDate: date || new Date() });
  };

  const updateEndDate = (date: Date | null) => {
    onChange({ ...education, endDate: date || new Date() });
  };

  const updateHighlight = (index: number, value: string) => {
    const highlights = [...education.highlights];
    highlights[index] = value;
    onChange({ ...education, highlights });
  };

  const addHighlight = () => {
    const highlights = [...education.highlights, ''];
    onChange({ ...education, highlights });
  };

  const removeHighlight = (index: number) => {
    const highlights = [...education.highlights];
    highlights.splice(index, 1);
    onChange({ ...education, highlights });
  };

  const updateIsCurrent = (value: boolean) => {
    if (value)
      onChange({ ...education, isCurrent: value, endDate: null });
    else
      onChange({ ...education, isCurrent: value });
  };

  return (
    <div key={index} className="space-y-4 p-4 border rounded">
      <div className="flex justify-between items-center">
        <h3>Education {index + 1}</h3>
        <div className="flex space-x-2">
          <Button type="button" onClick={onToggle} variant="outline" size="sm">
            {!isActive ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
          </Button>
          <Button type="button" onClick={onRemove} variant="outline" size="sm">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={education.institution}
                  onChange={e => updateInstitution(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <div className='flex flex-row gap-2'>
                    <Select
                      value={education.degree || undefined}
                      onValueChange={value => updateDegree(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DegreeType).map(degree => (
                          <SelectItem key={degree} value={degree}>
                            {degree}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {education.degree === DegreeType.Add && (
                      <Input
                        value={education.customDegree}
                        onChange={e => updateCustomDegree(e.target.value)}
                        placeholder="Enter degree type"
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={education.location}
                    onChange={e => updateLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className='col-span-2 space-y-2'>
                  <Label>Major</Label>
                  <Input
                    value={education.major}
                    onChange={e => updateMajor(e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label>GPA/Score</Label>
                  <Input
                    type='number'
                    placeholder='example: 4.00'
                    value={education.score || undefined}
                    onChange={e => updateScore(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Out Of</Label>
                  <Input
                    type='number'
                    placeholder='example: 4.00'
                    value={education.maxScore || undefined}
                    onChange={e => updateMaxScore(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker
                    label="Start Date"
                    views={["year", "month"]}
                    value={education.startDate}
                    onChange={updateStartDate}
                    disableFuture
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker
                    label="End Date"
                    views={["year", "month"]}
                    value={education.endDate}
                    disabled={education.isCurrent}
                    disableFuture
                    onChange={updateEndDate}
                  />
                  <div className="flex items-start space-x-2 ms-1">
                    <Input
                      type="checkbox"
                      checked={education.isCurrent}
                      onChange={e => updateIsCurrent(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label>Currently studying here</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2 space-x-2">
                <Label>Highlights</Label>
                {education.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex items-center space-x-2">
                    <Input
                      value={highlight}
                      onChange={e => updateHighlight(hIndex, e.target.value)}
                      className="mb-2"
                    />
                    <Button type="button" onClick={() => removeHighlight(hIndex)} variant="outline" size="sm">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addHighlight} variant="outline" size="sm">
                  Add Highlight
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationItem;
