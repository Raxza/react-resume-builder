import { buttonVariants } from "@/components/ui/util/button-variants"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import { motion } from 'framer-motion'
import ResumeList from "../Resume"
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation();

  return (
    <article className="pt-16 grid lg:grid-cols-2 min-h-dvh">
      <section className="prose prose-headings:text-foreground prose-p:text-foreground prose-h1:m-0 prose-h2:mt-0
      p-4 mx-auto">
        <motion.div
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>{t('home.title')}</h1>
        </motion.div>
        <motion.div
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2>{t('home.subtitle')}</h2>
        </motion.div>
        <motion.div
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p>{t('home.description')}</p>
        </motion.div>
        <motion.div
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <div className="not-prose">
            <Link className={buttonVariants()} to={'/resume/create'}>
              {t('nav.create')}
            </Link>
          </div>
        </motion.div>
      </section>
      <section className="p-4">
        <h2 className="font-bold text-2xl inline-block mr-4">{t('home.createdResumes')}</h2>
        <Link className={buttonVariants({ variant: "outline" })} to={'/resume/create'}>
          <Plus />
        </Link>
        <ResumeList />
      </section>
    </article>
  )
}

export default Home