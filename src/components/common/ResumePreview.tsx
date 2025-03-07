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
  const { email, phone, address, summary, experiences, educations, others } = resume;
  const userInfo = [phone, email, address].filter(Boolean).join(" | ");
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const resPrev = resumePreviewRef.current;
    if (resPrev) {
      const resArt = resPrev;
      resArt.classList.add(
        'max-w-full', 'print', 
      //   'prose-h3:-mb-4', 'prose-h5:-mt-1', 'prose-h5:-mb-4', 
      //   'prose-p:-mt-2', 'prose-p:mb-2',
      //   'prose-em:-mt-2',
      //   'prose-hr:-mb-1', 'prose-hr:border-2', 'prose-hr:-mx-4',
      //   'prose-ul:-mt-2', 'bg-white'
      );
      // resArt.classList.add(
      //   'max-w-full', 'print',
      //   'prose-h3:-mb-4', 'prose-h5:-mb-5',
      //   'prose-em:-mt-4',
      //   'prose-hr:-mb-1',
      // );
      // resArt.classList.remove('border-2', 'prose-hr:bv-2', 'prose-p:mt-0', 'prose-p:mb-4');
      resArt.classList.remove('border-2')

      // Get all stylesheet links from the current document
      const styleSheets = Array.from(document.styleSheets);
      let styles = '';
      styleSheets.forEach((sheet) => {
        try {
          const rules = sheet.cssRules || sheet.rules;
          for (const rule of rules) {
            styles += rule.cssText;
          }
        } catch (e) {
          console.warn('Could not load stylesheet', e);
        }
      });

      // Create new window with content
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <style>${styles}</style>
            </head>
            <body>
              ${resArt.outerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <div>
      <Button type="button" onClick={handlePrint} className="absolute right-0 rounded-none rounded-bl-3xl">
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
                <article key={"exp" + index} className="pl-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold inline">{company}</h5>
                      {location &&
                        <p className="text-gray-500 ps-1 inline">{location}</p>
                      }
                    </div>
                    {company &&
                      <span>{startDate && format(startDate, "MMM yyyy")}
                        {startDate && (endDate ? ` - ${format(endDate, "MMM yyyy")}` : isCurrent ? " - Present" : "")}
                      </span>
                    }
                  </div>
                  {company &&
                    <em>{position}</em>
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
                <article key={"edu" + index} className="pl-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold inline">{institution}</h5>
                      {location &&
                        <p className="text-gray-500 ps-1 inline">{location}</p>
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
          </section>
          : null}
        {others.length ?
          <section>
            <h4>Skills, Achievements, & Other Experience</h4>
            <hr />
            {others.map((other, index) => {
              const { type, value } = other;
            return (
            <article className="pl-2">
              <strong>{type}</strong>
              <ul><li>{value}</li></ul>
            </article>
            )
            })}
          </section>
          : null}
      </article>
    </div>
  );
};

export default ResumePreview;
