interface TemplateProps {
  title: string
  text?: string
}

export default function Template({ title, text }: TemplateProps) {
  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold tracking-tight text-primary-500 dark:text-primary-400 md:text-5xl sm:text-4xl">
        {title}
      </h1>
      {text && (
        <p className="mt-2 sm:mt-6 sm:text-xl text-gray-800 dark:text-gray-100 font-medium">
          {text}
        </p>
      )}
    </div>
  )
}
