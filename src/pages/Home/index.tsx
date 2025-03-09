import { buttonVariants } from "@/components/ui/util/button-variants"
import { Link } from "react-router-dom"
import { Plus, EyeOff } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import ResumeList from "../Resume"
import { useState } from "react"
import { Resume } from "@/types/Resume"
import ResumePreview from "@/components/common/ResumePreview"
import { Button } from "@/components/ui/button"

const Home = () => {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const handleResumeSelect = (resume: Resume) => {
    setSelectedResume(resume);
  };

  const handleTogglePreview = () => {
    setSelectedResume(null);
  };

  return (
    <article className="pt-16 grid xl:grid-cols-2 min-h-dvh">
      {!selectedResume && (
        <motion.section
          layout="position"
          transition={{
            duration: 0.5,
            type: "spring",
            bounce: 0.1
          }}
          className={`w-full max-w-xl mx-auto`}
        >
          <section className="prose prose-headings:text-foreground prose-p:text-foreground prose-h1:m-0 prose-h2:mt-0 p-4">
            <motion.div
              initial={{ x: 70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="not-prose">
                <h1 className="text-primary text-4xl font-bold">React Resume Builder</h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2>Create Your Perfect Resume with Ease</h2>
            </motion.div>
            <motion.div
              initial={{ x: 70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <p>Build a professional, tailored resume in minutes with React Resume Builder!<br />
                No more hassle. No more templates. Just a fast, intuitive, and easy-to-use tool to get your resume ready for success!
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
            >
              <div className="not-prose">
                <Link className={buttonVariants()} to={'/resume/create'}>
                  Create Resume
                </Link>
              </div>
            </motion.div>
          </section>
        </motion.section>
      )}
      <motion.section className={`w-full max-w-xl mx-auto p-4`}>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-bold text-2xl flex-1">Created Resume</h2>
          {selectedResume &&
            <Button type="button" variant="ghost" onClick={handleTogglePreview}>
              <EyeOff className="w-4 h-4" />
            </Button>
          }
          <Link className={buttonVariants({ variant: "outline" })} to={'/resume/create'}>
            <Plus className="w-4 h-4" />
          </Link>
        </div>
        <ResumeList 
          onSelect={handleResumeSelect} 
          onDelete={(id) => {
            if (selectedResume?.id === id) {
              setSelectedResume(null);
            }
          }}
        />
      </motion.section>

      <AnimatePresence mode="popLayout">
        {selectedResume && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              bounce: 0.1
            }}
            className="w-full max-w-xl mx-auto relative"
          >
            <ResumePreview resume={selectedResume} scale={0.85} />
          </motion.aside>
        )}
      </AnimatePresence>
    </article>
  )
}

export default Home