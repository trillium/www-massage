interface TemplateProps {
  title: string,
  text: string
}

export default function Template({ title, text }: TemplateProps) {
  return (
    <div className="pt-8 sm:pt-16 pb-4 sm:pb-16">
      <h1 className="text-3xl font-bold tracking-tight text-secondary-700 dark:text-secondary-400 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-2 sm:mt-6 sm:text-xl text-gray-800 dark:text-gray-100 font-medium">
        {text}
      </p>
    </div>
  )
}
