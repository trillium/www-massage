import Image from "./Image"
// import SocialIcon from '@/components/social-icons'
import siteMetadata from "@/data/siteMetadata"
import SocialIcon from '@/components/social-icons'

const paragraphs = `
I'm a seasoned massage therapist with over a decade of experience, and I'm based in Los Angeles. I specialize in combining relaxation and pain relief techniques to provide my clients with effective massage therapy. With over thousands of client sessions, I have maintained a 5-star rating, reflecting the quality and care I put into my work.

I provide in in-home massage and chair massage, bringing my services directly to you. This means you can enjoy a relaxing massage in the comfort of your own home or workplace, without the hassle of fighting LA traffic.

In addition to my massage services, I offer couple's massage workshops upon request. These workshops focus on teaching you how to provide effective massage therapy while emphasizing good body mechanics to prevent therapist injury.
`
  .split("\n")
  .filter((i) => i.length > 0)

const AuthorCard = () => {
  const {
    author,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    location,
    instagram
  } = siteMetadata
  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-2 pb-2">
        {avatar && (
          <div className="pr-2 xl:pr-4">
            <Image
              src={avatar}
              alt="avatar"
              width={224}
              height={224}
              className="h-48 w-48 min-w-48 rounded-full md:h-52 md:w-52 border-2 border-primary-400"
            />
          </div>
        )}
        <div>
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight sm:text-3xl md:text-4xl">
            {author}
          </h3>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">
            {occupation}
          </div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">
            {company}
          </div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">
            {location}
          </div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="instagram" href={instagram} />
          </div>
        </div>
      </div>
      <div className="flex max-w-full flex-col items-center justify-center">
        <div className="prose max-w-full pb-8 pt-10 dark:prose-invert xl:text-xl">
          {paragraphs.map((text) => (
            <p key={text} className="py-2 text-justify">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
