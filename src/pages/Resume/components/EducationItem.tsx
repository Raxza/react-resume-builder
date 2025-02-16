import { useState } from 'react';
import { Education, DegreeType } from "@/types/Resume.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import DatePicker from '@/components/ui/DatePicker';

type Props = {
  education: Education,
  index: number,
  onChange: (education: Education) => void,
  onRemove: () => void
}

const EducationItem = ({ education, index, onChange, onRemove }: Props) => {
  const [isMinimized, setIsMinimized] = useState(false);

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

  const updateCustomDegree = (value: string) => {
    onChange({ ...education, customDegree: value });
  };

  const updateStartDate = (date: Date | null) => {
    onChange({ ...education, startDate: date ? date.toISOString().slice(0, 7) : '' });
  };

  const updateEndDate = (date: Date | null) => {
    onChange({ ...education, endDate: date ? date.toISOString().slice(0, 7) : '' });
  };

  const updateSummary = (value: string) => {
    onChange({ ...education, summary: value });
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
    onChange({ ...education, isCurrent: value });
  };

  return (
    <div key={index} className="space-y-4 p-4 border rounded">
      <div className="flex justify-between items-center">
        <h3>Education {index + 1}</h3>
        <div className="flex items-center space-x-2">
          <Button type="button" onClick={() => setIsMinimized(!isMinimized)} variant="outline" size="sm">
            {isMinimized ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
          </Button>
          <Button type="button" onClick={onRemove} variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="space-y-2">
            <Label>Institution</Label>
            <Input
              value={education.institution}
              onChange={e => updateInstitution(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Degree</Label>
            <Select
              value={education.degree}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                label="Start Date"
                views={["year", "month"]}
                value={education.startDate ? new Date(education.startDate) : null}
                onChange={updateStartDate}
                disableFuture
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker
                label="End Date"
                views={["year", "month"]}
                value={education.endDate ? new Date(education.endDate) : null}
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
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea
              value={education.summary}
              onChange={e => updateSummary(e.target.value)}
              required
            />
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
        </>
      )}
    </div>
  );
};

export default EducationItem;
