import { useState } from 'react';
import { Experience } from "@/types/Resume.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import DatePicker from '@/components/ui/DatePicker';

type Props = {
  experience: Experience,
  index: number,
  onChange: (experience: Experience) => void,
  onRemove: () => void
}

const ExperienceItem = ({ experience, index, onChange, onRemove }: Props) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const updateCompany = (value: string) => {
    onChange({ ...experience, company: value });
  };

  const updatePosition = (value: string) => {
    onChange({ ...experience, position: value });
  };

  const updateLocation = (value: string) => {
    onChange({ ...experience, location: value });
  }

  const updateStartDate = (date: Date | null) => {
    onChange({ ...experience, startDate: date || new Date() });
  };

  const updateEndDate = (date: Date | null) => {
    onChange({ ...experience, endDate: date || new Date() });
  };

  const updateHighlight = (index: number, value: string) => {
    const highlights = [...experience.highlights];
    highlights[index] = value;
    onChange({ ...experience, highlights });
  };

  const addHighlight = () => {
    const highlights = [...experience.highlights, ''];
    onChange({ ...experience, highlights });
  };

  const removeHighlight = (index: number) => {
    const highlights = [...experience.highlights];
    highlights.splice(index, 1);
    onChange({ ...experience, highlights });
  };

  const updateIsCurrent = (value: boolean) => {
    if (value) {
      onChange({ ...experience, isCurrent: value, endDate: null });
    } else {
      onChange({ ...experience, isCurrent: value });
    }
  };

  return (
    <div key={index} className="space-y-4 p-4 border rounded">
      <div className="flex justify-between items-center">
        <h3>Experience {index + 1}</h3>
        <div className="flex space-x-2">
          <Button type="button" onClick={() => setIsMinimized(!isMinimized)} variant="outline" size="sm">
            {isMinimized ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
          </Button>
          <Button type="button" onClick={onRemove} variant="outline" size="sm">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input
              value={experience.company}
              onChange={e => updateCompany(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Position</Label>
            <Input
              value={experience.position}
              onChange={e => updatePosition(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={experience.location}
              onChange={e => updateLocation(e.target.value)}
              required
            />
          </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <DatePicker
                label="Start Date"
                views={["year", "month"]}
                value={experience.startDate}
                maxDate={experience.endDate}
                disableFuture
                onChange={updateStartDate}
              />
            </div>
            <div className="space-y-2">
              <DatePicker
                label="End Date"
                views={["year", "month"]}
                value={experience.endDate}
                disabled={experience.isCurrent}
                minDate={experience.startDate}
                disableFuture
                onChange={updateEndDate}
              />
              <div className="flex items-start space-x-2 ms-1">
                <Input
                  type="checkbox"
                  checked={experience.isCurrent}
                  onChange={e =>
                    updateIsCurrent(e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <Label>Currently working here</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2 space-x-2">
            <Label>Highlights</Label>
            {experience.highlights.map((highlight, hIndex) => (
              <div key={hIndex} className="flex items-center space-x-2">
                <Input
                  value={highlight}
                  onChange={e => updateHighlight(hIndex, e.target.value)}
                  className="mb-2"
                />
                <Button type="button" onClick={() => removeHighlight(hIndex)} variant="outline" size="sm">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addHighlight()}
              variant="outline"
              size="sm"
            >
              Add Highlight
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceItem;