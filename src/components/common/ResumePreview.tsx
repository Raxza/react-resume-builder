// import { useRef } from "react";
import { DegreeType, Resume } from "@/types/Resume";
import { format } from "date-fns";
import { useRef } from "react";
import '@/styles/page.css';
import { Button } from "../ui/button";

type Props = {
  resume: Resume;
  scale: number;
};

const ResumePreview = ({ resume }: Props) => {
  const { email, phone, address, summary, experiences, educations } = resume;
  const userInfo = [phone, email, address].filter(Boolean).join(" | ");
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const resPrev = resumePreviewRef.current;
    if (resPrev) {
      const resArt = resPrev;
      resArt.classList.add(
        'max-w-full', 'print', 'prose-hr:border-2', 'prose-h3:-mb-4', 'prose-h5:-mt-1', 'prose-h5:-mb-4', 'prose-hr:-mx-4', 'prose-p:-mt-2', 'prose-p:mb-2',
        'prose-ul:-mt-2', 'bg-white'
      );
      resArt.classList.remove('border-2');
      const printContents = resArt.outerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <div>
      <Button type="button" onClick={handlePrint} className="absolute right-0 xl:right-4 rounded-none rounded-bl-3xl">
        Print Resume
      </Button>
      <article id="resumePreview" ref={resumePreviewRef} className="mx-auto xl:m-0 aspect-[5/7] p-4 border-2 rounded-sm border-gray-200
      prose prose-h4:mt-0 prose-hr:border prose-hr:border-gray-500 prose-hr:mb-2 prose-p:mt-0 prose-p:mb-4
      prose-hr:-mx-1
      prose-ul:mt-0 prose-ol:mt-0 prose-ul:pl-4 prose-ol:pl-2
      text-justify md:text-base break-words dynamic-texts
      dark:bg-white" >
        <h3 className="mb-0">{resume.name.toUpperCase()}</h3>
        {userInfo ? <span className="text-gray-500">{userInfo}</span> : null}
        {summary ? <p>{resume.summary}</p> : null}
        {experiences.length ?
          <section>
            <h4>Work Experience</h4>
            <hr />
            {experiences.map((experience, index) => {
              const { company, location, position, startDate, endDate, isCurrent, highlights } = experience;
              return (
                <article key={index} className="pl-2">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-bold inline">{company}</h5>
                      {location &&
                        <h5 className="font-thin text-gray-500 ps-2 inline">{location}</h5>
                      }
                    </div>
                    {company &&
                      <span>{startDate && format(startDate, "MMM yyyy")}
                        {startDate && (endDate ? ` - ${format(endDate, "MMM yyyy")}` : isCurrent ? " - Present" : "")}
                      </span>
                    }
                  </div>
                  {company &&
                    <div><em>{position}</em></div>
                  }
                  <ul>
                    {highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </section>
          : null}
        {educations.length ?
          <section>
            <h4>Education</h4>
            <hr />
            {educations.map((education, index) => {
              const { institution, location, startDate, endDate, isCurrent } = education;
              return (
                <article key={index} className="pl-2">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-bold inline">{institution}</h5>
                      {location &&
                        <h5 className="font-thin text-gray-500 ps-2 inline">{location}</h5>
                      }
                    </div>
                    <span>
                      {startDate && format(startDate, "MMM yyyy")}
                      {startDate && (endDate ? ` - ${format(endDate, "MMM yyyy")}` : isCurrent ? " - Present" : "")}
                    </span>
                  </div>
                  <div>
                    <em>
                      {education.degree !== DegreeType.Add ? education.degree : education.customDegree} {(education.degree !== DegreeType.Add || education.customDegree) && education.major && `in ${education.major}`}
                      {education.score && ` (${education.score}${education.maxScore ? `/${education.maxScore})` : ")"}`}
                    </em>
                  </div>
                  <ul>
                    {education.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </section> : null
        }
      </article>
    </div>
  );
};

export default ResumePreview;
